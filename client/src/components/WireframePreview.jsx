import { useRef, useState, useEffect } from 'react';

function fixColor(c) {
  if (!c) return '#FFFFFF';
  if (c.startsWith('#') && c.length === 5) return '#FFFFFF';
  return c;
}

function renderNode(node, id, AW, AH) {
  // Dynamic pixel values — must stay inline
  const x = node.nx * AW;
  const y = node.ny * AH;
  const w = node.nw * AW;
  const h = node.nh * AH;

  const base = {
    position: 'absolute',
    left:     x + 'px',
    top:      y + 'px',
    width:    w + 'px',
    height:   h + 'px',
    boxSizing: 'content-box',
  };

  // ── Background image ──────────────────────────────────────────
  if (node.type === 'image' && node.name === 'Background.png') {
    return (
      <img
        key={id}
        src={node.data?.sourceUrl}
        alt={node.name}
        className="absolute inset-0 w-full h-full object-cover block z-0"
      />
    );
  }

  // ── Other images ──────────────────────────────────────────────
  if (node.type === 'image') {
    return (
      <div key={id} style={{ ...base, zIndex: 2 }}>
        <img
          src={node.data?.sourceUrl}
          alt={node.name}
          className="w-full h-full block"
          style={{ objectFit: node.data?.fit }}
        />
      </div>
    );
  }

  // ── Shape ─────────────────────────────────────────────────────
  if (node.type === 'shape') {
    const fill     = fixColor(node.style?.visual?.fill?.value);
    const stroke   = fixColor(node.style?.visual?.stroke?.value);
    const sw       = node.style?.visual?.strokeWidth || 0;
    const isCircle = node.data?.shapeType === 'circle';
    return (
      <div
        key={id}
        style={{
          ...base,
          zIndex:       3,
          background:   fill,
          borderRadius: isCircle ? '50%' : (node.style?.visual?.borderRadius || 0) + 'px',
          border:       sw ? `${sw}px solid ${stroke}` : 'none',
        }}
      />
    );
  }

  // ── Text ──────────────────────────────────────────────────────
  if (node.type === 'text') {
    const v       = node.style?.visual || {};
    const color   = fixColor(v.color?.value);
    const size    = v.fontSize;
    const family  = v.fontFamily;
    const weight  = v.fontWeight;
    const fStyle  = v.fontStyle;
    const content = node.data?.content;

    return (
      <div
        key={id}
        style={{ ...base, zIndex: 3 }}
        className="flex justify-start pointer-events-none"
      >
        <span
          className="w-full whitespace-pre-wrap break-words leading-[1.2] tracking-[-0.03em]"
          style={{ color, fontSize: size + 'px', fontFamily: family, fontWeight: weight, fontStyle: fStyle }}
        >
          {content}
        </span>
      </div>
    );
  }

  return null;
}

export default function WireframePreview({ layout }) {
  const rootId   = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];
  const AW = artboard.width;
  const AH = artboard.height;

  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const update = () => {
      if (wrapperRef.current) {
        setScale(wrapperRef.current.offsetWidth / AW);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [AW]);

  return (
    <div className="flex flex-col gap-1">

      {/* Canvas label */}
      <p className="text-xs text-slate-400">
        Canvas: {Math.round(AW)} × {Math.round(AH)}px
      </p>

      {/* Outer shell — height is dynamic so stays inline */}
      <div
        ref={wrapperRef}
        className="w-full relative rounded overflow-hidden"
        style={{
          height:     AH * scale + 'px',
          background: artboard.data?.backgroundColor,
        }}
      >
        {/* Inner artboard — width/height/transform are dynamic, stay inline */}
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
            return renderNode(node, id, AW, AH);
          })}
        </div>
      </div>
    </div>
  );
}