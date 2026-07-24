# Source of Truth Policy

## Purpose

Authority is assigned by concern. No single source controls every aspect of the
frontend. A conflict must be recorded and resolved by the responsible human
owner; contributors must not silently choose or merge conflicting requirements.

## Independent sources of truth

### Figma Design System

Source:
[mi-goTo Figma design](https://www.figma.com/design/vyr3TvF5lAUOnuuxdW8iRb/prototype?node-id=0-1&p=f&t=AdHvWZgIn8DrsmI6-0)

Controls:

- visual hierarchy;
- design tokens;
- component appearance;
- section layout;
- page layout; and
- responsive design intent.

Figma does not control API fields, application state transitions, route
behavior, final content ownership, implementation status, tests, or approval.

### Product and Interaction Specifications

Control:

- routes;
- links;
- CTA behavior;
- state transitions;
- form behavior; and
- success and error flows.

They do not define backend field types or visual token values.

### Backend OpenAPI

Controls:

- endpoints;
- request fields;
- field types;
- response fields;
- HTTP status codes;
- backend errors; and
- authentication.

Contract revision and semantic API version are separate. The known revision `1`
must not be presented as backend semantic version `1.0.0`.

### Content configuration

Controls:

- website copy;
- language variants;
- legal content; and
- reusable labels.

Content configuration does not independently define layout, component logic,
API contracts, or approval.

### Code

Code represents the actual implementation. Existing code does not override an
authoritative specification merely because it runs.

### Tests

Tests provide evidence that implementation behavior is correct against approved
requirements. Passing tests do not define product intent or constitute human
approval.

## Foundational statement

**Figma is the visual foundation of the frontend code system, but Figma does not
independently define backend contracts or application behavior.**

## Supporting records

- `VERSION.yaml` records phase, source versions, contract revision, and
  compatibility status.
- Phase documents define authorized scope, gates, and evidence.
- Registries link requirements, sources, code, tests, deviations, and releases.
- Change-control records preserve instructions, decisions, issues, incidents,
  and change requests.

Supporting records organize authority; they do not replace primary sources.

## Conflict and missing-source process

1. Classify the concern as visual, behavioral, contractual, content,
   implementation, or evidence.
2. Preserve source references, versions, and the observed conflict.
3. Stop affected work when continuing would require invention.
4. Record an issue, deviation, change request, or decision as appropriate.
5. Assign resolution to the controlling human owner.
6. Update the authoritative source or approve a time-bounded deviation.
7. Update affected code, tests, documentation, versions, and registries.
8. Record human review.

A missing source is an unresolved dependency, not permission to infer it.

