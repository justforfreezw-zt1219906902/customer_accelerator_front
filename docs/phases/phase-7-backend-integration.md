---
phase: 7
name: Backend Integration
status: approved
human_approval: approved
---

# Phase 7: Backend Integration

## Goal

Integrate the approved frontend flow with the authoritative backend contract,
including lead submission and all specified runtime states.

## Scope

- Implement against Product Owner-authorized `API-CONTRACT-R1` while preserving
  the unassigned Backend API semantic version
- Implement approved `POST /api/lead` behavior
- Map requests, responses, authentication, validation, and errors
- Implement specified loading, success, failure, timeout, retry, and duplicate
  behavior
- Validate configuration and prevent secret exposure
- Add contract and integration evidence

## Out of Scope

- Changing backend, HubSpot, or email processing
- Inventing fields or responses absent from OpenAPI
- Treating contract revision `1` as semantic version `1.0.0`
- Production release

## Required Inputs

- Approved Phase 6 Pages
- Authoritative OpenAPI and explicit Product Owner authorization for the
  provisional contract identifier
- Product and Interaction Specifications
- Environment, authentication, privacy, security, CORS, rate-limit, and
  observability requirements
- Backend owner availability

## Expected Outputs

- OpenAPI-traceable frontend integration
- Lead flow through backend, HubSpot, email, and approved Thank You behavior
- Contract mappings and integration tests
- Error, recovery, and operations documentation

## Dependencies

- Phase 6 approved
- Backend official semantic version assigned, or an explicit human
  implementation-only authorization such as `TASK-P7-001`
- Backend owner and product owner resolve contract/behavior conflicts

## Tasks

1. Review and register OpenAPI and the official API version.
2. Map interactions to contract operations.
3. Implement configuration and API boundaries.
4. Implement `POST /api/lead` per the verified contract.
5. Implement specified success and error transitions.
6. Add contract, integration, security, and recovery tests.
7. Update compatibility, traceability, and operations records.

## Acceptance Criteria

- OpenAPI and contract revision are verified; a missing official backend
  semantic version remains a production-release blocker.
- Requests, responses, authentication, validation, loading, success, errors,
  timeout, retry, and duplicates match authoritative sources.
- No secret is exposed through frontend code or `VITE_*`.
- Installed contract, integration, lint, type checking, test, and build checks
  pass.
- Backend-owner and product-owner approvals are recorded.

## Validation

**Planned.** Use Phase 1-installed commands and an approved contract/integration
workflow selected only after OpenAPI and test infrastructure are available.

## Risks

- Missing, stale, or unversioned OpenAPI
- CORS, authentication, privacy, HubSpot, or email behavior unconfirmed
- Production behavior differing from interaction specifications
- Mocks hiding environment-specific failures

## Recovery Strategy

Disable or roll back the affected integration through the approved deployment
mechanism, restore the last compatible frontend/API baseline, preserve safe user
errors, and coordinate incidents with the backend owner.

## Status

`approved`

## Human Approval

`approved` by Tom on 2026-07-28 for `TASK-P7-001`. Review notes: `good`.

## Completion Report

`TASK-P7-001` implemented the Product Owner-authorized provisional
`API-CONTRACT-R1`. The exact request/response boundary, safe errors, loading,
duplicate prevention, cancellation, manual recovery and Thank You navigation
are covered by tests. No numeric timeout was invented because `INT-015`
explicitly defers it. Backend semantic version `0.0.0` remains an unassigned
placeholder and must not be interpreted as API version `1.0.0`.

Validation passed: management, version, documentation, compatibility,
registries, OpenAPI, formatting, type checking, lint, 112 unit/component tests,
21 Chromium tests and production build. The live smoke test was not run because
the local backend was unavailable.

Tom explicitly approved Phase 7 and `TASK-P7-001` on 2026-07-28. This approval
does not approve production release, assign an official Backend API semantic
version, or approve the provisional compatibility baseline. Phase 8 is
`planned`; `TASK-P8-001` is the next permitted task.
