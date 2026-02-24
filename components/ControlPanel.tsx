"use client";

import { ExerciseViewModel } from "@/data/domain";
import { StageBadge } from "./StageBadge";
import { ProgressMeter } from "./ProgressMeter";
import { PillCard } from "./PillCard";
import { ScoreCard } from "./ScoreCard";
import { TimerBar } from "./TimerBar";

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
    <div className="w-[30%] p-panel-pad flex flex-col gap-6 bg-surface/40 border-l border-border overflow-y-auto">
      <StageBadge stage={exercise.stage} />

      <ProgressMeter current={currentExercise} total={totalExercises} />

      {exercise.visiblePill && <PillCard pill={exercise.visiblePill} />}

      {exercise.timerSeconds && <TimerBar seconds={exercise.timerSeconds} />}

      <ScoreCard score={score} total={100} />

      {/* Cluster context */}
      <div className="bg-surface/50 border border-border rounded-lg p-bubble-pad">
        <div className="pill-label mb-2">Cluster</div>
        <div className="pill-value">{exercise.clusterName}</div>
      </div>
    </div>
  );
}
