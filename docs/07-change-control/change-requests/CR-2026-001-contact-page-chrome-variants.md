# CR-2026-001: Contact Page Chrome Variants

## Metadata

- Status: `approved`
- Requested by: Tom
- Date: 2026-07-28
- Owner: Product owner / Tom
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Target phase: Phase 6B
- Source task: `TASK-P6B-001`
- Review task: `TASK-P6B-002`
- Composite implementation task: `TASK-P4A-003`
- Integration task: `TASK-P6B-003`
- Related deviation: `DEV-2026-010`
- Affected architecture: shared layouts and shared Composite Components
- Human approval: `approved`

## Current requirement or design

The approved Phase 5 route map assigned `/contact` to `MarketingLayout`, which
renders the Landing/default `AppNavbar` and `AppFooter`. `TASK-P6B-001`
followed that architecture and recorded the resulting visual difference as
`DEV-2026-010`.

## Requested change

Contact must use Figma `10 Contact Page` chrome:

- Header node `314:44`: logo plus `HOME`, 188px desktop horizontal padding,
  22px vertical padding, dark background, and bottom border.
- Footer node `257:1671`: compact 120px editorial footer, 188px desktop
  horizontal padding, copyright plus Home/Imprint/Data protection links.

Landing continues to use Header node `212:4` and Footer node `212:737`.
Shared architecture must be retained using typed variants or composition.

## Reason and expected value

Tom's visual review found that identical Landing and Contact chrome is not the
approved design. Page-specific variants preserve Figma fidelity without
duplicating raw Header/Footer markup in a Page.

## Scope

- In scope: typed Contact variants for `AppNavbar` and `AppFooter`; planned
  `ContactLayout`; `/contact` layout assignment; responsive and regression
  tests; documentation and traceability.
- Out of scope: changing Landing chrome, changing unrelated routes, backend
  submission, translations, invented external URLs, or raw chrome markup in
  `ContactPage.vue`.

## Impact analysis

- Requirements: extend Header/Footer fidelity requirements with Contact nodes.
- Figma: Design System `1.0.0`; Contact nodes `314:44` and `257:1671`;
  Landing comparison nodes `212:4` and `212:737`.
- Backend/OpenAPI: no impact.
- Content/locales/legal: Contact Header shows `HOME`; Contact Footer shows
  copyright, Home, Imprint, and Data protection. EN only; no translations.
- Frontend: `AppNavbar.vue`, `AppFooter.vue`, typed content configuration,
  planned `ContactLayout.vue`, layout exports, and Contact route assignment.
- Tests: component variant tests, Contact route/layout tests, 1440px and 390px
  visual regression, plus Landing regression protection.
- Accessibility: Home and legal items must be real accessible links; focus,
  skip-link, and mobile behavior must remain functional.
- Versions: no semantic version is changed by this governance decision.
  Compatibility baseline remains `DS1.0.0_API0.0.0_FE0.0.1`.

## Acceptance criteria

- [x] `AppNavbar` exposes a typed Contact variant matching node `314:44`.
- [x] `AppFooter` exposes a typed compact Contact variant matching node
      `257:1671`.
- [x] `ContactLayout` composes those shared variants.
- [x] `/contact` uses `ContactLayout`.
- [x] `ContactPage.vue` contains no duplicated Header/Footer markup.
- [x] Landing Header/Footer remain unchanged and pass component regression
      checks.
- [x] Other routes remain unchanged by `TASK-P4A-003`.
- [x] Component, route, accessibility, responsive, and visual tests pass after
      Contact integration.
- [x] Human browser/Figma review approves the result.

## Migration and recovery

Implement the shared Composite variants first under `TASK-P4A-003`, then
integrate them through `ContactLayout` under `TASK-P6B-003`. If validation
fails, revert only the Contact variant and layout assignment while preserving
the approved Landing variants and this decision history.

## Alternatives

- Keep identical Marketing chrome: rejected by Tom because it does not match
  Contact Figma.
- Duplicate chrome in `ContactPage.vue`: rejected because it violates shared
  architecture and creates drift.
- Modify Landing chrome to match Contact: rejected because Landing is already
  approved against its own Figma source.

## Decision

- Result: `approved`
- Approver: Tom
- Date: 2026-07-28
- Conditions: shared typed variants or composition; no Landing regression; no
  raw Page-level chrome duplication; unrelated routes unchanged.

## Implementation progress

`TASK-P4A-003` implemented the shared typed variants and exact Contact content.
`TASK-P6B-003` implemented `ContactLayout`, assigned `/contact` to it, and
passed automated Contact, Landing, Legal, accessibility, responsive, and build
regression checks.

- Implementation status: `complete`
- Human implementation approval: `approved`
- Implementation approver: Tom
- Implementation approval date: 2026-07-28
- Review notes: `good`
- Next gate: `Phase 6C Data Protection Page Review`

The approved Change Request is fully implemented and its implementation was
approved by Tom on 2026-07-28.
