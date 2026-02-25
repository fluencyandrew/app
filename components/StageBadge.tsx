"use client";

import { Stage } from "@/data/domain";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StageBadgeProps {
  stage: Stage;
}

export function StageBadge({ stage }: StageBadgeProps) {
  const stageLabels: Record<Stage, string> = {
    1: "Lexical Foundation",
    2: "Pragmatic Integration",
    3: "Production Excellence",
  };

  const stageDescriptions: Record<Stage, string> = {
    1: "Focus on learning lexical items and their basic usage patterns",
    2: "Integrate pragmatic understanding and contextual awareness",
    3: "Demonstrate production excellence with fluent, nuanced responses",
  };

  const getStageColor = (s: Stage) => {
    switch (s) {
      case 1:
        return "border-strategic-green/60 text-strategic-green bg-strategic-green/10";
      case 2:
        return "border-precision-blue/60 text-precision-blue bg-precision-blue/10";
      case 3:
        return "border-authority-purple/60 text-authority-purple bg-authority-purple/10";
      default:
        return "";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={`text-xs font-bold tracking-widest uppercase h-8 px-3 cursor-help transition-all duration-200 ${getStageColor(
              stage
            )}`}
          >
            Stage {stage}: {stageLabels[stage]}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="text-xs max-w-xs">{stageDescriptions[stage]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}