"use client";

import { useState } from "react";
import { SensePill } from "@/data/exercises";

interface SensesDropdownProps {
  sensePill: SensePill | null;
  unlockedSenses: Set<string>;
}

export default function SensesDropdown({
  sensePill,
  unlockedSenses,
}: SensesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<string | null>(null);

  if (!sensePill) return null;

  const { sense, pill, chunks } = sensePill;
  const mainVariant = chunks[0] || "variant"; // First chunk is the main variant

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
      >
        Senses ({unlockedSenses.size})
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-96 bg-white border-2 border-blue-200 rounded-lg shadow-xl overflow-hidden">
          <div className="p-5 border-b border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 space-y-4">
            {/* Base Sense Information */}
            <div>
              <p className="text-xs text-gray-600 font-bold mb-1">Basic Sense Category</p>
              <p className="text-lg font-bold text-gray-900">"{sense.label}"</p>
            </div>

            {/* Frame Description */}
            <div>
              <p className="text-xs text-gray-600 font-bold mb-1">Frame</p>
              <p className="text-sm text-gray-800 italic">
                {sense.frameDescription}
              </p>
            </div>

            {/* Definition */}
            <div>
              <p className="text-xs text-gray-600 font-bold mb-1">Definition</p>
              <p className="text-sm text-gray-800">
                {sense.basicSenseDefinition}
              </p>
            </div>

            {/* Variant + Pill Pairing */}
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
              {/* Variant on Left, Pill on Right */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-bold mb-2">Variant</p>
                  <p className="text-base font-semibold text-blue-700 bg-blue-50 p-2 rounded">
                    "{mainVariant}"
                  </p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs text-gray-600 font-bold mb-2">Feature/Pill</p>
                  <p className="text-base font-semibold text-amber-700 bg-amber-50 p-2 rounded">
                    {pill}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="pt-3 border-t border-gray-300 flex items-center gap-2">
                <span className="text-xs bg-green-200 text-green-800 px-2.5 py-1 rounded font-semibold">
                  ✓ Unlocked
                </span>
              </div>
            </div>

            {/* All Variants Under This Pill */}
            {chunks.length > 1 && (
              <div>
                <p className="text-xs text-gray-600 font-bold mb-2">All expressions:</p>
                <div className="space-y-2">
                  {chunks.map((chunk) => (
                    <button
                      key={chunk}
                      onClick={() =>
                        setSelectedChunk(selectedChunk === chunk ? null : chunk)
                      }
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors font-medium ${
                        selectedChunk === chunk
                          ? "bg-green-300 text-green-900"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      "{chunk}"
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Unlocked Senses Summary */}
          {unlockedSenses.size > 1 && (
            <div className="p-3 text-xs text-gray-700 text-center border-t border-blue-200 bg-blue-50 font-semibold">
              {unlockedSenses.size} total sense{unlockedSenses.size !== 1 ? "s" : ""}{" "}
              unlocked
            </div>
          )}
        </div>
      )}
    </div>
  );
}
