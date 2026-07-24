# Dependency Map

## Primary sequence

```text
Phase 0 → Phase 1
Phase 1 → Phase 2
Phase 2 → Phase 3
Phase 3 → Phase 4A
Phase 4A → Phase 4B
Phase 4B → Phase 4C
Phase 4C → Phase 5
Phase 5 → Phase 6
Phase 6 → Phase 7
Phase 7 → Phase 8
```

## Internal ordering

```text
Phase 4 = Phase 4A → Phase 4B → Phase 4C
Phase 6 = Phase 6A → Phase 6B → Phase 6C → Phase 6D → Phase 6E
```

## Input dependencies

| Work | Required source or decision |
| --- | --- |
| Phase 1 | Approved Phase 0 readiness, runtime/tooling constraints |
| Phases 2–4 | Reviewed and versioned Figma Design System |
| Phases 4B–7 | Approved Product and Interaction Specifications |
| Phases 4C–6 | Approved content configuration and translations |
| Phases 6C–6D | Human-approved legal content |
| Phase 7 | Authoritative OpenAPI and official backend semantic version |
| Phase 8 | Hosting, security, privacy, monitoring, incident, and rollback requirements |

## Dependency meaning

An arrow means the predecessor's applicable Definition of Done and human
approval are entry requirements for the successor. `blocked`, `needs_review`,
or unapproved work cannot silently satisfy a dependency.

## Unresolved dependency decisions

- Whether Phase 6 pages must be sequential or may run in parallel after Phase 5
- Whether Contact may precede Landing
- Whether legal/content/localization foundations need a separate workstream
- Whether Phase 7 may use a mock contract before all Phase 6 pages are approved
- Whether deployment infrastructure preparation may run before Phase 8 while
  production release remains gated

