"use client";

import { cn } from "@/lib/utils/cn";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPicker({
  label,
  value,
  onChange,
  className = "",
}: ColorPickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-matrix-text/80">
          {label}
        </label>
        <span className="text-sm font-mono text-matrix-accent uppercase">
          {value}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="color"
            value={value}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="w-full h-10 rounded-lg border-2 border-matrix-accent/30 transition-all hover:border-matrix-accent/60"
            style={{ backgroundColor: value }}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="#00ff41"
          className="w-24 px-3 py-2 bg-matrix-surface border border-matrix-accent/30 rounded-lg text-sm font-mono text-matrix-text focus:outline-none focus:border-matrix-accent/60 transition-colors"
        />
      </div>
    </div>
  );
}
