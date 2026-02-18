/**
 * DEBUG PANEL - Real-Time Metrics Display
 * 
 * Shows current user progress, sense status, and scoring metrics.
 * Useful for validating architecture behavior during development.
 * Can be toggled on/off with keyboard shortcut or visible by default.
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  loadUser,
  loadSenseProgressMap,
  exportAllData,
} from "@/data/storage";
import {
  getSummary,
  getIntegrationPercentage,
  INTEGRATION_THRESHOLDS,
} from "@/data/progress";
import type { UserSenseProgress } from "@/data/domain";

interface DebugPanelProps {
  visible?: boolean;
}

export default function DebugPanel({ visible = true }: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(visible);
  const [user, setUser] = useState<any>(null);
  const [senseProgress, setSenseProgress] = useState<
    Map<string, UserSenseProgress>
  >(new Map());
  const [expandedSenses, setExpandedSenses] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load data on mount and update every 500ms
    const updateData = () => {
      const userData = loadUser();
      const senseMap = loadSenseProgressMap();

      setUser(userData);
      setSenseProgress(senseMap);
    };

    updateData();
    const interval = setInterval(updateData, 500);
    return () => clearInterval(interval);
  }, []);

  const toggleSense = (senseId: string) => {
    const newExpanded = new Set(expandedSenses);
    if (newExpanded.has(senseId)) {
      newExpanded.delete(senseId);
    } else {
      newExpanded.add(senseId);
    }
    setExpandedSenses(newExpanded);
  };

  const handleClear = () => {
    if (
      confirm(
        "Clear all user data? This will reset progress and cannot be undone."
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleExport = () => {
    const data = exportAllData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `progress-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-gray-800 text-xs text-gray-400 hover:text-gray-200 border border-gray-700 rounded opacity-50 hover:opacity-100 transition-opacity"
        title="Show debug panel (Ctrl+D)"
      >
        🐛 Debug
      </button>
    );
  }

  const integratedCount = Array.from(senseProgress.values()).filter(
    (p) => p.integration_status === "integrated"
  ).length;
  const consolidatingCount = Array.from(senseProgress.values()).filter(
    (p) => p.integration_status === "consolidating"
  ).length;
  const encodingCount = Array.from(senseProgress.values()).filter(
    (p) => p.integration_status === "encoding"
  ).length;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-700">
        <h3 className="text-sm font-mono font-bold text-gray-300">
          DEBUG PANEL
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xs text-gray-500 hover:text-gray-400"
        >
          ✕
        </button>
      </div>

      {/* User Info */}
      {user && (
        <div className="mb-3 pb-3 border-b border-gray-700">
          <p className="text-xs text-gray-500">User</p>
          <p className="text-xs font-mono text-gray-400">{user.id}</p>
          <p className="text-xs text-gray-600">
            Created: {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Summary */}
      <div className="mb-3 pb-3 border-b border-gray-700">
        <p className="text-xs text-gray-500 mb-2">Cluster Status</p>
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <div className="bg-gray-800 rounded p-2">
            <p className="text-blue-400">{encodingCount}</p>
            <p className="text-gray-600 text-xs">Encoding</p>
          </div>
          <div className="bg-gray-800 rounded p-2">
            <p className="text-yellow-400">{consolidatingCount}</p>
            <p className="text-gray-600 text-xs">Consolidating</p>
          </div>
          <div className="bg-gray-800 rounded p-2">
            <p className="text-green-400">{integratedCount}</p>
            <p className="text-gray-600 text-xs">Integrated</p>
          </div>
        </div>
      </div>

      {/* Sense Progress List */}
      <div className="mb-3 pb-3 border-b border-gray-700">
        <p className="text-xs text-gray-500 mb-2">Sense Progress</p>
        <div className="space-y-1">
          {Array.from(senseProgress.entries()).map(([senseId, progress]) => {
            const isExpanded = expandedSenses.has(senseId);
            const statusColor = {
              encoding: "text-blue-400",
              consolidating: "text-yellow-400",
              integrated: "text-green-400",
            }[progress.integration_status];

            return (
              <div
                key={senseId}
                className="bg-gray-800 rounded p-2 cursor-pointer hover:bg-gray-750"
                onClick={() => toggleSense(senseId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-mono text-gray-300">
                      {senseId}
                    </p>
                    <p className={`text-xs font-mono ${statusColor}`}>
                      {getSummary(progress)}
                    </p>
                  </div>
                  <div className="text-xs">
                    {getIntegrationPercentage(progress)}%
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-500 space-y-1">
                    <p>
                      stage1_encounters: {progress.stage1_encounters} /{" "}
                      {INTEGRATION_THRESHOLDS.encoding_to_consolidating.stage1_encounters}{" "}
                      (→ consolidating)
                    </p>
                    <p>
                      stage2_overrides: {progress.stage2_overrides} /
                      {
                        INTEGRATION_THRESHOLDS.consolidating_to_integrated
                          .stage2_overrides
                      }
                    </p>
                    <p>
                      stage3_successes: {progress.stage3_successes} /
                      {INTEGRATION_THRESHOLDS.fully_integrated.stage3_successes}
                    </p>
                    <p>
                      total_weighted_score: {progress.total_weighted_score} /
                      {INTEGRATION_THRESHOLDS.fully_integrated.weighted_score}
                    </p>
                    <p>
                      last_encounter_at:{" "}
                      {new Date(progress.last_encounter_at).toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleExport}
          className="flex-1 py-1 px-2 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded border border-gray-600"
        >
          Export
        </button>
        <button
          onClick={handleClear}
          className="flex-1 py-1 px-2 text-xs bg-red-900 hover:bg-red-800 text-red-200 rounded border border-red-700"
        >
          Clear
        </button>
      </div>

      {/* Help */}
      <p className="mt-3 text-xs text-gray-600 text-center">
        Data auto-refreshes every 500ms • Press Ctrl+D to toggle
      </p>
    </div>
  );
}
