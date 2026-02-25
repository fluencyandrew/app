"use client";

import { useState } from "react";
import { ExerciseViewModel } from "@/data/domain";
import { ConversationPanel } from "./ConversationPanel";
import { ControlPanel } from "./ControlPanel";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

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
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Main Content Area - Desktop: 70%, Mobile: 100% */}
      <div className="flex-1 flex flex-col lg:flex-row min-w-0 relative">
        {/* Conversation Panel */}
        <div className="flex-1 min-w-0 lg:w-[70%] flex flex-col">
          {/* Mobile Control Panel Toggle */}
          <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
            <h1 className="text-sm font-semibold text-foreground">Simulation</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobilePanel(true)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          <ConversationPanel
            exercise={exercise}
            onSelectOption={onSelectOption}
            selectedOptionId={selectedOptionId}
          />
        </div>

        {/* Control Panel - Desktop: 30%, Always visible */}
        <div className="hidden lg:flex lg:w-[30%] border-l border-border/50 bg-gradient-to-b from-background via-background to-background/80">
          <ControlPanel
            exercise={exercise}
            score={score}
            currentExercise={currentExercise}
            totalExercises={totalExercises}
          />
        </div>
      </div>

      {/* Mobile Control Panel - Sheet from right */}
      <Sheet open={showMobilePanel} onOpenChange={setShowMobilePanel}>
        <SheetContent
          side="right"
          className="w-full sm:w-[90vw] flex flex-col bg-gradient-to-b from-background via-background to-background/80"
        >
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base">Simulation Controls</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-hidden">
            <ControlPanel
              exercise={exercise}
              score={score}
              currentExercise={currentExercise}
              totalExercises={totalExercises}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
