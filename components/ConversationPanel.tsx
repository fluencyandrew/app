"use client";

import { ExerciseViewModel } from "@/data/domain";
import { ConversationThread } from "./ConversationThread";
import { ResponseOptions } from "./ResponseOptions";

interface ConversationPanelProps {
  exercise: ExerciseViewModel;
  onSelectOption?: (senseId: string) => void;
  selectedOptionId?: string;
}

export function ConversationPanel({
  exercise,
  onSelectOption,
  selectedOptionId,
}: ConversationPanelProps) {
  return (
    <div className="w-[70%] border-r border-border flex flex-col bg-background">
      <ConversationThread messages={exercise.messages} />
      {exercise.options && exercise.options.length > 0 && (
        <ResponseOptions
          options={exercise.options}
          onSelect={(option) => onSelectOption?.(option.id)}
          selectedId={selectedOptionId}
        />
      )}
    </div>
  );
}
