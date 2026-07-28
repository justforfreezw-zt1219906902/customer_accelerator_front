# Phase Gates

## Universal approval rule

A phase cannot become `approved` unless:

- acceptance criteria pass;
- required documents exist;
- affected registries are updated;
- compatibility impact is evaluated;
- failures and unresolved implementation defects are recorded as Issues;
- deviations are recorded and approved where applicable; and
- identifiable human approval is recorded.

Unavailable tools remain `planned`; they do not count as passed evidence.

## Phase 0 — Project Audit Gate

- Authoritative inputs reviewed or registered as missing
- Owners, versions, gaps, assumptions, risks, and dependencies recorded
- Backend contract and Figma source status documented
- Phase 1 readiness recommendation prepared
- Repository-native document/YAML validation completed
- Human audit approval recorded

## Phase 1 — Vue Foundation Gate

- Approved toolchain, application shell, configuration validation, and
  dependency boundaries exist
- Lint, type checking, tests, and production build commands pass
- Runtime, browser, accessibility, CI, and setup documentation exists
- No unauthorized product implementation is included
- Human foundation approval recorded

## Phase 2 — Design Tokens Gate

- Approved Figma version and token source mappings recorded
- Modes, aliases, fallbacks, responsive behavior, and deprecation documented
- Token validation and build pass
- Visual/accessibility implications reviewed
- Design reviewer approval recorded

## Phase 3 — Core Components Gate

- Core depends only on Tokens
- Required variants, states, semantics, keyboard, focus, and responsiveness exist
- Unit/component/accessibility/visual checks pass
- Component registry and Figma mappings updated
- Design reviewer approval recorded

## Phase 4 — Composite, Product, and Sections Gate

- Phase 4A → 4B → 4C dependency sequence respected
- No upward/cyclic dependencies or duplicate lower-layer styling
- Product and Section behavior traceable to interaction specifications
- Component, accessibility, responsive, and visual checks pass
- Required design and product approvals recorded

## Phase 5 — Routing and Interaction Gate

- Routes, links, CTAs, anchors, state transitions, form, success, and error flows
  documented and tested
- Locale, focus, scroll, analytics, consent, and fallback decisions recorded
- Backend fields are not inferred from UI
- Product-owner approval recorded

## Phase 6 — Static Pages Gate

- Landing, Contact, Data Protection, Imprint, Why mi-goTo, and Thank You Pages
  meet approved visual/content/route requirements
- Legal content has authorized approval
- Accessibility, responsive, visual, route, and build checks pass
- Static Contact does not claim live integration
- Design and product approvals recorded

## Phase 7 — Backend Integration Gate

- OpenAPI and contract revision are verified. Tom's `TASK-P7-001`
  implementation authorization permits review against `API-CONTRACT-R1`; the
  official Backend API version remains required for production release unless
  an explicit release deviation is approved.
- Contract mappings and `POST /api/lead` states are implemented and tested
- CORS, configuration, privacy, safe logging, error, timeout, retry, and duplicate
  decisions are resolved
- Contract/integration/end-to-end/security checks pass
- Backend-owner and product-owner approvals recorded

## Phase 8 — QA and Deployment Gate

- Full regression, browser, accessibility, responsive, visual, performance,
  security, contract, and end-to-end evidence is complete
- Release manifest matches the artifact and compatibility baseline
- Deployment, monitoring, support, privacy, Incident, and rollback readiness exist
- Production smoke tests pass after authorized deployment
- Product/release approval recorded
