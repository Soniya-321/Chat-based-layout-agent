import Groq from 'groq-sdk';
import { buildSystemPrompt } from '../prompts/systemPrompt.js';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Keep ONLY fields the LLM needs for reasoning
function slimLayout(layout) {
  const slimmed = { rootNodes: layout.rootNodes, nodes: {} };

  for (const [id, node] of Object.entries(layout.nodes)) {
    const slim = {
      id:   node.id,
      name: node.name,
      type: node.type,
      nx:   node.nx,
      ny:   node.ny,
      nw:   node.nw,
      nh:   node.nh,
      // Absolute coords — LLM needs these to recompute after transforms
      x:      node.x,
      y:      node.y,
      width:  node.width,
      height: node.height,
    };

    // Text content — needed for semantic role detection
    if (node.data?.content)         slim.content   = node.data.content;
    if (node.data?.shapeType)       slim.shapeType = node.data.shapeType;
    if (node.data?.preset)          slim.preset    = node.data.preset;
    if (node.data?.backgroundColor) slim.bgColor   = node.data.backgroundColor;

    // Only essential style fields — skip borders, layout, visual wrappers
    if (node.style?.visual) {
      const v = node.style.visual;
      if (v.fontSize)    slim.fontSize    = v.fontSize;
      if (v.fontWeight)  slim.fontWeight  = v.fontWeight;
      if (v.fontStyle)   slim.fontStyle   = v.fontStyle;
      if (v.fontFamily)  slim.fontFamily  = v.fontFamily;
      if (v.fill?.value) slim.fill        = v.fill.value;
      if (v.color?.value) slim.color      = v.color.value;
    }

    // Artboard children list
    if (node.children) slim.children = node.children;
    if (node.parentId) slim.parentId = node.parentId;
    if (node.fontSizeRatio) slim.fontSizeRatio = node.fontSizeRatio;

    slimmed.nodes[id] = slim;
  }

  return slimmed;
}

// Rebuild full node structure from slim LLM output
function rebuildFullLayout(originalLayout, slimResult) {
  if (!slimResult?.nodes) return slimResult;

  const rebuilt = { ...slimResult, nodes: {} };

  for (const [id, slimNode] of Object.entries(slimResult.nodes)) {
    const original = originalLayout.nodes[id];
    if (!original) {
      rebuilt.nodes[id] = slimNode;
      continue;
    }

    // Start from original, overlay LLM changes
    rebuilt.nodes[id] = {
      ...original,
      x:      slimNode.x      ?? original.x,
      y:      slimNode.y      ?? original.y,
      width:  slimNode.width  ?? original.width,
      height: slimNode.height ?? original.height,
      nx:     slimNode.nx     ?? original.nx,
      ny:     slimNode.ny     ?? original.ny,
      nw:     slimNode.nw     ?? original.nw,
      nh:     slimNode.nh     ?? original.nh,
    };

    // Rebuild style if LLM changed font/color fields
    if (original.style?.visual) {
      rebuilt.nodes[id].style = {
        ...original.style,
        visual: {
          ...original.style.visual,
          ...(slimNode.fontSize   && { fontSize:   slimNode.fontSize }),
          ...(slimNode.fontWeight && { fontWeight: slimNode.fontWeight }),
          ...(slimNode.fontStyle  && { fontStyle:  slimNode.fontStyle }),
          ...(slimNode.fill       && { fill:  { type: 'solid', value: slimNode.fill } }),
          ...(slimNode.color      && { color: { type: 'solid', value: slimNode.color } }),
        }
      };
    }

    // Restore image URLs — never sent to LLM
    if (original.data?.sourceUrl) {
      rebuilt.nodes[id].data = {
        ...rebuilt.nodes[id].data,
        sourceUrl: original.data.sourceUrl,
        assetId:   original.data.assetId,
        fit:       original.data.fit,
      };
    }

    // Restore artboard backgroundColor
    if (original.data?.backgroundColor) {
      rebuilt.nodes[id].data = {
        ...rebuilt.nodes[id].data,
        backgroundColor: slimNode.bgColor ?? original.data.backgroundColor,
      };
    }
  }

  // Restore root-level imageUrl
  if (originalLayout.imageUrl) {
    rebuilt.imageUrl = originalLayout.imageUrl;
  }

  return rebuilt;
}

function normalizeResult(parsed, originalLayout) {
  let explanation   = parsed.explanation || 'Layout updated.';
  let updatedLayout = parsed.updatedLayout;

  // Fallback: LLM returned layout directly without wrapper
  if (!updatedLayout && parsed.rootNodes && parsed.nodes) {
    console.warn('⚠️ LLM returned layout without wrapper — normalizing.');
    updatedLayout = parsed;
  }

  // Fallback: LLM used alternate key
  if (!updatedLayout) {
    for (const key of ['layout', 'updated_layout', 'result', 'data']) {
      if (parsed[key]?.rootNodes) {
        updatedLayout = parsed[key];
        break;
      }
    }
  }

  if (!updatedLayout) throw new Error('LLM response missing updatedLayout');

  return { explanation, updatedLayout: rebuildFullLayout(originalLayout, updatedLayout) };
}

export async function callLLM(layout, history, userMessage) {
  const systemPrompt = buildSystemPrompt();
  const slim = slimLayout(layout);

  // Compact JSON — no pretty print saves ~30% tokens
  const userContent = `Layout:${JSON.stringify(slim)}\nInstruction:${userMessage}`;

  const response = await client.chat.completions.create({
    model:       'llama-3.3-70b-versatile',
    max_tokens:  2048,           // was 4096 — slim output needs less
    temperature: 0.1,
    messages: [
      { role: 'system', content: systemPrompt },
      ...history.slice(-2),      // max 2 history messages
      { role: 'user', content: userContent }
    ]
  });

  const rawText = response.choices[0].message.content.trim();

  const cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error('❌ JSON parse failed:\n', rawText);
    throw new Error('LLM returned invalid JSON');
  }

  return normalizeResult(parsed, layout);
}