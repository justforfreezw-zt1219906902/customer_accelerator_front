---
phase: 2
name: Design Tokens
status: needs_review
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

- `npm run validate:management` — passed
- `npm run typecheck` — passed
- `npm run lint` — passed
- `npm run test:unit` — passed
- `npm run build` — passed
- Human visual/design review — pending

## Risks

- Missing modes or responsive intent
- Raw values copied without semantic roles
- Naming coupled to unstable Figma labels
- Accessibility conflicts in source values

## Recovery Strategy

Version token changes, preserve prior mappings, and provide compatible aliases
or migrations. Revert unapproved mappings rather than patching consumers.

## Status

`needs_review`

## Human Approval

`pending`

## Completion Report

Implementation completed on 2026-07-24 against Figma Design System `1.0.0`.
The Figma pages `00 Foundation` (`0:1`) and `01 Tokens` (`23:2`) were inspected
read-only. The implementation maps 45 two-mode color variables, 9 spacing
values, 6 radii, 5 opacity values, 3 motion durations, 6 font values, 2 stroke
values, 12 text styles, and 5 effect styles to CSS runtime variables and
TypeScript references.

No breakpoint collection or motion easing specification was present; neither
was invented. Figma percentage letter spacing was normalized losslessly to CSS
`em` values (for example, `-2.5%` to `-0.025em`). Figma variable names use `/`;
code uses semantic kebab-case CSS names and nested camelCase TypeScript keys.

The initial unit check incorrectly treated legitimate light-theme color
overrides as duplicate declarations. The check was corrected to permit only
color overrides across theme selectors, after which all required validation
passed. Human approval and visual review remain pending; no approval is claimed.
