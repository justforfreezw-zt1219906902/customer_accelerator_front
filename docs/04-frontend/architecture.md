# Frontend Architecture

## Status

This is the planned Vue 3 architecture. No application code or `src/` structure
has been created. Tool and package choices require Phase 1 approval.

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

## Phase 1 decisions required

- Vue/Vite/TypeScript versions and package manager
- Router and whether a global state package is needed
- Test, lint, formatting, build, and accessibility tools
- Styling and token delivery
- Content and localization format
- API generation or manual mapping
- Supported runtime, browsers, and CI

