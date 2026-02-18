/**
 * EXERCISES - Domain Model Aligned
 * 
 * Re-exports from contact-cluster for the CONTACT cluster session.
 * Maintains legacy type definitions for backwards compatibility during transition.
 */

import { contactCluster, contactExercises } from "@/data/contact-cluster";

// ============================================
// LEGACY TYPE DEFINITIONS (for component compatibility)
// ============================================

export interface Sense {
  id: string;
  label: string;
  frameDescription: string;
  basicSenseDefinition: string;
}

export interface SensePill {
  sense: Sense;
  pill: string;
  chunks: string[];
  roleHierarchy?: string;
  emotionalTemperature?: string;
}

export interface ExerciseContext {
  userRole: string;
  userGoal: string;
  userAvatarUrl?: string; // Avatar/image for the user
  interlocutor: string;
  interlocutorGoal: string;
  interlocutorAvatarUrl?: string; // Avatar/image for the interlocutor
  background: string;
  initialDialogue?: string; // Initial dialogue from interlocutor
}

export interface ExerciseFeedback {
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
}

export interface MultiChoiceExercise {
  type: "multiChoice";
  stageNumber: number;
  id: string;
  pill?: string;
  scenario: string;
  prompt: string;
  placeholder?: string; // Default word/phrase shown in prompt
  optionPhrases?: string[]; // The actual words/phrases for each option (for hover preview)
  scenarioHighlight?: string; // Key phrase in scenario to highlight based on pill
  options: string[];
  correct: string;
  senseId?: string;
  context: ExerciseContext;
  feedback: ExerciseFeedback;
}

export interface FreeTextExercise {
  type: "freeText";
  stageNumber: number;
  id: string;
  prompt: string;
  timeSeconds: number;
  requiredWords: string[];
  context?: ExerciseContext;
}

export type Exercise = MultiChoiceExercise | FreeTextExercise;

// ============================================
// NEW DOMAIN MODEL EXPORTS
// ============================================

export const contactClusterExercises = contactExercises;
export const cluster = contactCluster;

// Sense Definitions with Frame Descriptions

export const baseSense: Sense = {
  id: "contact",
  label: "contact",
  frameDescription: "A initiates exchange with B",
  basicSenseDefinition:
    "To enter into communication or direct contact with; to reach out to establish connection",
};

export const contactSenses: Record<string, SensePill> = {
  "reach-out": {
    sense: baseSense,
    pill: "Low-Pressure Relational Initiation",
    chunks: ["reach out to you"],
    roleHierarchy: "Peer or lower-status initiation",
    emotionalTemperature: "Warm, non-imposing",
  },
  "chase-up": {
    sense: baseSense,
    pill: "Delayed Response Recovery",
    chunks: ["chase them up", "chase them up again"],
    roleHierarchy: "Accountability pressure",
    emotionalTemperature: "Direct, persistent",
  },
};

// ============================================
// STAGE 1: NOTICING
// Contrastive Encoding + Full-Form Embedding
// 2 options, pill visible, floating menu, no time pressure
// ============================================

const stage1Exercises: MultiChoiceExercise[] = [
  {
    type: "multiChoice",
    stageNumber: 1,
    id: "s1-e1",
    pill: "Low-Pressure Relational Initiation",
    scenario:
      "Email sent last month about a non-urgent proposal. You are drafting a follow-up message.",
    prompt: "I'd like to ______ regarding the earlier proposal.",
    placeholder: "contact you",
    optionPhrases: ["contact you", "reach out to you"],
    scenarioHighlight: "non-urgent",
    options: ["contact you", "reach out to you"],
    correct: "reach out to you",
    senseId: "reach-out",
    context: {
      userRole: "Project Manager",
      userGoal: "Reopen communication without urgency",
      userAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=projectmanager",
      interlocutor: "External Consultant",
      interlocutorGoal: "Maintain autonomy",
      interlocutorAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=consultant",
      background:
        "Email sent last month. Non-urgent matter. Re-establishing dialogue.",
    },
    feedback: {
      correct: {
        interlocutorReaction:
          "Thanks for reaching out — happy to revisit this.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Non-imposing, relationship-aware",
      },
      incorrect: {
        interlocutorReaction: "Understood. Is this time-sensitive?",
        alignment: "Goal alignment: ?",
        signal: "Status signal: Slight urgency projection",
      },
    },
  },
  {
    type: "multiChoice",
    stageNumber: 1,
    id: "s1-e2",
    pill: "Delayed Response Recovery",
    scenario:
      "Two emails sent. No reply. Deadline tomorrow. You need to follow up with urgency.",
    prompt: "You now need to ______.",
    placeholder: "contact them",
    optionPhrases: ["contact them", "chase them up"],
    scenarioHighlight: "Deadline tomorrow",
    options: ["contact them", "chase them up"],
    correct: "chase them up",
    senseId: "chase-up",
    context: {
      userRole: "Project Lead",
      userGoal: "Secure urgent response",
      userAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=projectlead",
      interlocutor: "Team Member",
      interlocutorGoal: "Acknowledge priority",
      interlocutorAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=team",
      background:
        "Two emails sent. No response. Deadline imminent. Accountability pressure.",
    },
    feedback: {
      correct: {
        interlocutorReaction: "Sorry — I'll get back to you by EOD.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Accountable follow-up, urgency registered",
      },
      incorrect: {
        interlocutorReaction: "Noted.",
        alignment: "Goal alignment: ?",
        signal: "Status signal: Neutral re-contact, urgency unclear",
      },
    },
  },
  {
    type: "multiChoice",
    stageNumber: 1,
    id: "s1-e3",
    pill: "Low-Pressure Relational Initiation",
    scenario:
      "You're introducing yourself to a potential collaborator in a polite, non-urgent way.",
    prompt: "Hello, I'm ______ to enquire about collaboration.",
    placeholder: "contacting you",
    optionPhrases: ["contacting you", "reaching out to you"],
    scenarioHighlight: "polite, non-urgent",
    options: ["contacting you", "reaching out to you"],
    correct: "reaching out to you",
    senseId: "reach-out",
    context: {
      userRole: "Researcher",
      userGoal: "Politely open a collaboration",
      userAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=researcher",
      interlocutor: "Potential Partner",
      interlocutorGoal: "Assess fit without pressure",
      interlocutorAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=partner",
      background:
        "Initial outreach message. Low stakes: want to open dialogue while signalling deference.",

    },
    feedback: {
      correct: {
        interlocutorReaction: "Thanks for reaching out — I'd be open to a chat.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Polite, non-imposing initiation",
      },
      incorrect: {
        interlocutorReaction: "Okay — is this urgent?",
        alignment: "Goal alignment: ?",
        signal: "Status signal: Slight pressure implied",
      },
    },
  },
];

// ============================================
// STAGE 2: RETRIEVAL
// Cue-Triggered Override
// 3 options with 1 distractor, no pill, moderate load
// ============================================

const stage2Exercises: MultiChoiceExercise[] = [
  {
    type: "multiChoice",
    stageNumber: 2,
    id: "s2-e1",
    scenario:
      "Two emails sent. No response. Deadline imminent. You're scheduling follow-up with Operations lead.",
    prompt: 'You tell your manager: "I\'ll ______ them again tomorrow."',
    options: ["contact them", "chase them up", "consult them"],
    correct: "chase them up",
    senseId: "chase-up",
    context: {
      userRole: "Operations Lead",
      userGoal: "Signal persistent follow-up",
      userAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=operationslead",
      interlocutor: "Finance Team",
      interlocutorGoal: "Prioritize delayed response",
      interlocutorAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=finance",
      background:
        "Two emails. No reply. Deadline imminent. Accountability pressure.",
    },
    feedback: {
      correct: {
        interlocutorReaction: "Apologies — we'll prioritise this.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Persistent follow-up registered",
      },
      incorrect: {
        interlocutorReaction: "Understood.",
        alignment: "Goal alignment: ?",
        signal: "Status signal: Indirect approach, pressure unclear",
      },
    },
  },
  {
    type: "multiChoice",
    stageNumber: 2,
    id: "s2-e2",
    scenario:
      "Director asks about modelling assumptions before finalising proposals. You need to validate with the data science team.",
    prompt:
      'You respond: "I\'ll ______ the data science team before finalising."',
    options: [
      "contact the data science team",
      "consult the data science team",
      "reach out to the data science team",
    ],
    correct: "consult the data science team",
    context: {
      userRole: "Analyst",
      userGoal: "Acknowledge expertise hierarchy",
      userAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=analyst",
      interlocutor: "Director",
      interlocutorGoal: "Ensure validation by qualified team",
      interlocutorAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=director",
      background:
        "Director requesting technical validation. Authority acknowledgment required.",
      initialDialogue: "Can you confirm the modelling assumptions before we finalize the proposals?",
    },
    feedback: {
      correct: {
        interlocutorReaction: "Good — I trust their methodology.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Expert consultation, expertise validated",
      },
      incorrect: {
        interlocutorReaction: "That's not the issue.",
        alignment: "Goal alignment: ❌",
        signal: "Status signal: Wrong variable activated",
      },
    },
  },
];

// ============================================
// STAGE 3: AUTOMATION
// Stability Under Pressure
// Timed free-text input, no scaffolding, high pressure
// ============================================

const stage3Exercises: FreeTextExercise[] = [
  {
    type: "freeText",
    stageNumber: 3,
    id: "s3-e1",
    prompt: "Investor waiting. Two weeks silence. Respond.",
    timeSeconds: 5,
    requiredWords: ["chase", "up"],
    context: {
      userRole: "Startup Founder",
      userGoal: "Re-engage investor with urgency",
      userAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=founder",
      interlocutor: "Investor",
      interlocutorGoal: "See commitment and urgency",
      interlocutorAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=investor",
      background:
        "Two weeks of silence from investor side. Time-sensitive pitch. Need to recapture attention.",
    },
  },
  {
    type: "freeText",
    stageNumber: 3,
    id: "s3-e2",
    prompt: "You're following up after a week to reopen discussion. Respond concisely.",
    timeSeconds: 6,
    requiredWords: ["reach", "out"],
    context: {
      userRole: "Business Development Manager",
      userGoal: "Reopen collaboration discussion",
      userAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=biz-dev",
      interlocutor: "Strategic Partner",
      interlocutorGoal: "Resume partnership talks",
      interlocutorAvatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=strategic-partner",
      background:
        "Week of silence after initial proposal. Non-urgent but needs warm re-engagement.",
    },
  },
];

// ============================================
// COMPLETE EXERCISE SESSION
// ============================================

export const exerciseSession: {
  stages: { stage: number; exercises: Exercise[] }[];
} = {
  stages: [
    {
      stage: 1,
      exercises: stage1Exercises,
    },
    {
      stage: 2,
      exercises: stage2Exercises,
    },
    {
      stage: 3,
      exercises: stage3Exercises,
    },
  ],
};

// Utility: Get total exercise count
export const getTotalExerciseCount = (): number => {
  return exerciseSession.stages.reduce(
    (sum, stage) => sum + stage.exercises.length,
    0
  );
};
