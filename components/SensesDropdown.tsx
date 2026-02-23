"use client";

import { useState } from "react";
import { SensePill } from "@/data/exercises";

interface SensesDropdownProps {
  sensePill: SensePill | null;
  unlockedSenses: Set<string>;
  targetSenseId?: string; // Current exercise target sense (for Stage 1 display)
  integrationTracker?: Record<string, number>; // Map of sense_id -> 1-12 integration score
}

export default function SensesDropdown({
  sensePill,
  unlockedSenses,
  targetSenseId,
  integrationTracker = {},
}: SensesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<string | null>(null);

  // Show if: sensePill provided (after unlock) OR targetSenseId provided (Stage 1 learning)
  if (!sensePill && !targetSenseId) return null;

  const displayPill = sensePill || null;
  const integrationScore = targetSenseId ? integrationTracker[targetSenseId] || 0 : 0;
  const isLearning = targetSenseId && !sensePill; // Stage 1: target shown but not yet unlocked

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-white ${
          isLearning
            ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        }`}
      >
        {isLearning ? "📖 Learning" : `✓ Senses (${unlockedSenses.size})`}
        {integrationScore > 0 && (
          <span className="ml-2 text-xs opacity-75">{integrationScore}/12</span>
        )}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-96 bg-white border-2 border-blue-200 rounded-lg shadow-xl overflow-hidden">
          <div className={`p-5 border-b border-blue-200 bg-gradient-to-br space-y-4 ${
            isLearning 
              ? "from-amber-50 to-orange-50"
              : "from-blue-50 to-indigo-50"
          }`}>
            {/* Base Sense Information */}
            <div>
              <p className="text-xs text-gray-600 font-bold mb-1">Basic Sense Category</p>
              <p className="text-lg font-bold text-gray-900">{displayPill ? `"${displayPill.sense.label}"` : "Learning target"}</p>
            </div>

            {/* Integration Tracker - Shows 1-12 scale */}
            {integrationScore > 0 && (
              <div className="bg-white p-3 rounded-lg border-2 border-green-200">
                <p className="text-xs text-gray-600 font-bold mb-2">Neural Integration</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(integrationScore / 12) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-green-700">{integrationScore}/12</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {integrationScore < 3 ? "Encoding phase" : integrationScore < 6 ? "Consolidating" : "Integrating"}
                </p>
              </div>
            )}

            {displayPill && (
              <>
            {/* Frame Description */}
            <div>
              <p className="text-xs text-gray-600 font-bold mb-1">Frame</p>
              <p className="text-sm text-gray-800 italic">
                {displayPill.sense.frameDescription}
              </p>
            </div>

            {/* Definition */}
            <div>
              <p className="text-xs text-gray-600 font-bold mb-1">Definition</p>
              <p className="text-sm text-gray-800">
                {displayPill.sense.basicSenseDefinition}
              </p>
            </div>

            {/* Variant + Pill Pairing */}
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
              {/* Variant on Left, Pill on Right */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-600 font-bold mb-2">Variant</p>
                  <p className="text-base font-semibold text-blue-700 bg-blue-50 p-2 rounded">
                    "{displayPill.chunks[0]}"
                  </p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs text-gray-600 font-bold mb-2">Pill / Activation</p>
                  <p className="text-base font-semibold text-amber-700 bg-amber-50 p-2 rounded">
                    {displayPill.pill}
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
            {displayPill.chunks.length > 1 && (
              <div>
                <p className="text-xs text-gray-600 font-bold mb-2">All expressions:</p>
                <div className="space-y-2">
                  {displayPill.chunks.map((chunk) => (
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
              </>
            )}

            {isLearning && !displayPill && (
              <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
                <p className="text-sm font-semibold text-amber-900 mb-2">📖 Learning Mode</p>
                <p className="text-xs text-amber-800">
                  Pay attention to how this sense activates. You'll unlock the full pill once you identify it correctly.
                </p>
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
