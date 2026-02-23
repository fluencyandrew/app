"use client";

import { useState, useRef, useEffect } from "react";
import { MultiChoiceExercise } from "@/data/exercises";
import { createSparkEffect } from "@/components/SparkAnimation";

interface FeedbackState {
  type: "correct" | "incorrect" | null;
  interlocutorReaction: string;
  alignment: string;
  signal: string;
}

interface ExerciseCardProps {
  exercise: MultiChoiceExercise;
  stage: number;
  onContinue: () => void;
  onPointsChange: (delta: number) => void;
  onCorrectAnswered?: (senseId?: string) => void;
  userAvatarUrl?: string;
  interlocutorAvatarUrl?: string;
}

export default function ExerciseCard({
  exercise,
  stage,
  onContinue,
  onPointsChange,
  onCorrectAnswered,
  userAvatarUrl,
  interlocutorAvatarUrl,
}: ExerciseCardProps) {
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  // track whether points have been awarded for this exercise
  const [pointsAwarded, setPointsAwarded] = useState(false);
  const [showPill, setShowPill] = useState(false);
  const [showMergeAnimation, setShowMergeAnimation] = useState(false);
  const [highlightPhrase, setHighlightPhrase] = useState<{ text: string; type: "correct" | "incorrect" | null }>({ text: "", type: null });
  const [feedback, setFeedback] = useState<FeedbackState>({
    type: null,
    interlocutorReaction: "",
    alignment: "",
    signal: "",
  });
  const [sent, setSent] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);

  const optionPhrases = exercise.optionPhrases || exercise.options;
  
  // Filter out placeholder - only show alternates
  const alternates = optionPhrases.filter(p => p !== exercise.placeholder);

  // determine communication medium from context background text
  const lowerBg = exercise.context.background.toLowerCase();
  const medium: "email" | "message" | "faceToFace" | "chat" =
    lowerBg.includes("email")
      ? "email"
      : lowerBg.includes("message")
      ? "message"
      : lowerBg.includes("face")
      ? "faceToFace"
      : "chat";

  // Reset highlight after animation completes
  useEffect(() => {
    if (highlightPhrase.type === "correct") {
      const timer = setTimeout(() => setHighlightPhrase({ text: "", type: null }), 1500);
      return () => clearTimeout(timer);
    }
  }, [highlightPhrase.type]);

  const handleOptionClick = (choice: string) => {
    if (sent) return; // Can't change after sending

    setCurrentSelection(choice);
    // Don't show pill yet - only show when sending
    setShowPill(false);

    // Show feedback (interlocutor reaction, alignment, signal) but NOT the pill yet
    if (choice === exercise.correct) {
      setFeedback({
        type: "correct",
        interlocutorReaction: exercise.feedback.correct.interlocutorReaction,
        alignment: exercise.feedback.correct.alignment,
        signal: exercise.feedback.correct.signal,
      });
      if (exercise.scenarioHighlight) {
        setHighlightPhrase({ text: exercise.scenarioHighlight, type: "correct" });
      }
    } else {
      setFeedback({
        type: "incorrect",
        interlocutorReaction: exercise.feedback.incorrect.interlocutorReaction,
        alignment: exercise.feedback.incorrect.alignment,
        signal: exercise.feedback.incorrect.signal,
      });
      if (exercise.scenarioHighlight) {
        setHighlightPhrase({ text: exercise.scenarioHighlight, type: "incorrect" });
      }
    }
  };

  const handleSend = () => {
    if (!sent) {
      // award points now that user has committed
      if (currentSelection && !pointsAwarded) {
        const delta = currentSelection === exercise.correct ? 1 : -1;
        onPointsChange(delta);
        setPointsAwarded(true);
      }
    }

    setSent(true);
    // NOW show the pill when sending
    setShowPill(true);
    
    // Trigger spark animation when sending if correct
    if (currentSelection === exercise.correct && stage === 1 && pillRef.current) {
      const rect = pillRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      createSparkEffect(x, y, 12);
      setTimeout(() => setShowMergeAnimation(true), 100);
    }

    // Trigger callback for correct answer if sent with correct selection
    if (currentSelection === exercise.correct && onCorrectAnswered) {
      onCorrectAnswered(exercise.senseId);
    }
  };

  const displayedPhrase = currentSelection || exercise.placeholder || alternates[0];
  const isCorrectSelection = currentSelection === exercise.correct;

  return (
    <div className="w-full space-y-6">
      {/* Situation Description - At the top */}
      <div className="text-left">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Situation</h3>
        <p className="text-base text-gray-800 leading-relaxed text-left">
          {exercise.scenario}
        </p>
      </div>

      {/* User Avatar and Roles - Below situation */}
      <div className="flex items-center justify-between gap-8 py-4 border-b border-gray-200">
        {/* Interlocutor (Left) */}
        <div className="flex items-center space-x-3">
          {interlocutorAvatarUrl ? (
            <img
              src={interlocutorAvatarUrl}
              alt="interlocutor"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
          )}
          <div className="text-left">
            <p className="font-medium text-gray-900">{exercise.context.interlocutor}</p>
            <p className="text-sm text-gray-600">{exercise.context.interlocutorGoal}</p>
          </div>
        </div>

        {/* User (Right) */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="font-medium text-gray-900">{exercise.context.userRole || "You"}</p>
            <p className="text-sm text-gray-600">{exercise.context.userGoal}</p>
          </div>
          {userAvatarUrl ? (
            <img
              src={userAvatarUrl}
              alt="you"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
          )}
        </div>
      </div>

      {/* Initial Dialogue from Interlocutor */}
      {exercise.context.initialDialogue && (
        <div className={`flex items-start space-x-4 ${
          medium === "faceToFace" ? "space-x-6" : ""
        }`}
        >
          <div
            className="flex-1 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 shadow-md float-effect"
          >
            <p className="text-base text-gray-800 leading-relaxed text-left">
              {exercise.context.initialDialogue.split(new RegExp(`(${highlightPhrase.text})`, "gi")).map((part, idx) =>
                part.toLowerCase() === highlightPhrase.text.toLowerCase() ? (
                  <span
                    key={idx}
                    className={`font-semibold px-2 py-1 rounded transition-all duration-300 ${
                      highlightPhrase.type === "correct"
                        ? "bg-green-300 text-green-900 glow-blue"
                        : highlightPhrase.type === "incorrect"
                        ? "bg-red-300 text-red-900"
                        : ""
                    }`}
                  >
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </p>
          </div>
        </div>
      )}



      {/* Exercise Card */}
      <div className="space-y-6">
        {/* Pill - appears when option selected - In a box */}
        {stage === 1 && showPill && exercise.pill && (
          <div ref={pillRef} className="inline-block">
            <span
              className={`inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-sm font-bold text-blue-700 rounded-lg border-2 border-blue-400 transition-all animate-fade-in ${
                showMergeAnimation
                  ? "pill-merge scale-110 shadow-lg"
                  : "shadow-md"
              }`}
            >
              {exercise.pill}
            </span>
          </div>
        )}

        {/* Reply section (user side) - with send button inline */}
        <div className={`flex items-start space-x-4 ${
          medium === "faceToFace" ? "space-x-6" : ""
        } justify-end`}>
          <div className="flex-1 max-w-md">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 backdrop-blur-sm rounded-xl rounded-tr-none border border-blue-400 shadow-md float-effect">
              <p className="text-base text-white leading-relaxed font-medium">
                {exercise.prompt.split("______").map((part, idx, arr) => (
                  <span key={idx}>
                    {part}
                    {idx < arr.length - 1 && (
                      <span className="px-2 py-1 mx-1 bg-white/30 text-white rounded font-bold border border-white/50">
                        {displayedPhrase}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
            {!sent && (
              <button
                onClick={handleSend}
                disabled={sent}
                className={`mt-3 w-full px-4 py-2 rounded-lg transition-all font-semibold shadow-md ${
                  sent
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : isCorrectSelection
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-lg"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:shadow-lg"
                }`}
              >
                {sent ? "Sent" : "Send"}
              </button>
            )}
          </div>
        </div>

        {/* Option Phrases - Interactive items to switch into placeholder */}
        <div className="space-y-3">
          <p className="text-xs text-gray-600 font-semibold">Choose an option to replace the placeholder:</p>
          {alternates.map((phrase) => (
            <button
              key={phrase}
              onClick={() => handleOptionClick(phrase)}
              disabled={sent}
              className={`w-full p-3 text-left rounded-lg border-2 transition-all font-medium text-sm shadow-sm ${
                currentSelection === phrase
                  ? phrase === exercise.correct
                    ? "bg-green-100 border-green-400 text-green-900 shadow-md"
                    : "bg-red-100 border-red-400 text-red-900 shadow-md"
                  : sent
                  ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:shadow-md cursor-pointer"
              }`}
            >
              {phrase}
            </button>
          ))}
        </div>

        {/* Feedback - Only show after sent */}
        {sent && feedback.type && (
          <div>
            {/* Interlocutor's reaction as dialogue box */}
            <div className={`flex items-start space-x-4 ${
              medium === "faceToFace" ? "space-x-6" : ""
            }`}>
              <div className="flex-1 max-w-md">
                <div className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 shadow-md float-effect">
                  <p className="text-base text-gray-800 leading-relaxed font-medium italic">
                    "{feedback.interlocutorReaction}"
                  </p>
                </div>
              </div>
            </div>

            {/* Alignment and Signal feedback */}
            <div className="mt-4 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl shadow-md">
              <div
                className={`p-4 rounded-lg border-2 ${
                  feedback.type === "correct"
                    ? "bg-green-100 border-green-400"
                    : "bg-amber-100 border-amber-400"
                }`}
              >
                <p
                  className={`font-semibold mb-2 ${
                    feedback.type === "correct"
                      ? "text-green-900"
                      : "text-amber-900"
                  }`}
                >
                  {feedback.alignment}
                </p>
                <p
                  className={
                    feedback.type === "correct"
                      ? "text-green-800"
                      : "text-amber-800"
                  }
                >
                  {feedback.signal}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button - only after sent */}
        {sent && (
          <button
            onClick={onContinue}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all font-semibold shadow-md hover:shadow-lg"
          >
            Continue
          </button>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .pill-merge {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
