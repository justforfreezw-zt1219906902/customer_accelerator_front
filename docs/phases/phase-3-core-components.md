---
phase: 3
name: Core Components
status: needs_review
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

- `npm run validate:management` — passed
- `npm run typecheck` — passed
- `npm run lint` — passed
- `npm run test:unit` — passed; 7 files, 20 tests
- `npm run build` — passed
- Read-only Figma inspection and canvas screenshot review — completed
- Human design review — pending

## Risks

- Product context leaking into Core
- Missing focus, disabled, error, or responsive states
- Public interfaces diverging from Figma variants
- Visual snapshots treated as accessibility proof

## Recovery Strategy

Revert the affected component and mapping together. Preserve the last approved
public interface; breaking changes require migration and approval.

## Status

`needs_review`

## Human Approval

`pending`

## Completion Report

Implementation completed on 2026-07-24 against Figma Design System `1.0.0`.
The `02 Core Components` page (`31:2`) and library canvas (`31:3`) were
inspected read-only.

Implemented:

- `AppButton` from `mi-goTo/Button` (`34:60`): Primary, Secondary, Ghost; SM,
  MD, LG; Default, Hover, Disabled. Loading was not implemented because Figma
  provides no loading state.
- `AppInput` from `mi-goTo/Input` (`35:26`): Default, Focus, Error, Disabled.
- `AppCard` from `mi-goTo/Card` (`36:22`): Default, Hover, Selected, Glass.
- `AppBadge` from `mi-goTo/Badge` (`41:42`): six confirmed types and three
  states.
- `AppSectionContainer` from `mi-goTo/Section Container` (`42:66`): four styles
  and three divider settings.

All components depend only on Vue primitives and approved CSS variables.
`Source Attribution Chip` (`167:14`) was discovered but not implemented because
it is not in the authorized Core registry. Automated validation passed.

Three intentional responsive, accessibility, and token-normalization
differences are recorded as `DEV-2026-001` through `DEV-2026-003`; human review
is pending. Phase 3 and its design review are not approved.
