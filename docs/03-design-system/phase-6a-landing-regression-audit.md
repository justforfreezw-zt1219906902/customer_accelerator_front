# Phase 6A Landing Regression Audit

## Record

- Task: `TASK-P6A-006`
- Source issue: `ISSUE-2026-003`
- Audit date: `2026-07-27`
- Figma Design System: `1.0.0`
- Figma page: `06 Landing Page`
- Desktop frame: `212:3`
- Scope: findings `FINDING-P6A-008` through `FINDING-P6A-010`
- Header and Footer visual systems: reconfirmed and excluded from redesign

## Figma Evidence

| Area | Figma node | Confirmed evidence |
| --- | --- | --- |
| Team | `212:615` | Landing section represented by the stable `team` anchor in the approved interaction specification. |
| FAQ | `212:666` | Landing section represented by the stable `faq` anchor. |
| Final CTA band | `212:715` | Full-width band immediately before the Footer. |
| Final CTA section instance | `212:716` | `Section / Final CTA / Primary`, 1180 × 438, positioned at x=130. |
| Final CTA source component | `90:1157` | Primary CTA contains the CONTACT kicker, exact heading and description, and STRATEGY DISCUSSION action. |
| Footer | `212:737` | Immediately follows the Final CTA band. |
| Principle panel | `212:375` | `INSUFFICIENT_DATA` panel; no separate fallback message follows it. |

## Finding Analysis

### FINDING-P6A-008 — Extraneous fallback text

| Field | Evidence |
| --- | --- |
| Figma node | Principle section `212:375`; source panel `171:40` |
| Expected structure | One complete `INSUFFICIENT_DATA` card with no following fallback node. |
| Current structure | `ProductPreviewSection` rendered a principle `AppCard`, then a sibling `<p role="status">`. |
| Source | `src/components/sections/ProductPreviewSection.vue` |
| Root cause | A generic default `emptyText` branch ran whenever both insights and the preview slot were empty, including the approved principle variant. |
| Consumers/routes | Landing Page at `/`; no other approved source consumer was found. |
| Required fix | Remove the unapproved fallback implementation and obsolete prop. |
| Tests | Component and Page DOM assertions plus desktop Chromium evidence. |

The visible `Preview content is not available.` text is not present in the
active Figma Landing Page. It is produced by the shared
`ProductPreviewSection` empty-state branch after the approved principle card.
The Landing Page has no approved empty-state consumer for this variant, so the
fallback must be removed from the rendered DOM rather than hidden with CSS.

### FINDING-P6A-009 — Team and FAQ anchors

| Field | Evidence |
| --- | --- |
| Figma node | Team `212:615`; FAQ `212:666` |
| Expected structure | Separate, unique `team` and `faq` section roots. |
| Current structure | Both components had correct defaults, and Footer config already contained `/#team`, but the Page relied on implicit defaults. |
| Source | `src/pages/LandingPage.vue`, `src/components/sections/TeamSection.vue`, `src/components/sections/FAQSection.vue`, `src/content/footer/defaultFooterContent.ts` |
| Root cause | The reviewed behavior lacked explicit Page-level anchor binding and cross-route browser regression evidence; no incorrect current Footer value was found. |
| Consumers/routes | Footer on all `MarketingLayout` routes; target is Landing `/`. |
| Required fix | Pass both stable IDs explicitly and verify shared route scrolling without a Page-specific hack. |
| Tests | Unique IDs, exact Footer href, route resolution, same/cross-route browser navigation. |

The approved destinations are `/#team` and `/#faq`. The section components
already support stable IDs, and the shared Footer configuration already uses
`/#team`. The Landing Page will pass both IDs explicitly and regression tests
will verify uniqueness and route resolution.

### FINDING-P6A-010 — Final CTA fidelity

| Field | Evidence |
| --- | --- |
| Figma node | Band `212:715`; Page instance `212:716`; source component `90:1157`; Footer `212:737` |
| Expected structure | Primary Final CTA section and panel followed immediately by the Footer. |
| Current structure | `FinalCtaSection` owned the section and composed `LandingCtaPanel`, but lacked the Figma outer card boundary and exact nested alignment/sizing. |
| Source | `src/components/sections/FinalCtaSection.vue`, `src/components/product/LandingCtaPanel.vue`, `src/content/landing/en.ts`, `src/pages/LandingPage.vue` |
| Root cause | The earlier generic responsive grid represented the component family, not the active Primary Landing instance. |
| Consumers/routes | Landing Page `/` only; shared product panel remains available to approved lower-layer consumers. |
| Required fix | Apply the Primary instance hierarchy and measurements without duplicating Button or Footer styling. |
| Tests | Exact copy/order, approved component composition, final Page-section position, Footer separation, 1440px screenshot. |

The exact element preceding the Footer is the Primary Final CTA section
instance `212:716`, inside band `212:715`. Its confirmed composition is:

1. 1180px section container with 56px desktop padding.
2. A 1068px highlighted CTA panel with violet border and glow.
3. `CONTACT` kicker.
4. `Let’s decode your first account together`.
5. `Bring 2–3 accounts you want to win. We’ll show you their buying signals, business context and Communication DNA — and whether mi-goTo fits your growth motion.`
6. Primary `STRATEGY DISCUSSION` action.
7. Footer node `212:737` follows immediately.

The content configuration already matches this copy. The correction is limited
to the section/panel hierarchy and Figma-confirmed sizing, alignment, padding,
border, radius, and glow. Responsive layouts will preserve the hierarchy while
allowing widths and padding to contract.

## Protected Areas

- Do not rewrite approved Landing content.
- Do not redesign `AppNavbar` or `AppFooter`.
- Do not change routes or backend behavior.
- Do not invent assets, links, prices, statistics, or translations.
- Do not resolve `ISSUE-2026-003` without the required human browser review.
