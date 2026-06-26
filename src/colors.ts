import type { RGB, HSL, Palette } from "./types";

export function hexToRgb(hex: string): RGB {
  hex = hex.replace("#", ""); // remove the "#"
  const r = parseInt(hex.substring(0, 2), 16); // "C1" → 193, base 16
  const g = parseInt(hex.substring(2, 4), 16); // "69" → 105
  const b = parseInt(hex.substring(4, 6), 16); // "52" → 82
  return { r, g, b };
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  // normalize to 0–1
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min; // the spread between brightest & darkest

  // --- Lightness ---
  let l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    // delta 0 means gray, keep h=0 s=0
    // --- Saturation ---
    s = delta / (1 - Math.abs(2 * l - 1));

    // --- Hue: which channel is the max decides the base angle ---
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60); // convert to degrees
    if (h < 0) h += 360; // keep it positive
  }

  // round to clean numbers
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}

export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

export function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

export function hslToCss({ h, s, l }: HSL): string {
  return `hsl(${h}, ${s}%, ${l}%)`; // template literal, 拼成 CSS 字符串
}

export function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
  // ^#        starts with #
  // [0-9A-Fa-f]  a hex digit (0-9, a-f, A-F)
  // {6}       exactly 6 of them
  // $         then end
}

// L high (light swatch) -> dark text; L low (dark swatch) -> light text
export function textColorFor({ l }: HSL): string {
  return l > 55 ? "#1a1a1a" : "#ffffff";
}

// Convert an HSL object back to a hex string (for the HEX label on each swatch)
export function hslToHex({ h, s, l }: HSL): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function generatePalette({ h, s, l }: HSL): Palette {
  const background = { h: wrapHue(h), s: 20, l: 95 };
  const foreground = { h: wrapHue(h), s: 25, l: 15 };
  const primary = { h: wrapHue(h), s, l };
  const secondary = { h: wrapHue(h + 30), s: s - 2, l: l + 1 };
  const accent = { h: wrapHue(h - 150), s: s + 3, l: l - 4 };

  return { background, foreground, primary, secondary, accent };
}
