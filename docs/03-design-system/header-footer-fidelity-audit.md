# Header and Footer Fidelity Audit

## Audit record

- Task: `TASK-P6A-005`
- Date: 2026-07-27
- Reviewer and decision owner: Tom
- Review result for `TASK-P6A-004`: `CHANGES REQUIRED`
- Figma Design System version: `1.0.0`
- Compatibility baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Audit mode: Figma and repository read-only
- Application-code changes in this task: none

Tom explicitly confirmed that the active Figma prototype is authoritative for
the Header and Footer visible content, order, hierarchy, layout, width, height,
spacing, alignment, typography, responsive intent, language presentation, and
CTA presentation. Earlier content configuration and documentation that
conflict with that prototype are outdated. This decision does not change the
Figma semantic version.

## Figma evidence

The active `06 Landing Page` canvas is node `212:2`. Its only inspected page
frame is the 1440 × 8337 desktop frame `212:3`.

### Header

- Landing instance: `212:4`
- Source component: `105:464`
- Logo: `105:452`
- Navigation group: `105:453`
- Navigation items, in order:
  - `105:454` — `THE PROBLEM`
  - `105:455` — `THE METHOD`
  - `105:456` — `PROOF`
  - `105:457` — `PACKAGES`
  - `207:975` — `WHY MI-GOTO`
- Language group: `105:459`
- Languages: `105:460` DE, `105:461` EN, `105:462` CN
- Language and CTA group: `105:458`
- CTA: `STRATEGY DISCUSSION`
- Desktop geometry: 1440 × 80, 130px horizontal padding, 22px vertical
  padding, 1180px content width, 34px navigation gap, 10px language gap, and
  22px language-to-CTA gap.

### Footer

- Landing instance: `212:737`
- Source component: `105:494`
- Columns: `I212:737;105:472`
- Brand group: `I212:737;105:473`
- Logo: `I212:737;105:474`
- Statement: `I212:737;105:475` —
  `Technology should understand before it speaks.`
- Navigation group: `I212:737;105:476`
- Navigation content, in order: `The Problem`, `The Method`, `Packages`,
  `Team`, `Why mi-goTo`
- Contact group: `I212:737;105:482`
- Legal group: `I212:737;105:486`
- Divider: `I212:737;105:490`
- Bottom row: `I212:737;105:491`
- Copyright: `I212:737;105:492`
- Bottom statement: `I212:737;105:493` —
  `Source-grounded ABM intelligence for B2B growth companies`
- Desktop geometry: 1440 × 419, 130px horizontal padding, 76px top padding,
  34px bottom padding, 1180px columns/divider/bottom width, 38px major vertical
  gap, 370px brand column, and 180px navigation/contact/legal columns.

### Principle panel and fallback evidence

- Principle section instance: `212:375`
- Principle component: `171:40`
- Figma panel contains only the `INSUFFICIENT_DATA` tag, headline, and
  explanatory copy. Figma does not contain a fallback message below the card.
- Repository source:
  `src/components/sections/ProductPreviewSection.vue` declares the default
  `emptyText` value `Preview content is not available.` and renders it when
  `insights.length` is zero and no `preview` slot exists.
- Consumer:
  `src/pages/LandingPage.vue` uses the `principle-panel` variant with an empty
  insights array and no preview slot. This activates the fallback branch.
- The fallback must be removed from the rendered DOM by `TASK-P6A-006`; this
  audit does not modify it.

## Discrepancy summary

The detailed, machine-readable comparison is in
`docs/06-traceability/header-footer-impact-matrix.yaml`.

| Area | Confirmed discrepancies | Unverified responsive items |
| --- | ---: | ---: |
| Header | 5 | 1 |
| Footer | 14 | 1 |
| Principle fallback | 1 | 0 |
| Total | 20 | 2 |

The unverified responsive items are not counted as discrepancies. The inspected
Figma page exposes only the 1440px desktop frame; no independent mobile or
tablet Header/Footer frame was found. Existing responsive behavior must remain
functional, but exact smaller-viewport fidelity requires human review or an
additional Figma reference.

## Shared-component impact

`MarketingLayout.vue` is the single Header/Footer composition owner. It imports
`AppNavbar`, `AppFooter`, `navigationEn`, and `footerEn`.
`LegalLayout.vue` composes `MarketingLayout`, so it inherits both shared
components.

Consequently, the shared fix affects all seven registered routes:

- `/`
- `/why-mi-goto`
- `/contact`
- `/thank-you`
- `/imprint`
- `/data-protection`
- the unknown-route fallback

The direct shared implementation scope for `TASK-P4A-002` is:

- `src/design-system/components/composite/AppNavbar.vue`
- `src/design-system/components/composite/AppFooter.vue`
- `src/content/header/defaultHeaderContent.ts`
- `src/content/navigation/en.ts`
- `src/content/footer/defaultFooterContent.ts`
- `src/content/footer/en.ts`
- `src/layouts/MarketingLayout.vue`

Conditional supporting scope, only when the shared fix proves it necessary:

- approved tokens and `AppSectionContainer` width behavior
- shared CTA presentation through `AppButton`
- `src/layouts/LegalLayout.vue`

The Landing-only regression scope for `TASK-P6A-006` is:

- `src/components/sections/ProductPreviewSection.vue`
- `src/pages/LandingPage.vue`
- related Section, Landing, routing, and visual-fidelity tests

## Correction sequence

1. `TASK-P4A-002` corrects the shared Header/Footer source, content,
   presentation, and tests against Figma 1.0.0.
2. Human review verifies the shared components on Marketing and Legal layouts.
3. `TASK-P6A-006` removes the unintended Principle fallback and runs Landing
   regression checks against the corrected shared components.
4. Automated validation and a human browser review are required before
   `ISSUE-2026-003` can be resolved.

## Audit conclusion

`TASK-P6A-004` did not satisfy the visual-fidelity Gate. Its automated evidence
remains preserved, but `implementation_fix_complete` is false after human
review. `ISSUE-2026-003` remains open. No application code was changed by this
audit.
