/**
 * STORAGE UTILITIES - localStorage Persistence
 * 
 * Handles client-side persistence of user progress using localStorage.
 * Provides utilities for saving and loading UserSenseProgress, session state, etc.
 */

import type {
  UserSenseProgress,
  ClusterSession,
  User,
} from "@/data/domain";

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_PREFIX = "precision-lang-";

const STORAGE_KEYS = {
  USER: `${STORAGE_PREFIX}user`,
  SENSE_PROGRESS: `${STORAGE_PREFIX}sense-progress`, // Map<sense_id, UserSenseProgress>
  CLUSTER_SESSION: `${STORAGE_PREFIX}cluster-session`, // Current session state
  EXERCISE_STATE: `${STORAGE_PREFIX}exercise-state`, // Current exercise index, stage, etc
} as const;

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ExerciseState {
  stageIndex: number;
  exerciseIndex: number;
  unlockedSenses: string[]; // List of sense IDs unlocked
  currentSensePillId?: string; // Pill shown in senses menu (Stage 1 only)
  completedAt?: Date;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Initialize localStorage if needed (check for existing user, create if not)
 */
export function initializeUser(userId?: string): User {
  const existingUser = loadUser();
  if (existingUser) {
    return existingUser;
  }

  const newUser: User = {
    id: userId || `user-${Date.now()}`,
    created_at: new Date(),
  };

  saveUser(newUser);
  return newUser;
}

/**
 * Load user profile from storage
 */
export function loadUser(): User | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (!stored) return null;

    const user = JSON.parse(stored) as User;
    return user;
  } catch (error) {
    console.error("Failed to load user:", error);
    return null;
  }
}

/**
 * Save user profile to storage
 */
export function saveUser(user: User): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user:", error);
  }
}

/**
 * Load all sense progress records
 */
export function loadSenseProgressMap(): Map<string, UserSenseProgress> {
  if (typeof window === "undefined") return new Map();

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SENSE_PROGRESS);
    if (!stored) return new Map();

    const data = JSON.parse(stored) as Record<string, UserSenseProgress>;
    return new Map(Object.entries(data));
  } catch (error) {
    console.error("Failed to load sense progress:", error);
    return new Map();
  }
}

/**
 * Save sense progress for a specific sense
 */
export function saveSenseProgress(progress: UserSenseProgress): void {
  if (typeof window === "undefined") return;

  try {
    const map = loadSenseProgressMap();
    map.set(progress.sense_id, progress);

    const data = Object.fromEntries(map);
    localStorage.setItem(STORAGE_KEYS.SENSE_PROGRESS, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save sense progress:", error);
  }
}

/**
 * Get or initialize UserSenseProgress for a sense
 */
export function getOrInitializeSenseProgress(
  clusterId: string,
  senseId: string,
  userId: string
): UserSenseProgress {
  const map = loadSenseProgressMap();
  const key = senseId;

  if (map.has(key)) {
    return map.get(key)!;
  }

  const now = new Date();
  const newProgress: UserSenseProgress = {
    id: `prog-${userId}-${senseId}`,
    user_id: userId,
    cluster_id: clusterId,
    sense_id: senseId,
    stage1_encounters: 0,
    stage2_overrides: 0,
    stage3_successes: 0,
    total_weighted_score: 0,
    integration_status: "encoding",
    created_at: now,
    last_encounter_at: now,
  };

  saveSenseProgress(newProgress);
  return newProgress;
}

/**
 * Load current exercise state
 */
export function loadExerciseState(): ExerciseState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.EXERCISE_STATE);
    if (!stored) return null;

    return JSON.parse(stored) as ExerciseState;
  } catch (error) {
    console.error("Failed to load exercise state:", error);
    return null;
  }
}

/**
 * Save current exercise state
 */
export function saveExerciseState(state: ExerciseState): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.EXERCISE_STATE, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save exercise state:", error);
  }
}

/**
 * Load cluster session from storage
 */
export function loadClusterSession(): ClusterSession | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CLUSTER_SESSION);
    if (!stored) return null;

    return JSON.parse(stored) as ClusterSession;
  } catch (error) {
    console.error("Failed to load cluster session:", error);
    return null;
  }
}

/**
 * Save cluster session to storage
 */
export function saveClusterSession(session: ClusterSession): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.CLUSTER_SESSION, JSON.stringify(session));
  } catch (error) {
    console.error("Failed to save cluster session:", error);
  }
}

/**
 * Clear all user data from storage (for debugging/reset)
 */
export function clearAllData(): void {
  if (typeof window === "undefined") return;

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    console.log("All user data cleared from localStorage");
  } catch (error) {
    console.error("Failed to clear storage:", error);
  }
}

/**
 * Export all user data as JSON (for debugging)
 */
export function exportAllData(): Record<string, unknown> {
  if (typeof window === "undefined") return {};

  try {
    return {
      user: loadUser(),
      senseProgress: Object.fromEntries(loadSenseProgressMap()),
      exerciseState: loadExerciseState(),
      clusterSession: loadClusterSession(),
    };
  } catch (error) {
    console.error("Failed to export data:", error);
    return {};
  }
}
