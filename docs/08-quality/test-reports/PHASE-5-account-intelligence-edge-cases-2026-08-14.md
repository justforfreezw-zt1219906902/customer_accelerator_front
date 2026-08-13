# Phase 5 Account Intelligence Edge-Case Fix

Status: `implemented_pending_human_re_review`

Changes include neutral null/unanalyzed presentation, removal of nested
`activeSignalCount` fallback, non-negative integer validation for `summary.byType`,
safe null signal sources, accessible ScoreIndicator null labels, dynamic DNA
rules/source rendering, and required non-negative integer counts for account and
signal summaries.

Focused validation passed: typecheck, focused parser tests (14 tests), and
production build. One pre-existing ScoreIndicator formatting warning remains.
Overview dynamic API tab rendering remains a follow-up item because the current
API branch still renders its returned signal collection directly.
The previous human approvals remain preserved as historical evidence.
