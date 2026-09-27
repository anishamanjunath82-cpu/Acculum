# Acculum — Known Limitations

## 1. AI Companion

The current student AI companion uses deterministic, context-aware responses rather than a live external LLM.

This provides predictable MVP behavior but limits the breadth and flexibility of responses compared with a general-purpose LLM.

## 2. Personalization

Current personalization primarily uses:

- Explicit student interests
- Performance
- Learning activity
- Observable learning signals

It does not yet model every possible aspect of a student's learning behavior.

## 3. Learning Signals

The facilitator signal engine is currently rule-based.

The rules are transparent and explainable, but they require validation with larger real-world learning datasets before being treated as production-grade educational analytics.

## 4. Data Architecture

The student application currently uses SQLite.

This is appropriate for the prototype but would need a production-grade database and data architecture for large-scale deployment.

## 5. Separate Applications

The student platform and facilitator dashboard currently use separate application/data layers.

A production version would benefit from a unified:

- Authentication system
- Data layer
- Authorization model
- Analytics/event pipeline

## 6. Authentication and Security

The current implementation is an MVP and should not be considered production-ready security infrastructure.

Production deployment would require additional:

- Authentication hardening
- Authorization controls
- Secret management
- Input validation
- Rate limiting
- Audit logging
- Security testing

## 7. External AI

A live external LLM is not currently required by the runtime implementation.

Future integration would require:

- Secure API-key handling
- Privacy controls
- Data minimization
- Cost controls
- Rate limiting
- Output validation
- Model evaluation
- Fallback behavior

## 8. Learning Recommendations

Performance-based recommendations currently use transparent thresholds.

These rules are useful for the MVP but should be validated against real student outcomes before being used as production educational policy.

## 9. Facilitator Decision Support

Acculum provides signals and recommendations to help facilitators.

It does not automatically determine the correct intervention.

The facilitator remains responsible for interpreting the evidence and deciding how to support the learner.

## 10. Future Work

Potential next steps include:

- Live LLM integration
- Unified student/facilitator data architecture
- Production authentication
- Larger-scale learning-signal validation
- More adaptive learning models
- Privacy and security hardening
- Production deployment infrastructure