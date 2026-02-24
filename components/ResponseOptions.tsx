"use client";

import { Sense } from "@/data/domain";

interface ResponseOptionsProps {
  options: Sense[];
  onSelect?: (option: Sense) => void;
  selectedId?: string;
}

export function ResponseOptions({ options, onSelect, selectedId }: ResponseOptionsProps) {
  return (
    <div className="p-panel-pad border-t border-border bg-surface/50">
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect?.(option)}
            className={`w-full response-card text-left ${
              selectedId === option.id ? "selected" : ""
            }`}
          >
            <p className="text-replaceable font-medium">{option.fullFormTemplate}</p>
            {option.pill && (
              <p className="text-pill-meta mt-2">
                {option.pill.statusSignal}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
