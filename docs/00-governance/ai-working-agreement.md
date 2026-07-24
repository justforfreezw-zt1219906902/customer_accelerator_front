# AI Working Agreement

## Role

AI agents such as Codex and Claude are implementation assistants. They may
inspect, analyze, document, implement, test, and report within authorized scope.
They are never design, product, backend, security, release, or approval
authorities.

## Repository root rule

The current Git repository root is the only project root. AI agents must confirm
it before creating files.

- Do not create `mi-goto-frontend`, `customer_accelerator_front`, or another
  wrapper project directory.
- Do not move repository files into a nested project.
- Create authorized paths directly inside the existing root.

## Required reading before every task

1. `AGENTS.md`
2. `VERSION.yaml`
3. The relevant document in `docs/phases/`
4. Active sources of truth for affected concerns
5. Affected files, documentation, registries, tests, and Git status

If a required phase document or authoritative source is missing, stop affected
work unless a human explicitly authorizes the narrow Governance Bootstrap
Exception in `AGENTS.md`.

## Inspect before edit

- Inspect target files before changing them.
- Preserve confirmed and human-authored content.
- Merge missing requirements and normalize only where necessary.
- Do not overwrite an entire file for convenience.
- Preserve unrelated work and report overlapping changes.

## Scope limitation

- Modify only files and systems placed in scope.
- Do not create application or backend code during documentation-only tasks.
- Do not expand missing requirements through assumptions.
- Prefer reversible, narrowly targeted changes.

## Phase control

- Confirm current phase and status from `VERSION.yaml`.
- Follow the phase document's scope, dependencies, acceptance criteria, and
  validation approach.
- Do not begin a later phase without required entry evidence and human approval.
- Do not mark a phase complete or approved based on AI output.

## Sources of truth

- Figma: visuals and responsive intent
- Product and Interaction Specifications: behavior
- OpenAPI: backend contracts
- Content configuration: copy and translations
- Code: actual implementation
- Tests: evidence of specified behavior

Conflicts and missing sources must be recorded and escalated to their human
owners.

## Validation

- Run validation proportional to the change.
- Report exact evidence and failures.
- Mark unavailable tools and future commands as `planned`, never `passed`.
- Successful automation does not replace visual or human review.

## Issue and deviation recording

- Record unexpected events, errors, conflicts, blocked inputs, and unexpected
  behavior in change control.
- Record known implementation differences from approved sources as deviations.
- Include impact, owner, resolution or expiry, and approval status.
- Do not hide a blocker behind an undocumented workaround.

## Required updates after every task

As affected, update:

- implementation and tests;
- governance and phase documentation;
- status, source, design, content, route, interaction, and test registries;
- issues, deviations, change requests, incidents, decisions, and instructions;
- `VERSION.yaml`, changelog, releases, and compatibility records.

Do not change version or approval state merely to signal progress.

## Completion report

Report:

- repository root and scope;
- created and modified files;
- preserved human-authored content;
- sources and versions used;
- validation results and planned checks;
- registry and compatibility impact;
- assumptions, issues, deviations, and unresolved questions; and
- human approvals still pending.

## Human approval

Only an identifiable human may record `approved`. AI agents must use
`pending`, `needs_review`, or equivalent non-approved status until that evidence
exists.

