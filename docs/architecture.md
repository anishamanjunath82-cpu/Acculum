# Acculum Architecture

## Overview

Acculum is a personalized learning platform with two application experiences:

1. Student Platform
2. Facilitator Dashboard

The system is designed around a continuous learning loop:

**Student activity → Learning data → Signal detection → Facilitator insight → Intervention → Reassessment**

## Student Application

The student application is built with:

- Next.js
- React
- TypeScript
- Tailwind CSS
- SQLite
- Better-SQLite3
- Zustand
- SWR
- Recharts
- Framer Motion
- Zod

### Main capabilities

- Subjects
- Courses
- Lessons
- Quizzes
- Assignments
- Progress tracking
- AI learning companion
- Classroom/social features
- Rewards
- Daily GK
- Career exploration

## Personalization Layer

Personalization is implemented in:

`src/lib/ai/personalization.ts`

It uses:

- Student interests
- Performance
- Learning signals

Supported interests include:

**Cricket, Music, Gaming, Robotics, Football, Art, Science, Reading and Technology.**

Performance currently influences whether the learner should progress, practice or revise.

## AI Service

The student AI service is:

`src/services/ai/index.ts`

The API route is:

`src/app/api/ai/chat/route.ts`

The current runtime AI is deterministic and context-aware.

It does not currently depend on a live external LLM.

## Facilitator Application

The facilitator dashboard is under:

`facilitator/`

It consists of:

```text
facilitator/
├── client/
└── server/