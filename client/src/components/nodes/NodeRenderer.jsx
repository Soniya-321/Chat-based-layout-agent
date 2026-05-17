import BackgroundNode from './BackgroundNode';
import ImageNode from './ImageNode';
import ShapeNode from './ShapeNode';
import TextNode from './TextNode';

export default function NodeRenderer({ node, id, AW, AH }) {
  const x = node.nx * AW;
  const y = node.ny * AH;
  const w = node.nw * AW;
  const h = node.nh * AH;

  if (node.type === 'image' && node.name === 'Background.png') {
    return <BackgroundNode key={id} node={node} id={id} />;
  }

  if (node.type === 'image') {
    return <ImageNode key={id} node={node} id={id} x={x} y={y} w={w} h={h} />;
  }

  if (node.type === 'shape') {
    return <ShapeNode key={id} node={node} id={id} x={x} y={y} w={w} h={h} />;
  }

  if (node.type === 'text') {
    return <TextNode key={id} node={node} id={id} x={x} y={y} w={w} h={h} />;
  }

  return null;
}