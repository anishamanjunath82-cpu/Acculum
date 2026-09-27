
# Acculum — Decision Log

## Project

**Acculum — HackMysuru Problem Statement 1: Personalized Learning**

## Decision 1 — Personalization Approach

**Decision:** Use explicit interests and learning-performance signals for the MVP.

**Reason:** Students have different interests and learning speeds. Interest context allows examples to feel relevant, while performance helps determine whether the learner should progress, practice or revise.

**Implementation:** `src/lib/ai/personalization.ts`

---

## Decision 2 — Deterministic AI for the MVP

**Decision:** Use deterministic, context-aware AI behavior instead of depending on a live external LLM.

**Reason:** This makes the MVP predictable, explainable and demonstrable without requiring an external API key.

**Implementation:** `src/services/ai/index.ts`

---

## Decision 3 — Learning Signals

**Decision:** Convert observable learning activity into facilitator-facing signals.

**Reason:** A single wrong answer does not explain why a learner is struggling. Repeated errors, help-seeking, quiz performance and engagement provide additional context.

---

## Decision 4 — Facilitator Intervention

**Decision:** Provide intervention recommendations rather than automatically deciding what the facilitator must do.

**Reason:** The system should support facilitator judgment rather than replace it.

---

## Decision 5 — Reassessment

**Decision:** Include reassessment and before/after comparison.

**Reason:** An intervention should be followed by evidence of whether learning changed.

---

## Decision 6 — Separate Applications

**Decision:** Maintain separate student and facilitator applications for the MVP.

**Reason:** Each interface has different user needs and can be developed independently.

**Current structure:**

```text
Student application
        +
Facilitator application