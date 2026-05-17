import NodeRenderer from './nodes/NodeRenderer';
import { useArtboardScale } from '../hooks/useArtboardScale';

export default function WireframePreview({ layout }) {
  const rootId   = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];
  const AW = artboard.width;
  const AH = artboard.height;

  const { wrapperRef, scale } = useArtboardScale(AW);

  return (
    <div className="flex flex-col gap-1">

      {/* Canvas label */}
      <p className="text-xs text-slate-400">
        Canvas: {Math.round(AW)} × {Math.round(AH)}px
      </p>

      {/* Outer shell */}
      <div
        ref={wrapperRef}
        className="w-full relative rounded overflow-hidden"
        style={{
          height:     AH * scale + 'px',
          background: artboard.data?.backgroundColor,
        }}
      >
        {/* Inner artboard scaled to fit */}
        <div
          className="absolute top-0 left-0 origin-top-left overflow-hidden"
          style={{
            width:     AW + 'px',
            height:    AH + 'px',
            transform: `scale(${scale})`,
          }}
        >
          {artboard.children?.map((id) => {
            const node = layout.nodes[id];
            if (!node) return null;
            return (
              <NodeRenderer
                key={id}
                node={node}
                id={id}
                AW={AW}
                AH={AH}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}