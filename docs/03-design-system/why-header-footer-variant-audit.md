# Why Header and Footer Variant Audit

## Scope

- Task: `TASK-P6E-001`
- Figma version: `1.0.0`
- Why Page: `259:2`
- Desktop frame: `259:3`
- Why Header instance: `259:4`
- Why Header component: `257:1655`
- Why Footer instance: `259:167`
- Why Footer component: `257:1671`
- Reviewer: Codex
- Human design decision owner: Tom
- Date: 2026-07-28

No mobile Why frame was discovered. Responsive behavior therefore reuses the
approved shared navigation and compact-footer behavior and remains subject to
the Phase 6E browser/Figma review.

## Comparison

| ID | Why node | Compared with | Expected Why result | Existing shared behavior | Required variant behavior | Owner | Content source | Affected files | Regression risk | Required tests |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| WHY-CHROME-001 | `257:1655` | Landing Header `212:4` | Logo, `HOME`, `OUR STORY`, `MISSION`, `FIVE PILLARS`, `IMPACT`, and `STRATEGY DISCUSSION`; no language controls | Landing provides product navigation and EN/DE/CN controls | Typed `why` variant with editorial anchor navigation and CTA | `AppNavbar` | `src/content/navigation/why.en.ts` | Navbar, WhyLayout, routing | Landing content or behavior could drift | Why variant unit test; Landing and Why Chromium checks |
| WHY-CHROME-002 | `257:1655` | Contact Header `314:44` | Editorial five-item navigation plus CTA | Contact provides only `HOME` and no CTA | Retain shared mobile menu and focus behavior while rendering exact Why content | `AppNavbar` | `src/content/navigation/why.en.ts` | Navbar, WhyLayout | Contact compact behavior could drift | Contact regression; one Header check |
| WHY-CHROME-003 | `257:1671` | Landing Footer `212:737` | Compact copyright plus Home, Imprint, Data protection | Landing has identity, grouped navigation and bottom statement | Typed `why` compact presentation | `AppFooter` | `src/content/footer/why.en.ts` | Footer, WhyLayout | Landing full Footer could collapse accidentally | Footer unit test; Landing regression |
| WHY-CHROME-004 | `257:1671` | Contact Footer `257:1671` | Same confirmed compact visual structure and public links, selected through a distinct typed variant | Contact already implements the same compact component source | `why` remains a distinct architecture choice even where the current visual source is shared | `AppFooter` | `src/content/footer/why.en.ts` | Footer, WhyLayout | Variant identity could be inferred from route | Why/Contact class and route checks |
| WHY-CHROME-005 | `259:4`, `259:167` | Legal layouts | Why chrome, not Landing legal chrome | LegalLayout intentionally reuses Landing variants | Assign `/why-mi-goto` only to `WhyLayout` | Router / layouts | Approved Phase 6E decision | routes, WhyLayout | Legal routes could inherit Why chrome | Legal-layout Chromium regression |

## Outcome

The previously approved `MarketingLayout` assignment for `/why-mi-goto` is
superseded by Tom's explicit Phase 6E decision. `CR-2026-002` records the
change. Figma itself did not change, so the Figma semantic version remains
`1.0.0`.

Tom approved the implemented Why Header, Footer, layout and Page fidelity
through `TASK-P6E-002` on 2026-07-28. Review notes: `good`.
