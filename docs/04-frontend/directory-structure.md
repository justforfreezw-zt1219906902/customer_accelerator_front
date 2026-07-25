# Source Directory

The Phase 1 directory boundaries and Phase 2 token/theme implementation are
present directly under the repository root. Component and Product layers remain
empty until their phases are authorized.

```text
src/
├── app/
│   ├── configuration/
│   │   └── environment.ts
│   └── providers/
├── assets/
├── components/
│   ├── product/
│   └── sections/
├── content/
│   ├── header/
│   ├── footer/
│   └── pages/
├── design-system/
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── radius.ts
│   │   ├── shadows.ts
│   │   ├── motion.ts
│   │   ├── breakpoints.ts
│   │   ├── opacity.ts
│   │   ├── stroke.ts
│   │   └── index.ts
│   ├── theme/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── global.css
│   │   └── index.css
│   └── components/
│       ├── core/
│       │   ├── AppButton.vue
│       │   ├── AppInput.vue
│       │   ├── AppCard.vue
│       │   ├── AppBadge.vue
│       │   ├── AppSectionContainer.vue
│       │   └── index.ts
│       └── composite/
├── layouts/
│   └── AppLayout.vue
├── pages/
│   └── FoundationPlaceholderPage.vue
├── router/
│   └── index.ts
├── services/
├── types/
├── utils/
├── App.vue
└── main.ts
```

Test structure:

```text
tests/
├── e2e/
│   └── foundation.spec.ts
└── unit/
    ├── AppButton.spec.ts
    ├── AppInput.spec.ts
    ├── AppCard.spec.ts
    ├── AppBadge.spec.ts
    ├── AppSectionContainer.spec.ts
    ├── designTokens.spec.ts
    └── FoundationPlaceholderPage.spec.ts
```

Root foundation files include `index.html`, Vite, TypeScript, ESLint,
Prettier, and Playwright configuration, `.nvmrc`, `package.json`, and
`package-lock.json`.

## Responsibilities

| Path | Responsibility |
| --- | --- |
| `app/` | Bootstrap, public configuration, and root providers |
| `assets/` | Verified and licensed local assets |
| `components/product/` | mi-goTo domain components |
| `components/sections/` | Page-ready Section composition |
| `content/` | Website copy and translations |
| `design-system/tokens/` | Primitive and semantic tokens |
| `design-system/theme/` | Token modes and theme delivery |
| `design-system/components/core/` | Core Components depending only on Tokens |
| `design-system/components/composite/` | Composite Components depending on Core |
| `layouts/` | Shared Page layout composition |
| `pages/` | Route-level Pages |
| `router/` | Routes, scroll/focus behavior, and metadata |
| `services/api/` | OpenAPI-governed transport and mappings |
| `types/` | Shared non-contract types |
| `utils/` | Pure utilities without UI-layer ownership |

## Rules

- Lower layers must not import higher layers.
- Pages must not duplicate component styling.
- Content and assets must be registered before use.
- API calls must not be embedded in visual components.
- Empty component and Product layer boundaries do not claim implementation.

## Decisions required

- Generated-code location
- Content and localization structure
- Shared layout classification
- API client generation strategy
- State-management package only if later justified
- Supported browser, CI, and accessibility targets
