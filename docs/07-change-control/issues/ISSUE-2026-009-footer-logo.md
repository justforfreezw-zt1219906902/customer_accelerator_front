# ISSUE-2026-009 — Footer logo rendering, background and navigation inconsistency

## Metadata

- Status: `resolved_needs_verification`
- Severity: `release_blocking`
- Reported by: Tom
- Originally observed by: Miroslav
- Date: 2026-07-28
- Owner: Frontend / Product owner
- Baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Affected phase: Phase 8
- Affected component: shared `AppFooter`
- Affected pages: Landing, Why mi-goTo, Contact, Data Protection, Imprint,
  Thank You and Not Found
- Resolution task: `TASK-P8-003`
- Human verification: `pending`

## Requirement

Every shared Footer must use the same approved transparent high-density brand
source as the Header, with no visibly different wrapper background. It must
render one keyboard-accessible `mi-goTo home` link to `/`.

## Expected behavior

The Footer logo is crisp at normal and high DPI, preserves the Figma aspect
ratio, integrates with the Footer background and provides a consistent Home
recovery action on every Page.

## Actual behavior

Landing/Legal Footer variants still imported the legacy 124×36 asset and
rendered it at 132×38 inside a non-interactive `strong`. Compact Contact/Why
Footers rendered no logo at all.

## Figma evidence

- Landing Footer component: `105:494`
- Landing Footer logo: `105:474`, intended size 132×38
- Landing Page Footer instance: `212:737`
- Header comparison: `105:464`, logo `105:452`
- Compact Footer: `257:1671`, which originally has no logo

Tom's explicit requirement to add the shared brand to compact Footers is
recorded as `CR-2026-005`.

## Impact

The defect is release-blocking because brand rendering differs between Header
and Footer, the old asset is visibly softer, and Footer brand navigation is
missing. It affects visual fidelity, keyboard navigation and consistent Page
recovery.

## Resolution

- Root cause: duplicated Header/Footer logo markup, different asset references,
  upscaling of the old raster, non-link Footer markup, and no compact-Footer
  brand slot.
- Fix: introduce Core `AppBrandLogo`, reuse the transparent 649×188 Figma asset
  in Header and every Footer variant, and route its accessible Home event
  through shared layouts.
- Legacy asset remains preserved as historical repository content but is no
  longer referenced by application code.

## Validation

- Unit/component/router tests: 120 passed in 33 files
- Full Chromium suite: 28 passed
- Footer-focused Chromium tests: 3 passed
- Chromium evidence: 1440, 1024, 768 and 390
- Typecheck, ESLint, production build and management validation: passed
- Human subjective sharpness verification: pending

## Human review

- Reviewer: pending
- Result: `pending`
- Date: pending
