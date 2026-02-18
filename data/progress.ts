/**
 * PROGRESS TRACKING - User Progress Management
 * 
 * Handles calculation and updates of user progress:
 * - Weighted scoring (Stage 1: +1, Stage 2: +2, Stage 3: +3)
 * - Integration status state machine (ENCODING -> CONSOLIDATING -> INTEGRATED)
 * - Sense encountering and override tracking
 */

import type { UserSenseProgress } from "@/data/domain";
import { saveSenseProgress } from "@/data/storage";

// ============================================
// SCORING CONSTANTS
// ============================================

export const SCORE_WEIGHTS = {
  stage1: 1, // Noticing exercises
  stage2: 2, // Retrieval exercises
  stage3: 3, // Automation exercises
} as const;

// ============================================
// TRANSITION THRESHOLDS
// ============================================

export const INTEGRATION_THRESHOLDS = {
  // ENCODING -> CONSOLIDATING: Need 3 Stage 1 encounters (solid noticing)
  encoding_to_consolidating: {
    stage1_encounters: 3,
  },

  // CONSOLIDATING -> INTEGRATED: Need >=2 Stage 2 overrides AND score >= 6
  consolidating_to_integrated: {
    stage2_overrides: 2,
    weighted_score: 6,
  },

  // Full INTEGRATED status: Score >= 12 AND >=2 Stage 3 successes
  fully_integrated: {
    stage3_successes: 2,
    weighted_score: 12,
  },
} as const;

// ============================================
// PROGRESS UPDATE FUNCTIONS
// ============================================

/**
 * Record a Stage 1 correct answer
 */
export function recordStage1Success(progress: UserSenseProgress): UserSenseProgress {
  const updated = { ...progress };

  updated.stage1_encounters += 1;
  updated.total_weighted_score += SCORE_WEIGHTS.stage1;
  updated.last_encounter_at = new Date();

  // Check for state transition
  if (
    updated.integration_status === "encoding" &&
    updated.stage1_encounters >= INTEGRATION_THRESHOLDS.encoding_to_consolidating.stage1_encounters
  ) {
    updated.integration_status = "consolidating";
  }

  saveSenseProgress(updated);
  return updated;
}

/**
 * Record a Stage 2 successful override (not just correct answer)
 * This is called when user must select the precision variant over the placeholder
 */
export function recordStage2Override(progress: UserSenseProgress): UserSenseProgress {
  const updated = { ...progress };

  updated.stage2_overrides += 1;
  updated.total_weighted_score += SCORE_WEIGHTS.stage2;
  updated.last_encounter_at = new Date();

  // Check for state transition: CONSOLIDATING -> INTEGRATED (if score threshold hit)
  if (
    updated.integration_status === "consolidating" &&
    updated.stage2_overrides >= INTEGRATION_THRESHOLDS.consolidating_to_integrated.stage2_overrides &&
    updated.total_weighted_score >= INTEGRATION_THRESHOLDS.consolidating_to_integrated.weighted_score
  ) {
    updated.integration_status = "integrated";
  }

  saveSenseProgress(updated);
  return updated;
}

/**
 * Record a Stage 3 successful production (timed free-text)
 * Production success requires recalling the sense under pressure
 */
export function recordStage3Success(progress: UserSenseProgress): UserSenseProgress {
  const updated = { ...progress };

  updated.stage3_successes += 1;
  updated.total_weighted_score += SCORE_WEIGHTS.stage3;
  updated.last_encounter_at = new Date();

  // Stage 3 success contributes to full integration
  // (full integration requires >=2 Stage 3 successes AND score 12+)
  if (
    updated.total_weighted_score >= INTEGRATION_THRESHOLDS.fully_integrated.weighted_score &&
    updated.stage3_successes >= INTEGRATION_THRESHOLDS.fully_integrated.stage3_successes
  ) {
    updated.integration_status = "integrated";
  }

  saveSenseProgress(updated);
  return updated;
}

/**
 * Get a human-readable progress summary
 */
export function getSummary(progress: UserSenseProgress): string {
  return `Stage1(${progress.stage1_encounters}) Stage2(${progress.stage2_overrides}) Stage3(${progress.stage3_successes}) Score(${progress.total_weighted_score}/${INTEGRATION_THRESHOLDS.fully_integrated.weighted_score}) Status(${progress.integration_status.toUpperCase()})`;
}

/**
 * Calculate percentage progress towards full integration
 */
export function getIntegrationPercentage(progress: UserSenseProgress): number {
  const maxScore = INTEGRATION_THRESHOLDS.fully_integrated.weighted_score;
  return Math.min(100, Math.round((progress.total_weighted_score / maxScore) * 100));
}

/**
 * Determine if sense is unlocked (available for Stage 2)
 * A sense is unlocked when it reaches CONSOLIDATING or INTEGRATED status
 */
export function isSenseUnlocked(progress: UserSenseProgress): boolean {
  return progress.integration_status !== "encoding";
}

/**
 * Determine if a sense should be presented as a precision variant in Stage 2+
 * vs showing the placeholder option
 */
export function shouldPresentAsPrecisionVariant(progress: UserSenseProgress): boolean {
  // In Stage 2, show precision variant (not placeholder) if unlocked
  return progress.integration_status !== "encoding";
}
