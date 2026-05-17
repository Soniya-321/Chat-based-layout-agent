import { fixColor } from '../../utils/colorUtils';

export default function ShapeNode({ node, id, x, y, w, h }) {
  const fill     = fixColor(node.style?.visual?.fill?.value);
  const stroke   = fixColor(node.style?.visual?.stroke?.value);
  const sw       = node.style?.visual?.strokeWidth || 0;
  const isCircle = node.data?.shapeType === 'circle';

  return (
    <div
      key={id}
      style={{
        position:     'absolute',
        left:         x + 'px',
        top:          y + 'px',
        width:        w + 'px',
        height:       h + 'px',
        boxSizing:    'content-box',
        zIndex:       3,
        background:   fill,
        borderRadius: isCircle ? '50%' : (node.style?.visual?.borderRadius || 0) + 'px',
        border:       sw ? `${sw}px solid ${stroke}` : 'none',
      }}
    />
  );
}