# STEP-005: Design System and Frontend Architecture

## Task purpose

Create the planning baseline for the Figma-aligned design system and Vue 3
frontend architecture without creating implementation code.

## Input files read

- `AGENTS.md`
- `VERSION.yaml`
- `docs/phases/phase-0-project-audit.md`
- `docs/02-inputs/figma-source-map.yaml`
- `docs/00-governance/architecture-principles.md`
- `docs/01-roadmap/current-state.yaml`
- Existing `docs/03-design-system/` and `docs/04-frontend/` contents
- Current Git status

## Files created

- Eight files under `docs/03-design-system/`
- Nine files under `docs/04-frontend/`
- `docs/07-change-control/instructions/STEP-005-design-frontend.md`

## Files modified

- `CHANGELOG.md` — recorded the design-system and frontend planning baseline.

## Existing content preserved

- Governance, roadmap, input, Phase, and previous instruction records
- Phase 0 status and approval state
- Existing `.idea/workspace.xml` changes outside task scope

## Planning constraints applied

- No Figma node IDs, token values, variants, tests, or approval were invented.
- Planned paths do not claim that files exist.
- All component and Page implementation statuses remain `not_started`.
- All token categories remain `pending_extraction`.
- Provisional interactions are separated from `decision_required` behavior.
- No global state package is selected.

## Missing Figma information

- Page, Section, component, variable, style, and token node IDs
- Token names, values, modes, aliases, and breakpoints
- Component variants, states, properties, and behavior
- Section ordering and composition
- Page responsive states and viewport coverage
- Fonts, assets, licenses, motion, and accessibility intent
- Thank You Page design
- Human reviewer, review date, and visual approval

## Unresolved interaction decisions

- Anchor IDs, scroll offset, focus, history, and reduced-motion behavior
- Contact/Strategy CTA source tracking, query parameters, and analytics
- Form fields, validation, consent, payload, success, errors, timeout, retry,
  duplicates, privacy, and value persistence
- Production and development submission behavior
- Direct access to `/thank-you`
- Locale code, URL strategy, persistence, fallback, and switching behavior
- Not-found, legacy redirects, external links, mobile navigation, analytics,
  consent, support, and incident behavior

## Validation

- Parsed all design-system and frontend YAML registries successfully.
- Verified 7 token categories, 17 components, 8 Sections, 6 Pages, the exact
  dependency map, and 6 routes.
- Confirmed all implementation and design-review states remain non-approved.
- Confirmed the interaction map contains all required provisional destinations
  and `decision_required` markers.
- Verified no `src/`, Vue, package, or wrapper project was created.
- Checked whitespace and final Git status; STEP-005 changes remain uncommitted.

## Human approval

**pending**
