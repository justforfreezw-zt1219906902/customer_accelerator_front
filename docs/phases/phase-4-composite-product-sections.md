---
phase: 4
name: Composite, Product, and Section Components
status: not_started
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
- Composite visual approval is recorded.
- Product and Section behavior is traceable to approved specifications.
- Backend assumptions are absent or traceable to OpenAPI.
- Installed validation and build checks pass.
- Product-owner approval is recorded for Product Components and Sections.

## Validation

**Planned.** Use Phase 1-approved installed lint, type checking, tests, build,
dependency-boundary, visual, and accessibility workflows.

## Risks

- Page behavior leaking into Sections
- Composite components becoming product-specific
- Missing content, interactions, or responsive states
- Cyclic or upward dependencies

## Recovery Strategy

Roll back the smallest affected subphase and preserve the last approved lower
layer. Move misplaced responsibility through a reviewed change.

## Status

Phase 4: `not_started`

Phase 4A: `not_started`; Phase 4B: `not_started`; Phase 4C: `not_started`.

## Human Approval

`pending`

## Completion Report

Not available. It must later report each subphase, dependency evidence, mappings,
validation, deviations, compatibility impact, and approvals.
