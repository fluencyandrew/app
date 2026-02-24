"use client";

interface ProgressMeterProps {
  current?: number;
  total?: number;
}

export function ProgressMeter({ current = 3, total = 12 }: ProgressMeterProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-pill-meta uppercase">Progress</span>
        <span className="text-conversation font-semibold text-precision-blue">
          {current}/{total}
        </span>
      </div>
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-border">
        <div
          className="h-full bg-gradient-to-r from-precision-blue to-strategic-green transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
