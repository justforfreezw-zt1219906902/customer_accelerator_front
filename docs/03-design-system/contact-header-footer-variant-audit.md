# Contact Header and Footer Variant Audit

## Review basis

- Task: `TASK-P6B-002`
- Reviewer: Tom
- Result: `CHANGES REQUIRED`
- Figma Design System: `1.0.0`
- Contact Page/frame/form: `269:2`, `269:3`, `269:47`
- Contact Header/Footer: `314:44`, `257:1671`
- Landing Header/Footer: `212:4`, `212:737`
- Change Request: `CR-2026-001`

Figma was inspected read-only on 2026-07-28. Responsive Contact frames were
not discovered in the supplied nodes, so mobile behavior must preserve the
same hierarchy without inventing additional content.

## Comparison

| ID | Contact node | Landing node | Contact expected result | Current implementation | Required variant | Owner / affected file | Regression risk | Required tests |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CHROME-001 | `314:44` | `212:4` | Logo and one `HOME` destination | Full Landing navigation, languages, and CTA | `AppNavbar` Contact variant | Composite / `AppNavbar.vue` | Landing navigation accidentally removed | Variant content and Landing regression |
| CHROME-002 | `314:44` | `212:4` | Logo precedes HOME in a simple horizontal row | Three-part Landing hierarchy | Contact hierarchy | Composite / `AppNavbar.vue` | Incorrect keyboard order | DOM and keyboard-order test |
| CHROME-003 | `314:44` | `212:4` | 188px desktop side padding; 22px vertical padding; 32px main gap | Landing uses 130px sides and distributed navigation/actions | Contact geometry | Composite / `AppNavbar.vue` | Overflow at intermediate widths | 1440px, tablet, and 390px checks |
| CHROME-004 | `314:44` | `212:4` | Same 124×36 light lockup, dark background, subtle bottom border | Logo treatment/background are shared and compatible | Reuse existing asset and tokens | Composite / `AppNavbar.vue` | Asset or contrast regression | Asset, contrast, and snapshot checks |
| CHROME-005 | `314:44` | `212:4` | No language controls or strategy CTA | DE/EN/CN and CTA are visible | Contact action suppression | Composite / `AppNavbar.vue` | Landing controls hidden globally | Per-variant visibility tests |
| CHROME-006 | `257:1671` | `212:737` | Compact 120px footer | Full multi-column Landing footer | `AppFooter` Contact compact variant | Composite / `AppFooter.vue` | Full footer accidentally changed | Variant and Landing regression |
| CHROME-007 | `257:1671` | `212:737` | Copyright left; Home, Imprint, Data protection right, 28px link gap | Brand, description, three columns, divider, two-part bottom row | Contact content/config variant | Composite/content config | Missing or incorrect legal links | Link destination and order tests |
| CHROME-008 | `257:1671` | `212:737` | 188px side padding and 32px vertical padding | 130px sides, 76px top, 34px bottom, 38px internal gaps | Compact Contact geometry | Composite / `AppFooter.vue` | Footer wrap/overflow | 1440px and 390px visual checks |
| CHROME-009 | `257:1671` | `212:737` | Dark surface, subtle top border, 13px text, purple legal links | Shared colors are compatible; hierarchy and typography differ | Contact typography/context | Composite / `AppFooter.vue` | Link contrast/focus regression | Accessibility and visual tests |
| CHROME-010 | `257:1671` | `212:737` | No brand logo, descriptive copy, contact column, LinkedIn, divider, or bottom statement | All Landing-only content is present | Contact content suppression | Composite / `AppFooter.vue` | Content leaks between variants | Variant content tests |
| CHROME-011 | `269:3` | `212:3` | Contact Page composes Contact Header, Contact main, Contact Footer | `/contact` composes shared Landing chrome through `MarketingLayout` | Planned `ContactLayout` | Layout / `ContactLayout.vue`, route map | Route/layout or focus regression | Route, title, skip-link, focus tests |
| CHROME-012 | `269:3` | `212:3` | Shared components own chrome; Page owns Contact main only | Page correctly contains no chrome markup | Preserve Page boundary | Page / `ContactPage.vue` | Duplicate markup introduced | Composition test |

## Approved architecture direction

```text
MarketingLayout
├── AppNavbar (Landing/default)
└── AppFooter (Landing/full)

ContactLayout
├── AppNavbar (Contact)
└── AppFooter (Contact compact)
```

`TASK-P4A-003` owns shared typed variants. `TASK-P6B-003` owns Contact layout
and route integration. No implementation is performed by this review task.

