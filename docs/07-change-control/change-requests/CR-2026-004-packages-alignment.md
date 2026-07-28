# CR-2026-004 — Release Candidate Packages alignment correction

## Metadata

- Status: `approved_implemented`
- Requested by: Miroslav
- Accepted and approved by: Tom
- Date: 2026-07-28
- Owner: Product owner / Tom
- Starting baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Target phase: Phase 8
- Implementation task: `TASK-P8-002`
- Human approval: `approved`

## Current design

Figma Packages band `212:453` and Pricing Section `195:629` show four cards
with content-driven heights and a taller Recommended card. The existing code
also translated one featured grid item upward.

## Approved change

For the current Release Candidate, all card tops, bottoms and CTA regions align
on desktop. The Recommended badge receives a consistent structural region and
must not move its CTA. Content remains complete and smaller viewports may stack
cards.

## Reason

Miroslav identified the uneven comparison grid as release-blocking and Tom
explicitly approved the correction on 2026-07-28.

## Scope and impact

- In scope: `PackagesSection`, its tests, visual evidence and registries.
- Out of scope: content edits, prices, claims, Card/Button redesign, Figma
  writes and unrelated Pages.
- Backend/OpenAPI, locales, legal, privacy: no impact.
- Figma synchronization: the source may be updated later; this record prevents
  the intentional RC correction from becoming an undocumented deviation.
- Version: no semantic-version change during remediation.

## Acceptance criteria

- [x] One repeated structural card template remains.
- [x] No approved content is removed or truncated.
- [x] Equal-height desktop layout and bottom CTA structure are implemented.
- [x] Recommended badge does not introduce a CTA offset.
- [x] Responsive layout avoids overlap.
- [x] Human browser review approves the correction.

## Recovery

Revert the scoped Section layout change while preserving this decision and its
evidence. Do not alter content configuration.

## Decision

- Result: `approved`
- Approver: Tom
- Date: 2026-07-28
- Conditions: shared structure, no content loss, responsive behavior and human
  visual review before RC source freeze.
- Implementation review: approved by Tom on 2026-07-28
