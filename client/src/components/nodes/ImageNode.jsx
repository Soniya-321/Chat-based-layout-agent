export default function ImageNode({ node, id, x, y, w, h }) {
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
        zIndex:    2,
      }}
    >
      <img
        src={node.data?.sourceUrl}
        alt={node.name}
        className="w-full h-full block"
        style={{ objectFit: node.data?.fit }}
      />
    </div>
  );
}