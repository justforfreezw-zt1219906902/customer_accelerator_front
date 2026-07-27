---
issue_id: ISSUE-2026-003
status: resolved
priority: high
source_task: TASK-P6A-003
resolving_task: TASK-P6A-006
human_approval: approved
implementation_fix_complete: true
resolution_date: "2026-07-27"
human_reviewer: Tom
header_footer_fix_complete: true
next_audit_task: TASK-P6A-005
shared_fix_task: TASK-P4A-002
landing_regression_task: TASK-P6A-006
---

# ISSUE-2026-003 — Phase 6A visual fidelity

## Classification

- Type: Issue
- Date opened: 2026-07-27
- Human reviewer: Tom
- Review result: REJECTED — changes required
- Affected phase: Phase 6A — Landing Page
- Figma version: `1.0.0`
- Frontend version: `0.0.1`
- Baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Owner: Product owner / Tom

## Findings

### FINDING-P6A-001 — Header mismatch

The implemented Header does not match the approved Figma Landing Page
prototype. The differences include content and visual/structural differences,
with possible spacing, order, sizing, or alignment differences.

The correction must continue using the shared `AppNavbar` component, match the
approved Figma Header, and preserve the locked Header content source.

### FINDING-P6A-002 — Footer mismatch and excessive width

The implemented Footer does not match the approved Figma prototype. The
differences include content and visual/structural differences. Its content area
is too wide, and its column layout and container width do not match the
approved prototype.

The correction must continue using the shared `AppFooter` component.

### FINDING-P6A-003 — `INSUFFICIENT_DATA` outside its card

The text content is correct, but it is visually or structurally rendered
outside the intended card. It must be contained inside the correct
Figma-derived card with the approved padding, hierarchy, and layout.

### FINDING-P6A-004 — Hero validation-data placement

The validation-data block in the Hero product preview is placed incorrectly.
It must appear to the left of `Account Intelligence` and underneath
`PREDICTABLE ENTERPRISE PIPELINE`, matching the approved Figma composition.

### FINDING-P6A-005 — Unintended Principle fallback

Tom's `TASK-P6A-004` review found `Preview content is not available.` below the
`INSUFFICIENT_DATA` card. Figma node `171:40` contains no such fallback. The
source is the default `emptyText` branch in
`src/components/sections/ProductPreviewSection.vue`, activated by the
Principle-panel use in `src/pages/LandingPage.vue`.

### FINDING-P6A-006 — Header remains inconsistent

The shared Header remains inconsistent with the active Figma Header instance
`212:4`, including visible content, order, hierarchy, language presentation,
and reviewed visual composition.

### FINDING-P6A-007 — Footer remains inconsistent and too wide

The shared Footer remains inconsistent with active Figma Footer instance
`212:737`. Human review again found excessive rendered width, plus content,
column, hierarchy, spacing, and typography differences.

### FINDING-P6A-008 — Unapproved preview fallback remains visible

The generic text `Preview content is not available.` rendered after the
approved Principle card, although no such node exists in Figma `212:375`.

### FINDING-P6A-009 — Footer Team link navigation

Human review reported that the Footer Team link reached FAQ rather than Team.
The approved destination is `/#team`, with unique `team` and `faq` roots and
working cross-route scroll behavior.

### FINDING-P6A-010 — Final CTA mismatch

The Contact/Final CTA directly above Footer `212:737` did not match Figma
instance `212:716` in boundary, hierarchy, alignment, width, spacing, and
responsive composition.

## Affected components and files

- `src/design-system/components/composite/AppNavbar.vue`
- `src/design-system/components/composite/AppFooter.vue`
- `src/layouts/MarketingLayout.vue`
- `src/pages/LandingPage.vue`
- `src/components/sections/ProductPreviewSection.vue`
- `src/components/sections/HeroSection.vue`
- `src/content/header/defaultHeaderContent.ts`
- `src/content/navigation/en.ts`
- `src/content/footer/defaultFooterContent.ts`
- `src/content/footer/en.ts`
- `src/content/landing/en.ts`
- Related Header, Footer, Hero, and Landing Page tests

Locked Header and Footer content records remain authoritative. Listing a file
as affected does not authorize rewriting approved content.

## Reproduction steps

1. Start the current frontend locally using the approved project tooling.
2. Open `/` in a browser at the approved desktop review viewport.
3. Compare the Header with Figma `06 Landing Page`, Header node `212:4`.
4. Compare the Footer with Figma `06 Landing Page`, Footer node `212:737`.
5. Inspect the card containing `INSUFFICIENT_DATA`.
6. Inspect the Hero preview placement of validation data relative to
   `PREDICTABLE ENTERPRISE PIPELINE` and `Account Intelligence`.
7. Repeat the comparison at supported responsive widths to ensure corrections
   do not regress responsive behavior.

## Expected result

- Shared Header and Footer components visually and structurally match the
  approved Figma Landing prototype while preserving locked content.
- Footer content width and columns match the prototype.
- `INSUFFICIENT_DATA` is contained in its intended card.
- Hero validation data appears left of `Account Intelligence` and below
  `PREDICTABLE ENTERPRISE PIPELINE`.
- Existing responsive and accessible behavior remains functional.

## Actual result

Tom's browser review found all four visual-fidelity failures recorded above.
The automated checks for `TASK-P6A-003` passed, but they did not prove visual
fidelity.

## Acceptance criteria

This Issue may only be resolved when:

1. Header structure and content match the approved Figma source.
2. Footer structure, content, and width match the approved Figma source.
3. `INSUFFICIENT_DATA` is inside the intended card.
4. Hero validation data is left of `Account Intelligence` and below
   `PREDICTABLE ENTERPRISE PIPELINE`.
5. Existing responsive behavior remains functional.
6. Header and Footer remain shared components.
7. Automated tests pass.
8. Human browser review passes.
9. `Preview content is not available.` is absent from the Principle-panel DOM.

## Resolution

Tom reviewed `TASK-P6A-004` on 2026-07-27 and returned `CHANGES REQUIRED`.
Therefore the Issue remains `open` and
`implementation_fix_complete: false`.

Automated evidence confirms:

1. shared Header and Footer components remain in use;
2. locked Header/Footer content and ordering are preserved;
3. the Footer uses the Figma-derived semantic 1180px content width;
4. both insufficient-data contexts are descendants of their intended cards;
5. Hero validation data is inside Hero copy and precedes Account Intelligence;
6. type checking, lint, 71 unit/component tests, build, management,
   documentation, and registry validation pass.

Playwright evidence tests were added for 1440px and 390px. Execution is pending
the previously unresolved Playwright Chromium browser installation.

### Authoritative-source decision

Tom explicitly decided that the active Figma prototype is authoritative for
Header/Footer visible content and presentation. Earlier content configuration
or documentation that conflicts with Figma is outdated and must be corrected
by `TASK-P4A-002`. Figma remains version `1.0.0`.

The impact audit is `TASK-P6A-005`. After the shared fix,
`TASK-P6A-006` must remove the unintended Principle fallback and perform the
Landing regression review. Audit evidence is retained in
`docs/03-design-system/header-footer-fidelity-audit.md` and
`docs/06-traceability/header-footer-impact-matrix.yaml`.

### Shared Header/Footer correction

`TASK-P4A-002` implemented the active Figma 1.0.0 Header and Footer at their
shared Composite layer. The previous Header/Footer content baseline is
superseded. The task is `needs_review`, and human approval remains pending.

The Issue remains open because the unintended Principle fallback and
Landing-specific regression/human verification remain assigned to
`TASK-P6A-006`.

### Landing regression correction

`TASK-P6A-006` removed the unapproved fallback from the DOM, explicitly bound
unique Team and FAQ anchors, verified the Footer Team destination `/#team`,
and aligned the Primary Final CTA with Figma nodes `212:716` and `90:1157`.

Type checking, lint, 74 unit/component tests, production build, and four
Playwright Chromium tests pass. Desktop and mobile screenshots were generated
as evidence but are not automatically approved.

The implementation fix is complete. The Issue remains `open` until Tom
completes the Phase 6A Full Browser and Figma Fidelity Review.

### Final resolution — 2026-07-27

Tom completed the final browser and Figma-fidelity review for
`TASK-P6A-006` and returned `APPROVED`.

- All documented findings are fixed.
- Management, documentation, registry, compatibility, type checking, ESLint,
  unit/component, production build, and Git diff checks passed.
- Four Playwright Chromium tests passed.
- Tom verified the affected UI at 1440px and 390px.
- No blocking child Issue or undocumented Figma deviation remains.
- Resolver task: `TASK-P6A-006`
- Human reviewer: Tom
- Resolution date: 2026-07-27
- Status: `resolved`

## Human approval

Approved by Tom on 2026-07-27 for `TASK-P6A-006`. Earlier rejected reviews and
repair evidence remain preserved above as historical context.
