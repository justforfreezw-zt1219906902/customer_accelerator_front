# CR-2026-007 Landing Team Membership Update — Test Report

## Outcome

`implementation_complete_needs_human_review`

The Landing Team now publishes only Miroslav Stanojevic and Wei Zhao. Desktop
uses four tracks with the two cards in the leftmost tracks; the layout resolves
to two tracks at 1024px and one track at 390px. Figma synchronization and named
human visual approval remain pending.

## Sources and scope

- Change Request: `CR-2026-007`
- Historical Figma Team node: `212:615`
- Frontend baseline: `0.2.0`
- Branch: `awesome_design_v1_master_v2`
- Backend/API impact: none
- Release/deployment authorization: none

## Validation

| Check | Result |
| --- | --- |
| TDD RED — focused Landing/Team unit tests before implementation | expected failure: 3 failed, 10 passed |
| Focused Landing/Team unit tests after implementation | passed: 13/13 |
| `npm run validate:management` | passed |
| `npm run typecheck` | passed |
| `npm run lint` | completed with 0 errors and 5 pre-existing warnings outside this scope |
| `npm run build` | passed |
| Fixture-mode production build | passed |
| Focused Landing Chromium | passed: 5/5 |
| Full unit suite | 230 passed, 1 pre-existing unrelated failure |
| Full fixture-mode Chromium suite | 100 passed, 3 pre-existing unrelated failures |

## Existing unrelated failures

The full unit suite retains one pre-existing `Routing.spec.ts` mismatch: the
test expects the Footer LinkedIn destination to be absent, while the branch
baseline already contains `https://www.linkedin.com/company/mi-goto`. Neither
file is changed by CR-2026-007.

The full Chromium suite retains three pre-existing test-contract mismatches:

1. Two Phase 8 Packages assertions expect four legacy cards, while the current
   Landing contains the one-card Developer Partner offer.
2. One TASK-MAINT-004 assertion expects the former `.demo-route-host`
   placeholder after navigating to Content Studio, which is now implemented.

All five CR-2026-007 Landing Chromium checks pass, including Team membership,
removed-name absence, anchor preservation, track counts at 1440/1024/390, and
horizontal-overflow protection.

## Visual evidence

Automated screenshots were inspected at 1440px and 390px. The desktop Team
cards occupy the first two of four tracks, and the mobile cards stack in one
column. The 1024px two-column behavior is verified through computed browser
styles. This is implementation evidence only and is not human approval.

## Approval

- Human visual approval: `pending`
- Figma synchronization: `pending`
- Approved status assigned by automation: no
