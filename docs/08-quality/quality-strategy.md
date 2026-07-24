# Quality Strategy

## Status

This is a planning strategy. Vue Foundation and concrete quality tooling do not
exist, so tool selections are `decision_pending` and no check is reported as
passed.

## Quality layers

| Quality activity | Purpose | Earliest phase | Tool status |
| --- | --- | --- | --- |
| Lint | Enforce code and architecture conventions | Phase 1 | `decision_pending` |
| Type checking | Detect invalid Vue/TypeScript contracts | Phase 1 | `decision_pending` |
| Unit tests | Verify pure logic, validation, and mappings | Phase 1 | `decision_pending` |
| Component tests | Verify component props, events, states, accessibility, and composition | Phase 3 | `decision_pending` |
| Integration tests | Verify router, content, state, and API boundaries | Phase 5/7 | `decision_pending` |
| End-to-end tests | Verify critical user journeys across deployed boundaries | Phase 6/7 | `decision_pending` |
| Visual regression | Compare reviewed components/Pages to a versioned Figma baseline | Phase 2 onward | `decision_pending` |
| Accessibility review | Combine automated and manual keyboard/screen-reader/visual review | Every implementation phase | `decision_pending` |
| Responsive review | Verify approved layouts, content, interaction, zoom, and reflow | Phase 2 onward | `decision_pending` |
| Production smoke tests | Verify deployed routes, assets, configuration, lead flow, and recovery | Phase 8 | `decision_pending` |

## Evidence rules

- Every check links to requirements, source versions, compatibility baseline,
  environment, commit/artifact, and report.
- Automated checks do not replace visual, accessibility, security, privacy, or
  human review.
- Failures create an Issue when implementation violates an existing requirement.
- Intentional Figma differences require an approved Deviation.
- Unavailable tools are `planned` or `decision_pending`, never `passed`.
- Test data must be safe and must not create unintended production leads.

## Test pyramid and scope

- Prefer many fast unit/component checks for deterministic behavior.
- Use integration tests for boundaries, contracts, and state transitions.
- Reserve end-to-end tests for critical journeys and environment confidence.
- Use visual evidence at both component and Page levels.
- Use production smoke tests only after deployment authorization.

## Entry and exit

Each phase defines its own acceptance criteria and required evidence in
`phase-gates.md`. A phase cannot be approved until required checks, documents,
registries, compatibility review, Issues, and human approval are complete.

## Phase 1 decisions required

- Lint and formatting tools
- Vue/TypeScript type-check command
- Unit and component test framework
- Browser/end-to-end framework
- Coverage policy
- Visual regression tooling and baseline storage
- Automated accessibility tooling
- Contract/integration test tooling
- CI execution and report retention

