# Changelog

## Unreleased

### Added

- Frontend `0.2.0` integrates the approved Contact flow with provisional
  `API-CONTRACT-R1`: typed runtime configuration, exact `POST /api/lead`
  mapping, safe response/error handling, duplicate prevention, cancellation
  support, privacy-safe Thank You navigation, and contract-focused tests.

- Figma-backed Thank You Page from Page `321:28` and desktop frame `321:29`,
  with typed EN content, shared Contact-style chrome, privacy-safe confirmation,
  responsive layout, and unit/browser coverage.

- The complete English Why mi-goTo Page from Figma frame `259:3`, with seven
  registered Sections, five exact Figma pillar assets, `WhyLayout`, typed Why
  Header/Footer variants, and desktop/mobile regression coverage.

- The Product Owner-approved English Imprint Page from Figma frame `122:3`,
  with ten current public content groups, typed source metadata, accessible
  internal navigation and responsive presentation.

- The complete 35-section English Data Protection Page from Product
  Owner-approved Figma frame `128:3`, with typed legal content, source
  revision metadata, accessible navigation, responsive presentation and tests.

### Approved

- Tom approved Phase 7 Backend Integration and `TASK-P7-001` on 2026-07-28.
  The approval covers the frontend implementation of `API-CONTRACT-R1`, not
  production release or assignment of an official Backend API semantic version.

- Tom approved Phase 6 — Static Pages through `TASK-P6-APPROVAL-001` on
  2026-07-28. All six subphases (6A–6F) are approved, and Phase 7 is planned.

- Tom approved Phase 6E and the Why Page implementation through
  `TASK-P6E-002` on 2026-07-28.

- Tom approved Phase 6C through review task `TASK-P6C-003` on 2026-07-28.
  Professional legal review remains deferred under the recorded Product Owner
  risk acceptance.

### Governance

- Phase 8 Release Candidate preparation stopped at its entry Gate.
  `ISSUE-2026-006` records the temporary Not Found shell and uncommitted
  candidate source; no RC artifact or production deployment was created.

- Figma Design System advanced to `1.1.0` and Frontend App to `0.1.0` for the
  compatible new Thank You Page; backend remains unassigned at `0.0.0`.

- `CR-2026-002` records Tom's explicit approval for Why-specific shared Header
  and Footer variants without changing Figma version `1.0.0`.

- Phase 6D Imprint implementation stopped at the legal-content Gate after
  read-only Figma inspection. `ISSUE-2026-005` records the missing
  authoritative source and unresolved transitional authority wording; no
  application code was changed.

- Typed Contact Header and Footer variants based on Figma nodes `314:44` and
  `257:1671`, with exact Contact-specific EN content configuration and
  component regression tests.

- Phase 5B typed route infrastructure, shared Marketing and Legal layouts,
  accessible route title/focus and anchor behavior, unknown-route fallback,
  approved navigation destinations, and temporary Page shells.
- Unit coverage for registered routes, Header/Footer destinations, anchors,
  titles, scroll behavior, language availability, and Not Found routing.

## 2026-07-25 — Phase 4B human approval

### Approved

- Tom approved Phase 4B Product Components and `TASK-P5-001` with review notes
  “good”
- Accepted `DEV-2026-007` and `DEV-2026-008` as known differences

### Changed

- Updated Phase 4B from `needs_review` to `approved`
- Advanced the next gate to Phase 4C Landing Sections Authorization

### Evidence preserved

- All Phase 4B automated validation results remain recorded
- Phase 4 remains `in_progress`; Phase 4C remains `not_started`

## 2026-07-25 — Phase 4B Landing Product Components

### Added

- Seven Figma-backed Landing Product components with typed external content APIs
- Product component barrel exports and seven unit/component test files
- Product Figma mappings, traceability, validation, and deviation records

### Changed

- Advanced Phase 4B to `needs_review` while keeping Phase 4 `in_progress`

### Constraints preserved

- No Sections, Pages, page-level copy, unsupported marketing claims, Figma
  writes, or new dependencies
- Human visual review remains pending

## 2026-07-25 — Phase 4A human approval

### Approved

- Tom approved Phase 4A Composite Components and `TASK-P4-001` with review
  notes “good”
- Accepted `DEV-2026-004` through `DEV-2026-006` as known differences

### Changed

- Updated Phase 4A from `needs_review` to `approved`
- Advanced the next gate to Phase 4B Product Components Authorization

### Evidence preserved

- All Phase 4A automated validation results remain recorded
- Phase 4 remains `in_progress`; Phase 4B and Phase 4C remain `not_started`

## 2026-07-25 — Phase 4A Composite Components

### Added

- AppFormField, AppTextarea, AppSelect, AppNavbar, and AppFooter
- Typed default Header and Footer content configuration
- Composite component tests and Figma node traceability

### Changed

- Advanced Phase 4 to `in_progress` and Phase 4A to `needs_review`
- Recorded three pending Figma-to-code deviations

### Status

- Human visual review remains pending
- Product Components, Sections, Pages, routes, and backend integration were not implemented

## 2026-07-25 — Phase 3 human approval

### Approved

- Tom approved Phase 3 Core Components and `TASK-P3-001` with review notes “good”
- Approved `DEV-2026-001` through `DEV-2026-003` as known differences

### Changed

- Updated Phase 3 from `needs_review` to `approved`
- Advanced the next gate to Phase 4A Composite Components Authorization

### Evidence preserved

- All Phase 3 validation results remain recorded
- Approved deviations remain active and traceable
- The compatibility baseline remains not approved

## 2026-07-24 — Phase 3 Core Components

### Added

- Token-backed AppButton, AppInput, AppCard, AppBadge, and
  AppSectionContainer components
- Typed APIs, native accessible semantics, Core barrel exports, and component tests
- Figma node mappings, Phase 3 validation evidence, and three pending deviations

### Validation

- Management validation, typecheck, ESLint, 20 unit/component tests, and
  production build passed

### Status

- Phase 3 is `needs_review`
- Human design review and deviation approval remain pending
- No Composite, Product, Section, or Page implementation was created

## 2026-07-24 — Phase 2 human approval

### Approved

- Tom approved Phase 2 Figma Tokens and `TASK-P2-001` with review notes “Good”
- Recorded approval evidence under `docs/08-quality/test-reports/`

### Changed

- Updated Phase 2 from `needs_review` to `approved`
- Advanced the next gate to Phase 3 Core Components Authorization

### Evidence preserved

- All Phase 2 validation results remain recorded
- Breakpoint and motion-easing source gaps remain unresolved
- The compatibility baseline remains not approved

## 2026-07-24 — Phase 2 design tokens

### Added

- Figma-backed color, typography, spacing, radius, shadow, motion, opacity, and
  stroke tokens as runtime CSS variables with TypeScript references
- Dark Enterprise and Light Impact color modes
- Token integrity and CSS/TypeScript parity tests

### Changed

- Imported the design-system theme from the application entry
- Replaced the temporary Phase 1 base stylesheet with reset and global theme files
- Advanced Phase 2 to `needs_review`

### Unresolved

- Breakpoints, motion easing, font asset delivery/licensing, and human visual approval

## 2026-07-24 — Phase 1 human approval

### Approved

- Tom approved Phase 1 and `TASK-P1-001` with review notes “good”
- Recorded the approval under `docs/08-quality/test-reports/`

### Changed

- Updated Phase 1 from `needs_review` to `approved`
- Advanced the next gate to Phase 2 Design Tokens Authorization

### Evidence preserved

- Playwright browser execution remains pending and is not reported as passed
- Browser, CI, accessibility, and IDE tracking policies remain follow-up
  decisions
- The compatibility baseline remains not approved

## 2026-07-24 — Phase 1 Vue foundation

### Added

- Vue 3, Vite, strict TypeScript, Vue Router, and npm lockfile
- Minimal RouterView application shell, temporary foundation Page, layout,
  public environment validation, and base styling
- ESLint, Prettier, Vitest, Vue Test Utils, and Playwright configuration
- Unit and end-to-end foundation specifications
- Phase 1 validation, traceability, and instruction evidence

### Changed

- Advanced the current phase to Phase 1 with status `needs_review`
- Extended the documentation-only package manifest while preserving all six
  management validation scripts

### Validation

- Management validation, formatting, typecheck, lint, unit tests, build, and
  npm security audit passed
- Playwright browser installation and end-to-end execution remain pending

### Constraints preserved

- No final Product Page, Header, Footer, design-system component, Product
  Component, Section, contact form, or backend integration was implemented
- No Pinia dependency or wrapper project directory was created

## 2026-07-24 — Phase 0 human approval

### Approved

- Tom approved Phase 0 and `TASK-P0-001` with the review note “Good”
- Recorded approval evidence under `docs/08-quality/test-reports/`

### Changed

- Updated Phase 0 from `needs_review` to `approved`
- Advanced the next gate to Phase 1 Vue Foundation Authorization

### Constraints preserved

- Compatibility remains pending the official Backend API version
- Phase 1 is not started or authorized by this approval record
- No application code or dependency was changed

## 2026-07-24 — Phase 0 repository audit

### Audited

- Confirmed the Git repository root, clean starting state, tracked IDE files,
  package-manager evidence, local Node/npm versions, absent frontend toolchain,
  absent application paths, and absence of wrapper directories
- Recorded Phase 1 stack recommendations, alternatives, risks, and blocking
  human decisions

### Changed

- Moved Phase 0 from `planned` to `needs_review`
- Recorded completed audit execution while preserving `pending` human approval

### Constraints preserved

- No dependency was installed
- No Vue or other application code was created or modified
- No wrapper project directory was created

## 2026-07-24 — Management validation and audit

### Added

- Dependency-free Node.js validation for versions, documentation,
  compatibility, registries, OpenAPI, and the complete management system
- Minimal documentation-tooling `package.json`
- Management-system audit and STEP-010 instruction traceability

### Changed

- Added management readiness metadata to the current state and Phase 0 status

### Constraints preserved

- Phase 0 remains `planned`, unexecuted, and pending human approval
- Backend `0.0.0` remains an unassigned non-release placeholder
- No Vue application code, dependency installation, or wrapper directory was
  created

All notable changes to mi-goTo Frontend are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versioned
artifacts follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Phase 6B static Contact Page UI with exact Figma copy, four confirmed lead
  fields, typed validation, accessible errors, loading protection, and tests.
- Phase 6A Landing regression audit, impact matrix, Chromium evidence, and
  regression tests for the preview fallback, Team/FAQ anchors, and Final CTA.
- Phase 6A visual-fidelity corrections for shared Header/Footer layout, Hero
  validation placement, insufficient-data card containment, responsive
  evidence tests, and exact Figma logo usage.
- Phase 6A Landing Page composition, approved English content configuration,
  Team, FAQ, evidence metrics, and Page-level component tests.
- Phase 6A Figma, registry, traceability, validation, and review evidence.
- Phase 5A Product Interaction Specification covering proposed routes, Header
  and Footer destinations, anchors, locale behavior, mobile navigation,
  Contact states, safe errors, and twenty-one human decisions.
- Human approval record for the Phase 5A specification, preserving the supplied
  duplicate review task identifier as a documented traceability conflict.
- Phase 5A approval reconfirmation under unique reviewed task `TASK-P7-001`,
  while preserving the earlier approval evidence.
- Read-only Figma Page evidence for Landing, Why mi-goTo, Imprint, Data
  Protection, and Contact.
- Phase 4C Landing Sections with typed content contracts, stable anchor IDs,
  Figma-traceable variants, lower-layer composition, and component tests.
- Phase 4C Figma mappings, validation evidence, implementation baseline,
  traceability, design review, and instruction records.

### Changed

- Integrated the Figma-approved Contact Header and compact Footer variants
  through a dedicated shared `ContactLayout`, while preserving Landing and
  Legal route chrome.
- Updated `/contact` routing, accessibility focus behavior, and Contact/Landing
  Chromium regression coverage for `TASK-P6B-003`.
- Removed the unapproved Landing preview fallback from the DOM, explicitly
  bound Team/FAQ anchors, and aligned the Primary Final CTA with Figma
  `212:716`.

- Initial governance and documentation directory structure.
- Root project documentation and AI working agreement.
- Machine-readable version and compatibility baseline.
- Phase 0 Project Audit plan.
- Environment variable template.
- Documentation index.
- Bootstrap instruction record.
- Governance baseline covering the project charter, independent sources of
  truth, architecture, ownership, completion, versioning, naming, and AI work.
- Roadmap, machine-readable current/phase status, milestones, dependency map,
  and planned Phase 1 through Phase 8 documents.
- Normalized Phase 0 section headings while preserving its planned, unexecuted,
  and pending-approval content.
- Phase 0 input maps for Figma, backend, content, assets, environment,
  assumptions, constraints, and unresolved decisions.
- Planned Figma baseline, token/component/Section/Page registries, visual review,
  and deviation records.
- Planned Vue 3 layered architecture, source structure, dependencies, routes,
  interactions, state, content, errors, and accessibility guidance.
- Backend Contract Revision 1 OpenAPI and supporting API overview, compatibility,
  integration, error, authentication, and change documentation.
- Compatibility matrix, empty implementation baseline, initial requirements
  traceability, and release-baseline version-change workflows.
- Change-control classification, initial risk register, deviation log, directory
  guidance, and reusable governance/review templates.
- Quality strategy and phase gates, release/rollback/environment planning,
  operations runbooks and policies, and evidence templates.

## [0.0.1] - 2026-07-24

### Added

- Initialized the planning baseline for mi-goTo Frontend.
