# STEP-003: Roadmap and Phase Plans

## Task purpose

Create the complete roadmap, machine-readable phase state, dependency plan, and
Phase 1–8 planning documents while preserving the confirmed Phase 0 baseline.

## Input files read

- `AGENTS.md`
- `VERSION.yaml`
- `docs/phases/phase-0-project-audit.md`
- `docs/00-governance/source-of-truth-policy.md`
- `docs/00-governance/definition-of-done.md`
- `docs/00-governance/versioning-policy.md`
- Existing `docs/01-roadmap/` and `docs/phases/` contents
- Current Git status

## Existing Phase 0 content preserved

- Goal, scope, exclusions, inputs, outputs, dependencies, task content,
  acceptance criteria, validation approach, risks, recovery strategy, status,
  human approval, and completion-report text
- Status remains `planned`
- Audit remains unexecuted
- Phase 1 readiness remains not assessed
- Human approval remains `pending`

Only the headings `Audit Tasks`, `Validation Approach`, and `Current Status`
were normalized to `Tasks`, `Validation`, and `Status`.

## Files created

- `docs/01-roadmap/implementation-roadmap.md`
- `docs/01-roadmap/current-state.yaml`
- `docs/01-roadmap/phase-status.yaml`
- `docs/01-roadmap/milestone-plan.md`
- `docs/01-roadmap/dependency-map.md`
- `docs/phases/phase-1-vue-foundation.md`
- `docs/phases/phase-2-design-tokens.md`
- `docs/phases/phase-3-core-components.md`
- `docs/phases/phase-4-composite-product-sections.md`
- `docs/phases/phase-5-routing-interaction-map.md`
- `docs/phases/phase-6-static-pages.md`
- `docs/phases/phase-7-backend-integration.md`
- `docs/phases/phase-8-qa-deployment.md`
- `docs/07-change-control/instructions/STEP-003-roadmap.md`

## Files modified

- `docs/phases/phase-0-project-audit.md` — normalized three headings only
- `CHANGELOG.md` — recorded the roadmap and phase-planning baseline

## Files preserved

- Existing governance, bootstrap, and STEP-002 documentation
- Existing `.idea/workspace.xml` changes, which were outside task scope
- Root project files and all unrelated content

## Current state

- Current phase: Phase 0 — Project Audit
- Current status: `planned`
- Current task: none
- Next gate: Phase 0 Audit Review
- Human approval required: yes

## Unresolved dependencies

- Official backend semantic version and authoritative OpenAPI
- Design, backend, content, legal, accessibility, security, quality, and
  operations owners
- Product and Interaction Specifications
- Figma review and implementation-ready version confirmation
- Legal content and locale/translation workflow
- Browser, device, accessibility, performance, privacy, analytics, hosting,
  monitoring, incident, and rollback requirements
- Sequential versus parallel delivery of Phase 6 Pages
- Whether mock integration or deployment preparation may begin early

## Validation

- Parsed all YAML roadmap files and synchronized versions with `VERSION.yaml`.
- Confirmed all nine phase files contain every required section.
- Confirmed Phase 0 remains `planned`/`pending` and Phases 1–8 are
  `not_started`/`pending`.
- Confirmed `phase-status.yaml` defines only the authorized status vocabulary.
- Confirmed future package-dependent validation is marked `planned`.
- Verified no application code or wrapper directory exists.
- Checked whitespace and final Git status; STEP-003 changes remain uncommitted.

## Human approval

**pending**
