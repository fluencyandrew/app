"use client";

import { useEffect, useState } from "react";

interface TimerBarProps {
  seconds?: number;
  onTimeUp?: () => void;
}

export function TimerBar({ seconds = 60, onTimeUp }: TimerBarProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining, onTimeUp]);

  const percentage = (remaining / seconds) * 100;
  const isLowTime = remaining < 10;

  return (
    <div className={`space-y-3 ${isLowTime ? "animate-timer-pulse" : ""}`}>
      <div className="flex justify-between items-center">
        <span className="text-pill-meta uppercase">Time</span>
        <span
          className={`text-conversation font-semibold ${
            isLowTime ? "text-caution-amber" : "text-precision-blue"
          }`}
        >
          {remaining}s
        </span>
      </div>
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border">
        <div
          className={`h-full transition-all duration-300 ${
            isLowTime
              ? "bg-caution-amber"
              : "bg-gradient-to-r from-precision-blue to-strategic-green"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
