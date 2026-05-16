import Groq from 'groq-sdk';
import { buildSystemPrompt } from '../prompts/systemPrompt.js';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Slim down the layout — remove heavy/unnecessary fields before sending
function slimLayout(layout) {
  const slimmed = {
    rootNodes: layout.rootNodes,
    nodes: {}
  };

  for (const [id, node] of Object.entries(layout.nodes)) {
    slimmed.nodes[id] = {
      id: node.id,
      name: node.name,
      type: node.type,
      x: node.x,
      y: node.y,
      width: node.width,
      height: node.height,
      nx: node.nx,
      ny: node.ny,
      nw: node.nw,
      nh: node.nh,
      parentId: node.parentId,
      data: node.data
        ? {
            content: node.data.content,          // text content
            shapeType: node.data.shapeType,       // circle etc
            preset: node.data.preset,             // artboard preset
            backgroundColor: node.data.backgroundColor
          }
        : undefined,
      style: node.style,
      children: node.children,
      fontSizeRatio: node.fontSizeRatio
    };

    Object.keys(slimmed.nodes[id]).forEach(
      (k) => slimmed.nodes[id][k] === undefined && delete slimmed.nodes[id][k]
    );
  }

  return slimmed;
}

export async function callLLM(layout, history, userMessage) {
  const systemPrompt = buildSystemPrompt();
  const slim = slimLayout(layout);

  // Pass layout as part of the user message to avoid huge system prompts
  const userContent = `Current layout JSON:
${JSON.stringify(slim, null, 2)}

User instruction: ${userMessage}`;

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 4096,
    temperature: 0.1,
    messages: [
      { role: 'system', content: systemPrompt },
      // Keep only last 6 history messages to save tokens
      ...history.slice(-6),
      { role: 'user', content: userContent }
    ]
  });

  const rawText = response.choices[0].message.content.trim();

  const cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const result = JSON.parse(cleaned);

  // Re-attach image sourceUrls the model stripped (we slimmed them out)
  return reattachImageUrls(layout, result);
}

// After LLM transforms the layout, restore image sourceUrls we stripped
function reattachImageUrls(originalLayout, result) {
  if (!result.updatedLayout?.nodes) return result;

  for (const [id, node] of Object.entries(result.updatedLayout.nodes)) {
    const original = originalLayout.nodes[id];
    if (original?.data?.sourceUrl && node.data) {
      node.data.sourceUrl = original.data.sourceUrl;
      node.data.assetId = original.data.assetId;
      node.data.fit = original.data.fit;
    }
  }

  // Also restore imageUrl at root level if present
  if (originalLayout.imageUrl) {
    result.updatedLayout.imageUrl = originalLayout.imageUrl;
  }

  return result;
}