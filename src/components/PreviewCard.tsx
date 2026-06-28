//预览卡片
export function PreviewCard() {
  return (
    <div
      className="flex flex-col gap-9 p-10 mt-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <h2 className="text-6xl" style={{ color: "var(--color-primary)" }}>
        Palette Preview
      </h2>
      <div
        className="p-5 max-w-2xl space-y-3 bg-white border border-transparent hover:border-[var(--hover-color)] transition duration-200"
        style={
          {
            "--hover-color": "var(--color-secondary)",
          } as React.CSSProperties
        }
      >
        <span
          className="inline-block p-1 text-xs font-bold"
          style={{
            color: "var(--color-accent)",
            border: "1px solid var(--color-accent)",
          }}
        >
          NEW
        </span>
        <h3
          className="text-xl font-bold"
          style={{ color: "var(--color-foreground)" }}
        >
          This Is Heading
        </h3>
        <p className="text-sm" style={{ color: "var(--color-foreground)" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button
          className="mt-3 py-2.5 px-7 cursor-pointer text-base hover:shadow-xl transition duration-200"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-on-primary)",
          }}
        >
          Action
        </button>
      </div>
    </div>
  );
}
