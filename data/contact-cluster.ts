/**
 * CONTACT CLUSTER - Local Fixture
 * 
 * Full implementation following the domain model and Technical Blueprint.
 * This is a local, hardcoded cluster for MVP development.
 */

import {
  Cluster,
  Sense,
  Pill,
  Exercise,
} from "@/data/domain";

// ============================================
// SENSES (Placeholder + Variants)
// ============================================

const contactSenses: Record<string, Sense> = {
  // Base placeholder sense (neutral, fluent baseline)
  contact: {
    id: "contact",
    cluster_id: "contact-cluster",
    base_word: "contact",
    full_form_template: "contact {object}",
    is_placeholder: true,
    requires_object: true,
    difficulty_level: 1,
    rhythmic_pattern: "CON-tact",
    created_at: new Date("2026-01-01"),
  },

  // Precision Variant 1: Low-Pressure Relational Initiation
  "reach-out": {
    id: "reach-out",
    cluster_id: "contact-cluster",
    base_word: "reach out to",
    full_form_template: "reach out to {object}",
    is_placeholder: false,
    requires_object: true,
    difficulty_level: 2,
    rhythmic_pattern: "REACH out to",
    created_at: new Date("2026-01-01"),
  },

  // Precision Variant 2: Delayed Response Recovery
  "chase-up": {
    id: "chase-up",
    cluster_id: "contact-cluster",
    base_word: "chase {object} up",
    full_form_template: "chase {object} up",
    is_placeholder: false,
    requires_object: true,
    difficulty_level: 2,
    rhythmic_pattern: "chase THEM up",
    created_at: new Date("2026-01-01"),
  },

  // Precision Variant 3: Expertise Validation
  consult: {
    id: "consult",
    cluster_id: "contact-cluster",
    base_word: "consult",
    full_form_template: "consult {object}",
    is_placeholder: false,
    requires_object: true,
    difficulty_level: 3,
    rhythmic_pattern: "con-SULT",
    created_at: new Date("2026-01-01"),
  },
};

// ============================================
// PILLS (Situational Activation Signatures)
// ============================================

const contactPills: Record<string, Pill> = {
  contact: {
    id: "pill-contact",
    sense_id: "contact",
    role_hierarchy: "Neutral initiation",
    speaker_goal: "Generic outreach (default)",
    interlocutor_goal: "Generic response",
    participant_structure: "1-to-1 or group",
    emotional_temperature: "neutral",
    temporal_condition: "neutral",
    communicative_effect: "Safe but unmarked",
    status_signal: "No special signal",
    created_at: new Date("2026-01-01"),
  },

  "reach-out": {
    id: "pill-reach-out",
    sense_id: "reach-out",
    role_hierarchy: "Peer or lower-status initiation",
    speaker_goal: "Reopen communication without urgency",
    interlocutor_goal: "Maintain autonomy",
    participant_structure: "1-to-1 external consultation",
    emotional_temperature: "softened",
    temporal_condition: "neutral",
    communicative_effect: "Non-imposing, relationship-aware",
    status_signal: "Low-Pressure Relational Initiation",
    created_at: new Date("2026-01-01"),
  },

  "chase-up": {
    id: "pill-chase-up",
    sense_id: "chase-up",
    role_hierarchy: "Accountability pressure",
    speaker_goal: "Secure urgent response after delays",
    interlocutor_goal: "Acknowledge priority and respond",
    participant_structure: "Internal team or close stakeholder",
    emotional_temperature: "urgent",
    temporal_condition: "delayed_response",
    communicative_effect: "Direct, persistent, accountability-signaling",
    status_signal: "Delayed Response Recovery - accountable follow-up",
    created_at: new Date("2026-01-01"),
  },

  consult: {
    id: "pill-consult",
    sense_id: "consult",
    role_hierarchy: "Expert validation hierarchy",
    speaker_goal: "Acknowledge expertise before finalizing",
    interlocutor_goal: "Provide authoritative input",
    participant_structure: "Hierarchical technical consultation",
    emotional_temperature: "neutral",
    temporal_condition: "preemptive",
    communicative_effect: "Respectful of authority, defers to expertise",
    status_signal: "Expertise Validation - expert consultation",
    created_at: new Date("2026-01-01"),
  },
};

// ============================================
// EXERCISES
// ============================================

const contactExercises: Exercise[] = [
  // ========== STAGE 1: NOTICING (Contrast Encoding) ==========

  {
    id: "s1-e1-low-pressure",
    cluster_id: "contact-cluster",
    stage: 1,
    exercise_type: "contrast",

    // Scenario
    prompt_text: "I'd like to ______ regarding the earlier proposal.",
    background_context:
      "Email sent last month about a non-urgent proposal. You are drafting a follow-up message to re-establish dialogue.",
    user_role: "Project Manager",
    interlocutor_role: "External Consultant",

    // Options (Stage 1: always 2, no distractor)
    options: [
      {
        id: "opt-s1-e1-1",
        exercise_id: "s1-e1-low-pressure",
        sense_id: "contact",
        display_text: "contact you",
        is_correct: false,
        is_distractor: false,
      },
      {
        id: "opt-s1-e1-2",
        exercise_id: "s1-e1-low-pressure",
        sense_id: "reach-out",
        display_text: "reach out to you",
        is_correct: true,
        is_distractor: false,
      },
    ],

    // Pill visible on Stage 1
    visible_pill_id: "pill-reach-out",

    feedback: {
      correct: {
        interlocutor_reaction:
          "Thanks for reaching out — happy to revisit this.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Non-imposing, relationship-aware",
      },
      incorrect: {
        interlocutor_reaction: "Understood. Is this time-sensitive?",
        alignment: "Goal alignment: ?",
        signal: "Status signal: Slight urgency projection",
      },
    },

    created_at: new Date("2026-01-01"),
  },

  {
    id: "s1-e2-delayed-response",
    cluster_id: "contact-cluster",
    stage: 1,
    exercise_type: "contrast",

    // Scenario
    prompt_text: "You now need to ______.",
    background_context:
      "Two emails sent. No reply. Deadline tomorrow. You need to follow up with urgency.",
    user_role: "Project Lead",
    interlocutor_role: "Team Member",

    // Options (Stage 1: always 2, no distractor)
    options: [
      {
        id: "opt-s1-e2-1",
        exercise_id: "s1-e2-delayed-response",
        sense_id: "contact",
        display_text: "contact them",
        is_correct: false,
        is_distractor: false,
      },
      {
        id: "opt-s1-e2-2",
        exercise_id: "s1-e2-delayed-response",
        sense_id: "chase-up",
        display_text: "chase them up",
        is_correct: true,
        is_distractor: false,
      },
    ],

    // Pill visible on Stage 1
    visible_pill_id: "pill-chase-up",

    feedback: {
      correct: {
        interlocutor_reaction: "Sorry — I'll get back to you by EOD.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Accountable follow-up, urgency registered",
      },
      incorrect: {
        interlocutor_reaction: "Noted.",
        alignment: "Goal alignment: ?",
        signal: "Status signal: Neutral re-contact, urgency unclear",
      },
    },

    created_at: new Date("2026-01-01"),
  },

  // ========== STAGE 2: RETRIEVAL (Cue-Triggered Override) ==========

  {
    id: "s2-e1-override-detection",
    cluster_id: "contact-cluster",
    stage: 2,
    exercise_type: "override",

    // Scenario
    prompt_text: 'You tell your manager: "I\'ll ______ them again tomorrow."',
    background_context:
      "Two emails sent. No response. Deadline imminent. Scheduling follow-up.",
    user_role: "Operations Lead",
    interlocutor_role: "Finance Team",

    // Options (Stage 2: 3 options, 1 distractor)
    options: [
      {
        id: "opt-s2-e1-1",
        exercise_id: "s2-e1-override-detection",
        sense_id: "contact",
        display_text: "contact them",
        is_correct: false,
        is_distractor: false, // Placeholder - learner must override
      },
      {
        id: "opt-s2-e1-2",
        exercise_id: "s2-e1-override-detection",
        sense_id: "chase-up",
        display_text: "chase them up",
        is_correct: true,
        is_distractor: false,
      },
      {
        id: "opt-s2-e1-3",
        exercise_id: "s2-e1-override-detection",
        sense_id: "consult",
        display_text: "consult them",
        is_correct: false,
        is_distractor: true, // Unrelated option
      },
    ],

    feedback: {
      correct: {
        interlocutor_reaction: "Apologies — we'll prioritise this.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Persistent follow-up registered",
      },
      incorrect: {
        interlocutor_reaction: "Understood.",
        alignment: "Goal alignment: ?",
        signal: "Status signal: Indirect approach, pressure unclear",
      },
    },

    created_at: new Date("2026-01-01"),
  },

  {
    id: "s2-e2-expertise-validation",
    cluster_id: "contact-cluster",
    stage: 2,
    exercise_type: "override",

    // Scenario
    prompt_text:
      'You respond: "I\'ll ______ the data science team before finalising."',
    background_context:
      "Director asks about modelling assumptions before finalising proposals. You need validation with the data science team.",
    user_role: "Analyst",
    interlocutor_role: "Director",

    // Options (Stage 2: 3 options, 1 distractor)
    options: [
      {
        id: "opt-s2-e2-1",
        exercise_id: "s2-e2-expertise-validation",
        sense_id: "contact",
        display_text: "contact the data science team",
        is_correct: false,
        is_distractor: false, // Placeholder - must override
      },
      {
        id: "opt-s2-e2-2",
        exercise_id: "s2-e2-expertise-validation",
        sense_id: "consult",
        display_text: "consult the data science team",
        is_correct: true,
        is_distractor: false,
      },
      {
        id: "opt-s2-e2-3",
        exercise_id: "s2-e2-expertise-validation",
        sense_id: "reach-out",
        display_text: "reach out to the data science team",
        is_correct: false,
        is_distractor: true, // Wrong warmth level
      },
    ],

    feedback: {
      correct: {
        interlocutor_reaction: "Good — I trust their methodology.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Expert consultation, expertise validated",
      },
      incorrect: {
        interlocutor_reaction: "That's not the issue.",
        alignment: "Goal alignment: ❌",
        signal: "Status signal: Wrong variable activated",
      },
    },

    created_at: new Date("2026-01-01"),
  },

  // ========== STAGE 3: AUTOMATION (Stability Under Pressure) ==========

  {
    id: "s3-e1-timed-production",
    cluster_id: "contact-cluster",
    stage: 3,
    exercise_type: "production",

    // Scenario
    prompt_text: "Investor waiting. Two weeks silence. Respond.",
    background_context:
      "Critical stakeholder has gone silent for 2 weeks. You need to respond quickly under pressure.",
    user_role: "Founder",
    interlocutor_role: "Lead Investor",

    // Stage 3: No options, free text
    timer_seconds: 5,
    required_words: ["chase", "up"],
    regex_pattern: "chase\\s+(it|them|the|the proposal)\\s+up",

    feedback: {
      correct: {
        interlocutor_reaction:
          "Thanks — let's review tomorrow with the updated timeline.",
        alignment: "Goal alignment: ✅",
        signal: "Status signal: Strategic accountability under pressure",
      },
      incorrect: {
        interlocutor_reaction: "Yes?",
        alignment: "Goal alignment: ?",
        signal: "Status signal: Signal lost under time pressure",
      },
    },

    created_at: new Date("2026-01-01"),
  },
];

// ============================================
// ASSEMBLE CLUSTER
// ============================================

export const contactCluster: Cluster = {
  id: "contact-cluster",
  name: "CONTACT",
  description: "Precision variants for initiating and following up communication",

  senses: Object.values(contactSenses),
  pills: contactPills,

  base_placeholder_sense_id: "contact",

  created_at: new Date("2026-01-01"),
};

// Export for easier access
export { contactSenses, contactPills, contactExercises };
