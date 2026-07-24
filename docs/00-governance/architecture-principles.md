# Architecture Principles

## Dependency hierarchy

```text
Tokens
→ Core Components
→ Composite Components
→ Product Components
→ Sections
→ Pages
```

Higher layers may consume only their permitted lower layers. Lower layers must
not import higher layers. Cycles are prohibited.

## Layer rules

### Tokens

- Depend on nothing.
- Represent approved visual decisions such as color, typography, spacing,
  radius, elevation, breakpoint, and motion.
- Must remain independent of pages and product behavior.

### Core Components

- Depend only on Tokens.
- Provide small, accessible, product-agnostic primitives.
- Must not contain route, API, page, or product-domain knowledge.

### Composite Components

- May depend on Core.
- Combine Core primitives into reusable interface patterns.
- Must not depend on Product Components, Sections, or Pages.

### Product Components

- May depend on Core and Composite.
- Express mi-goTo product concepts and approved interactions.
- Must not depend on Sections or Pages.
- Backend-facing data must follow OpenAPI.

### Sections

- May depend on Core, Composite, and Product.
- Compose substantial page regions.
- Must not depend on Pages or embed page-specific routing assumptions without an
  approved interaction specification.

### Pages

- Assemble Sections and shared layout components.
- Own route-level composition, metadata, and approved orchestration.
- Must not contain duplicated component styling.
- Must not recreate Core, Composite, Product, or Section styles locally.

## Reuse restrictions

- A higher layer must not recreate a lower-layer component style.
- Pages must not copy component CSS to create local variants.
- Missing variants must be added at the owning layer after design review.
- Page-specific exceptions require an architecture decision and human approval.

## Cross-cutting principles

- Visuals follow Figma; behavior follows interaction specifications; contracts
  follow OpenAPI; copy follows content configuration.
- Dependencies and public interfaces remain explicit and testable.
- Responsive behavior must be traceable, not guessed from one viewport.
- Accessibility belongs to every layer.
- API, configuration, routing, content, analytics, and state enter components
  through defined boundaries.
- Client-visible configuration must not contain secrets.
- Shared abstractions require demonstrated responsibility, not hypothetical use.
- Breaking changes require impact analysis, semantic versioning, migration
  guidance, and human approval.

## Exceptions

An exception must document the affected layers, rationale, alternatives, risks,
compatibility impact, migration or expiry, owner, and human approval in an ADR
or approved change request.

