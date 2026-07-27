---
phase: 4
name: Composite, Product, and Section Components
status: approved
human_approval: approved
---

# Phase 4: Composite, Product, and Section Components

## Goal

Create the reusable component layers required for page assembly while preserving
the approved dependency hierarchy.

## Scope

- Phase 4A: Composite Components built from Core
- Phase 4B: Product Components built from Core and Composite
- Phase 4C: Sections built from Core, Composite, and Product
- Mappings, interaction traceability, tests, accessibility, and review

Phase 4A implementation includes AppFormField, AppTextarea, AppSelect,
AppNavbar, AppFooter, typed default Header/Footer content, and tests.

Phase 4B implementation includes the seven registered Landing Product
Components, typed external content APIs, and component tests.

Phase 4C implementation includes the eight registered Landing Sections,
typed content and action inputs, stable anchor IDs, fluid responsive
composition, and Section tests.

## Out of Scope

- Page and route implementation
- Live backend integration
- Unspecified behavior or content
- Core changes made inside higher layers

## Required Inputs

- Approved Phase 3 Core Components
- Reviewed Figma inventories for all three layers
- Approved content and Product/Interaction Specifications

## Expected Outputs

- Composite component set
- Product component set
- Section set
- Tests, documentation, mappings, and dependency evidence

## Dependencies

```text
Phase 3 → Phase 4A → Phase 4B → Phase 4C
```

## Tasks

1. Confirm Phase 4A inventory and interfaces.
2. Implement and visually review Composite Components.
3. Confirm product behavior and content inputs.
4. Implement and test Product Components.
5. Confirm Section compositions and responsive intent.
6. Implement Sections without Page coupling.
7. Validate dependencies, mappings, accessibility, and documentation.

## Acceptance Criteria

- One-way dependencies are enforced.
- Composite visual review and Phase 4A approval are recorded.
- Product and Section behavior is traceable to approved specifications.
- Backend assumptions are absent or traceable to OpenAPI.
- Installed validation and build checks pass.
- Product-owner approval is recorded for Product Components and Sections.

## Validation

Phase 4A used the installed management validation, TypeScript typecheck, ESLint,
Vitest/Vue Test Utils component tests, and Vite production build. Tom approved
the reviewed implementation and known deviations on 2026-07-25.

Phase 4B used the same installed validation workflow. Tom approved the reviewed
Product implementation and known deviations on 2026-07-25.

Phase 4C used management validation, TypeScript typecheck, ESLint, Vitest/Vue
Test Utils, and the Vite production build. Automated checks passed. Tom
approved the reviewed Sections and known deviation on 2026-07-25.

## Risks

- Page behavior leaking into Sections
- Composite components becoming product-specific
- Missing content, interactions, or responsive states
- Cyclic or upward dependencies

## Recovery Strategy

Roll back the smallest affected subphase and preserve the last approved lower
layer. Move misplaced responsibility through a reviewed change.

## Status

Phase 4: `approved`

Phase 4A: `approved`; Phase 4B: `approved`; Phase 4C: `approved`.

## Human Approval

Phase 4 overall: `approved` after approval of all three subphases.

Phase 4A:

- Reviewer: Tom
- Result: `APPROVED`
- Date: 2026-07-25
- Reviewed task: `TASK-P4-001`
- Notes: good
- Evidence:
  `docs/08-quality/test-reports/phase-4a-task-p4-001-approval-2026-07-25.md`

Phase 4B:

- Reviewer: Tom
- Result: `APPROVED`
- Date: 2026-07-25
- Reviewed task: `TASK-P5-001`
- Original execution task: `TASK-P4B-001`
- Notes: good
- Evidence:
  `docs/08-quality/test-reports/phase-4b-task-p5-001-approval-2026-07-25.md`

Phase 4C:

- Reviewer: Tom
- Result: `APPROVED`
- Date: 2026-07-25
- Reviewed task: `TASK-P6-001`
- Original execution task: `TASK-P4C-001`
- Notes: good
- Accepted deviation: `DEV-2026-009`
- Evidence:
  `docs/08-quality/test-reports/phase-4c-task-p6-001-approval-2026-07-25.md`

## Completion Report

### Shared Header/Footer correction — 2026-07-27

- Task: `TASK-P4A-002`
- Source Issue: `ISSUE-2026-003`
- Figma Header: `212:4`
- Figma Footer: `212:737`
- Replaced the superseded Header/Footer content baseline with active Figma
  1.0.0 content.
- Corrected the shared Composite components, preserving a single source used
  by Marketing and Legal layouts.
- Added the Figma-confirmed 700 font-weight semantic token for the active EN
  state and Footer headings.
- Status: `needs_review`
- Human approval: pending

### Contact Header/Footer variants — 2026-07-28

- Task: `TASK-P4A-003`
- Change Request: `CR-2026-001`
- Figma Contact Header: `314:44`
- Figma Contact Footer: `257:1671`
- Added typed `contact` variants while retaining Landing as the default.
- Added exact typed Contact navigation and Footer content sources.
- Landing code, content, container width, and route destinations remain
  unchanged.
- Contact layout/route integration is intentionally deferred to
  `TASK-P6B-003`.
- Status: `needs_review`
- Human approval: pending

### Phase 4A

- Figma page `03 Composite Components` (`68:2`) was inspected read-only.
- Implemented the five authorized Composite components and typed Header/Footer
  content configuration.
- Composite code imports only Core components, Tokens through CSS variables,
  Vue framework primitives, and typed content.
- Navbar route targets remain configurable and unresolved for Phase 5.
- Phase 4B Product Components and Phase 4C Sections were not created.
- Automated validation evidence is recorded in
  `docs/08-quality/test-reports/phase-4a-composite-components-2026-07-25.md`.
- Tom approved Phase 4A and accepted `DEV-2026-004` through `DEV-2026-006`
  as known differences on 2026-07-25.
- Phase 4 remains `in_progress`; Phase 4B and Phase 4C are not started.

### Phase 4B

- Figma page `04 Product Components` (`81:2`) was inspected read-only.
- Implemented only the seven authorized Product component sets.
- All copy and numeric metrics are externally supplied through typed props or
  slots; no unsupported marketing claims are embedded.
- Product code uses Core components and approved CSS variables and has no
  Section or Page dependencies.
- Automated evidence is recorded in
  `docs/08-quality/test-reports/phase-4b-product-components-2026-07-25.md`.
- Tom approved Phase 4B and accepted `DEV-2026-007` and `DEV-2026-008` as
  known differences on 2026-07-25.
- Phase 4C authorization was not included in the Phase 4B approval.

### Phase 4C

- Phase 4B approval was confirmed before implementation.
- Figma page `05 Sections` (`87:2`) was inspected read-only.
- Implemented the eight authorized Section sets with typed props, slots, and
  stable IDs.
- `PackagesSection` maps to Figma `mi-goTo/Pricing Section` (`195:714`);
  prices and unapproved package claims are intentionally not part of its API.
- Figma sample statistics and performance claims were not embedded.
- Sections import only approved Core and Product components; none imports a
  Page or router.
- Responsive composition uses fluid, token-bounded grids because Figma 1.0.0
  has no approved breakpoint tokens.
- Final CTA defaults to `final-cta`; the provisional `contact` anchor remains a
  Phase 5 decision and was not treated as approved behavior.
- Automated evidence is recorded in
  `docs/08-quality/test-reports/phase-4c-landing-sections-2026-07-25.md`.
- Tom approved Phase 4C, `TASK-P6-001`, and the known `DEV-2026-009`
  responsive difference on 2026-07-25.
- With Phase 4A, 4B, and 4C approved, overall Phase 4 is approved.
