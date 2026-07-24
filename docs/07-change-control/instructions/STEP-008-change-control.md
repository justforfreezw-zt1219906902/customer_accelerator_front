# STEP-008: Change-Control System

## Task metadata

- Task ID: STEP-008
- Date: 2026-07-24
- Tool: Codex
- Operator: User-directed Codex task
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Current phase: Phase 0 — Project Audit
- Human review: `pending`
- Git commit: `pending`

## Task purpose

Establish record classification, risk management, deviation tracking, directory
guidance, and reusable templates without creating fake events.

## Files read

- `AGENTS.md`
- `VERSION.yaml`
- `docs/phases/phase-0-project-audit.md`
- `docs/00-governance/naming-conventions.md`
- `docs/06-traceability/compatibility-matrix.yaml`
- `docs/01-roadmap/current-state.yaml`
- Existing `docs/07-change-control/` and `docs/templates/` contents

## Full prompt or prompt reference

Prompt supplied in the Codex task requesting STEP-008 change-control
documentation.

## Permitted scope

- `docs/07-change-control/`
- `docs/templates/`
- Affected documentation registry/changelog

## Prohibited scope

- Application or backend code
- Wrapper project directories
- Fake Change Requests, Issues, Incidents, Deviations, or ADRs
- Modification or deletion of STEP-001 through STEP-007
- Human approval claims

## Files created

- Change-control root README, risk register, and deviation log
- README files for Change Requests, Issues, Incidents, Decisions, Instructions
- Ten requested templates
- `docs/07-change-control/instructions/STEP-008-change-control.md`

## Files modified

- `CHANGELOG.md`

## Files preserved

- `STEP-001-bootstrap.md` through `STEP-007-traceability.md`
- All existing governance, roadmap, input, design, frontend, backend, and
  traceability documents
- Existing IDE and Git metadata

## Validation

- Parsed and validated all 16 risk records and required fields.
- Confirmed all required README files and ten templates exist.
- Confirmed STEP-001 through STEP-007 remain present and unchanged.
- Confirmed no fake Change Request, Issue, Incident, or ADR record was created.
- Verified no application code or wrapper directory was created.
- Checked whitespace and final Git status; STEP-008 changes remain uncommitted.

## Errors

- None recorded.

## Human review

- Reviewer: not assigned
- Decision: `pending`
- Date: pending

## Git commit

`pending`
