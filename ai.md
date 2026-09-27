# AI Usage Disclosure — Acculum

## Project

Acculum is an AI-assisted personalized learning platform built for **HackMysuru Problem Statement 1 — Personalized Learning**.

AI-related functionality is used in two main areas:

1. Student learning assistance and personalization
2. Facilitator learning-signal analysis and intervention support

## AI Used During Development

AI-assisted development was used for:

- Exploring implementation approaches
- Generating and refining application boilerplate
- Debugging TypeScript and application issues
- Reviewing component and API structure
- Drafting and refining documentation
- Exploring edge cases

AI suggestions were reviewed and adapted by the development team.

## Runtime AI

The student AI companion is implemented in:

`src/services/ai/index.ts`

The API route is:

`src/app/api/ai/chat/route.ts`

The current runtime implementation uses **deterministic, context-aware responses** rather than a live external LLM API.

It can use available context such as:

- Student interests
- Language/context
- Current learning topic
- User questions
- Image/file context where available

## Current AI Capabilities

The implementation includes contextual handling for:

- Fractions
- Percentages
- Probability
- Electric current
- Photosynthesis
- Speed and motion
- Image/file context
- Greetings
- General fallback questions

The system can adapt examples to learner interests, such as using cricket-related examples when cricket is the student's interest.

## Personalization Engine

Personalization is implemented in:

`src/lib/ai/personalization.ts`

It supports:

- Interest-based examples
- Performance-based recommendations
- Score announcements
- Confidence/performance mismatch detection
- Hidden-strength detection
- Learning-format recommendations

Supported interests include:

**Cricket, Music, Gaming, Robotics, Football, Art, Science, Reading and Technology.**

Performance recommendations currently follow:

- **85%+** → Progress / next topic
- **50–84%** → Targeted practice
- **Below 50%** → Revision / reinforcement

## Facilitator Signal Engine

The facilitator application uses a learning-signal engine based on:

- Quiz performance
- Repeated incorrect answers
- Repeated attempts
- Hints and help-seeking
- AI companion activity
- Lesson completion
- Skipped or incomplete lessons
- Engagement patterns
- Confidence/performance mismatch
- High or low performance

The current signal engine is **rule-based and deterministic**.

It generates intervention recommendations for facilitator decision support.

The facilitator remains responsible for deciding whether and how to intervene.

## External LLM Usage

The current runtime does **not** depend on an external LLM API.

The project contains an architectural integration point for future external AI integration, but the external LLM call is not active in the current runtime request path.

## Data and Privacy

Because the current runtime AI is deterministic, student AI requests do not need to be sent to an external LLM provider.

If a future version enables an external model, student information should be minimized and the implementation should document:

- What information is transmitted
- Which provider/model receives it
- Retention behavior
- Privacy controls
- Security measures
- Cost controls

## Accuracy and Verification

The current AI layer is intentionally bounded and deterministic.

This provides predictable MVP behavior but does not provide the broad knowledge coverage of a general-purpose LLM.

Facilitator signals are intended as decision-support signals rather than automatic educational decisions.

## Fallback

The deterministic AI response layer does not require a remote LLM provider.

The rest of the application still requires its normal application runtime and database.

## What AI Was Not Responsible For

Core product decisions remain implemented as application logic, including:

- Student/facilitator workflow
- Performance thresholds
- Learning-signal rules
- Intervention mapping
- Reassessment flow
- Database/application structure
- Product UI structure

## Future AI Direction

Future versions can introduce a live LLM for richer:

- Explanations
- Socratic questioning
- Personalized examples
- Multi-step tutoring
- Adaptive practice generation
- Natural-language facilitator summaries

Any future integration should be evaluated for educational accuracy, privacy, reliability, latency and cost.