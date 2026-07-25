# Deviation Log

## Purpose

Track intentional, human-reviewed differences between approved Figma and code.
Do not record missing design information, defects, or requested design changes
as deviations.

## Required fields

- Deviation ID: `DEV-YYYY-NNN`
- Reason
- Affected Figma version and node
- Affected Frontend version and code
- Visual, accessibility, performance, responsive, and compatibility impact
- Alternatives considered
- Resolution or expiry
- Owner
- Approval status and approver
- Review date and next review date
- Linked Change Request, Issue, or ADR

## Active deviations

### DEV-2026-001 — Fluid Section Container sizing

- Reason: Responsive web sections must scale beyond the fixed 720px Figma
  specimen without inventing breakpoints.
- Affected Figma: `1.0.0`, node `42:66`
- Affected Frontend: `0.0.1`,
  `src/design-system/components/core/AppSectionContainer.vue`
- Impact: Fluid width; approved spacing tokens remain authoritative.
- Alternatives: Fixed 720px width; unapproved breakpoint media queries.
- Resolution or expiry: Review during Phase 3; revisit after breakpoint approval.
- Owner: Tom
- Approval: Pending
- Review date: 2026-07-24
- Next review date: Phase 3 human design review
- Linked record: `PHASE-003-core-components.md`

### DEV-2026-002 — Accessibility focus-visible treatment

- Reason: Native keyboard focus must remain visible.
- Affected Figma: `1.0.0`, nodes `34:60` and `36:22`
- Affected Frontend: `0.0.1`, `AppButton.vue`, `AppCard.vue`
- Impact: Token-backed focus ring appears only for keyboard-visible focus.
- Alternatives: No visible focus; wait for a future Figma focus variant.
- Resolution or expiry: Review during Phase 3.
- Owner: Tom
- Approval: Pending
- Review date: 2026-07-24
- Next review date: Phase 3 human design review
- Linked record: `PHASE-003-core-components.md`

### DEV-2026-003 — Disabled opacity normalization

- Reason: Core components must consume approved tokens rather than repeated raw
  opacity values.
- Affected Figma: `1.0.0`, nodes `34:60`, `35:26`, and `41:42`
- Affected Frontend: `0.0.1`, `AppButton.vue`, `AppInput.vue`, `AppBadge.vue`
- Impact: Button and Input disabled states use `0.4` instead of approximately
  `0.58` and `0.56`.
- Alternatives: Preserve component-local raw opacity values.
- Resolution or expiry: Review during Phase 3.
- Owner: Tom
- Approval: Pending
- Review date: 2026-07-24
- Next review date: Phase 3 human design review
- Linked record: `PHASE-003-core-components.md`

## Resolved deviations

None.
