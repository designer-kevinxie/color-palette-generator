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

function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function hslToCss({ h, s, l }: HSL): string {
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
function textColorFor({ l }: HSL): string {
  return l > 55 ? "#1a1a1a" : "#ffffff";
}

// Convert an HSL object back to a hex string (for the HEX label on each swatch)
function hslToHex({ h, s, l }: HSL): string {
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
  const toHex = (n) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function generatePalette({ h, s, l }: HSL): Palette {
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
interface ColorPickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ColorInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <input
      type="color"
      value={value}
      onChange={onChange}
      style={{
        width: "48px",
        height: "48px",
        border: "none",
        cursor: "pointer",
      }}
    />
  );
}

function ColorInput({ value, onChange }: ColorInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      style={{
        padding: "12px 14px",
        fontSize: "15px",
        fontFamily: "monospace",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    />
  );
}

function ColorPalette() {
  //3个state
  const [primaryHex, setPrimaryHex] = useState("#C16952");
  const [hexInput, setHexInput] = useState("#C16952");
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
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>
        Palette Generator
      </h1>
      <p style={{ color: "#666", marginBottom: "32px" }}>
        Pick a primary color — the rest of the palette is derived from it.
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <ColorPicker value={primaryHex} onChange={handlePickerChange} />
        <ColorInput value={hexInput} onChange={handleHexInput} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
        }}
      >
        {colorsArray.map(([role, color]) => (
          <div
            key={role}
            onClick={() => {
              handleCopy(role, hslToHex(color));
            }}
            style={{
              backgroundColor: hslToCss(color),
              color: textColorFor(color),
              height: "200px",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "13px",
              }}
            >
              {role}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "14px" }}>
              {copied === role ? "已复制！" : hslToHex(color)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return <ColorPalette />;
}

export default App;
