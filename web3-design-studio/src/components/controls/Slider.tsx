"use client";

import { cn } from "@/lib/utils/cn";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  unit?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  className = "",
  unit = "",
}: SliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-matrix-text/80">
          {label}
        </label>
        <span className="text-sm font-mono text-matrix-accent">
          {value}
          {unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-2 bg-matrix-surface rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, var(--matrix-accent) 0%, var(--matrix-accent) ${percentage}%, rgb(26, 31, 26) ${percentage}%, rgb(26, 31, 26) 100%)`,
          }}
        />
      </div>
    </div>
  );
}
