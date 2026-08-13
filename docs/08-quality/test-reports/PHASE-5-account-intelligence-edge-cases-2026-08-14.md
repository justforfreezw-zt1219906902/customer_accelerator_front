# Phase 5 Account Intelligence Edge-Case Fix

Status: `implemented_pending_human_re_review`

Changes include neutral null/unanalyzed presentation, removal of nested
`activeSignalCount` fallback, non-negative integer validation for `summary.byType`,
safe null signal sources, accessible ScoreIndicator null labels, dynamic DNA
rules/source rendering, and required non-negative integer counts for account and
signal summaries.

Focused validation passed: typecheck, focused parser tests (14 tests), full
unit suite (164 tests), production build, and governance validators. Dynamic
API Signal tabs now render arbitrary returned signal types and filter through
`visibleApiSignals`. One pre-existing ScoreIndicator formatting warning remains.
The previous human approvals remain preserved as historical evidence.
