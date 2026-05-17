import { fixColor } from '../../utils/colorUtils';

export default function TextNode({ node, id, x, y, w, h }) {
  const v      = node.style?.visual || {};
  const color  = fixColor(v.color?.value);
  const size   = v.fontSize;
  const family = v.fontFamily;
  const weight = v.fontWeight;
  const fStyle = v.fontStyle;

  return (
    <div
      key={id}
      style={{
        position:  'absolute',
        left:      x + 'px',
        top:       y + 'px',
        width:     w + 'px',
        height:    h + 'px',
        boxSizing: 'content-box',
        zIndex:    3,
      }}
      className="flex justify-start pointer-events-none"
    >
      <span
        className="w-full whitespace-pre-wrap break-words leading-[1.2] tracking-[-0.03em]"
        style={{ color, fontSize: size + 'px', fontFamily: family, fontWeight: weight, fontStyle: fStyle }}
      >
        {node.data?.content}
      </span>
    </div>
  );
}