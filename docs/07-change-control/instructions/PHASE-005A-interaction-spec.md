# PHASE-005A: Product Interaction Specification

## Task metadata

- Record ID: `PHASE-005A`
- Task ID: `TASK-P5A-001`
- Date: 2026-07-25
- Tool: Codex with configured Figma read-only access
- Operator: User-directed Codex task
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Starting Phase 5 status: `not_started`
- Resulting Phase 5 status: `in_progress`
- Resulting Phase 5A status: `approved`
- Human approval: `approved`
- Git commit: `pending`

## Preconditions

Phase 4 and Phase 4C were approved by Tom on 2026-07-25. Approval evidence is
`docs/08-quality/test-reports/phase-4c-task-p6-001-approval-2026-07-25.md`.

## Files read

- `AGENTS.md`
- `VERSION.yaml`
- `docs/phases/phase-5-routing-interaction-map.md`
- `docs/04-frontend/route-map.yaml`
- `docs/04-frontend/interaction-map.md`
- `docs/03-design-system/page-registry.yaml`
- `docs/02-inputs/content-inventory.yaml`
- Approved Navbar and Footer APIs and typed content
- Backend integration and error specifications
- Current Figma baseline and source map
- Current state and phase status

## Figma inspection

- `06 Landing Page` (`212:2`), desktop frame `212:3`
- `07 Why Mi-goTo Page` (`259:2`), desktop frame `259:3`
- `08 Imprint` (`122:2`), desktop frame `122:3`
- `09 Data Protection` (`128:2`)
- `10 Contact Page` (`269:2`), desktop frame `269:3`

Inspection was read-only. A programmatic property query was rejected by the
connector with `INVALID_ARGUMENT`; the Figma file was not modified. The
connector's structured Page metadata then successfully supplied node hierarchy,
layout, and named entry evidence for all five Pages.

## Created specification

`docs/04-frontend/product-interaction-specification.md` records:

- six proposed route paths;
- Header and Footer destinations;
- same-Page and cross-Page anchor behavior;
- scroll restoration, focus, reduced motion, and unknown-route proposals;
- EN/DE/CN interim behavior;
- external LinkedIn and email behavior;
- mobile disclosure navigation;
- Contact validation, loading, duplicate prevention, success, and safe errors;
- twenty-one explicit human decisions.

## Scope preserved

- No final routes or Pages were implemented.
- No translation, LinkedIn URL, analytics event, timeout, or retry policy was
  invented.
- No Thank You Page design was claimed.
- No Figma node was modified.
- Existing application code was not changed.

## Validation

- Management validation: passed; 5 suites
- Version validation: passed; 12 checks
- Documentation validation: passed; 119 checks
- Compatibility validation: passed; 19 checks
- Registry validation: passed; 50 checks
- OpenAPI validation: passed; 21 checks
- Application typecheck/tests/build: not required for this specification-only
  task; existing evidence is preserved

## Human review

- Reviewer: Tom
- Result: `APPROVED`
- Date: 2026-07-25
- Current reviewed task supplied for approval: `TASK-P7-001`
- Original execution task: `TASK-P5A-001`
- Notes: good
- Evidence:
  `docs/08-quality/test-reports/phase-5a-task-p7-001-approval-2026-07-25.md`

`TASK-P6-001` was previously supplied as the reviewed task for Phase 4C. The
identifier reuse is recorded as a traceability conflict; the phase-qualified
approval filenames and original execution IDs preserve both records.

Tom subsequently reconfirmed Phase 5A approval with the unique reviewed task
`TASK-P7-001`. The earlier Phase 5A approval record remains preserved at
`docs/08-quality/test-reports/phase-5a-task-p6-001-approval-2026-07-25.md`.

This approval accepts the Phase 5A specification as a reviewed artifact. It
does not invent answers for the twenty-one entries whose status remains
`decision_required`.
