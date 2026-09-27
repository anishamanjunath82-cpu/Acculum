# Acculum — Presentation Guide

## Slide 1 — Title

**Acculum**

An AI-assisted personalized learning platform that adapts to each student's pace, progress and interests while helping facilitators understand when and how to intervene.

---

## Slide 2 — Problem

Students learn at different speeds and have different interests.

Traditional learning systems often provide the same learning sequence to everyone.

Facilitators may see that a student is struggling without knowing why or when intervention is needed.

---

## Slide 3 — Why Signals Matter

A wrong answer can mean:

- A careless mistake
- A conceptual gap
- Low confidence
- Overload
- Disengagement

Acculum looks at multiple learning signals rather than a single score.

---

## Slide 4 — Solution

**Student activity → Learning data → Signal detection → Facilitator insight → Intervention → Reassessment**

Acculum connects the student learning experience with facilitator decision support.

---

## Slide 5 — Personalization

Supported interests include:

**Cricket, Music, Gaming, Robotics, Football, Art, Science, Reading and Technology.**

Examples can be adapted to interests such as:

- Probability + Cricket
- Electricity + Robotics
- Fractions + Music

Performance also changes the recommended learning path.

---

## Slide 6 — Student Platform

Show:

- Subjects
- Courses
- Lessons
- Quizzes
- Assignments
- AI companion
- Progress
- Rewards
- Career exploration

---

## Slide 7 — Facilitator Dashboard

Show:

- Student performance
- Learning signals
- Repeated errors
- Help-seeking
- Engagement patterns
- Intervention recommendations
- Reassessment

---

## Slide 8 — Architecture

### Student

Next.js + React + TypeScript + Tailwind + SQLite

### Facilitator

React + Vite + TypeScript + Tailwind + Express + sql.js

### Core loop

```text
Student
  ↓
Learning Data
  ↓
Signal Engine
  ↓
Facilitator
  ↓
Intervention
  ↓
Reassessment