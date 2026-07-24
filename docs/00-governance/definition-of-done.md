# Definition of Done

## Status language

`implemented` describes work produced. `passed` describes completed validation
evidence. `approved` is an identifiable human decision. An AI agent or automated
check cannot approve a phase or deliverable.

Tools and commands that are not installed must be recorded as `planned`, never
as `passed`.

## Global completion requirements

Every deliverable must satisfy all applicable requirements:

- [ ] Implementation completed
- [ ] Required validation completed
- [ ] Lint passed when available
- [ ] Type checking passed when available
- [ ] Tests passed when available
- [ ] Build passed when available
- [ ] Affected documentation updated
- [ ] Registries updated
- [ ] Compatibility impact reviewed
- [ ] Visual review completed when applicable
- [ ] Human approval recorded

In addition:

- acceptance criteria are traceable to authoritative sources;
- errors, deviations, unexpected behavior, and approved exceptions are recorded;
- accessibility, responsive, empty, loading, error, and success states are
  validated when applicable;
- security and privacy implications are reviewed when applicable;
- version and compatibility records are updated when affected; and
- unresolved blockers are not hidden by assumptions or workarounds.

An item may be declared not applicable only with a recorded rationale accepted
by the human reviewer.

## Phase 0 completion

Phase 0 is complete only when:

- required inputs are reviewed or explicitly registered as missing;
- owners, versions, locations, and review states are documented;
- Figma, backend contract, content, routes, interactions, environments, quality,
  and operations have been audited;
- assumptions, risks, dependencies, issues, and deviations are recorded;
- Phase 1 entry readiness is assessed;
- affected documentation and registries are updated;
- repository-native validation passes; and
- human approval is recorded.

Creating governance documents alone does not complete the audit.

## Future implementation validation

Phase 1 must install and document exact commands for:

- lint;
- type checking;
- automated tests; and
- production build.

Until that occurs, each command category has status `planned`. Later phases must
use installed, version-controlled commands and preserve their output or linked
evidence in completion reports.

## Completion report

Every completion report must state:

- authorized scope and changed artifacts;
- sources and versions used;
- validation commands and results, including `planned` items;
- documentation and registry updates;
- compatibility and migration impact;
- assumptions, errors, deviations, and unresolved questions;
- review evidence; and
- human approval status.

