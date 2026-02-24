/**
 * DOMAIN MODEL - Following Technical Implementation Blueprint
 * 
 * This file defines the core types that align with the relational schema:
 * - Clusters (lexical fields)
 * - Senses (placeholder + variants)
 * - Pills (situational activation signatures)
 * - Exercises (stage-specific instances)
 * - User Progress (integration tracking)
 */

// ============================================
// BASIC TYPES
// ============================================

export type Stage = 1 | 2 | 3;
export type ExerciseType = "contrast" | "constraint" | "override" | "production";
export type IntegrationStatus = "encoding" | "consolidating" | "integrated";
export type GoalAlignment = "success" | "partial" | "fail";
export type TemperatureLevel = "neutral" | "softened" | "urgent";
export type TemporalCondition = "neutral" | "delayed_response" | "preemptive";

// ============================================
// MESSAGE (Conversation rendering)
// ============================================

export interface Message {
  id: string;
  role: "user" | "interlocutor" | "system";
  content: string;
  avatarUrl?: string;
  roleLabel?: string;
}

// ============================================
// SENSE (Placeholder + Variants)
// ============================================

export interface Sense {
  id: string; // e.g., "reach-out", "chase-up", "contact"
  clusterId: string;
  
  // Core definition
  baseWord: string; // e.g., "contact", "reach out", "chase up"
  fullFormTemplate: string; // e.g., "reach out to {object}"
  isPlaceholder: boolean; // true only for base/neutral variant
  
  // Linguistic features
  requiresObject: boolean; // Does it need direct object?
  rhythmicPattern?: string; // e.g., "chase THEM up" (syllable stress)
  difficultyLevel: number; // 1-5
  
  // Metadata
  createdAt: Date;
  
  // Pill association (optional)
  pill?: Pill;
}

// ============================================
// PILL (Situational Activation Signature)
// ============================================

export interface Pill {
  id: string;
  senseId: string; // 1:1 mapping - each sense has one pill
  
  // Situational context
  roleHierarchy: string; // e.g., "Peer initiation", "Accountability pressure"
  speakerGoal: string; // e.g., "Reopen communication without urgency"
  interlocutorGoal: string; // e.g., "Maintain autonomy"
  participantStructure: string; // e.g., "1-to-1 external", "team async"
  
  // Psychological features
  emotionalTemperature: TemperatureLevel; // neutral | softened | urgent
  temporalCondition: TemporalCondition; // neutral | delayed_response | preemptive
  
  // Communication outcome
  communicativeEffect: string; // "Non-imposing, relationship-aware"
  statusSignal: string; // "Warm opening" or "Accountable follow-up"
  
  createdAt: Date;
}

// ============================================
// CLUSTER (Lexical Field)
// ============================================

export interface Cluster {
  id: string;
  name: string; // e.g., "CONTACT"
  description: string;
  
  // All senses in this cluster (includes placeholder)
  senses: Sense[];
  
  // Map senseId -> pill
  pills: Record<string, Pill>; // e.g., { "reach-out": {...}, "chase-up": {...} }
  
  basePlaceholderSenseId: string; // The neutral/fluent baseline
  
  createdAt: Date;
}

// ============================================
// EXERCISE OPTION (Stage 1 & 2)
// ============================================

export interface ExerciseOption {
  id: string;
  exerciseId: string;
  senseId: string; // Which sense does this option represent?
  displayText: string; // Full replacement unit (what user sees)
  isCorrect: boolean;
  isDistractor?: boolean; // Stage 2 only: marks unrelated option
}

// ============================================
// EXERCISE (Stage-Specific Instance)
// ============================================

export interface Exercise {
  id: string;
  clusterId: string;
  
  // Metadata
  stage: Stage; // 1, 2, or 3
  exerciseType: ExerciseType; // contrast | constraint | override | production
  
  // Scenario / Context
  promptText: string; // Fill-in-the-blank: "I'd like to ______ regarding..."
  backgroundContext: string; // "Email sent last month about non-urgent proposal..."
  userRole: string; // e.g., "Project Manager"
  interlocutorRole: string; // e.g., "External Consultant"
  
  // Stage 1 & 2: Multiple choice
  options?: ExerciseOption[]; // Only for stages 1 & 2
  visiblePillId?: string; // Stage 1 only: show this pill
  
  // Stage 3: Free text
  timerSeconds?: number; // e.g., 5
  requiredWords?: string[]; // e.g., ["chase", "up"]
  regexPattern?: string; // e.g., /chase\s+(it|them)\s+up/i
  
  // Feedback
  feedback: {
    correct: {
      interlocutorReaction: string;
      alignment: string;
      signal: string;
    };
    incorrect: {
      interlocutorReaction: string;
      alignment: string;
      signal: string;
    };
  };
  
  createdAt: Date;
}

// ============================================
// ATTEMPT (User Interaction)
// ============================================

export interface Attempt {
  id: string;
  user_id: string;
  exercise_id: string;
  
  // Response
  selected_sense_id?: string; // For stages 1 & 2
  typed_response?: string; // For stage 3
  
  // Timing
  response_time_ms: number;
  
  // Evaluation
  is_correct: boolean;
  goal_alignment: GoalAlignment; // success | partial | fail
  override_detected?: boolean; // Stage 2 only: did they override placeholder?
  
  created_at: Date;
}

// ============================================
// USER SENSE PROGRESS (Integration Tracking)
// ============================================

export interface UserSenseProgress {
  id: string;
  user_id: string;
  sense_id: string;
  cluster_id: string;
  
  // Encounter counts
  stage1_encounters: number; // How many Stage 1 correct attempts
  stage2_overrides: number; // How many Stage 2 successful overrides (not just correct)
  stage3_successes: number; // How many Stage 3 correct productions
  
  // Scoring
  total_weighted_score: number; // Stage1(+1) + Stage2(+2) + Stage3(+3)
  
  // State machine
  integration_status: IntegrationStatus;
  // ENCODING -> (after 3 Stage 1) -> CONSOLIDATING -> (after >=2 Stage 2 overrides + score 6+) -> INTEGRATED (score 12+ AND >=2 Stage 3)
  
  // Timestamps
  last_encounter_at: Date;
  created_at: Date;
}

// ============================================
// CLUSTER SESSION (User's current session)
// ============================================

export interface ClusterSession {
  user_id: string;
  cluster_id: string;
  
  // Progress per sense
  sense_progress: Record<string, UserSenseProgress>; // senseid -> progress
  
  // Current exercise
  current_exercise_index: number;
  current_stage: Stage;
  
  // Metrics
  total_weighted_score: number;
  total_senses_integrated: number;
  total_senses_consolidating: number;
  total_senses_encoding: number;
}

// ============================================
// USER PROFILE
// ============================================

export interface User {
  id: string;
  email?: string;
  role_profile?: "corporate" | "academic" | "founder" | "student";
  created_at: Date;
}

// ============================================
// EXERCISE VIEW MODEL (Presentation Layer)
// ============================================

export interface ExerciseViewModel {
  stage: Stage;
  clusterName: string;
  messages: Message[];
  placeholderSentence: string;
  options?: Sense[];
  visiblePill?: Pill;
  timerSeconds?: number;
}
