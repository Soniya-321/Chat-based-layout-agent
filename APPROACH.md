# Approach Notes

## LLM Prompt Strategy
The system prompt explains the normalized coordinate system (nx/ny/nw/nh),
semantic roles of each layer (headline, product, badge), and strict transformation
rules. This gives the model enough spatial and semantic context to reason correctly.

## JSON Transformation Safety
- The LLM returns a complete updated JSON object (not a diff).
- A validator checks required keys (rootNodes, nodes, x/y types) before accepting the result.
- On invalid JSON or validation failure, the original layout is returned unchanged so the UI never breaks.
- A structuredClone() deep copy is used in all transform helpers so inputs are never mutated.

## Conversation Context
The last 6 messages are sent with every API call, so the model resolves
follow-up references like "make it bigger" or "move it higher" correctly.

## Trade-offs
- Full JSON returned each time (vs. diffs) keeps things simple but increases token usage.
- With more time: tool calling instead of free-form JSON would be more reliable.
- With more time: image rendering via Fabric.js or Konva would replace the wireframe divs.