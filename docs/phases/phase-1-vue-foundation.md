---
phase: 1
name: Vue Foundation
status: approved
human_approval: approved
---

# Phase 1: Vue Foundation

## Goal

Establish an approved minimal Vue foundation with repeatable development,
configuration, quality validation, and architectural boundaries.

## Scope

- Select and record Vue, build, TypeScript, package-manager, and runtime versions
- Create the approved application shell and source boundaries
- Configure public environment validation
- Establish lint, type checking, tests, and production build workflows
- Document browser, accessibility, dependency, and developer setup policies

## Out of Scope

- Design-token extraction
- Product components, Sections, final product routes or Pages, or backend integration
- Production deployment

## Required Inputs

- Approved Phase 0 readiness recommendation
- Approved runtime, package manager, browser, accessibility, CI, and hosting expectations
- Environment and security requirements

## Expected Outputs

- Minimal Vue foundation
- Locked dependency and configuration records
- Working validation commands
- Architecture and setup documentation
- Foundation test evidence

## Dependencies

- Phase 0 approved
- Toolchain and technical constraints confirmed

## Tasks

1. Record toolchain decisions and versions.
2. Initialize only the approved foundation.
3. Implement configuration validation without exposing secrets.
4. Configure validation and build workflows.
5. Define directory and dependency boundaries.
6. Add foundation tests and documentation.
7. Prepare human review evidence.

## Implemented Toolchain

- Package manager: npm `11.6.0`
- Node pin: `24.2.0`; package engine floor `>=22.12.0`
- Vue: `3.5.40`
- Vue Router: `4.6.4`
- Vite: `7.3.6`
- TypeScript: `5.9.3`
- Vue type checking: `vue-tsc` `3.3.8`
- ESLint: `9.39.5`
- Prettier: `3.9.6`
- Vitest: `3.2.7`
- Vue Test Utils: `2.4.11`
- Playwright Test: `1.61.1`
- Styling: CSS Variables plus scoped CSS
- Global state package: none

Exact resolved versions are locked in `package-lock.json`.

## Implemented Foundation

- Root Vite entry and HTML document
- `main.ts`, RouterView-based `App.vue`, and Vue Router
- Temporary foundation-only Page and basic application layout
- Global foundation stylesheet and scoped Page/layout styles
- Public environment parsing and URL validation
- Strict TypeScript configuration
- ESLint flat configuration and scoped Prettier formatting
- Vitest/Vue Test Utils unit test
- Playwright configuration and foundation smoke specification
- Required application, validation, and management scripts
- Planned architecture directories directly under the repository root

No final Landing Page, Header, Footer, design-system component, Product
Component, Section, contact form, or backend integration was implemented.

## Acceptance Criteria

- [x] Approved tooling, shell, configuration, and boundaries are implemented.
- [x] Lint, type checking, unit tests, and production build pass.
- [x] Runtime and current Playwright browser target are documented.
- [x] No product-page implementation is included.
- [x] Documentation and affected traceability records are current.
- [x] Playwright configuration and pending browser-installation status are
  explicitly recorded; execution is accepted as a non-blocking follow-up.
- [x] Supported browser policy, CI environment, and accessibility conformance
  target are explicitly recorded as deferred decisions accepted at review.
- [x] Human foundation approval is recorded.

## Validation

Executed on 2026-07-24:

| Command | Result |
| --- | --- |
| `npm install` | passed; 329 packages audited during installation |
| `npm run validate:management` | passed; 5 child validators |
| `npm run format` | passed for Phase 1 application/configuration scope |
| `npx prettier --check .` | passed |
| `npm run typecheck` | passed |
| `npm run lint` | passed |
| `npm run test:unit` | passed; 1 file and 1 test |
| `npm run build` | passed; 33 modules transformed |
| `npm audit --audit-level=high` | passed; 0 vulnerabilities |
| `npm run test:e2e` | pending; Playwright browser binaries not installed |

The initial unrestricted `latest` dependency attempt was rejected because
TypeScript `7.0.2` did not satisfy the `typescript-eslint` peer range and the
latest Vue compiler chain required a newer Node runtime. Compatible stable
ranges were selected without `--force` or `--legacy-peer-deps`.

The first lint run exposed an incorrect flat-config parser order for `.vue`
files. The Vue parser configuration was corrected and the full lint run then
passed.

## Risks

- Premature package selection
- Unconfirmed browser, CI, and hosting requirements
- Client-visible configuration mistaken for secret storage
- Foundation shaped by unapproved page assumptions
- Playwright smoke coverage cannot run until browser binaries are explicitly installed
- Supported browser, CI, and accessibility baselines remain unconfirmed

## Recovery Strategy

Preserve the pre-foundation baseline in version control. Revert the smallest
affected setup change, restore locked versions, and record toolchain replacement
as an architecture decision.

## Status

`approved`

## Human Approval

- Reviewer: **Tom**
- Review result: **APPROVED**
- Review date: **2026-07-24**
- Reviewed task: `TASK-P1-001`
- Review notes: **good**
- Evidence:
  `docs/08-quality/test-reports/phase-1-task-p1-001-approval-2026-07-24.md`

Approval accepts the documented pending Playwright browser execution,
supported-browser policy, CI environment, and accessibility target as
non-blocking follow-up decisions. It does not report those checks as passed.

## Completion Report

The minimal Vue foundation was implemented directly in the existing repository
root using npm. Existing management metadata and all six management validation
scripts were preserved. No wrapper directory or Pinia dependency was created.

Management validation, formatting, type checking, lint, unit testing, build,
and dependency audit pass. Playwright is configured and its smoke specification
exists, but browser binary installation and execution remain pending.

There is no Figma deviation because this foundation does not implement the
visual design system. Foundation CSS variables are temporary infrastructure,
not extracted or approved design tokens. The active semantic versions and
compatibility ID remain unchanged; the implementation baseline now records the
foundation artifacts.

Tom approved Phase 1 and `TASK-P1-001` on 2026-07-24 with review notes “good.”
Playwright browser execution and the browser, CI, accessibility, and IDE
tracking policies remain explicitly deferred. Phase 1 approval does not approve
the compatibility baseline or authorize Phase 2 implementation.
