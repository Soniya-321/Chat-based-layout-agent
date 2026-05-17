/**
 * Fixes malformed color values from the layout JSON.
 * e.g. "#FFFF" (5 chars) → "#FFFFFF"
 */
export function fixColor(c) {
  if (!c) return '#FFFFFF';
  if (c.startsWith('#') && c.length === 5) return '#FFFFFF';
  return c;
}