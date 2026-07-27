# TASK-P6A-006 — Landing Regression and Figma-Fidelity Fix

## Record

- Date: 2026-07-27
- Tool: Codex
- Operator: AI implementation assistant
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Source issue: `ISSUE-2026-003`
- Status: `approved`
- Human approval: approved by Tom on 2026-07-27
- Figma mode: read-only
- Prompt reference:
  `/Users/zhaowei/.codex/attachments/39d472b5-a1e1-4216-bdd2-5168cfb0e9df/pasted-text.txt`

## Permitted Scope

- Remove the unapproved Landing preview fallback.
- Correct and verify Team/FAQ anchors.
- Correct the Landing Final CTA immediately before the Footer.
- Update affected tests, traceability, status, and evidence.

## Prohibited Scope Preserved

- No wrapper directory.
- No Figma writes.
- No Header/Footer redesign or broad rewrite.
- No invented content, routes, assets, translations, prices, or statistics.
- No automatic visual approval or Issue closure.

## Files Read

- `AGENTS.md`, `VERSION.yaml`, Phase 6 and Issue records
- `TASK-P4A-002`, `TASK-P6A-003`, and `TASK-P6A-004` records
- Header/Footer audit and impact matrix
- Figma baseline/source map and Section/Page registries
- Interaction/route records, Footer configuration, Landing components, and tests

## Figma Evidence

- Landing Page `212:2`
- Desktop frame `212:3`
- Team `212:615`
- FAQ `212:666`
- Final CTA band `212:715`
- Final CTA instance `212:716`
- Final CTA source component `90:1157`
- Footer `212:737`
- Principle section `212:375`
- Principle source panel `171:40`

## Implementation

- Removed the generic `emptyText` prop and fallback paragraph from
  `ProductPreviewSection`; the unapproved message no longer exists in the DOM.
- Explicitly bound Landing Team and FAQ roots to `team` and `faq`.
- Confirmed the shared Footer Team destination remains `/#team`.
- Corrected the Primary Final CTA outer boundary and nested panel alignment,
  widths, spacing, padding, border, radius, glow, and responsive contraction.
- Preserved exact approved CTA content and `STRATEGY DISCUSSION` destination.
- Kept `AppFooter`, `AppNavbar`, and `AppButton` shared and unchanged.

## Validation

- Type checking: passed
- ESLint: passed
- Unit/component tests: 74 passed in 23 files
- Production build: passed
- Playwright Chromium: 4 passed
- Screenshot evidence: generated at 1440px and 390px
- Management validation: passed, 5 suites
- Documentation validation: passed, 119 checks
- Registry validation: passed, 54 checks
- Compatibility validation: passed, 19 checks
- Human browser/Figma review: approved by Tom at 1440px and 390px

## Errors

The first Playwright attempt could not bind the local preview port inside the
sandbox (`EPERM`). It was rerun with explicit elevated permission and passed.

## Completion

The implementation fix is complete and `TASK-P6A-006` is approved.
Phase 6A is approved; Phase 6 remains `in_progress`.
`ISSUE-2026-003` is resolved. Approval evidence is recorded in
`docs/08-quality/test-reports/TASK-P6A-006-phase-6a-approval-2026-07-27.md`.
