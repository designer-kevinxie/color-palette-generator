import "./index.css";
import { useState } from "react";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface Palette {
  primary: HSL;
  secondary: HSL;
  accent: HSL;
  background: HSL;
  foreground: HSL;
  //          ↑ 每个角色的值都是一个 HSL 对象
}

function hexToRgb(hex: string): RGB {
  hex = hex.replace("#", ""); // remove the "#"
  const r = parseInt(hex.substring(0, 2), 16); // "C1" → 193, base 16
  const g = parseInt(hex.substring(2, 4), 16); // "69" → 105
  const b = parseInt(hex.substring(4, 6), 16); // "52" → 82
  return { r, g, b };
}

function rgbToHsl({ r, g, b }: RGB): HSL {
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

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

export function hslToCss({ h, s, l }: HSL): string {
  return `hsl(${h}, ${s}%, ${l}%)`; // template literal, 拼成 CSS 字符串
}

function isValidHex(hex: string): boolean {
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

// ============================================================
// UI layer — React components
// ============================================================
export interface ColorPickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ColorInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PreviewCardProps {
  palette: Palette;
}

export interface SwatchProps {
  role: string;
  color: HSL;
  isCopied: boolean;
  onCopy: (role: string, hex: string) => void;
}

export function Swatch({ role, color, isCopied, onCopy }: SwatchProps) {
  return (
    <div
      onClick={() => onCopy(role, hslToHex(color))}
      className="hover:scale-105 hover:shadow-2xl transition h-50 rounded-xl p-4 flex flex-col justify-between cursor-pointer"
      style={{
        backgroundColor: hslToCss(color),
        color: textColorFor(color),
      }}
    >
      <span className="text-xs uppercase tracking-wide">{role}</span>
      <span className="text-sm font-mono">
        {isCopied ? "已复制！" : hslToHex(color)}
      </span>
    </div>
  );
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <input
      type="color"
      value={value}
      onChange={onChange}
      className="w-12 h-12 border-none cursor-pointer"
    />
  );
}

export function ColorInput({ value, onChange }: ColorInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="px-3.5 py-3 text-base font-mono rounded-lg border border-gray-300"
    />
  );
}

//预览卡片
export function PreviewCard({ palette }: PreviewCardProps) {
  return (
    <div
      className="flex flex-col gap-9 p-10 mt-8"
      style={{ backgroundColor: hslToCss(palette.background) }}
    >
      <h2 className="text-6xl" style={{ color: hslToCss(palette.primary) }}>
        Palette Preview
      </h2>
      <div
        className="p-5 max-w-2xl space-y-3 bg-white border border-transparent hover:border-[var(--hover-color)] transition duration-200"
        style={
          {
            "--hover-color": hslToCss(palette.secondary),
          } as React.CSSProperties
        }
      >
        <span
          className="inline-block p-1 text-xs font-bold"
          style={{
            color: hslToCss(palette.accent),
            border: `1px solid ${hslToCss(palette.accent)}`,
          }}
        >
          NEW
        </span>
        <h3
          className="text-xl font-bold"
          style={{ color: hslToCss(palette.foreground) }}
        >
          This Is Heading
        </h3>
        <p className="text-sm" style={{ color: hslToCss(palette.foreground) }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button
          className="mt-3 py-2.5 px-7 cursor-pointer text-base hover:shadow-xl transition duration-200"
          style={{
            backgroundColor: hslToCss(palette.primary),
            color: textColorFor(palette.primary),
          }}
        >
          Action
        </button>
      </div>
    </div>
  );
}

function ColorPalette() {
  //3个state
  const [primaryHex, setPrimaryHex] = useState("#C16953");
  const [hexInput, setHexInput] = useState("#C16953");
  const [copied, setCopied] = useState<string | null>(null);

  //计算出其他颜色
  const palette = generatePalette(hexToHsl(primaryHex));
  const colorsArray = Object.entries(palette);
  console.log(colorsArray);

  //处理输入事件

  function handleHexInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setHexInput(value);
    if (isValidHex(value)) {
      //只有当它是完整合法的 hex 时，才同步给 primaryHex
      setPrimaryHex(value);
    }
  }

  //处理取色器事件
  function handlePickerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPrimaryHex(value); // 取色器吐出的一定合法,直接提交
    setHexInput(value); // 同时同步文字框,保持一致
  }

  //处理点击复制颜色事件
  async function handleCopy(role: string, hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(role);
      setTimeout(() => setCopied(null), 1000);
    } catch (error) {
      console.log("复制失败：", error);
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-2">Palette Generator</h1>
      <p className="mb-8 text-neutral-500">
        Pick a primary color — the rest of the palette is derived from it.
      </p>

      <div className="flex gap-3 items-center mb-10">
        <ColorPicker value={primaryHex} onChange={handlePickerChange} />
        <ColorInput value={hexInput} onChange={handleHexInput} />
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        }}
      >
        {colorsArray.map(([role, color]) => (
          <Swatch
            key={role}
            role={role}
            color={color}
            isCopied={copied === role}
            onCopy={handleCopy}
          />
        ))}
      </div>
      <PreviewCard palette={palette} />
    </div>
  );
}

function App() {
  return <ColorPalette />;
}

export default App;
