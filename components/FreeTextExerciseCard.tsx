"use client";

import { useState, useEffect } from "react";
import { FreeTextExercise } from "@/data/exercises";

interface FreeTextExerciseCardProps {
  exercise: FreeTextExercise;
  onContinue: () => void;
}

export default function FreeTextExerciseCard({
  exercise,
  onContinue,
}: FreeTextExerciseCardProps) {
  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(exercise.timeSeconds);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const checkAnswer = (response: string): boolean => {
    const lowerResponse = response.toLowerCase();
    return exercise.requiredWords.every((word) =>
      lowerResponse.includes(word.toLowerCase())
    );
  };

  const handleSubmit = () => {
    const correct = checkAnswer(text);
    setIsCorrect(correct);
    setSubmitted(true);
  };

  const textIsCorrect = submitted && isCorrect;
  const isTimeUp = timeLeft === 0;

  return (
    <div className="w-full space-y-6">
      {/* Situation Description - Only show if NO initial dialogue */}
      {!exercise.context?.initialDialogue && (
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Situation</h3>
          <p className="text-base text-gray-800 leading-relaxed text-left">
            {exercise.prompt}
          </p>
        </div>
      )}

      {/* User Avatar and Roles - Below situation */}
      {exercise.context && (
        <div className="flex items-center justify-between gap-8 py-4 border-b border-gray-200">
          {/* Interlocutor (Left) */}
          <div className="flex items-center space-x-3">
            {exercise.context.interlocutorAvatarUrl ? (
              <img
                src={exercise.context.interlocutorAvatarUrl}
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
            {exercise.context.userAvatarUrl ? (
              <img
                src={exercise.context.userAvatarUrl}
                alt="you"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-full" />
            )}
          </div>
        </div>
      )}

      {/* Initial Dialogue from Interlocutor */}
      {exercise.context?.initialDialogue && (
        <div className={`flex items-start space-x-4`}>
          <div
            className="flex-1 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 shadow-md float-effect"
          >
            <p className="text-base text-gray-800 leading-relaxed text-left">
              {exercise.context.initialDialogue}
            </p>
          </div>
        </div>
      )}

      {/* Timer */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
        <span className="text-sm font-semibold text-gray-700">Time remaining:</span>
        <span
          className={`text-3xl font-bold font-mono ${
            timeLeft <= 2 ? "text-red-600" : "text-blue-600"
          }`}
        >
          {timeLeft}s
        </span>
      </div>

      {/* User's Text Input - Displayed as dialogue bubble */}
      <div className="flex items-end justify-end space-x-4 space-x-reverse">
        <div className="flex-1 max-w-md">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitted}
            placeholder="Type your response..."
            className={`w-full p-4 rounded-lg rounded-tr-none border-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white placeholder-blue-200 transition-all font-medium shadow-md ${
              submitted
                ? isCorrect
                  ? "border-green-400"
                  : "border-red-400"
                : "border-blue-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
            }`}
            rows={5}
          />
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={!text.trim() || isTimeUp}
              className={`mt-3 w-full py-3 px-4 rounded-lg transition-all font-semibold shadow-md ${
                text.trim() && !isTimeUp
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isTimeUp ? "Time up" : "Submit"}
            </button>
          )}
        </div>
      </div>

      {/* Feedback */}
      {submitted && (
        <div
          className={`p-4 rounded-lg border-2 ${
            isCorrect
              ? "bg-green-100 border-green-400"
              : "bg-red-100 border-red-400"
          }`}
        >
          <p
            className={`font-semibold mb-2 ${
              isCorrect ? "text-green-900" : "text-red-900"
            }`}
          >
            {isCorrect ? "Goal alignment: ✅" : "Goal alignment: ❌"}
          </p>
          <p
            className={
              isCorrect ? "text-green-800" : "text-red-800"
            }
          >
            {isCorrect
              ? "Response includes required elements"
              : `Response must include: ${exercise.requiredWords.join(", ")}`}
          </p>
        </div>
      )}

      {/* Continue Button (only visible if submitted and correct) */}
      {submitted && (
        <button
          onClick={onContinue}
          disabled={!textIsCorrect}
          className={`w-full py-3 px-4 rounded-lg transition-all font-semibold shadow-md ${
            textIsCorrect
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      )}
    </div>
  );
}
