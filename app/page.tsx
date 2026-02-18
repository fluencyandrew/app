"use client";

import { useState, useEffect } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import FreeTextExerciseCard from "@/components/FreeTextExerciseCard";
import ProgressBar from "@/components/ProgressBar";
import SensesDropdown from "@/components/SensesDropdown";
import SparkAnimation from "@/components/SparkAnimation";
import DebugPanel from "@/components/DebugPanel";
import PointsCounter from "@/components/PointsCounter";
import SpeakerInfo from "@/components/SpeakerInfo";
import {
  exerciseSession,
  MultiChoiceExercise,
  FreeTextExercise,
  contactSenses,
  getTotalExerciseCount,
} from "@/data/exercises";
import { initializeUser, loadExerciseState, saveExerciseState } from "@/data/storage";
import type { ExerciseState } from "@/data/storage";

export default function Home() {
  const [stageIndex, setStageIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [unlockedSenses, setUnlockedSenses] = useState<Set<string>>(new Set());
  const [currentSensePill, setCurrentSensePill] = useState<typeof contactSenses["reach-out"] | null>(
    null
  );
  const [points, setPoints] = useState(0);
  const [mounted, setMounted] = useState(false);

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
  const currentExercise = currentStage.exercises[exerciseIndex];
  const stageNum = currentStage.stage;

  // Check if all stages are complete
  const isComplete = stageIndex >= exerciseSession.stages.length;

  const handlePointsChange = (delta: number) => {
    setPoints(prev => prev + delta);
  };

  const handleCorrectAnswered = (senseId?: string) => {
    // Only show sense pill on Stage 1
    if (stageNum === 1 && senseId && contactSenses[senseId]) {
      setUnlockedSenses((prev) => new Set([...prev, senseId]));
      setCurrentSensePill(contactSenses[senseId]);
    }
  };

  const handleContinue = () => {
    setCurrentSensePill(null); // Clear sense pill when moving to next exercise
    const nextExerciseIndex = exerciseIndex + 1;

    if (nextExerciseIndex < currentStage.exercises.length) {
      // Move to next exercise in current stage
      setExerciseIndex(nextExerciseIndex);
    } else {
      // Move to next stage
      const nextStageIndex = stageIndex + 1;
      if (nextStageIndex < exerciseSession.stages.length) {
        setStageIndex(nextStageIndex);
        setExerciseIndex(0);
      } else {
        // All stages complete
        setStageIndex(nextStageIndex);
      }
    }
  };

  const userContext = !isComplete && currentExercise && currentExercise.type === "multiChoice" 
    ? (currentExercise as MultiChoiceExercise).context
    : !isComplete && currentExercise && currentExercise.type === "freeText"
    ? (currentExercise as FreeTextExercise).context
    : undefined;

  // derive communication medium for container label
  const medium = userContext
    ? userContext.background.toLowerCase().includes("email")
      ? "Email"
      : userContext.background.toLowerCase().includes("message")
      ? "Message"
      : userContext.background.toLowerCase().includes("face")
      ? "Face-to-Face"
      : "Conversation"
    : "";
  const interlocutorRole = userContext?.interlocutor;
  const userRole = userContext?.userRole;
  const userAvatar = userContext?.userAvatarUrl;
  const interlocutorAvatar = userContext?.interlocutorAvatarUrl;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <SparkAnimation />
      <PointsCounter points={points} />
      
      {/* Header - stays at top */}
      <div className="w-full max-w-5xl mx-auto mb-8">
        <div className="text-center py-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Precision Language Training
          </h1>
          <p className="text-lg text-gray-600">CONTACT Cluster</p>
        </div>

        {/* Progress Bar */}
        {!isComplete && (
          <div className="mb-4">
            <ProgressBar current={currentExerciseNum} total={totalExercises} />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Exercise {currentExerciseNum} / {totalExercises}
            </p>
          </div>
        )}
      </div>

      {/* Main Content Container with glassmorphic styling */}
      {!isComplete && (
        <div className="w-full max-w-5xl mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 space-y-6">
          
          {/* Stage Label & medium header */}
          <div className="text-center space-y-2">
            {medium && (
              <div className="text-xs text-gray-600">
                {medium} style interaction
              </div>
            )}
            <div>
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-sm font-semibold text-blue-700 rounded-full border border-blue-200">
                Stage {stageNum}
              </span>
            </div>
          </div>

          {/* Exercise Content */}
          {currentExercise.type === "multiChoice" ? (
            <ExerciseCard
              key={`${stageIndex}-${exerciseIndex}`}
              exercise={currentExercise as MultiChoiceExercise}
              stage={stageNum}
              onContinue={handleContinue}
              onPointsChange={handlePointsChange}
              onCorrectAnswered={handleCorrectAnswered}
              userAvatarUrl={userAvatar}
              interlocutorAvatarUrl={interlocutorAvatar}
            />
          ) : (
            <FreeTextExerciseCard
              key={`${stageIndex}-${exerciseIndex}`}
              exercise={currentExercise as FreeTextExercise}
              onContinue={handleContinue}
            />
          )}
        </div>
      )}

      {/* Completion Screen */}
      {isComplete && (
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-12 text-center shadow-lg">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              🎉 Cluster Complete
            </h2>
            <p className="text-xl text-gray-700">
              You've mastered the CONTACT cluster!
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Precision Language Training • Draft 1</p>
      </div>

      {/* Senses Dropdown - Only show on Stage 1 */}
      {!isComplete && stageNum === 1 && <SensesDropdown sensePill={currentSensePill} unlockedSenses={unlockedSenses} />}
    </main>
  );
}
