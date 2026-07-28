# TASK-P6C-002 — Data Protection Gate override and implementation

## Task metadata

- Date: 2026-07-28
- Tool: Codex with Figma MCP read-only inspection
- Operator: Codex
- Human reviewer / Product Owner: Tom
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Status: `approved`
- Human implementation review: approved through `TASK-P6C-003`
- Prompt reference:
  `/Users/zhaowei/.codex/attachments/76ac45a1-274b-4ddb-902b-3504a307db77/pasted-text.txt`

## Human Gate override

Tom accepted Figma Page `128:2` and desktop frame `128:3` as the
authoritative current content source, waived the PDF and separate legal
approval requirements, approved complete English translation and public
frontend use, and accepted the risk of deferring professional legal review.
The result must not be represented as lawyer-approved.

Decision evidence is recorded in
`docs/07-change-control/decisions/ADR-001-phase-6c-figma-legal-content-gate-override.md`.

## Files read

- `AGENTS.md`
- `VERSION.yaml`
- Phase 6 and Phase 6C records
- blocked `TASK-P6C-001`
- `ISSUE-2026-004`
- content, Figma, Page and traceability registries
- frontend content architecture
- `LegalLayout`, shared Header/Footer APIs, route and Page shell
- affected tests and quality records

## Figma evidence

Read-only inspection:

- Page `128:2`
- Desktop frame `128:3`
- Header instance `128:475`
- Hero `128:490`
- Content area `128:495`
- Content grid `128:496`
- Main legal column `128:497`
- Sidebar `128:498`
- Footer instance `128:542`
- Source sections: 35
- Translated sections: 35
- Source language: `de-DE`
- Publication language: `en`
- Revision: `FIGMA-128-3-EN-1.0.0`

No Figma write was performed.

## Implementation

- Added typed legal-content models.
- Added the complete structured English translation with paragraphs, lists,
  contact blocks and tables.
- Replaced the temporary Data Protection shell with the Figma-derived Hero,
  main legal column, quick information and 35-link section index.
- Reused `LegalLayout` and its approved Landing Header/Footer.
- Added stable anchors, heading hierarchy, keyboard-visible focus and
  horizontally accessible tables.
- Added unit/content-integrity and Chromium browser coverage.

## Translation ambiguities

- Figma joins some source-table cells and line fragments into single text
  nodes. They were reconstructed in visible reading order.
- Section 30 splits “Art. 77 GDPR” across nodes; it is rendered as one
  reference.
- “Datenschutzerklärung” is translated as “Data Protection Notice” consistently.
- Provider status qualifiers such as “planned”, “where used”, “only after
  consent” and “after compliant setup” were retained.
- No new provider, address, retention period, legal basis or external URL was
  introduced.

## Responsive assumption

No explicit mobile Figma frame was discovered. At widths up to 64rem, the
sidebar is placed before the main legal column, text remains readable, and
wide tables scroll horizontally. This is a conservative implementation detail
derived from the approved responsive system, not a new Figma claim.

## Validation

- Management validation: passed, 5 scripts; 0 failures
- Documentation validation: 119 passed, 0 failed
- Version validation: 12 passed, 0 failed
- Compatibility validation: 19 passed, 0 failed
- Registry validation: 54 passed, 0 failed
- OpenAPI validation: 21 passed, 0 failed
- Type checking: passed
- ESLint: passed
- Unit/component tests: 27 files, 90 tests passed
- Relevant Playwright Chromium tests: 2 passed at 1440px and 390px
- Production build: passed; 165 modules transformed
- Git diff check: passed

The first browser-test attempt could not bind the sandboxed local preview
server (`EPERM 127.0.0.1:4173`). It was rerun with approved local-server
permission and passed. This was an execution-environment restriction, not an
application failure.

## Governance outcome

- `TASK-P6C-001`: remains blocked as historical evidence
- `ISSUE-2026-004`: resolved by `human_gate_override`
- `TASK-P6C-002`: `approved` through `TASK-P6C-003`
- Phase 6C: `approved`
- Phase 6: `in_progress`
- Next Gate: Phase 6D Imprint Page Review
- Professional legal review: deferred

## Files preserved

- Existing Landing, Contact, Imprint and Why Page implementations
- Existing routing and layout behavior
- Original blocked task and Issue history
- Unrelated human-authored and IDE files

## Git commit

Not created.

## Human approval addendum — 2026-07-28

Tom approved Phase 6C through review task `TASK-P6C-003` with review notes
“good”. The approval covers this task's implementation and validation evidence.
It does not change the recorded Product Owner Gate override or imply
professional legal counsel approval.
