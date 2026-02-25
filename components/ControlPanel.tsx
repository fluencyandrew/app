"use client";

import { ExerciseViewModel } from "@/data/domain";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StageBadge } from "./StageBadge";
import { ProgressMeter } from "./ProgressMeter";
import { PillCard } from "./PillCard";
import { ScoreCard } from "./ScoreCard";
import { TimerBar } from "./TimerBar";
import { Info } from "lucide-react";

interface ControlPanelProps {
  exercise: ExerciseViewModel;
  score?: number;
  currentExercise?: number;
  totalExercises?: number;
}

export function ControlPanel({
  exercise,
  score = 85,
  currentExercise = 1,
  totalExercises = 12,
}: ControlPanelProps) {
  return (
    <TooltipProvider>
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-6 p-6">
          {/* Stage Badge Section */}
          <div className="panel-section">
            <StageBadge stage={exercise.stage} />
          </div>

          <Separator className="bg-border/30" />

          {/* Progress Meter Section */}
          <div className="panel-section">
            <ProgressMeter current={currentExercise} total={totalExercises} />
          </div>

          {/* Active Pill Section */}
          {exercise.visiblePill && (
            <>
              <Separator className="bg-border/30" />
              <div className="panel-section">
                <PillCard pill={exercise.visiblePill} />
              </div>
            </>
          )}

          {/* Timer Section */}
          {exercise.timerSeconds && (
            <>
              <Separator className="bg-border/30" />
              <div className="panel-section">
                <TimerBar seconds={exercise.timerSeconds} />
              </div>
            </>
          )}

          {/* Score Card Section */}
          <Separator className="bg-border/30" />
          <div className="panel-section">
            <ScoreCard score={score} total={100} />
          </div>

          {/* Cluster Context Section */}
          <Separator className="bg-border/30" />
          <div className="panel-section">
            <div className="flex items-center gap-2 mb-3">
              <p className="section-label">Lexical Cluster</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  <p className="text-xs">
                    The lexical cluster defines the semantic space and contextual
                    boundaries for this simulation.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Card className="border-border/40 bg-card/50">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-foreground">
                  {exercise.clusterName}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
}
