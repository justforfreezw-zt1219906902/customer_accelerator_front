# Figma Baseline

## Baseline record

| Field | Value |
| --- | --- |
| Figma version | `1.2.0` |
| Figma URL | [mi-goTo Figma design](https://www.figma.com/design/vyr3TvF5lAUOnuuxdW8iRb/prototype?node-id=0-1&p=f&t=AdHvWZgIn8DrsmI6-0) |
| File key | `vyr3TvF5lAUOnuuxdW8iRb` |
| Baseline status | `maintenance_migration_needs_marketing_review` |
| Human reviewer | Tom |
| Capture date | 2026-08-12 |
| Visual approval | Phase 2 token scope approved 2026-07-24 |

## Expected pages

1. `00 Foundation` — `0:1`, inspected
2. `01 Tokens` — `23:2`, inspected
3. `02 Core Components` — `31:2`, presence verified
4. `03 Composite Components` — `68:2`, presence verified
5. `04 Product Components` — `81:2`, presence verified
6. `05 Sections` — `87:2`, presence verified
7. `06 Landing Page` — `212:2`, presence verified
8. `07 Why Mi-goTo Page` — `259:2`, presence verified
9. `08 Imprint` — `122:2`, presence verified
10. `09 Data Protection` — `128:2`, presence verified
11. `10 Contact Page` — `269:2`, presence verified
12. `11 Thank You Page` — `321:28`, inspected

All expected pages and their node IDs were verified on 2026-07-24. Component,
Section, and five registered Product Pages were subsequently inspected
read-only through Phase 5A.

The `06 Landing Page` desktop frame (`212:3`, 1440 × 8337) and its individual
Sections were inspected again read-only for `TASK-P6A-003` on 2026-07-27.
Implementation follows the recorded hierarchy and exact approved English
content; Tom approved Phase 6A under `TASK-P6A-006`.

`TASK-P6A-004` re-inspected Header `212:4`, Footer `212:737`, Hero `212:22`,
and Principle `212:375`. The four requested implementation corrections are
complete. The Figma Header/Footer text conflicts with locked content records,
so locked content was preserved while non-conflicting visual structure was
applied. Human browser verification remains pending.

`TASK-P6B-001` inspected Contact desktop frame `269:3` read-only on
2026-07-28. Main content `269:18` contains trust column `269:19`, form panel
`269:47`, four visible input fields, action row `269:99`, and no documented
loading, success, or backend-error frame. The static UI is implemented and
awaits human review.

`TASK-P4A-003` re-inspected Contact frame `269:3`, Header `314:44`, Footer
`257:1671`, and Landing regression sources `212:4` and `212:737` on
2026-07-28. Typed Contact variants are implemented in the shared Composite
components. Contact layout integration remains pending under `TASK-P6B-003`.

`TASK-P6F-001` inspected Thank You Page `321:28` and desktop frame `321:29`
read-only on 2026-07-28. The Page contains compact Header `321:30`,
confirmation content `321:129`, next-steps card `321:143`, and compact Footer
instance `321:84`. No mobile frame was discovered.

## Authority

Figma controls visual hierarchy, tokens, component appearance, Section and Page
layout, and responsive design intent. It does not independently control routes,
interaction behavior, API contracts, content ownership, implementation status,
tests, or approval.

## Phase 2 findings

- `00 Foundation` primary board frame: `25:2`
- `01 Tokens` token reference frame: `27:2`
- 7 variable collections: Color, Spacing, Radius, Opacity, Motion, Font, Stroke
- Color has `Dark Enterprise` and `Light Impact` modes.
- 12 text styles and 5 effect styles were confirmed.
- No Paint Styles or Grid Styles were present.

## Known unknowns

- Page interaction reactions and mobile Page compositions
- Contact loading, success, and error-state visuals
- Responsive breakpoints: no breakpoint variable/style was found
- Font asset delivery and licenses for Inter and JetBrains Mono
- Motion easing and reduced-motion intent: not specified in the inspected source
- Accessibility requirements beyond visible design
- Human design reviewer and review date
- Thank You Page mobile visual design

Tom approved the Phase 2 Figma Tokens scope and `TASK-P2-001` on 2026-07-24.
This does not approve uninspected component or Page visuals.

## Figma 1.2.0 maintenance baseline

Tom assigned `1.2.0` to the compatible Pages 00–05 foundation additions for
`CR-2026-006`. `TASK-MAINT-002` inspected Foundation `25:2`, token additions
`349:13` and `467:5`, Source Attribution Chip `167:14`, and the dark/light
lockup guidance in Foundation. The implementation awaits the mandatory
Marketing regression review. No Figma write occurred.

## TASK-MAINT-005 Stage A inspection

On 2026-08-13, Page 15 `ABM Communication DNA` (`350:5`) and its formal
desktop frame `360:2116` were inspected read-only. The evidence-card section
`443:1080`, hero `440:88`, evidence-card family `441:127`, status badge `351:9`
and frequency badge `456:8` were used for Stage A implementation. Human visual
approval is pending. Pages 16–18 were not started.

Tom accepted the Page 15 visual checkpoint on 2026-08-13. Stage B then
inspected Page 16 `ABM Signal Pulse` (`350:6`) and formal Overview frame
`360:2226` read-only, including Market Pattern Card `479:110`, Signal Urgency
Account Card `480:151`, and Avatar `539:35`. Page 16 human visual approval is
recorded from Tom on 2026-08-13.

Stage C inspected Page 17 `Communication DNA / DNA Portfolio` (`350:7`) and
formal desktop frame `360:2385` read-only, including DNA Portfolio Card
`360:2381` and Avatar `539:35`. The implementation uses the verified three
column, 373px card geometry at the exact `1440 × 900` formal CSS viewport.
Tom accepted the corrected Page 17 formal desktop state on 2026-08-13. Stage D
responsive evidence is functional/adaptive rather than a new Figma baseline.
Page 18 was not started.

## TASK-MAINT-006 Stage A inspection

Page 18 Content Studio (`350:8`) and Company Preview frame (`361:2`) were
inspected read-only on 2026-08-13. Stage A implementation is pending human
visual review; this does not constitute Figma or release approval.
