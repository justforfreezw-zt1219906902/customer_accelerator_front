---
phase: 5
name: Routing and Page Interaction Map
status: in_progress
human_approval: pending
---

# Phase 5: Routing and Page Interaction Map

## Goal

Define and implement the approved route structure and traceable interaction map
before static Page implementation.

## Scope

- Phase 5A: Product Interaction Specification and human decisions
- Later authorized subphase: route skeleton and behavior implementation
- Routes, paths, names, metadata, navigation, and fallbacks
- Links, CTA destinations, state transitions, and form behavior
- Success, error, retry, focus, history, analytics, and accessibility behavior
- Route and interaction tests

## Out of Scope

- Full visual Page implementation
- Live backend integration
- Invention of API contracts or unapproved analytics

## Required Inputs

- Approved Phase 4C Sections
- Product and Interaction Specifications
- Approved page inventory and content structure
- Accessibility, analytics, consent, locale, and error requirements

## Expected Outputs

- Route registry
- Page interaction map
- Link, CTA, and state-transition matrix
- Approved route skeleton
- Automated behavior evidence

## Dependencies

- Phase 4C approved
- Product owner confirms routes and behavior
- OpenAPI controls contract details when referenced

## Tasks

1. Register routes and page ownership.
2. Map links and CTA destinations.
3. Specify page and form states, errors, and recovery.
4. Separate interaction intent from backend contracts.
5. Implement the approved route skeleton.
6. Add route and interaction tests.
7. Review accessibility, locale, analytics, and consent behavior.

## Acceptance Criteria

- Routes, links, CTAs, transitions, forms, success, errors, and fallbacks are
  specified.
- Route behavior has automated coverage.
- Accessibility and analytics expectations are documented.
- Backend fields or responses are not invented.
- Installed validation and build checks pass.
- Product-owner approval is recorded.

## Validation

Phase 5A uses management-document validation because it changes specifications
only. Typecheck, route tests, and build validation remain required for a later
implementation task.

## Risks

- Behavior inferred from Figma alone
- Missing consent, analytics, locale, or error-flow decisions
- Route names coupled to temporary copy
- Backend assumptions entering the interaction map

## Recovery Strategy

Restore the last approved route registry and interaction map together. Preserve
compatible redirects and document breaking URL migration impact.

## Status

Phase 5 overall: `in_progress`

Phase 5A Product Interaction Specification: `approved`

## Human Approval

Phase 5 overall: `pending`

Phase 5A:

- Reviewer: Tom
- Result: `APPROVED`
- Date: 2026-07-25
- Current reviewed task supplied: `TASK-P7-001`
- Original execution task: `TASK-P5A-001`
- Notes: good
- Evidence:
  `docs/08-quality/test-reports/phase-5a-task-p7-001-approval-2026-07-25.md`
- Prior approval evidence is preserved at
  `docs/08-quality/test-reports/phase-5a-task-p6-001-approval-2026-07-25.md`.

## Completion Report

### Phase 5A

- Figma pages `06 Landing Page` (`212:2`), `07 Why Mi-goTo Page` (`259:2`),
  `08 Imprint` (`122:2`), `09 Data Protection` (`128:2`), and
  `10 Contact Page` (`269:2`) were inspected read-only.
- A formal Product Interaction Specification records proposed routes, Header
  and Footer destinations, anchor behavior, locale behavior, mobile navigation,
  Contact state transitions, safe errors, unknown routes, and external links.
- Twenty-one human decisions are explicitly recorded.
- Contact loading, success, and error behavior is not represented in Figma and
  remains controlled by the interaction specification and OpenAPI.
- Thank You Page has no Figma source.
- No route or Page implementation was changed.
- Tom approved the Phase 5A specification on 2026-07-25.
- Tom reconfirmed the approval using the unique reviewed task `TASK-P7-001`;
  the earlier `TASK-P6-001` record remains historical evidence.
- Approval confirms the specification record; its twenty-one explicitly
  unresolved decisions still require their named owners before affected
  implementation.
- Phase 5 remains `in_progress`; no route or Page implementation is approved by
  this record.
