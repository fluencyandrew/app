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
    <div className="conversation-container">
      {/* Conversation Thread - Scrollable */}
      <ConversationThread messages={exercise.messages} />

      {/* Response Options - Fixed at bottom */}
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
