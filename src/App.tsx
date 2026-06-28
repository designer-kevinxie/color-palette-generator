import "./index.css";
import { useState } from "react";
import {
  hexToHsl,
  isValidHex,
  generatePalette,
  paletteToCssVars,
} from "./colors";
import { ColorPicker } from "./components/ColorPicker";
import { ColorInput } from "./components/ColorInput";
import { Swatch } from "./components/Swatch";
import { PreviewCard } from "./components/PreviewCard";

// ============================================================
// UI layer — React components
// ============================================================

function ColorPalette() {
  //3个state
  const [primaryHex, setPrimaryHex] = useState("#C16953");
  const [hexInput, setHexInput] = useState("#C16953");
  const [copied, setCopied] = useState<string | null>(null);

  //计算出其他颜色
  const palette = generatePalette(hexToHsl(primaryHex));
  const colorsArray = Object.entries(palette);
  const cssVars = paletteToCssVars(palette);

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
    <div className="max-w-5xl mx-auto py-12 px-6" style={cssVars}>
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
      <PreviewCard />
    </div>
  );
}

function App() {
  return <ColorPalette />;
}

export default App;
