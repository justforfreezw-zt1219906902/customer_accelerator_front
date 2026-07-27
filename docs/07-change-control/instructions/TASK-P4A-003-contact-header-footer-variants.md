# TASK-P4A-003 — Contact Header and Footer Shared Variants

## Record

- Date: 2026-07-28
- Tool: Codex
- Operator: AI implementation assistant
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Source: `CR-2026-001`, `TASK-P6B-002`, `DEV-2026-010`
- Status: `needs_review`
- Human approval: pending
- Figma mode: read-only

## Sources read

Working agreement, versions, Phase 4 and Phase 6 specifications, approved
Change Request, Contact chrome audit, interaction specification, registries,
dependency map, content inventory, Figma mapping/baseline, shared components,
tests, content configuration, and every current component consumer.

## Figma evidence

- Contact Page/frame: `269:2`, `269:3`
- Contact Header: `314:44`
- Contact Footer: `257:1671`
- Landing Header regression source: `212:4`
- Landing Footer regression source: `212:737`

Contact Header is logo + HOME with 188px desktop side padding, 22px vertical
padding, and a subtle bottom border. Contact Footer is a compact 120px row with
188px side padding, copyright, and Home/Imprint/Data protection links.

## Implementation

- Added typed `contact` variants to `AppNavbar` and `AppFooter`.
- Made `landing` the explicit default while preserving legacy approved
  presentation variants.
- Added exact Contact EN navigation and Footer configuration.
- Added the Figma-confirmed semantic Contact desktop padding variable.
- Preserved shared accessibility events, focus styles, and navigation emits.
- Added responsive Contact behavior that preserves content/hierarchy without
  inventing a mobile Figma composition.
- Did not add route detection, router access, duplicated chrome, ContactLayout,
  or route integration.

## Files created

- `src/content/navigation/contact.en.ts`
- `src/content/footer/contact.en.ts`
- This instruction record

## Files modified

- Shared Navbar/Footer components and their content types
- Theme variables and Navbar/Footer unit tests
- Component/content/Figma/traceability registries
- Phase, roadmap, Change Request, baseline, changelog, and dependency records

## Files preserved

Landing Header/Footer content, `MarketingLayout`, `ContactPage.vue`, routes,
other layouts, backend integration, and unrelated repository work.

## Validation

- Management validation: passed (all 5 validators)
- Documentation validation: passed (119 checks)
- Registry validation: passed (54 checks)
- Compatibility validation: passed (19 checks)
- Version validation: passed (12 checks through management validation)
- OpenAPI validation: passed (21 checks through management validation)
- TypeScript typecheck: passed
- ESLint: passed
- Unit/component tests: 86 passed in 26 files
- Focused Navbar/Footer tests: 14 passed
- Playwright Chromium: 6 passed (4 Landing regression, 2 Contact UI)
- Production build: passed
- Git diff whitespace check: passed

## Errors and deviations

No new deviation. Figma provides no Contact mobile frame; responsive behavior
preserves the approved hierarchy and uses existing project responsive
conventions. Human responsive review remains required.

The first Playwright attempt could not bind local port `127.0.0.1:4173`
inside the restricted sandbox (`EPERM`). It was rerun with the permitted local
preview-server capability and all six relevant Chromium tests passed.

## Human review

Pending Contact Header and Footer Variant Review. The approved Change Request
remains open until integration and human review are complete.

## Git commit

Not created by this task.
