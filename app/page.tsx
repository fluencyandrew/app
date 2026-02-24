"use client";

import { useState, useEffect } from "react";
import { LearningInterface } from "@/components/LearningInterface";
import {
  exerciseSession,
  MultiChoiceExercise,
  FreeTextExercise,
  contactSenses,
  getTotalExerciseCount,
} from "@/data/exercises";
import { initializeUser, loadExerciseState, saveExerciseState } from "@/data/storage";
import type { ExerciseState } from "@/data/storage";
import type { ExerciseViewModel, Message } from "@/data/domain";

export default function Home() {
  const [stageIndex, setStageIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [unlockedSenses, setUnlockedSenses] = useState<Set<string>>(new Set());
  const [currentSensePill, setCurrentSensePill] = useState<typeof contactSenses["reach-out"] | null>(
    null
  );
  const [mounted, setMounted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string>();

  // Initialize user and load saved progress on mount
  useEffect(() => {
    initializeUser();
    const savedState = loadExerciseState();
    if (savedState) {
      setStageIndex(savedState.stageIndex);
      setExerciseIndex(savedState.exerciseIndex);
      setUnlockedSenses(new Set(savedState.unlockedSenses));
    }
    setMounted(true);
  }, []);

  // Save exercise state whenever it changes
  useEffect(() => {
    if (!mounted) return;
    const state: ExerciseState = {
      stageIndex,
      exerciseIndex,
      unlockedSenses: Array.from(unlockedSenses),
      currentSensePillId: currentSensePill ? currentSensePill.pill : undefined,
    };
    saveExerciseState(state);
  }, [stageIndex, exerciseIndex, unlockedSenses, currentSensePill, mounted]);

  // Calculate total exercises across all stages
  const totalExercises = getTotalExerciseCount();

  // Calculate current exercise number (1-indexed)
  let currentExerciseNum = 1;
  for (let i = 0; i < stageIndex; i++) {
    currentExerciseNum += exerciseSession.stages[i].exercises.length;
  }
  currentExerciseNum += exerciseIndex;

  // Get current stage and exercise
  const currentStage = exerciseSession.stages[stageIndex];
  const currentExercise = currentStage?.exercises[exerciseIndex];
  const stageNum = currentStage?.stage || 1;

  // Check if all stages are complete
  const isComplete = stageIndex >= exerciseSession.stages.length;

  // Build ExerciseViewModel from current exercise
  const buildExerciseViewModel = (): ExerciseViewModel | null => {
    if (!currentExercise) return null;

    const exercise = currentExercise as MultiChoiceExercise | FreeTextExercise;
    const context = "context" in exercise ? exercise.context : undefined;

    // Build messages from context
    const messages: Message[] = [];
    if (context?.userRole && context?.interlocutor) {
      if (context.initialDialogue) {
        messages.push({
          id: "system-context",
          role: "system",
          content: context.background,
          roleLabel: "Context",
        });
        messages.push({
          id: "initial-1",
          role: "interlocutor",
          content: context.initialDialogue,
          avatarUrl: context.interlocutorAvatarUrl,
          roleLabel: context.interlocutor,
        });
      } else {
        messages.push({
          id: "system-context",
          role: "system",
          content: context.background,
          roleLabel: "Context",
        });
        messages.push({
          id: "user-response",
          role: "user",
          content: exercise.type === "multiChoice" ? (exercise as MultiChoiceExercise).placeholder || "..." : "...",
          avatarUrl: context.userAvatarUrl,
          roleLabel: context.userRole,
        });
      }
    }

    // Get options for Stage 1 & 2
    let options = undefined;
    if (exercise.type === "multiChoice") {
      const mc = exercise as MultiChoiceExercise;
      options = mc.options.map((opt, idx) => ({
        id: `option-${idx}`,
        clusterId: "contact",
        baseWord: opt,
        fullFormTemplate: opt,
        isPlaceholder: false,
        requiresObject: true,
        difficultyLevel: stageNum,
        createdAt: new Date(),
        pill: currentSensePill?.pill ? {
          id: `pill-${idx}`,
          senseId: `sense-${idx}`,
          roleHierarchy: currentSensePill?.roleHierarchy || "Peer",
          speakerGoal: "",
          interlocutorGoal: "",
          participantStructure: currentSensePill?.pill || "",
          emotionalTemperature: "neutral" as const,
          temporalCondition: "neutral" as const,
          communicativeEffect: "",
          statusSignal: currentSensePill?.pill || "",
          createdAt: new Date(),
        } : undefined,
      }));
    }

    // Get visible pill for Stage 1
    const visiblePill = currentSensePill?.pill ? {
      id: "visible-pill",
      senseId: "sense-1",
      roleHierarchy: currentSensePill.roleHierarchy || "Peer",
      speakerGoal: "",
      interlocutorGoal: "",
      participantStructure: currentSensePill.pill || "",
      emotionalTemperature: "neutral" as const,
      temporalCondition: "neutral" as const,
      communicativeEffect: "",
      statusSignal: currentSensePill.pill || "",
      createdAt: new Date(),
    } : undefined;

    return {
      stage: stageNum as 1 | 2 | 3,
      clusterName: "CONTACT",
      messages,
      placeholderSentence: exercise.type === "multiChoice" ? (exercise as MultiChoiceExercise).placeholder || "..." : "...",
      options,
      visiblePill: stageNum === 1 ? visiblePill : undefined,
      timerSeconds: exercise.type === "freeText" ? (exercise as FreeTextExercise).timeSeconds : undefined,
    };
  };

  const viewModel = buildExerciseViewModel();

  const handleSelectOption = (senseId: string) => {
    setSelectedOptionId(senseId);
    // Handle scoring and progression here
    handleCorrectAnswered(senseId);
    setTimeout(() => handleContinue(), 500);
  };

  const handleCorrectAnswered = (senseId?: string) => {
    if (stageNum === 1 && senseId && contactSenses[senseId]) {
      setUnlockedSenses((prev) => new Set([...prev, senseId]));
      setCurrentSensePill(contactSenses[senseId]);
    }
  };

  const handleContinue = () => {
    setCurrentSensePill(null);
    setSelectedOptionId(undefined);
    const nextExerciseIndex = exerciseIndex + 1;

    if (nextExerciseIndex < currentStage.exercises.length) {
      setExerciseIndex(nextExerciseIndex);
    } else {
      const nextStageIndex = stageIndex + 1;
      if (nextStageIndex < exerciseSession.stages.length) {
        setStageIndex(nextStageIndex);
        setExerciseIndex(0);
      } else {
        setStageIndex(nextStageIndex);
      }
    }
  };

  if (!mounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-xl">
          <h2 className="text-4xl font-bold text-strategic-green mb-4">
            ✓ Cluster Complete
          </h2>
          <p className="text-foreground text-lg">
            You've achieved mastery of the CONTACT cluster.
          </p>
          <p className="text-muted text-sm mt-4">
            All {totalExercises} exercises completed successfully!
          </p>
        </div>
      </div>
    );
  }

  if (!viewModel) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-muted">No exercise available</p>
      </div>
    );
  }

  return (
    <LearningInterface
      exercise={viewModel}
      onSelectOption={handleSelectOption}
      selectedOptionId={selectedOptionId}
      score={85}
      currentExercise={currentExerciseNum}
      totalExercises={totalExercises}
    />
  );
}

