# ADR-001 — Phase 6C Figma legal-content Gate override

## Status

Accepted by Product Owner on 2026-07-28.

## Context

Phase 6C originally required a separate authoritative legal document, assigned
legal-content owner, and legal approval before implementation.
`TASK-P6C-001` stopped at that Gate and opened `ISSUE-2026-004`.

## Decision

Tom, acting as Product Owner, explicitly:

- accepts Figma Page `128:2` and frame `128:3` as the current authoritative
  content source;
- waives a PDF or external legal-document asset for this baseline;
- waives separate legal counsel approval for this implementation;
- approves a complete English translation of all 35 German source sections;
- approves public frontend use of revision `FIGMA-128-3-EN-1.0.0`; and
- accepts the risk of proceeding while professional legal review is deferred.

## Consequences

- `ISSUE-2026-004` is resolved by a human Gate override.
- English is the only published Data Protection language in this baseline.
- German remains source-only; Chinese is unavailable.
- The implementation must never be described as lawyer-approved.
- A future professional legal review may require a content revision and a new
  compatibility impact assessment.

## Alternatives preserved

- Supply and approve a separate PDF or external legal document.
- Obtain professional legal review before publication.

Both alternatives were explicitly deferred, not rejected as permanently
unnecessary.
