# ISSUE-2026-005 — Phase 6D Imprint legal-content approval Gate is not satisfied

## Metadata

- Status: `resolved`
- Severity: `blocking`
- Reported by: Codex
- Date: 2026-07-28
- Owner: Imprint legal-content owner — unassigned
- Environment: documentation and local frontend baseline
- Baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Affected phase: Phase 6D — Imprint Page
- Affected task: `TASK-P6D-001`
- Human verification: `Product Owner Gate override recorded`

## Requirement

Phase 6 and `TASK-P6D-001` require an authoritative, complete and explicitly
human-approved source before company and legal information may be published.
The approval must identify the source, owner, approver, approval date, approved
language, revision and permission for public frontend use.

Figma controls presentation and records current canvas copy, but it does not
independently establish legal correctness or publication approval.

## Expected behavior

The Imprint Page must publish only approved wording and company information in
the approved order. Missing or transitional registration, tax, representative,
authority, editorial-responsibility or dispute-resolution information must not
be invented or silently resolved by an implementation assistant.

## Actual state

- `CONTENT-IMPRINT` records `source: unknown`, `owner: unknown` and
  `status: pending_legal_source`.
- EN, DE and CN approval states are unknown.
- The legal-document asset inventory contains no approved Imprint document.
- No approved revision, effective date or public-use permission is recorded.
- Figma frame `122:3` contains German Imprint wording but no human legal-content
  approval record.
- The Figma content includes both current and future trade-authority details
  and an editorial note instructing a later removal after relocation. The
  publication disposition of these states is unresolved.

The existing `ImprintPage.vue` remains a temporary route shell. No Figma legal
wording was copied into application code.

## Figma evidence

Read-only inspection on 2026-07-28 confirmed:

- Page: `122:2`
- Desktop frame: `122:3`
- Header instance: `122:439`, matching Landing Header component `105:464`
- Hero: `122:454`
- Content area: `122:459`
- Content grid: `122:460`
- Main legal column: `122:461`
- Sidebar: `122:462`
- Footer instance: `122:577`, matching Landing Footer component `105:494`
- Explicit mobile/responsive frame: not discovered
- Existing approved CSS-variable families are used for colours, borders,
  surfaces, spacing, radius and text.

## Impact

Phase 6D application implementation is blocked. Existing Landing, Contact,
Data Protection, shared layouts and routing remain unchanged.

## Required resolution

The responsible human owner must:

1. identify the authoritative Imprint source;
2. approve the exact publication wording and order;
3. name the content owner and approver;
4. record the approval date, language and revision;
5. approve public frontend use;
6. decide the current versus future trade-authority content;
7. decide whether the editorial relocation note must be excluded from public
   content; and
8. confirm the status of VAT ID, commercial-register, editorial-responsibility
   and dispute-resolution statements.

After the Gate is satisfied, a new authorized implementation task may replace
the route shell.

## Validation

- Phase 6C approval precondition: passed
- Phase 6 status precondition: passed (`in_progress`)
- Phase 6D starting status: passed (`planned`)
- Active Figma baseline access: passed
- Figma read-only inspection: passed
- Legal-content Gate: failed
- Application tests/build: not run because implementation did not start
- Application code modified: no

## Resolution

- Root cause: no authoritative human-approved Imprint source or publication
  decision is recorded.
- Resolution type: `human_gate_override`
- Resolved by task: `TASK-P6D-002`
- Human reviewer: Tom
- Resolution date: 2026-07-28
- Fix: Tom accepted the public-facing current content in Figma frame `122:3`
  as the authoritative source, waived a PDF and separate legal approval,
  approved a complete English publication, excluded editorial instructions,
  deferred future Treptow-Köpenick authority information, and accepted the
  associated Product Owner risk.
- Professional legal review remains deferred. This resolution is not approval
  by a lawyer or external legal counsel.
- Historical note: the original blocker and `TASK-P6D-001` remain preserved.
- Compatibility/version impact: none.
