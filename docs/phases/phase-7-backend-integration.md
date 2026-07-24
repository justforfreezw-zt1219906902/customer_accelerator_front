---
phase: 7
name: Backend Integration
status: not_started
human_approval: pending
---

# Phase 7: Backend Integration

## Goal

Integrate the approved frontend flow with the authoritative backend contract,
including lead submission and all specified runtime states.

## Scope

- Verify and register the official Backend API semantic version and OpenAPI
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
- Authoritative OpenAPI and official backend semantic version
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
- Backend official semantic version assigned
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

- Backend semantic version and OpenAPI are verified.
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

`not_started`

## Human Approval

`pending`

## Completion Report

Not available. It must later identify OpenAPI/API versions, compatibility ID,
mappings, validation, security evidence, deviations, recovery readiness, and
both approvals.

