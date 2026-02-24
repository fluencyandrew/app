"use client";

import { Stage } from "@/data/domain";

interface StageBadgeProps {
  stage: Stage;
}

export function StageBadge({ stage }: StageBadgeProps) {
  const stageLabels: Record<Stage, string> = {
    1: "Lexical Foundation",
    2: "Pragmatic Integration",
    3: "Production Excellence",
  };

  const stageColors: Record<Stage, string> = {
    1: "border-strategic-green",
    2: "border-precision-blue",
    3: "border-authority-purple",
  };

  return (
    <div className={`stage-badge ${stageColors[stage]}`}>
      Stage {stage}: {stageLabels[stage]}
    </div>
  );
}
