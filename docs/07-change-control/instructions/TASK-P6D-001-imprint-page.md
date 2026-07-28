# TASK-P6D-001 — Imprint Page

## Task metadata

- Date: 2026-07-28
- Tool: Codex with Figma MCP read-only inspection
- Operator: Codex
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Phase: Phase 6D — Imprint Page
- Status: `blocked`
- Active blocker: `ISSUE-2026-005`
- Human approval: pending
- Prompt reference:
  `/Users/zhaowei/.codex/attachments/4ed3f810-79eb-418d-98b5-869e58ef36fb/pasted-text.txt`

## Preconditions

- Phase 6C explicitly approved: passed
- Phase 6 status `in_progress`: passed
- Phase 6D allowed starting status: passed (`planned`)
- No pre-existing Phase 6D blocker: passed
- Active Figma baseline accessible: passed

## Files read

- `AGENTS.md`
- `VERSION.yaml`
- Phase 6 specification
- current state and phase status
- Page and Component Registries
- content and asset inventories
- Figma source map and baseline
- Product Interaction Specification and route map
- frontend and layout architecture
- approved Data Protection implementation, instruction and review evidence
- `LegalLayout.vue`
- shared `AppNavbar` and `AppFooter` APIs
- current `ImprintPage.vue` route shell
- open Issues, Deviations and Change Requests

## Figma evidence

Read-only inspection:

- Page `122:2`
- Desktop frame `122:3`
- Header instance `122:439`
- Hero `122:454`
- Content area `122:459`
- Content grid `122:460`
- Main legal column `122:461`
- Sidebar `122:462`
- Footer instance `122:577`
- Legal section nodes: `122:470`, `122:483`, `122:498`, `122:504`,
  `122:510`, `122:515`, `122:521`, `122:527`, `122:533`, `122:540`,
  `122:545`
- Explicit mobile frame: not discovered

The Header and Footer match the existing Landing components `105:464` and
`105:494`. No new typed chrome variant is required.

The frame uses existing Figma/CSS-variable families for background, surface,
card, border, brand and text colours, plus existing spacing, radius and stroke
tokens. No Figma write was performed.

## Legal-content Gate

Failed. `CONTENT-IMPRINT` has no authoritative source, owner, approver,
approval date, approved language, revision or public-use permission. The legal
asset inventory contains no approved Imprint document.

Figma contains German company and legal wording, but it cannot establish legal
publication approval by itself. The content also includes both current and
future trade-authority details and an editorial note about removing the current
authority after relocation. Publishing or resolving those states would require
an unapproved legal/content decision.

## Work performed

- Completed the required read-only Figma inspection.
- Recorded exact nodes, hierarchy, shared-component reuse and token evidence.
- Corrected the Imprint and Data Protection Page Registry scopes after
  detecting a prior documentation mapping swap.
- Created `ISSUE-2026-005`.
- Updated governance, registries, traceability and Phase 6 status.
- Preserved the temporary Imprint route shell.

## Prohibited work preserved

- No legal wording was copied into application code.
- No Imprint content was invented, translated, paraphrased or supplemented.
- No Header/Footer variant or Page implementation was created.
- No route or layout code was changed.
- No application code was modified.
- No dependency was installed.

## Validation

- Management validation: passed, 5 scripts; 0 failures
- Version validation: 12 passed, 0 failed
- Documentation validation: 119 passed, 0 failed
- Compatibility validation: 19 passed, 0 failed
- Registry validation: 54 passed, 0 failed
- OpenAPI validation: 21 passed, 0 failed
- Application tests/build: not run because the legal-content Gate failed
- Git diff check: passed

## Required human decisions

1. Identify and approve the authoritative Imprint source.
2. Record owner, approver, approval date, language, revision and public-use
   permission.
3. Confirm the legal entity/trading-name wording and legal form.
4. Confirm the current address and representative information.
5. Decide current versus future trade-authority publication.
6. Confirm that the editorial relocation note is excluded or explicitly
   approved for publication.
7. Confirm VAT ID, register, editorial-responsibility and dispute-resolution
   wording.

## Outcome

- `TASK-P6D-001`: `blocked`
- Phase 6D: `blocked`
- Phase 6: `in_progress`
- Blocker: `ISSUE-2026-005`
- Next Gate: Phase 6D Legal Content Approval Gate

## Git commit

Not created.
