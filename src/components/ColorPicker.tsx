export interface ColorPickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
