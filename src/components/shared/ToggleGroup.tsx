"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleOption {
  label: string;
  value: string;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ToggleGroup({ options, value, onChange, className }: ToggleGroupProps) {
  return (
    <div
      className={cn("flex rounded-md border border-[hsl(var(--border))] overflow-hidden", className)}
      role="radiogroup"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex-1 px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring",
            value === opt.value
              ? "bg-[hsl(var(--foreground))] text-white"
              : "bg-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(30_10%_93%)]"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
