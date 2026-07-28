# TASK-P6C-001 — Data Protection Page

## Record

- Date: 2026-07-28
- Tool: Codex with Figma read-only inspection
- Operator: Tom / Codex
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Phase: Phase 6C
- Status: `blocked`
- Human approval: `pending`
- Active blocker: `ISSUE-2026-004`
- Git commit: not supplied

## Permitted and prohibited scope

The instruction authorized Data Protection implementation only after all phase,
Figma, and legal-content Gates passed. It prohibited invented or unapproved
legal wording, metadata, providers, retention periods, legal bases, contact
details, analytics tools, and URLs.

## Preconditions

- Phase 6A approved: passed
- Phase 6B approved: passed
- Phase 6 in progress: passed
- Phase 6C allowed starting status: passed (`not_started`)
- No pre-existing Phase 6C blocker: passed
- Figma baseline accessible: passed
- Authoritative legal content approved: **failed**

## Figma inspection

The `figma-design-to-code` skill controlled the read-only workflow. The initial
Page-level design-context request returned `INVALID_ARGUMENT`; read-only
metadata identified desktop Frame `128:3`, and the required design-context call
then succeeded on that concrete Frame.

Confirmed nodes:

- Page `128:2`
- Desktop `128:3`
- Header `128:475`
- Hero `128:490`
- Content area `128:495`
- Content grid `128:496`
- Main legal column `128:497`
- Sidebar `128:498`
- Footer `128:542`

The Header and Footer are Landing shared-component instances. Thirty-five German
legal sections are present. No explicit responsive/mobile frame was discovered.
Figma was not modified.

## Legal Gate failure

`CONTENT-DATA-PROTECTION` remains `pending_legal_source` with unknown source and
owner. No approver, approval date, approved language, revision, or
public-production permission is recorded. The legal-document inventory is
empty. Figma references a source PDF, but that PDF and its legal approval are
not registered.

## Outcome

- Created `ISSUE-2026-004`.
- Set `TASK-P6C-001` and Phase 6C to `blocked`.
- Preserved the temporary route shell.
- Modified no application code, tests, routes, layouts, or shared components.
- Did not copy Figma legal text into the repository.
- Did not run application tests or build.

## Required human action

An authorized legal owner must supply the authoritative source and record its
owner, approver, approval date, language, revision, and production-publication
status. A future authorized execution may resume implementation after
`ISSUE-2026-004` is resolved.
