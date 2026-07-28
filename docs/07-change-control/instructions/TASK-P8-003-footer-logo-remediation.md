# AI Instruction Record — TASK-P8-003 Footer Logo Remediation

## Task metadata

- Task ID: `TASK-P8-003`
- Date: 2026-07-28
- Tool: Codex
- Operator: Tom
- Starting baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Starting state: Phase 8 blocked by `ISSUE-2026-006`;
  `TASK-P8-002` reviewed as `CHANGES_REQUIRED`
- Final task status: `approved`
- Human approval: approved by Tom on 2026-07-28

## Permitted and prohibited scope

Permitted scope was the shared Footer logo, the smallest shared brand primitive
needed to remove Header/Footer duplication, directly affected layouts and
tests, and required governance records.

No backend or OpenAPI change, Figma write, unrelated Footer redesign, Source
Freeze, staging, commit, RC identifier, artifact or deployment was performed.
`.idea/workspace.xml` and `.DS_Store` were preserved.

## Failed human finding

Tom accepted the Header, Packages alignment and Not Found remediation from
`TASK-P8-002`, but rejected the Footer logo because it was visibly soft, had a
different-looking background, did not integrate with the Footer and did not
navigate Home.

## Figma read-only evidence

- Landing Footer component: `105:494`
- Landing Footer logo: `105:474`, 132×38
- Landing Footer instance: `212:737`
- Header component/logo comparison: `105:464` / `105:452`
- Compact Footer: `257:1671`

The Landing Header and Footer intend the same `Original mi-goTo lockup light`
source. The compact Footer has no Figma logo, so Tom's explicit global Footer
requirement is preserved through `CR-2026-005`.

## Root cause and correction

The Header used the transparent 649×188 high-density export. The Footer used a
separate legacy 124×36 raster rendered at 132×38 inside a non-interactive
`strong`, causing upscaling and softer rendering. Compact Footer variants had
no logo. No filter, opacity, transform, blend mode or border was the root cause.

Core `AppBrandLogo` now owns the approved transparent asset, accessible Home
link and Header/Footer size variants. `AppNavbar` and every `AppFooter` variant
reuse it. Shared layouts translate its Home event into approved SPA navigation.
The old asset is retained as historical content but is no longer referenced by
application code.

## Files created

- `src/design-system/components/core/AppBrandLogo.vue`
- `src/assets/brand/mi-goto-lockup-light-hidpi.png`
- `tests/unit/AppBrandLogo.spec.ts`
- `tests/e2e/phase-8-footer-logo-remediation.spec.ts`
- `docs/07-change-control/issues/ISSUE-2026-009-footer-logo.md`
- `docs/07-change-control/change-requests/CR-2026-005-compact-footer-brand.md`
- `docs/08-quality/test-reports/TASK-P8-003-footer-logo-remediation-2026-07-28.md`
- `docs/07-change-control/instructions/TASK-P8-003-footer-logo-remediation.md`

## Files modified

- Shared component exports, Navbar, Footer and shared layouts
- Footer/Navbar/routing unit tests and Phase 8 browser regression
- Asset, Figma, component, dependency, traceability and requirements records
- Phase 8 status, QA, Issue/Change Request registries and changelog
- `TASK-P8-002` instruction and test-report human-review appendices

## Validation results

- Version: 12 passed
- Documentation: 119 passed
- Compatibility: 19 passed
- Registries: passed after correcting dependency-map indentation and using the
  registry's established `implemented` status
- OpenAPI: 21 passed
- Management: passed
- Typecheck: passed
- ESLint: passed
- Unit/component/router: 120 passed in 33 files
- Production build: passed
- Playwright Chromium: 28 passed
- Footer-focused Chromium: 3 passed
- Responsive evidence: 1440, 1024, 768 and 390

The initial full browser run had two Phase 7 environment failures because the
preview build lacked the public local API URL. After rebuilding with the
documented public local configuration and blank owner, the full suite passed.

## Accessibility and regression evidence

The Footer brand exposes one `mi-goTo home` link, navigates to `/`, supports
keyboard activation and visible focus, and does not create duplicate Footer
landmarks or logos. Landing, Contact, Why, legal, Thank You and Not Found shared
layout coverage passed.

## Git and release impact

The working tree contains intended `TASK-P8-002` and `TASK-P8-003` source and
governance changes plus local `.idea/workspace.xml` and `.DS_Store` state.
Generated `dist`, Playwright and test-result output remains ignored. No changes
were discarded, staged or committed.

`ISSUE-2026-009` is `resolved_needs_verification`; `ISSUE-2026-006` remains
open. Source Freeze remains prohibited until Tom approves the Footer logo and a
separately authorized exact source-freeze commit is created.

## Final human review

Tom approved Footer logo clarity, transparent background integration, pointer
and keyboard Home navigation, and the global compact-Footer brand correction
on 2026-07-28. `TASK-P8-003` is approved; `ISSUE-2026-009` is resolved. The
exact Source Freeze is recorded separately by `TASK-P8-004`.
