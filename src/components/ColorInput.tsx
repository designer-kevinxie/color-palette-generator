export interface ColorInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
