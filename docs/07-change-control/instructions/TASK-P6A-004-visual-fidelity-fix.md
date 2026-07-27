# TASK-P6A-004 — Phase 6A Visual-Fidelity Fix

## Record

- Date: 2026-07-27
- Task ID: `TASK-P6A-004`
- Source Issue: `ISSUE-2026-003`
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Result: `needs_review`
- Human approval: pending
- Figma mode: read-only

## Figma nodes inspected

- Page: `212:2`
- Desktop frame: `212:3`
- Header instance: `212:4`
- Landing Header component: `105:464`
- Header logo: `105:452`
- Header navigation: `105:453`
- Header language switcher: `105:459`
- Footer instance: `212:737`
- Landing Footer component: `105:494`
- Footer columns: `I212:737;105:472`
- Footer divider: `I212:737;105:490`
- Footer bottom: `I212:737;105:491`
- Hero: `212:22`
- Hero copy: `I212:22;197:847`
- Hero validation data: `I212:22;197:856`
- Hero product stage: `I212:22;197:866`
- Account Intelligence panel: `168:41`
- Hero insufficient-data row: `222:32`
- Principle Section: `212:375`
- Principle panel: `I212:375;194:819`
- Principle component: `171:40`

## Fixes

1. Updated shared Navbar layout, logo, dimensions, alignment, language/CTA
   grouping, and responsive menu without duplicating Header markup.
2. Updated shared Footer to the 1180px Figma content width, narrower column
   structure, divider, spacing, and responsive stacking.
3. Added a Principle Panel variant that contains `INSUFFICIENT_DATA`, its
   heading, and explanation in one card. The Hero insufficient-data row also
   remains inside Account Intelligence.
4. Moved validation metrics into Hero copy below the pipeline kicker/actions
   and before Account Intelligence in semantic/visual order.

## Source conflict

Figma Header/Footer text differs from locked `CONTENT-HEADER` and
`CONTENT-FOOTER`. Examples include Figma Header `THE METHOD`, `PROOF`, and
`WHY MI-GOTO`, and a different Footer statement/navigation set. The task
explicitly prohibits silently choosing between conflicting sources. Locked
text was therefore preserved, while Figma-controlled non-conflicting layout
was implemented.

## Files created

- `src/assets/brand/mi-goto-lockup-light.png`
- `src/design-system/tokens/layout.ts`
- `tests/e2e/phase-6a-visual-fidelity.spec.ts`
- `docs/08-quality/test-reports/TASK-P6A-004-phase-6a-visual-fidelity-test-report-2026-07-27.md`

## Validation

- Type checking: passed
- ESLint: passed
- Unit/component tests: 72 passed in 23 files
- Production build: passed
- Playwright: tests created, execution blocked by missing Chromium binary
- Management validation: passed (5 suites, 0 failures)
- Documentation validation: passed (119 checks, 0 failures)
- Registry validation: passed (54 checks, 0 failures)
- Git diff check: passed

## Completion

Automated implementation work is complete. `TASK-P6A-004` and Phase 6A are
`needs_review`. `ISSUE-2026-003` remains open with
`implementation_fix_complete: true` until Tom completes browser review.
