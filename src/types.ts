export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface Palette {
  primary: HSL;
  secondary: HSL;
  accent: HSL;
  background: HSL;
  foreground: HSL;
}
