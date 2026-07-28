# ISSUE-2026-008 — Packages card and CTA alignment inconsistency

## Metadata

- Status: `resolved`
- Severity: `release_blocking`
- Reported by: Miroslav
- Accepted by: Tom
- Date: 2026-07-28
- Owner: Frontend / Product owner
- Environment: Landing Page
- Baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Affected phase: Phase 8
- Resolution task: `TASK-P8-002`
- Human verification: `approved`

## Requirement

At desktop width, all four package cards must share aligned top and bottom
edges and aligned `STRATEGY DISCUSSION` CTA regions. Approved content must
remain complete and responsive cards must not overlap.

Figma evidence: Packages band `212:453`, Pricing Section `195:629`, Package Grid
`195:633`, and cards `226:1076`, `195:634`, `195:659`, `195:689`.

## Expected behavior

One repeated card structure uses equal-height grid items, a consistent badge
region, a growing content region and a bottom CTA region.

## Actual behavior

The featured-center variant translated one grid item upward and cards sized
themselves to different content heights. CTA positions followed content length.

## Reproduction

1. Open `/#packages` at 1440px.
2. Compare all four card top and bottom coordinates.
3. Compare the CTA coordinates, including the Recommended card.

## Impact

The uneven pricing grid looks unstable and makes package comparison harder.
There is no backend, privacy or content impact.

## Resolution

- Root cause: per-card intrinsic height, an explicit featured-card transform,
  no reserved badge region and no growing content row.
- Fix: stretch one shared card template, reserve the badge row, grow the
  features row and anchor every CTA region at the bottom.
- Compatibility/version impact: no semantic-version change during remediation.
- Approved visual correction: `CR-2026-004`.

## Validation

- Tests: `tests/unit/LandingSections.spec.ts`,
  `tests/e2e/phase-8-rc-entry-remediation.spec.ts`
- Desktop bounding-box tolerance: 2 CSS pixels.
- Human visual verification: pending at 1440, 1024, 768 and 390.

## Human review

- Reviewer: Tom
- Result: `approved`
- Date: 2026-07-28
- Notes: All four card tops, bottoms and CTA regions align acceptably; the
  Recommended badge and responsive behavior are accepted.
