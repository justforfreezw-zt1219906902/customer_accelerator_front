# mi-goTo Frontend Working Agreement

These rules apply to every AI task in this repository.

## Mandatory task workflow

Before editing, every AI agent must:

1. Read `AGENTS.md`.
2. Read `VERSION.yaml`.
3. Read the relevant phase document in `docs/phases/`.
4. Read the active sources of truth for the affected concerns.
5. Inspect existing files before editing.
6. Modify only the permitted scope.
7. Preserve human-authored content.
8. Record unexpected events, errors, deviations, and conflicts.
9. Update affected registries and status files.
10. Never mark work approved without recorded human approval.

If a required source is missing or conflicts with another source, stop the
affected work, record the issue, and ask the responsible human owner. Do not
invent requirements, API fields, visual intent, behavior, versions, tests, or
approval.

## Sources of truth

- Figma controls visual hierarchy, tokens, component appearance, and responsive
  design intent.
- Product and interaction specifications control routes, CTAs, states, and user
  behavior.
- OpenAPI controls endpoints, fields, types, authentication, responses, and
  errors.
- Content configuration controls website copy and translations.
- Code records the actual implementation.
- Tests provide evidence that specified behavior works.

Figma is the visual foundation of the frontend code system, but it does not
define backend contracts or application behavior by itself.

## Dependency hierarchy

```text
Tokens
→ Core Components
→ Composite Components
→ Product Components
→ Sections
→ Pages
```

Dependencies flow from higher layers to permitted lower layers. Lower layers
must not import higher layers, and dependency cycles are prohibited.

## Governance Bootstrap Exception

A task may proceed without an existing phase document only when all of the
following are true:

1. The repository is still in planning or governance initialization.
2. The required phase document does not exist.
3. A human explicitly authorizes the exception.
4. The task is limited to governance or documentation files.
5. No application or backend code is modified.
6. The missing phase document is created during the same task.
7. The exception expires immediately after the phase document exists.

An AI agent must never infer this exception. It applies only through explicit
human authorization. The bootstrap exception used for
`docs/phases/phase-0-project-audit.md` has expired because that document now
exists.

## Change discipline

- Preserve unrelated and pre-existing work.
- Review human-authored content before changing it.
- Keep assumptions explicit and reversible.
- Use the smallest scoped change that satisfies the authorized task.
- Update documentation, traceability, change-control, quality, and release
  records when affected.
- Report what changed, what was checked, assumptions, unresolved items, and
  approvals still pending.

## Approval language

Automated checks may be described as passing. Work may be described as created,
implemented, or awaiting review. Only an identifiable human reviewer may change
an approval state to `approved`.

