import type { HSL } from "../types";
import { hslToHex, hslToCss, textColorFor } from "../colors";

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
