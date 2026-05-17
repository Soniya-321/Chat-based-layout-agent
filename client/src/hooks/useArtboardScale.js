import { useRef, useState, useEffect } from 'react';

/**
 * Measures the container width and returns a CSS scale factor
 * so the artboard (AW wide) fits inside it perfectly.
 */
export function useArtboardScale(AW) {
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

  return { wrapperRef, scale };
}