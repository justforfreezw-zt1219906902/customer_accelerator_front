# Figma Baseline

## Baseline record

| Field | Value |
| --- | --- |
| Figma version | `1.0.0` |
| Figma URL | [mi-goTo Figma design](https://www.figma.com/design/vyr3TvF5lAUOnuuxdW8iRb/prototype?node-id=0-1&p=f&t=AdHvWZgIn8DrsmI6-0) |
| File key | `vyr3TvF5lAUOnuuxdW8iRb` |
| Baseline status | `foundation_and_tokens_approved` |
| Human reviewer | Tom |
| Capture date | 2026-07-24 |
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

All expected pages and their node IDs were verified on 2026-07-24. Only the
Foundation and Tokens pages were inspected in detail for Phase 2.

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

- Detailed component, Section, and Page node inspection beyond pages 00 and 01
- Component properties, variants, states, and instance behavior
- Section composition and Page architecture
- Responsive breakpoints: no breakpoint variable/style was found
- Font asset delivery and licenses for Inter and JetBrains Mono
- Motion easing and reduced-motion intent: not specified in the inspected source
- Accessibility requirements beyond visible design
- Human design reviewer and review date
- Thank You Page visual design

Tom approved the Phase 2 Figma Tokens scope and `TASK-P2-001` on 2026-07-24.
This does not approve uninspected component or Page visuals.
