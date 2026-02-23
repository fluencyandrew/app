# Copilot Exercise Generation Contract

## FluencyFrames Stage Engine Specification

### 1. Input

Copilot receives:
- A cluster JSON object
- Its senses (including placeholder + variants)
- Pill metadata
- Stage rules

---

### 2. Stage 1 Generation Rules

**Objective:**  
Contrast encoding.

**Copilot Must:**
- Select placeholder + one variant
- Generate scenario where pill variable of variant is dominant
- Produce:
  - Background context
  - Prompt with blank
  - Exactly 2 answer options
  - Both full replaceable units
- Ensure:
  - No distractor
  - Visible pill matches correct sense
  - No grammar explanation

**Output Structure**

```json
{
  "stage": 1,
  "exercise_type": "contrast",
  "cluster_id": "...",
  "target_sense_id": "...",
  "placeholder_id": "...",
  "visible_pill": true,
  "options": [
    { "sense_id": "...", "is_correct": false },
    { "sense_id": "...", "is_correct": true }
  ]
}
```

---

### 3. Stage 2 Generation Rules

**Objective:**  
Cue-triggered override.

**Copilot Must:**
- Start from a sentence containing placeholder full form
- Create contextual cues that activate variant pill
- Generate:
  - 3 options total
  - 1 unrelated distractor
  - Placeholder must remain selectable
  - No pill visible
  - Provide override-focused feedback explanation

**Critical Constraint**

Variant must outperform placeholder due to pill variable:
- `delayed_response`
- `hierarchical sensitivity`
- `expertise validation`
- `process optimization`
- etc.

---

### 4. Stage 3 Generation Rules

**Objective:**  
Automation under pressure.

**Copilot Must:**
- Provide scenario only
- No options
- Require full phrase production
- Include `timer_seconds`
- Provide regex for validation

**Example:**

```json
{
  "stage": 3,
  "timer_seconds": 5,
  "expected_sense_id": "chase_up",
  "regex": "/chase\\s+(it|them|the proposal)\\s+up/i"
}
```

---

### 5. Prohibited Behaviours

Copilot must NOT:
- Mention grammar rules
- Describe items as synonyms
- Frame placeholder as incorrect
- Generate fragment-level answers
- Omit full replaceable units

---

### 6. Stage Escalation Logic

When generating multiple exercises:

```
IF user_sense_progress < 3 stage1_encounters
  → generate Stage 1

ELSE IF total_weighted_score < 6
  → generate Stage 2

ELSE
  → generate Stage 3
```

---

### 7. Design Principle

This is a:
- **Precision Activation Tracking System**

NOT:
- A vocabulary test
- A synonym drill
- A grammar exercise

**Every generated exercise must activate a pill variable.**
