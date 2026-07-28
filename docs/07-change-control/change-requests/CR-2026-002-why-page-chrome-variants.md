# CR-2026-002: Why Page Chrome Variants

## Metadata

- Status: `approved`
- Requested and approved by: Tom
- Date: 2026-07-28
- Owner: Product owner / Tom
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Target phase: Phase 6E
- Source task: `TASK-P6E-001`
- Affected architecture: shared layouts and Composite Components
- Human approval: `approved`

## Previous architecture

The approved Phase 5 route map assigned `/why-mi-goto` to `MarketingLayout`,
which uses Landing Header and Footer variants.

## Approved change

The Why Page uses its own shared architecture:

```text
/why-mi-goto
→ WhyLayout
→ AppNavbar variant="why"
→ WhyMiGotoPage
→ AppFooter variant="why"
```

Why Header source: component `257:1655`, Page instance `259:4`.

Why Footer source: component `257:1671`, Page instance `259:167`.

## Constraints

- Do not duplicate Header or Footer markup in the Page.
- Components must not infer variants from route names.
- Landing and Contact variants must remain unchanged.
- No external URL, translation or content may be invented.
- Figma semantic version remains `1.0.0`.

## Alternatives

- Keep `MarketingLayout`: rejected by Tom because Why has independent chrome.
- Use `ContactLayout`: rejected because the Why Header includes editorial
  navigation and a CTA.
- Duplicate markup in `WhyMiGotoPage.vue`: rejected because it violates the
  shared-component architecture.

## Implementation

- `AppNavbar` and `AppFooter` now expose typed `why` variants.
- `WhyLayout` selects both variants and owns route navigation.
- `/why-mi-goto` is assigned to `WhyLayout`.
- Landing, Contact and Legal route regressions pass.

Implementation status: `approved`.

Human implementation approval: `approved` by Tom through `TASK-P6E-002` on
2026-07-28. Review notes: `good`.
