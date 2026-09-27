# Acculum

> An AI-assisted personalized learning platform that adapts to each student's pace, progress, and interests while helping facilitators understand when and how to intervene.

## HackMysuru — Problem Statement 1: Personalized Learning

Acculum is built for the Personalized Learning challenge: adapting learning to each student's pace, progress, and interests while helping facilitators understand when and how to intervene.

## Problem

Students learn at different speeds and have different interests, but traditional learning systems often provide the same sequence and difficulty to everyone.

Facilitators may know that a student is struggling without knowing why or when intervention is needed.

Acculum creates a learning loop:

**Student activity → Learning data → Signal detection → Facilitator insight → Intervention → Reassessment**

## Student Platform

- Subjects, courses and lessons
- Quizzes and assignments
- Progress tracking
- AI learning companion
- Interest-based examples
- Classroom and friends
- Rewards and gamification
- Daily GK
- Career exploration

## Facilitator Dashboard

- Student performance
- Learning signals
- Repeated-error analysis
- Help-seeking patterns
- Engagement signals
- Intervention recommendations
- Reassessment
- Before/after comparison

## Personalization

Acculum supports interests including:

**Cricket, Music, Gaming, Robotics, Football, Art, Science, Reading and Technology.**

Examples can be adapted to interests such as:

- Probability + Cricket
- Electricity + Robotics
- Fractions + Music

Performance recommendations:

- **85%+** → Progress / next topic
- **50–84%** → Targeted practice
- **Below 50%** → Revision / reinforcement

## Technology

### Student application

Next.js, React, TypeScript, Tailwind CSS, SQLite, Better-SQLite3, Zustand, SWR, Recharts and Framer Motion.

### Facilitator application

React, Vite, TypeScript, Tailwind CSS, Express, sql.js, Multer and Lucide React.

## AI

The student AI service is implemented in:

`src/services/ai/index.ts`

Personalization is implemented in:

`src/lib/ai/personalization.ts`

The current runtime AI companion uses deterministic, context-aware responses rather than a live external LLM.

The facilitator signal engine is currently rule-based.

See [ai.md](./ai.md) for the complete AI disclosure.

## Core Architecture

```text
Student Platform
       ↓
Learning Data
       ↓
Learning Signal Engine
       ↓
Facilitator Dashboard
       ↓
Intervention
       ↓
Reassessment