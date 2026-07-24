---
phase: 2
name: Design Tokens
status: not_started
human_approval: pending
---

# Phase 2: Design Tokens

## Goal

Translate approved Figma foundations into traceable semantic design tokens.

## Scope

- Inventory primitive and semantic tokens
- Map color, typography, spacing, radius, elevation, breakpoints, and motion
- Define modes, aliases, fallbacks, responsive use, and deprecation rules
- Produce token mappings and visual evidence

## Out of Scope

- Unapproved Figma changes
- Component, route, page, content, or backend implementation

## Required Inputs

- Approved Phase 1 foundation
- Accessible, reviewed Figma source and confirmed semantic version
- Design reviewer and approved token naming rules

## Expected Outputs

- Versioned token definitions
- Token inventory and Figma mappings
- Usage and migration documentation
- Automated and visual validation evidence

## Dependencies

- Phase 1 approved
- Figma baseline reviewed and version confirmed

## Tasks

1. Inventory Figma variables, styles, modes, and gaps.
2. Classify primitive and semantic tokens.
3. Document naming and transformations.
4. Implement tokens within the approved foundation.
5. Add validity and duplication checks.
6. Produce visual evidence.
7. Submit for design review.

## Acceptance Criteria

- Tokens are traceable to the approved Figma version.
- Names, modes, fallbacks, and responsive rules are documented.
- Installed validation and build checks pass.
- Visual review is completed.
- Design reviewer approval is recorded.

## Validation

**Planned.** Use Phase 1-approved installed commands plus a token-validation
workflow only after it is selected and documented.

## Risks

- Missing modes or responsive intent
- Raw values copied without semantic roles
- Naming coupled to unstable Figma labels
- Accessibility conflicts in source values

## Recovery Strategy

Version token changes, preserve prior mappings, and provide compatible aliases
or migrations. Revert unapproved mappings rather than patching consumers.

## Status

`not_started`

## Human Approval

`pending`

## Completion Report

Not available. It must later list the Figma version, mappings, validation,
visual evidence, deviations, compatibility impact, and approval.

