export default function BackgroundNode({ node, id }) {
  return (
    <img
      key={id}
      src={node.data?.sourceUrl}
      alt={node.name}
      className="absolute inset-0 w-full h-full object-cover block z-0"
    />
  );
}