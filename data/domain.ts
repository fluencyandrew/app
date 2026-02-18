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
// SENSE (Placeholder + Variants)
// ============================================

export interface Sense {
  id: string; // e.g., "reach-out", "chase-up", "contact"
  cluster_id: string;
  
  // Core definition
  base_word: string; // e.g., "contact", "reach out", "chase up"
  full_form_template: string; // e.g., "reach out to {object}"
  is_placeholder: boolean; // true only for base/neutral variant
  
  // Linguistic features
  requires_object: boolean; // Does it need direct object?
  rhythmic_pattern?: string; // e.g., "chase THEM up" (syllable stress)
  difficulty_level: number; // 1-5
  
  // Metadata
  created_at: Date;
}

// ============================================
// PILL (Situational Activation Signature)
// ============================================

export interface Pill {
  id: string;
  sense_id: string; // 1:1 mapping - each sense has one pill
  
  // Situational context
  role_hierarchy: string; // e.g., "Peer initiation", "Accountability pressure"
  speaker_goal: string; // e.g., "Reopen communication without urgency"
  interlocutor_goal: string; // e.g., "Maintain autonomy"
  participant_structure: string; // e.g., "1-to-1 external", "team async"
  
  // Psychological features
  emotional_temperature: TemperatureLevel; // neutral | softened | urgent
  temporal_condition: TemporalCondition; // neutral | delayed_response | preemptive
  
  // Communication outcome
  communicative_effect: string; // "Non-imposing, relationship-aware"
  status_signal: string; // "Warm opening" or "Accountable follow-up"
  
  created_at: Date;
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
  
  // Map sense_id -> pill
  pills: Record<string, Pill>; // e.g., { "reach-out": {...}, "chase-up": {...} }
  
  base_placeholder_sense_id: string; // The neutral/fluent baseline
  
  created_at: Date;
}

// ============================================
// EXERCISE OPTION (Stage 1 & 2)
// ============================================

export interface ExerciseOption {
  id: string;
  exercise_id: string;
  sense_id: string; // Which sense does this option represent?
  display_text: string; // Full replacement unit (what user sees)
  is_correct: boolean;
  is_distractor?: boolean; // Stage 2 only: marks unrelated option
}

// ============================================
// EXERCISE (Stage-Specific Instance)
// ============================================

export interface Exercise {
  id: string;
  cluster_id: string;
  
  // Metadata
  stage: Stage; // 1, 2, or 3
  exercise_type: ExerciseType; // contrast | constraint | override | production
  
  // Scenario / Context
  prompt_text: string; // Fill-in-the-blank: "I'd like to ______ regarding..."
  background_context: string; // "Email sent last month about non-urgent proposal..."
  user_role: string; // e.g., "Project Manager"
  interlocutor_role: string; // e.g., "External Consultant"
  
  // Stage 1 & 2: Multiple choice
  options?: ExerciseOption[]; // Only for stages 1 & 2
  visible_pill_id?: string; // Stage 1 only: show this pill
  
  // Stage 3: Free text
  timer_seconds?: number; // e.g., 5
  required_words?: string[]; // e.g., ["chase", "up"]
  regex_pattern?: string; // e.g., /chase\s+(it|them)\s+up/i
  
  // Feedback
  feedback: {
    correct: {
      interlocutor_reaction: string;
      alignment: string;
      signal: string;
    };
    incorrect: {
      interlocutor_reaction: string;
      alignment: string;
      signal: string;
    };
  };
  
  created_at: Date;
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
