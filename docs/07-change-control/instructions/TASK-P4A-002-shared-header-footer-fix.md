# TASK-P4A-002 — Shared Header/Footer Fidelity Fix

## Record

- Date: 2026-07-27
- Source Issue: `ISSUE-2026-003`
- Source audit:
  `docs/03-design-system/header-footer-fidelity-audit.md`
- Impact matrix:
  `docs/06-traceability/header-footer-impact-matrix.yaml`
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Figma mode: read-only
- Status: `needs_review`
- Human approval: pending

## Figma evidence

- Header instance: `212:4`
- Header source component: `105:464`
- Footer instance: `212:737`
- Footer source component: `105:494`

The nodes were reinspected before implementation. Figma version remains
`1.0.0`.

## Implementation

- Replaced superseded Header navigation with `THE PROBLEM`, `THE METHOD`,
  `PROOF`, `PACKAGES`, and `WHY MI-GOTO` in Figma order.
- Preserved approved destinations: Landing anchors, `/why-mi-goto`, and the
  Strategy Discussion CTA to `/contact`.
- Kept EN active and DE/CN visible but unavailable, matching the Figma visual
  weights without pretending translations exist.
- Rebuilt the desktop Header hierarchy as brand, navigation, and language/CTA
  groups inside the single shared `AppNavbar`.
- Replaced superseded Footer copy and navigation with exact Figma content.
- Implemented the 370px + three 180px desktop column geometry inside the
  semantic 1180px Landing container.
- Separated the Footer divider and bottom row to preserve the Figma 38px major
  spacing and added the required right-hand statement.
- Kept responsive stacking and accessible mobile navigation.

## Shared consumers

The shared fix is inherited by Landing, Why mi-goTo, Contact, Thank You,
Imprint, Data Protection, and Not Found. No Page-level Header or Footer copy or
override was added.

## Validation

- Management validation: passed, 5 suites
- Documentation validation: passed, 119 checks
- Registry validation: passed, 54 checks
- Type checking: passed
- ESLint: passed
- Unit/component tests: passed, 73 tests in 23 files
- Production build: passed
- Git diff check: passed
- Affected Playwright suite: passed, 3 Chromium tests.

The Playwright suite contains 1440px and 390px Header/Footer captures plus a
seven-consumer shared-layout regression. Chromium was installed with explicit
human permission. The generated screenshots remain pending human review and
were not automatically approved.

## Remaining scope

`ISSUE-2026-003` remains open. `TASK-P6A-006` must remove the unintended
Principle fallback, perform the Landing regression, and obtain human visual
verification.
