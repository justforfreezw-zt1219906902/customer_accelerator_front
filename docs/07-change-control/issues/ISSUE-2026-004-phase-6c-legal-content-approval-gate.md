# ISSUE-2026-004 — Phase 6C legal-content approval Gate is not satisfied

## Metadata

- Status: `resolved`
- Severity: `blocking`
- Reported by: Codex
- Date: 2026-07-28
- Owner: Legal content owner — unassigned
- Environment: documentation and local frontend baseline
- Baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Affected phase: Phase 6C — Data Protection Page
- Affected task: `TASK-P6C-001`
- Human verification: `Product Owner Gate override recorded`

## Requirement

Phase 6 and `TASK-P6C-001` require an authoritative, complete, explicitly
human-approved legal source before Data Protection text may be published.
Figma controls presentation but cannot independently establish legal approval.

The required approval record must identify:

- authoritative legal source;
- legal content owner;
- legal content approver;
- approval date;
- approved language;
- document revision or version; and
- whether the content is approved for public production use.

## Expected behavior

Only the exact, approved Data Protection wording is represented as structured
frontend content. No controller details, processors, tools, retention periods,
legal bases, contact details, analytics providers, or external URLs are
inferred from an unapproved source.

## Actual state

- `CONTENT-DATA-PROTECTION` records `source: unknown`, `owner: unknown`, and
  `status: pending_legal_source`.
- Its EN, DE, and CN approval states are unknown.
- The legal-document asset inventory is empty.
- No document revision or production-publication approval is recorded.
- Figma frame `128:3` contains a 35-section German privacy notice and describes
  a source PDF, but the repository does not contain or approve that source.

The existing `DataProtectionPage.vue` remains a temporary route shell. No legal
text from Figma was copied into application code.

## Figma evidence

Read-only inspection on 2026-07-28 confirmed:

- Page: `128:2`
- Desktop frame: `128:3`
- Header instance: `128:475`, Landing Header component `105:464`
- Hero: `128:490`
- Content area: `128:495`
- Content grid: `128:496`
- Main legal column: `128:497`
- Sidebar: `128:498`
- Footer instance: `128:542`, Landing Footer component `105:494`
- Legal sections: 35
- Explicit mobile/responsive frame: not discovered

Header and Footer visually reuse the approved Landing shared variants. This
does not resolve the legal-content Gate.

## Impact

Phase 6C application implementation is blocked. Publishing the Figma text
without legal approval could expose unverified controller, service-provider,
tracking, AI-processing, retention, and statutory claims. There is no impact
to existing Landing, Contact, Legal layout, or route behavior because no
application code was modified.

## Required resolution

The responsible human legal owner must provide and approve all required legal
metadata and confirm whether the Figma German text exactly represents the
authoritative source. If a separate document is authoritative, its approved
wording must supersede conflicting Figma copy while Figma continues to control
presentation.

After approval:

1. update `CONTENT-DATA-PROTECTION`;
2. register the approved legal document or source reference;
3. record the approval evidence;
4. set Phase 6C back to `planned` or `in_progress`; and
5. authorize a new implementation execution of `TASK-P6C-001`.

## Validation

- Figma accessibility: passed for read-only inspection
- Legal-content Gate: failed
- Application tests: not run; implementation did not start
- Build: not run; application code was unchanged
- Human legal review: pending

## Resolution

- Root cause: authoritative legal source and approval metadata have not been
  supplied.
- Resolution type: `human_gate_override`
- Resolved by: `TASK-P6C-002`
- Human reviewer: Tom
- Resolution date: 2026-07-28
- Fix: Tom accepted Figma frame `128:3` as the authoritative current content
  source, explicitly waived the PDF and external legal-approval requirements,
  approved English as the only publication language, and accepted the
  associated risk as Product Owner. Professional legal review is deferred.
- Historical note: the original blocking state and `TASK-P6C-001` remain
  preserved. This resolution is not approval by legal counsel.
- Compatibility/version impact: none; versions remain unchanged.
