# Acculum — Constraints & Engineering Decisions

## MVP Scope

Acculum is a HackMysuru prototype focused on demonstrating the personalized-learning workflow.

The MVP prioritizes:

- Student personalization
- Learning progress
- AI-assisted learning support
- Learning-signal detection
- Facilitator intervention support
- Reassessment

## Current AI Constraint

The student AI companion currently uses deterministic, context-aware logic.

A live external LLM is not required for the current runtime.

This was chosen to keep the MVP:

- Predictable
- Explainable
- Demonstrable
- Less dependent on external services

## Personalization Constraint

Personalization currently uses explicit interests and measurable learning signals.

It is not intended to model every aspect of a student's behavior.

Supported interests include:

- Cricket
- Music
- Gaming
- Robotics
- Football
- Art
- Science
- Reading
- Technology

## Signal Engine Constraint

The facilitator learning-signal engine is currently rule-based.

This makes the signals transparent, but thresholds and rules require validation with larger real-world learning datasets.

## Database Constraint

The student application currently uses SQLite.

This is appropriate for the prototype but would need a production-grade data architecture for:

- Larger scale
- Concurrent users
- Distributed deployment
- Advanced analytics

## Application Architecture Constraint

The student and facilitator applications currently use separate application/data layers.

A future production architecture should consider:

- Unified authentication
- Shared data model
- Centralized authorization
- Production database infrastructure
- Shared analytics/event pipeline

## Security Constraint

The current project is an MVP and should not be treated as production-ready authentication or authorization infrastructure.

Before production deployment, the system would require:

- Hardened authentication
- Strong authorization boundaries
- Secure secret management
- Input validation
- Rate limiting
- Audit logging
- Secure deployment configuration

## External AI Constraint

If a live external LLM is introduced, the system will need:

- Secure API-key management
- Privacy controls
- Data minimization
- Cost controls
- Rate limiting
- Output validation
- Model evaluation
- Fallback behavior

## Product Constraint

Acculum provides facilitator decision support.

The system does not automatically determine what a facilitator must do.

The facilitator remains responsible for interpreting learning signals and choosing the appropriate intervention.