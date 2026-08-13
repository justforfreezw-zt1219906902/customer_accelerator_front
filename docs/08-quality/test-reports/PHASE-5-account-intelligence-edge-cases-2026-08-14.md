# Phase 5 Account Intelligence Edge-Case Fix

Status: `implemented_pending_human_re_review`

Changes include neutral null/unanalyzed presentation, removal of nested
`activeSignalCount` fallback, non-negative integer validation for `summary.byType`,
safe null signal sources, accessible ScoreIndicator null labels, dynamic DNA
rules/source rendering, and required non-negative integer counts for account and
signal summaries.

Human browser smoke later identified list/detail DTO coupling: the detail
parser incorrectly required list-only `activeSignalCount`. This hotfix now
keeps the list and detail contracts separate, accepts unanalyzed detail
responses with `analysis: null`, and preserves strict list validation.

Focused validation passed: focused parser/UI regression tests (25 tests), full
unit suite (175 tests), typecheck, production build, and governance validators.
Coverage includes analyzed and unanalyzed detail responses without
`activeSignalCount`, strict list-item validation, null Communication DNA, and
the existing dynamic Signal-tab and neutral-state regressions. One pre-existing
ScoreIndicator formatting warning remains. The previous human approvals remain
preserved as historical evidence.
