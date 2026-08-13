# TASK-MAINT-004 — Account Discovery + Account Overview

## Record

- Date: 2026-08-12
- Operator: Human-directed Codex task
- Change Request: CR-2026-006
- Starting and resulting baseline: `DS1.2.0_API0.0.0_FE0.2.0`
- Status: `human_accepted_closed`
- Human approval: accepted on 2026-08-13
- Human reviewer: name not supplied in closure instruction

## Gate and sources

The repository root was confirmed as
`/Users/zhaowei/WebstormProjects/customer_accelerator_front`. Tom explicitly
accepted TASK-MAINT-003 and its Product Shell checkpoint in the TASK-MAINT-004
instruction. Figma was inspected read-only: Account Discovery page `350:3`,
desktop frame `359:2`; Account Overview page `350:4`, desktop frame `360:2`.

## Implementation

- `/demo` now renders Account Discovery with six curated opaque-ID fixtures,
  local name/industry/location search, Tier and Industry filters, disabled Add
  Account, and accessible account navigation.
- `/demo/accounts/:accountId` now renders Account Overview. Oracle
  (`demo-acc-001`) is the formal Page 14 reference fixture.
- Source labels without complete valid URLs remain non-clickable. No URL was
  synthesized.
- Overview actions navigate to the existing deferred DNA and Content Studio
  hosts. Pages 15–18 business UI was not implemented.
- No backend calls, persistence, dependencies, version changes, Git mutations,
  release, or deployment were introduced.

## Figma-to-code notes

Dynamic score rings and signal activity marks are rendered with CSS because
their values are fixture-driven semantic data rather than static image assets.
Formal fidelity remains subject to human visual review at 1440px; responsive
adaptations preserve content hierarchy at 1024px, 768px, and 390px.

## Human visual review correction

Tom rejected the first formal visual state on 2026-08-12 because Discovery
preferred the secondary placeholder dataset and both Product Pages appeared
too constrained within the application canvas. The task remained open.

The correction re-inspected Page 13 frame `359:2` and Page 14 frame `360:2`,
made Oracle the canonical `demo-acc-001` Discovery row and formal Overview
fixture, removed generic page centering and maximum-width constraints, restored
full workspace width with 24px Product gutters, and aligned the Figma column,
row, score, card, and vertical-rhythm geometry. SecureVault was removed from the
formal six-row state; the remaining available Page 13 identities were retained.

No researched data, zoom, transforms, global font enlargement, arbitrary
scaling, backend, persistence, route change, dependency, or Git operation was
used. Evidence was regenerated at 1440, 1024, 768, and 390.

## Validation

See `docs/08-quality/test-reports/TASK-MAINT-004-account-discovery-overview-2026-08-12.md`.
Management, typecheck, ESLint, 135 unit/component/router tests, production build,
and 19 focused Chromium tests passed. The full Chromium suite was 44/46 with
two pre-existing environment-dependent Phase 7 failures; it is not reported as
fully passed.

## Human review

Human review accepted the final Page 13 Account Discovery and Page 14 Oracle
Account Overview desktop visual states and authorized task closure on
2026-08-13. This record does not authorize TASK-MAINT-005, a release version,
deployment, or backend integration.

## Focused Page 13 column-grid correction — 2026-08-13

Human review accepted the Page 13 canvas, summary metrics, and filter/search
geometry but kept the account-list grid as a blocking visual item. Figma frame
`359:2` was re-inspected read-only. Its 1152px table has 16px horizontal
padding, a 1120px inner span, 14px gaps, and visible widths of 236px, 111px,
86px, 106px, 90px, 70px, a 193px flexible separation region, and a 130px
Next Best Action label.

Following human rejection and exact geometry confirmation, the header and rows
now share the formal eight-track model without redistribution:
`236px 111px 86px 106px 90px 70px 193px 130px`. The 193px spacer remains an
independent, intentional track. Header and row gaps are both 14px. Next Best
Action no longer uses an unrestricted trailing track or
`justify-content: space-between`; its text and arrow remain associated inside
the verified 130px action track. The table is capped at the formal 1152px width
so an ultrawide viewport cannot enlarge the spacer.

Only Page 13 desktop evidence at the exact CSS viewport 1440 × 900 was
regenerated. No responsive/full QA was run in this correction. TASK-MAINT-004
remains `needs_review` and open for human visual review.

## Wide-desktop correction — 2026-08-13

The formal 1440 × 900 geometry remains unchanged. The initial 1728px cap was
rejected because it still left excessive unused workspace in larger effective
CSS viewports. The cap has been removed: above 1440px the complete Discovery
content fills the post-sidebar workspace with its existing 24px gutters, while
all eight tracks grow together in their verified Figma proportions. The 193px
formal spacer no longer absorbs the additional width by itself. Focused
Chromium evidence passed at both 1440 × 900 and 2048 × 1024. TASK-MAINT-004
remains `needs_review`.

## Closure validation — 2026-08-13

- Outcome: `implementation_complete_needs_human_review` (required completion-report classification)
- Governance validation: 5/5 passed; 246 underlying checks passed
- Typecheck: passed
- ESLint: passed
- Unit/component/router tests: 135/135 passed
- Production build: passed; 252 modules transformed
- Focused Product Shell and Pages 13–14 Chromium: 21/21 passed
- Full repository Chromium: 48/49 passed
- Pre-existing environment-dependent failure: the Phase 7 success test expected
  owner omission, while the local public Vite configuration supplied owner
  `90579791`; this is outside TASK-MAINT-004 and is not reported as passed
- Responsive evidence: Page 13 and Page 14 regenerated at 1024, 768 and 390;
  accepted adaptations remain functional
- Demo Drawer: passed around both Discovery and Overview at 390
- Routing, search/filter, source-link safety, deferred DNA/Content Studio
  navigation, noindex/nofollow and Marketing isolation: passed
- Backend calls and browser persistence in TASK-MAINT-004 scope: none
- Versions and provisional compatibility baseline: unchanged
- Git mutation, release and deployment: not performed

TASK-MAINT-004 is closed by explicit human authorization. Pages 15–18 remain
deferred and no subsequent task is automatically authorized.
