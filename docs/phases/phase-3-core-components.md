---
phase: 3
name: Core Components
status: not_started
human_approval: pending
---

# Phase 3: Core Components

## Goal

Build accessible reusable primitives that depend only on approved Tokens.

## Scope

- Confirm Core component inventory
- Implement approved variants, states, responsive behavior, and semantics
- Add usage documentation, tests, and Figma mappings
- Perform accessibility and visual review

## Out of Scope

- Composite, Product, Section, or Page implementation
- Route, content, submission, or backend behavior

## Required Inputs

- Approved Phase 2 tokens
- Reviewed Figma Core inventory
- Approved interaction, accessibility, naming, and test expectations

## Expected Outputs

- Core component library
- Usage and accessibility documentation
- Tests and visual evidence
- Figma-to-code mappings

## Dependencies

- Phase 2 approved
- Core may depend only on Tokens

## Tasks

1. Register the approved component inventory.
2. Define public interfaces, states, and semantics.
3. Implement components using Tokens only.
4. Test behavior, keyboard use, focus, and states.
5. Validate responsive and visual variants.
6. Document usage and limitations.
7. Submit for design review.

## Acceptance Criteria

- Core dependencies are limited to Tokens.
- Required variants, accessibility, and responsiveness are implemented.
- Installed lint, type checking, tests, and build pass.
- Mappings and documentation are current.
- Design reviewer approval is recorded.

## Validation

**Planned.** Use only Phase 1-approved installed lint, type checking, test,
build, visual, and accessibility workflows.

## Risks

- Product context leaking into Core
- Missing focus, disabled, error, or responsive states
- Public interfaces diverging from Figma variants
- Visual snapshots treated as accessibility proof

## Recovery Strategy

Revert the affected component and mapping together. Preserve the last approved
public interface; breaking changes require migration and approval.

## Status

`not_started`

## Human Approval

`pending`

## Completion Report

Not available. It must later enumerate components, mappings, dependency checks,
validation, deviations, compatibility impact, and design approval.

