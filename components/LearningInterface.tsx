"use client";

import { ExerciseViewModel } from "@/data/domain";
import { ConversationPanel } from "./ConversationPanel";
import { ControlPanel } from "./ControlPanel";

interface LearningInterfaceProps {
  exercise: ExerciseViewModel;
  onSelectOption?: (senseId: string) => void;
  selectedOptionId?: string;
  score?: number;
  currentExercise?: number;
  totalExercises?: number;
}

export function LearningInterface({
  exercise,
  onSelectOption,
  selectedOptionId,
  score = 85,
  currentExercise = 1,
  totalExercises = 12,
}: LearningInterfaceProps) {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <ConversationPanel
        exercise={exercise}
        onSelectOption={onSelectOption}
        selectedOptionId={selectedOptionId}
      />
      <ControlPanel
        exercise={exercise}
        score={score}
        currentExercise={currentExercise}
        totalExercises={totalExercises}
      />
    </div>
  );
}
