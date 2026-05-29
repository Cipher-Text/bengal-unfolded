"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";

type DensityMode = "quick" | "deep";

type ContentDensityControlsProps = {
  labels: {
    title: string;
    quick: string;
    deep: string;
  };
  children: ReactNode;
};

export function ContentDensityControls({ labels, children }: ContentDensityControlsProps) {
  const [mode, setMode] = useState<DensityMode>("deep");
  const labelId = useId();
  const modes: DensityMode[] = ["quick", "deep"];

  return (
    <div data-density-mode={mode}>
      <div className="theme-surface-soft rounded-xl border border-amber-500/25 p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p id={labelId} className="theme-muted text-xs">
            {labels.title}
          </p>
          <div
            role="radiogroup"
            aria-labelledby={labelId}
            className="inline-grid min-h-[44px] grid-cols-2 rounded-lg border border-amber-500/35 bg-[color:var(--surface-soft)] p-1 sm:min-w-64"
          >
            {modes.map((option) => {
              const selected = option === mode;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setMode(option)}
                  className={`min-h-[36px] rounded-md px-3 text-sm font-medium transition ${
                    selected
                      ? "bg-[color:var(--sepia)] text-[color:var(--paper)] shadow-sm"
                      : "theme-muted hover:bg-amber-500/10 hover:text-accent"
                  }`}
                >
                  {option === "quick" ? labels.quick : labels.deep}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
