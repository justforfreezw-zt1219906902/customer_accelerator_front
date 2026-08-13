# Phase 5 Account Intelligence Edge-Case Fix

Status: `implemented_pending_human_re_review`

Changes include neutral null/unanalyzed presentation, removal of nested
`activeSignalCount` fallback, non-negative integer validation for `summary.byType`,
safe null signal sources, accessible ScoreIndicator null labels, dynamic DNA
rules/source rendering, and required non-negative integer counts for account and
signal summaries.

Focused validation passed: typecheck, focused parser/UI regression tests (22
tests), full unit suite (172 tests), production build, and governance
validators. Dynamic API Signal tabs render arbitrary returned signal types and
filter through `visibleApiSignals`; neutral API null states and DNA edge cases
are covered. Parser coverage includes fractional/string `byType` counts,
invalid total/active summary counts, and a valid zero `activeSignalCount`.
One pre-existing ScoreIndicator formatting warning remains. The previous human
approvals remain preserved as historical evidence.
