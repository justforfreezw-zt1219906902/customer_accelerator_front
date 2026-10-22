# CR-2026-007 — Landing Team Membership Update

## Metadata

- Status: `implemented_needs_review`
- Requested by: current human user; name not supplied
- Date: 2026-10-23
- Owner: Product owner / Tom
- Starting baseline: `DS1.2.0_API0.0.0_FE0.2.0`
- Target phase/release: Production maintenance; no release authorized
- Human approval: `pending`

## Current requirement or design

The approved Figma `06 Landing Page` Team node `212:615` and the historical
Frontend baseline contain four Team members. `CONTENT-LANDING` requires Team
content changes to use an approved Change Request.

## Requested change

Remove Longfei Li and Bharghav BK from the public Landing Team section. Retain
Miroslav Stanojevic and Wei Zhao, the Team heading and description, the stable
`team` anchor, and the Footer destination `/#team`.

The human requester selected a left-aligned desktop layout: retain four equal
desktop tracks and populate the first two. At 1024px and below the two cards
fill a two-column row; at 640px and below they stack into one column.

## Reason and expected value

The public Team presentation must reflect the currently requested membership.
Success means the two retained members are the only published Team cards and
the section remains responsive without changing shared navigation behavior.

## Scope

- In scope: Landing Team content, Team grid layout, automated tests, content and
  design registries, traceability, and maintenance state.
- Out of scope: Figma editing, other Landing copy, routes, APIs, backend code,
  Team component interfaces, versions, release, and deployment.

## Impact analysis

- Requirements: `REQ-LANDING-001` and `REQ-CONTENT-001` gain this maintenance
  override and remain pending human review.
- Figma: node `212:615` remains the historical source; synchronization to the
  two-member layout is pending.
- Backend/OpenAPI: no impact.
- Content/locales/legal: English Team content only; no translations or legal
  content are added.
- Frontend: `landingContentEn` contains two members; `TeamSection` retains four
  desktop tracks with explicit tablet and mobile fallbacks.
- Tests: content membership, removed-name absence, card count, responsive track
  count, and overflow are covered.
- Accessibility/security/privacy/operations: heading hierarchy and navigation
  anchors are preserved; no new personal data or operational dependency is
  introduced.
- Semantic versions and compatibility baseline: unchanged; this maintenance
  change does not authorize a release.

## Acceptance criteria

- [x] Only Miroslav Stanojevic and Wei Zhao render in the Landing Team section.
- [x] Longfei Li and Bharghav BK no longer render in public Landing content.
- [x] Desktop, tablet, and mobile grid behavior follows the requested layout.
- [x] The `team` anchor, Team heading/description, and Footer link remain intact.
- [x] Automated validation is recorded in the linked test report.
- [ ] Figma node `212:615` is synchronized.
- [ ] A named human reviewer approves the final visual result.

Validation evidence:
`docs/08-quality/test-reports/CR-2026-007-landing-team-membership-update-2026-10-23.md`.

## Migration and recovery

No data migration is required. Recovery is to revert this Change Request's
content, layout, tests, and registry updates together, restoring the four-member
historical Team baseline.

## Alternatives

- Two cards stretched across the full desktop row was rejected by the requester.
- Two cards centered at the historical card width was rejected by the requester.
- Waiting for Figma before implementation was rejected in favor of code-first
  delivery with an explicit pending-sync record.

## Decision

- Result: `implementation_requested_needs_review`
- Approver: pending; name not supplied
- Date: pending
- Conditions: Figma synchronization and named human visual approval remain
  required before this maintenance change can be described as approved.
