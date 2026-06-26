import type { Palette } from "../types";
import { hslToCss, textColorFor } from "../colors";

export interface PreviewCardProps {
  palette: Palette;
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
