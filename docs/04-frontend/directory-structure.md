# Planned Source Directory

The following structure is a plan. It must not be created until Phase 1 is
authorized.

```text
src/
├── app/
│   ├── configuration/
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
│   ├── theme/
│   └── components/
│       ├── core/
│       └── composite/
├── layouts/
├── pages/
├── router/
├── services/
│   └── api/
├── state/
├── types/
├── utils/
└── main.ts
```

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
| `state/` | Justified shared application state only |
| `types/` | Shared non-contract types |
| `utils/` | Pure utilities without UI-layer ownership |

## Rules

- Lower layers must not import higher layers.
- Pages must not duplicate component styling.
- Content and assets must be registered before use.
- API calls must not be embedded in visual components.
- Empty directories are not created just to mirror this plan.

## Decisions required

- Test and generated-code locations
- Styling and token formats
- Content and localization structure
- Shared layout classification
- API client generation strategy
- State-management package, if justified

