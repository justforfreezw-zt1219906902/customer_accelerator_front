# Frontend Architecture

## Status

The minimal Vue 3 foundation is implemented and awaiting Phase 1 human review.
Product layers remain planned and unimplemented.

## Layered architecture

```text
Tokens
→ Core Components
→ Composite Components
→ Product Components
→ Sections
→ Pages
```

### Tokens

Represent approved Figma variables and styles. Tokens depend on nothing.

### Core Components

Accessible product-agnostic primitives using Tokens only. Core contains no
route, API, Page, or product knowledge.

### Composite Components

Reusable interface patterns composed from Core. Composite does not own product
contracts or Page behavior.

### Product Components

mi-goTo domain UI composed from Core and Composite. Product behavior follows
Product and Interaction Specifications; backend data follows OpenAPI.

### Sections

Page-ready content regions composed from Core, Composite, and Product. Sections
receive content and state explicitly and do not depend on Pages.

### Pages

Route-level composition of Sections and shared Composite/layout components.
Pages own metadata and approved orchestration but do not duplicate lower-layer
styles.

### Shared page chrome variants

Page layouts may select typed visual variants of shared Composite chrome when
the active Figma Page defines a distinct Header or Footer. The approved
Phase 6B direction is:

```text
MarketingLayout → AppNavbar (Landing/default) + AppFooter (Landing/full)
ContactLayout   → AppNavbar (Contact) + AppFooter (Contact compact)
LegalLayout     → approved legal chrome
```

`ContactLayout` was implemented under `TASK-P6B-003`. It composes the shared
Contact variants without duplicating Header or Footer markup, while
`ContactPage` remains responsible only for Contact content and form UI. Human
Figma-fidelity approval remains pending.
`AppNavbar` and `AppFooter` remain shared Composite owners. Pages must not copy
raw Header/Footer markup, and a Page-specific variant must not change other
routes implicitly.

## Cross-cutting boundaries

- Router implements only the approved route and interaction maps.
- Content provides copy and translations independently of visual components.
- State uses the narrowest justified scope.
- API transport and OpenAPI mapping remain outside visual components.
- Environment configuration is validated and never stores client secrets.
- Error handling maps technical failures to approved user and operational flows.
- Accessibility applies to every layer.
- Tests provide evidence at the appropriate boundary.

## Source alignment

- Figma: visual system and responsive intent
- Product and Interaction Specifications: routes and behavior
- OpenAPI: backend contracts
- Content configuration: copy and translations
- Code: actual implementation
- Tests: correctness evidence

## Phase 1 foundation decisions

Implemented:

- Vue 3, Vite, strict TypeScript, Vue Router, and npm
- CSS Variables plus scoped CSS
- ESLint, Prettier, Vitest, Vue Test Utils, and Playwright
- No global state package
- Pinned Node development version and committed npm lockfile

Still required:

- Content and localization format
- API generation or manual mapping
- Supported browsers, CI, and accessibility conformance target
- Playwright browser binary installation approval
