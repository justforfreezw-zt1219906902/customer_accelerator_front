---
phase: 4
name: Composite, Product, and Section Components
status: in_progress
human_approval: pending
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

## Risks

- Page behavior leaking into Sections
- Composite components becoming product-specific
- Missing content, interactions, or responsive states
- Cyclic or upward dependencies

## Recovery Strategy

Roll back the smallest affected subphase and preserve the last approved lower
layer. Move misplaced responsibility through a reviewed change.

## Status

Phase 4: `in_progress`

Phase 4A: `approved`; Phase 4B: `not_started`; Phase 4C: `not_started`.

## Human Approval

Phase 4 overall: `pending`.

Phase 4A:

- Reviewer: Tom
- Result: `APPROVED`
- Date: 2026-07-25
- Reviewed task: `TASK-P4-001`
- Notes: good
- Evidence:
  `docs/08-quality/test-reports/phase-4a-task-p4-001-approval-2026-07-25.md`

## Completion Report

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
