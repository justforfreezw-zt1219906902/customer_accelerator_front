# TASK-P8-002 — Release Candidate entry remediation

## Record

- Date: 2026-07-28
- Tool: Codex
- Product Owner: Tom
- Stakeholder reviewer: Miroslav
- Status: `approved`
- Phase 8 status after TASK-P8-004: `in_progress`
- Starting baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Starting HEAD: `c137702ae25ac2c3320116c9cced8eaa682a9383`
- Previous blocked task: `TASK-P8-001`
- Preserved blocker: `ISSUE-2026-006`
- New Issues: `ISSUE-2026-007`, `ISSUE-2026-008`
- Approved correction: `CR-2026-004`

## Stakeholder findings

Miroslav reported a soft/inconsistent Header logo with missing Home behavior and
uneven Packages cards/CTAs. Tom accepted both findings as release-blocking and
approved exact remediation requirements. Tom also approved the exact Not Found
copy and use of existing design language without a separate Figma frame.

## Figma inspection

Read-only inspection used Figma file `vyr3TvF5lAUOnuuxdW8iRb`.

- Landing Header: `105:464`
- Brand group: `105:451`
- Logo: `105:452`
- Landing Packages band: `212:453`
- Pricing Section: `195:629`
- Package Grid: `195:633`
- Package cards: `226:1076`, `195:634`, `195:659`, `195:689`
- CTA source: Button `34:60`

No Figma write occurred. The logo presentation exists in Figma. The Figma
Packages instances remain content-height staggered, so the stakeholder-approved
alignment correction is recorded in `CR-2026-004`.

## Root causes and implementation

### Logo

The shared Navbar rendered a 124×36 PNG at its intrinsic 124×36 size and
wrapped it in a non-interactive `span`. This caused high-DPI softness and no
consistent Home navigation.

The fix uses Figma's transparent 649×188 asset at 124×36 CSS pixels, preserves
aspect ratio, removes any opaque Header wrapper, and makes the one shared brand
an accessible `/` link named `mi-goTo home`. Shared layouts handle SPA
navigation; the plain href preserves normal browser behavior.

### Packages

Cards used intrinsic content height, the featured-center variant translated one
grid item upward, and badge/content/CTA regions had no shared row structure.

The fix retains one repeated template, stretches cards, reserves a badge
region, lets the feature region grow and anchors a full-width CTA region at the
bottom. No content was removed, truncated or absolutely positioned.

### Not Found

The temporary `PageShell` copy was replaced by the exact approved 404 content,
an approved `AppButton` Home action, responsive token-backed presentation and
shared `MarketingLayout` chrome. The catch-all remains last and its route name
is now exactly `NotFound`; title is `Page not found | mi-goTo`. No backend
request, search or external link was added.

## Files created

### Intended RC source

- `src/assets/brand/mi-goto-lockup-light-hidpi.png`
- `tests/e2e/phase-8-rc-entry-remediation.spec.ts`

### Intended RC governance records

- `docs/07-change-control/issues/ISSUE-2026-007-shared-header-logo.md`
- `docs/07-change-control/issues/ISSUE-2026-008-packages-alignment.md`
- `docs/07-change-control/change-requests/CR-2026-004-packages-alignment.md`
- `docs/08-quality/test-reports/TASK-P8-002-rc-entry-remediation-2026-07-28.md`
- `docs/07-change-control/instructions/TASK-P8-002-rc-entry-remediation.md`

## Files modified

### Intended RC source

- `playwright.config.ts`
- `src/components/sections/PackagesSection.vue`
- `src/design-system/components/composite/AppNavbar.vue`
- `src/layouts/ContactLayout.vue`
- `src/layouts/MarketingLayout.vue`
- `src/layouts/WhyLayout.vue`
- `src/pages/NotFoundPage.vue`
- `src/router/routes.ts`
- `tests/unit/AppNavbar.spec.ts`
- `tests/unit/LandingSections.spec.ts`
- `tests/unit/Routing.spec.ts`

### Intended RC governance records

- `CHANGELOG.md`
- `docs/01-roadmap/current-state.yaml`
- `docs/01-roadmap/phase-status.yaml`
- `docs/02-inputs/figma-source-map.yaml`
- `docs/03-design-system/component-registry.yaml`
- `docs/03-design-system/page-registry.yaml`
- `docs/03-design-system/section-registry.yaml`
- `docs/04-frontend/route-map.yaml`
- `docs/06-traceability/implementation-baseline.yaml`
- `docs/06-traceability/requirements-traceability.yaml`
- `docs/07-change-control/change-requests/README.md`
- `docs/07-change-control/issues/ISSUE-2026-006-phase-8-release-candidate-entry-gate.md`
- `docs/07-change-control/issues/README.md`
- `docs/08-quality/qa-summary.yaml`
- `docs/phases/phase-8-qa-deployment.md`

## Tests and validation

- Management: passed, 5 scripts
- Docs: passed, 119 checks
- Version: passed, 12 checks
- Compatibility: passed, 19 checks
- Registries: passed, 61 checks
- OpenAPI: passed, 21 checks
- Typecheck: passed
- ESLint: passed
- Unit/component/router: 116 passed
- Focused Chromium: 4 passed
- Full Chromium: 25 passed with public local API test configuration
- Production build: passed
- Git diff check: passed
- TASK-P8-002 formatting: passed
- Repository-wide formatting: failed because 14 unrelated, pre-existing files
  are not Prettier-clean; they were preserved.

The initial 4173 remediation run reached a stale pre-existing preview server
and was not accepted as evidence. Playwright now supports `E2E_PORT`; the final
tests used isolated port 4174. A subsequent full run initially lacked the
production-build API URL, then passed after rebuilding the ignored test artifact
with the public local URL and blank owner. No secret was used.

## Visual, responsive and accessibility evidence

Local ignored evidence exists for Header, Packages and Not Found at 1440, 1024,
768 and 390. Desktop card top, bottom and CTA coordinates passed within 2 CSS
pixels. Logo uniqueness, accessible name, focus and keyboard Home activation
passed on all registered shared-layout Pages. Human visual approval remains
pending.

## Git working-tree classification

- Intended RC source: all source, test and Playwright configuration paths listed
  above.
- Intended RC governance: all documentation paths listed above.
- Generated test evidence: `dist/`, `test-results/`, `playwright-report/`;
  ignored and not candidates for a future source commit.
- User-specific/local-only: `.DS_Store`; untracked and must remain excluded.
- Unrelated or ambiguous changes: none detected at final inspection.

No change was discarded. No file was staged. No commit, RC ID, RC artifact or
deployment was created.

## Remaining Gate conditions

1. Tom/Miroslav visually approve Header logo, Packages alignment and Not Found.
2. Issue statuses are updated after that review.
3. The exact intended source/governance set is reviewed and committed in a
   separately authorized source-freeze task.
4. `ISSUE-2026-006` is resolved only after the exact commit exists.

## Human review evidence — 2026-07-28

Tom reviewed `TASK-P8-002` and returned `CHANGES_REQUIRED`.

- Automated validation: passed
- Header logo: passed visual review
- Packages alignment: passed visual review
- Not Found Page: passed visual review
- Footer logo: failed visual review for sharpness, background integration and
  missing Home navigation
- Overall remediation approval: pending
- Source Freeze: prohibited
- Follow-up task: `TASK-P8-003`

The original implementation result and evidence above remain unchanged.

## Final human review evidence — 2026-07-28

After `TASK-P8-003` corrected the Footer, Tom completed the final combined
visual review.

- Final result: `APPROVED`
- Header logo: approved
- Footer logo: approved
- Packages alignment: approved
- Not Found Page: approved
- Task status: `approved`
- Source Freeze authorization: granted for `TASK-P8-004`
- Evidence:
  `docs/08-quality/test-reports/TASK-P8-002-TASK-P8-003-visual-approval-2026-07-28.md`

The earlier `CHANGES_REQUIRED` result remains historical evidence.
