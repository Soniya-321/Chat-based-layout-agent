/**
 * Resize the artboard and recompute all children's absolute coords
 * from their existing normalized values.
 */
export function resizeArtboard(layout, newWidth, newHeight) {
  const updated = structuredClone(layout);
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];

  artboard.width = newWidth;
  artboard.height = newHeight;

  artboard.children.forEach((childId) => {
    const node = updated.nodes[childId];
    if (!node) return;
    node.x = node.nx * newWidth;
    node.y = node.ny * newHeight;
    node.width = node.nw * newWidth;
    node.height = node.nh * newHeight;
  });

  return updated;
}

/**
 * Move a node to a named position relative to the artboard.
 * position: 'top' | 'bottom' | 'center' | 'left' | 'right'
 */
export function moveNodeTo(layout, nodeId, position) {
  const updated = structuredClone(layout);
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];
  const node = updated.nodes[nodeId];
  if (!node) return updated;

  const W = artboard.width;
  const H = artboard.height;
  const margin = 30;

  if (position === 'top') {
    node.y = margin;
    node.ny = node.y / H;
  } else if (position === 'bottom') {
    node.y = H - node.height - margin;
    node.ny = node.y / H;
  } else if (position === 'center') {
    node.x = (W - node.width) / 2;
    node.nx = node.x / W;
    node.y = (H - node.height) / 2;
    node.ny = node.y / H;
  } else if (position === 'left') {
    node.x = margin;
    node.nx = node.x / W;
  } else if (position === 'right') {
    node.x = W - node.width - margin;
    node.nx = node.x / W;
  }

  return updated;
}

/**
 * Scale a node by a factor. Also scales fontSize for text nodes.
 */
export function scaleNode(layout, nodeId, factor) {
  const updated = structuredClone(layout);
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];
  const node = updated.nodes[nodeId];
  if (!node) return updated;

  node.width *= factor;
  node.height *= factor;
  node.nw = node.width / artboard.width;
  node.nh = node.height / artboard.height;

  if (node.type === 'text' && node.style?.visual?.fontSize) {
    node.style.visual.fontSize = Math.round(node.style.visual.fontSize * factor);
  }

  return updated;
}