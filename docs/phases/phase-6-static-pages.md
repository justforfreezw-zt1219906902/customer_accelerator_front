---
phase: 6
name: Static Pages
status: not_started
human_approval: pending
---

# Phase 6: Static Pages

## Goal

Assemble reviewed, responsive static Pages from approved Sections and layouts
before enabling live backend behavior.

## Scope

- Phase 6A: Landing Page
- Phase 6B: Contact Page
- Phase 6C: Data Protection Page
- Phase 6D: Imprint Page
- Phase 6E: Why mi-goTo Page
- Responsive, accessibility, visual, content, and route validation

## Out of Scope

- Live `POST /api/lead` integration
- Backend contract implementation
- Unapproved legal content, translations, tracking, or consent behavior
- Production deployment

## Required Inputs

- Approved Phase 5 route and interaction map
- Approved Figma Page designs and responsive intent
- Approved content and translations
- Human-approved legal content for Data Protection and Imprint
- Metadata, accessibility, SEO, analytics, and consent requirements

## Expected Outputs

- Five static Page implementations
- Responsive accessible Page composition
- Content and Figma traceability
- Visual, route, and automated evidence

## Dependencies

Initial sequence:

```text
Phase 5 → Phase 6A → Phase 6B → Phase 6C → Phase 6D → Phase 6E
```

Parallel Page delivery requires human confirmation.

## Tasks

1. Confirm design, content, metadata, and states for each Page.
2. Assemble Landing from approved Sections.
3. Assemble Contact with non-live submission states.
4. Implement legal Pages only from approved legal content.
5. Assemble Why mi-goTo from approved product content.
6. Validate responsiveness, accessibility, routes, content, and visuals.
7. Record Page-level review evidence.

## Acceptance Criteria

- Approved Pages match Figma and content at required viewports.
- Page composition follows architecture boundaries.
- No live backend behavior is presented as integrated.
- Installed accessibility, visual, route, test, lint, type checking, and build
  checks pass.
- Legal content has human approval.
- Design and product-owner approvals are recorded.

## Validation

**Planned.** Use Phase 1-approved installed commands and approved viewport,
visual, and accessibility workflows.

## Risks

- Missing responsive Figma intent
- Unapproved legal or marketing content
- Static Contact Page implying live submission success
- Page duplication caused by incomplete Sections
- Unconfirmed sequential versus parallel delivery

## Recovery Strategy

Revert only the affected Page while preserving approved shared layers. Restore
the last approved content and mapping; preserve a legal-content audit trail.

## Status

Phase 6: `not_started`

Phases 6A–6E: `not_started`.

## Human Approval

`pending`

## Completion Report

Not available. It must later report each Page, source versions, viewport and
accessibility evidence, legal/content reviews, deviations, and approval.
