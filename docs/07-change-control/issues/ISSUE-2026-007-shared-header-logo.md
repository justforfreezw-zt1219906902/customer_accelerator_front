# ISSUE-2026-007 — Shared Header logo rendering and navigation inconsistency

## Metadata

- Status: `resolved_needs_verification`
- Severity: `release_blocking`
- Reported by: Miroslav
- Accepted by: Tom
- Date: 2026-07-28
- Owner: Frontend / Product owner
- Environment: shared-layout Pages
- Baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Affected phase: Phase 8
- Resolution task: `TASK-P8-002`
- Human verification: `pending`

## Requirement

The shared Header must render the approved Figma brand mark sharply, without an
opaque background mismatch, and expose one keyboard-accessible link named
`mi-goTo home` that navigates to `/` on every shared-layout Page.

Figma evidence: Landing Header `105:464`, brand group `105:451`, logo
`105:452`.

## Expected behavior

One shared, transparent, high-density logo is used through `AppNavbar`. Its
link works from Landing, Why mi-goTo, Contact, Data Protection, Imprint, Thank
You and Not Found.

## Actual behavior

The Header used a 124×36 PNG at its intrinsic display size inside a non-link
`span`. It appeared softer on high-DPI displays and had no consistent Home
navigation.

## Reproduction

1. Open any registered Page on a high-DPI display.
2. Compare the logo with adjacent navigation text and Header background.
3. Attempt to activate the brand by pointer or keyboard.

## Impact

The visual defect weakens brand fidelity. The missing Home link is also a
navigation and keyboard-accessibility defect across all shared-layout Pages.

## Resolution

- Root cause: low-density raster source plus non-interactive shared brand
  wrapper.
- Fix: use the transparent 649×188 Figma-provided asset at 124×36 CSS pixels;
  make the shared brand an accessible `/` link; route through each shared
  layout when SPA navigation is enabled.
- Compatibility/version impact: no semantic-version change during remediation.

## Validation

- Tests: `tests/unit/AppNavbar.spec.ts`, `tests/unit/Routing.spec.ts`,
  `tests/e2e/phase-8-rc-entry-remediation.spec.ts`
- Human visual verification: pending at 1440, 1024, 768 and 390.

## Human review

- Reviewer: Tom
- Result: `header_portion_passed`
- Date: 2026-07-28
- Notes: Header correction is acceptable. Footer defects are tracked separately
  by `ISSUE-2026-009`.
