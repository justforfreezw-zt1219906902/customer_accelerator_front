# ISSUE-2026-001 — Phase 5B route approval gate is not satisfied

## Classification

- Type: Issue
- Date: 2026-07-25
- Status: resolved
- Resolution date: 2026-07-27
- Resolver task: `TASK-P5A-003`
- Human reviewer: Tom
- Resolved by: Tom's explicit approval of `INT-001`–`INT-021`, applied by `TASK-P5A-003`
- Owner: Product owner / Tom
- Affected phase: Phase 5B
- Baseline: `DS1.0.0_API0.0.0_FE0.0.1`

## Existing requirement

Phase 5B requires an approved Product Interaction Specification and an approved
route/interaction decision set before route infrastructure is implemented.

## Observed conflict

- The Phase 5A specification is approved.
- `docs/04-frontend/route-map.yaml` is
  `specification_approved_decisions_pending`.
- Every registered route is `proposed_needs_review`.
- `INT-001` through `INT-021` remain `decision_required`.
- The approved specification explicitly states that affected implementation
  must not begin until those decisions are approved and recorded.

Implementing the requested route, anchor, unknown-route, title, scroll, mobile,
or locale behavior would therefore convert unresolved proposals into code.

## Impact

Phase 5B cannot safely create or update routing and shared Page interaction
infrastructure. No application code was modified.

## Required resolution

The responsible owners must resolve at least the decisions needed by Phase 5B:

- `INT-001` route paths;
- `INT-002` anchor scroll/focus/history;
- `INT-003` sticky Header offset and focus target;
- `INT-004` unknown-route behavior;
- `INT-005` canonical/trailing-slash policy;
- `INT-006` legacy redirects or explicit deferral;
- `INT-007` interim DE/CN behavior;
- `INT-008` locale strategy or explicit application-state-only deferral;
- `INT-009` LinkedIn URL or non-link behavior;
- `INT-010` mobile menu close/focus behavior;
- `INT-019` no-analytics policy or approved analytics behavior.

After decisions are recorded, update the route map to an approved
implementation-ready status and re-authorize Phase 5B.

## Resolution

Tom explicitly approved all recommended interaction decisions on 2026-07-27.
For `INT-013`, he approved the exception that no `VITE_APP_MODE` behavior is
needed and successful Contact submissions navigate to `/thank-you`. The route
map is now approved for a separately authorized Phase 5B implementation task.
This resolution does not itself approve Phase 5B implementation.

Resolution conditions verified by `TASK-P5A-003`:

1. Phase 5A is approved.
2. All required decisions are approved or validly deferred.
3. `INT-001`–`INT-010` are resolved.
4. `INT-019` is resolved through the approved no-analytics deferral.
5. The route map is `implementation_ready`.
6. No other routing blocker is active.

## Evidence

- `docs/04-frontend/product-interaction-specification.md`
- `docs/04-frontend/route-map.yaml`
- `docs/01-roadmap/current-state.yaml`
- `docs/08-quality/test-reports/phase-5a-task-p7-001-approval-2026-07-25.md`
