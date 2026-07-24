# Naming Conventions

## General rules

- Use English for machine-readable identifiers.
- Use lowercase kebab-case for documentation and configuration filenames unless
  a tool requires otherwise.
- Use stable identifiers and never recycle an ID.
- Zero-pad sequence numbers to three digits.
- Preserve aliases and traceability when renaming an artifact.
- Avoid unexplained abbreviations.

## Governance identifiers

| Artifact | Format | Example |
| --- | --- | --- |
| Requirement | `REQ-AREA-NNN` | `REQ-LEAD-001` |
| Task | `TASK-PHASE-NNN` | `TASK-P2-001` |
| Change Request | `CR-YYYY-NNN` | `CR-2026-001` |
| Issue | `ISSUE-YYYY-NNN` | `ISSUE-2026-001` |
| Incident | `INC-YYYY-NNN` | `INC-2026-001` |
| Deviation | `DEV-YYYY-NNN` | `DEV-2026-001` |
| Architecture Decision | `ADR-NNN` | `ADR-001` |
| Release | `REL-FE-X.Y.Z` | `REL-FE-0.1.0` |

`AREA` is a registered domain such as `LEAD`, `NAV`, `CONTENT`, or `AUTH`.
`PHASE` uses `P0` through `P8`. Year-based sequences restart annually; other
sequences are repository-wide unless their registry states otherwise.

Record filenames start with the lowercase identifier and a concise kebab-case
title, for example `cr-2026-001-update-lead-contract.md`.

## Vue components

These rules apply only after Vue implementation is authorized:

- Filenames and exported names use PascalCase: `AppButton.vue`.
- Core and Composite names use the approved `App` convention.
- Product components use domain language.
- Section components end in `Section`.
- Page components end in `Page`.
- Composables use `use` plus camelCase.
- Avoid generic names such as `Component.vue`, `Box.vue`, or `NewForm.vue`.

## Routes

- Paths use lowercase kebab-case: `/why-mi-goto`.
- Route names use stable PascalCase: `WhyMiGoto`.
- Dynamic parameters use descriptive camelCase: `:accountId`.
- Redirect, trailing-slash, locale, and canonical policies require an approved
  routing specification.

## Content files

- Filenames use lowercase kebab-case and an explicit locale where localized:
  `landing-page.en.json`.
- Use confirmed BCP 47 locale tags.
- Keys use stable lower camelCase grouped by semantic purpose.
- Do not use final copy or visual position as a key.
- Locale files preserve matching key structures.

## Design tokens

- Token names progress from category to role to state using lowercase dot
  notation: `color.action.primary.default`.
- CSS custom properties mirror paths in kebab-case:
  `--color-action-primary-default`.
- Primitive and semantic layers must be distinguishable.
- Do not put Figma node IDs into public token names.
- Modes, responsive variants, aliases, and deprecations must be documented.

## Figma mappings

- Mapping IDs use `MAP-FIGMA-NNN`.
- Records include file key, node ID, Figma version, code target, variants,
  responsive intent, mapping status, reviewer, and approval.
- Filenames use the mapping ID and target:
  `map-figma-001-app-button.md`.
- Do not invent node IDs.

## API schemas

- OpenAPI schema names use stable PascalCase domain names such as
  `LeadRequest` and `LeadResponse`.
- Request, response, error, and shared schema responsibilities remain explicit.
- Generated code retains contract-derived names or records mappings.
- Frontend convenience types must not masquerade as authoritative OpenAPI
  schemas.

## Tests

- Component tests mirror component names: `AppButton.spec.ts`.
- Unit, integration, contract, accessibility, and end-to-end responsibilities
  remain distinguishable through location or naming.
- Test names describe observable behavior, not private implementation.
- Requirement and issue IDs should be linked in test metadata or traceability
  records where supported.

