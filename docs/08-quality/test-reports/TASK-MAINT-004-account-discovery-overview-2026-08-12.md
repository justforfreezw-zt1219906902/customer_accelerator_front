# TASK-MAINT-004 Account Discovery + Account Overview Test Report

Date: 2026-08-12  
Historical implementation status: `implementation_complete_needs_human_review`  
Final closure: accepted and closed on 2026-08-13; see
`TASK-MAINT-004-closure-2026-08-13.md`

The initial 1440 visual state was rejected by Tom on 2026-08-12. Corrected
evidence was regenerated after Oracle fixture and Product-canvas geometry
changes; it remains pending a new human review.

| Validation | Result | Notes |
| --- | --- | --- |
| Repository root | passed | Exact child repository confirmed |
| Figma read-only inspection | passed | Pages 13–14; frames `359:2`, `360:2` |
| Typecheck | passed | `npm run typecheck` |
| ESLint | passed | `npm run lint` |
| Unit/component/router tests | passed | 135/135; includes 5 TASK-MAINT-004 tests |
| Production build | passed | `npm run build`; 252 modules transformed |
| Management validation | passed | 5/5 validators; registry validator 75/75 |
| Focused Chromium evidence | passed | 19/19 including 1440, 1024, 768 and 390 for both Pages, deferred-route actions, shell and Marketing regression |
| Full Chromium suite | incomplete_pre_existing | 44/46 passed; two pre-existing Phase 7 tests require configured API behavior and are not TASK-MAINT-004 regressions |
| Human visual review | pending | Tom review required |

The fixture provider is synchronous and local. No backend request, browser
storage, dependency, version change, Git mutation, release, or deployment was
performed.

The full Chromium failures were confined to
`tests/e2e/phase-7-backend-integration.spec.ts`: the success case timed out
because the Contact API runtime configuration was unavailable, and the error
case received the existing configuration-error message rather than the mocked
server-error message. Account Discovery/Overview and Product-shell tests all
passed. Formal 1440 screenshots were inspected for overflow and composition;
human Figma fidelity approval remains pending.

Corrected geometry evidence confirms a 1200px workspace canvas with 24px
internal gutters, a 1152px content span, 72px Discovery rows, and 170px
Overview reasoning cards at 1440. Responsive evidence was regenerated at
1024px, 768px, and 390px.

Explicit automated bounding-box assertions for those formal geometry values
were added after the successful evidence run. Their final rerun was
`not_run_tool_usage_limit`; the application code did not change after the
successful 19/19 Chromium run, and the generated screenshots were inspected
directly. This pending rerun is not reported as passed.

## Focused Page 13 desktop grid evidence — 2026-08-13

The account-list column correction was validated only at the requested 1440px
desktop target. Typecheck, ESLint, and the production build passed. The focused
Chromium case passed 1/1 and regenerated
`test-results/task-maint-004-discovery-1440.png`.

After the next human rejection, the formal test was corrected to preserve the
spacer as an independent track. At an asserted CSS viewport of 1440 × 900 it
verifies a 1152px table at x=264 and computed grid tracks
`236px 111px 86px 106px 90px 70px 193px 130px`. Header and first-row starts
match at viewport x coordinates `281, 531, 656, 756, 876, 980, 1064, 1271`.
The focused Chromium run passed 1/1. Human visual approval remains pending;
TASK-MAINT-004 was not closed.

After rejection of the capped result, wide-desktop evidence at 2048 × 1024 now
verifies a full 1808px post-sidebar Discovery area and 1760px table with 24px
gutters. The eight tracks resolve proportionally from the formal Figma widths
rather than assigning all additional space to the spacer. The unchanged
1440 × 900 formal test and the revised wide-desktop test passed 2/2.
