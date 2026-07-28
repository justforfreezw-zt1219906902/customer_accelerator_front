# ISSUE-2026-006 — Phase 8 Release Candidate entry Gate is not satisfied

## Metadata

- Status: `open`
- Severity: `blocking`
- Reported by: Codex
- Date: 2026-07-28
- Owner: Product/release owner and repository owner
- Environment: local repository
- Baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Affected phase: Phase 8 — QA, Release Candidate and Deployment Readiness
- Affected task: `TASK-P8-001`
- Human verification: `pending`

## Requirement

`TASK-P8-001` requires, before Release Candidate validation:

1. no temporary route shell in the frozen release scope; and
2. a reproducible candidate whose exact source Git commit is identifiable.

The explicit production-configuration exception covers unknown hosting,
production URLs, CORS approval, monitoring, support, rollback authority and the
official Backend API version. It does not waive temporary release-scope UI or
an uncommitted candidate source.

## Expected behavior

- The in-scope Not Found behavior is final and human-approved, or an explicit
  time-bounded release Deviation approves the temporary presentation.
- All candidate source and governance records are committed to an identifiable
  Git commit.
- The Release Candidate artifact is built from that exact commit without
  post-build mutation.

## Actual behavior

- `PAGE-NOT-FOUND` is registered as `temporary_route_shell_only`.
- Its design review status is `interaction_approved_visual_review_pending`.
- The route map identifies the Not Found implementation as a temporary shell.
- The working tree contains 45 modified or untracked entries.
- Current HEAD is `23df8b4537f58fef00d28eedaec64e2b25f4e7e9`, but the
  approved Phase 6/7 candidate source is not fully represented by that commit.

## Reproduction

1. Inspect `docs/03-design-system/page-registry.yaml` for `PAGE-NOT-FOUND`.
2. Inspect `docs/04-frontend/route-map.yaml` for the catch-all route.
3. Run `git status --short`.
4. Run `git rev-parse HEAD`.

## Evidence

- Affected route: `/:pathMatch(.*)*`
- Affected Page: `src/pages/NotFoundPage.vue`
- Affected registries: route map, Page registry, implementation baseline
- Git branch: `master`
- Git HEAD: `23df8b4537f58fef00d28eedaec64e2b25f4e7e9`
- Working-tree entries: `45`
- Frequency: deterministic

## Impact

A reproducible RC cannot be created without either finalizing/accepting the
Not Found presentation and committing the complete candidate source. Creating
an artifact now would violate the RC entry Gate and could not be traced to an
exact immutable source commit.

## Required resolution

1. Human owner approves final Not Found presentation/content, or approves an
   explicit time-bounded release Deviation for the temporary fallback.
2. Complete candidate source and governance records are reviewed and committed.
3. The worktree is clean or contains only explicitly excluded evidence.
4. A new authorized continuation reruns the Phase 8 entry Gate.

## Validation

- Phase 7 approval: passed
- Phase 6A–6F approval: passed
- Registered release scope: passed
- Critical open Issue before this audit: none
- Not Found temporary-shell Gate: failed
- Exact source-commit Gate: failed
- Figma comparison: not run because RC entry Gate failed
- Full Phase 8 QA: not run because RC entry Gate failed
- RC artifact/manifest: not created
- Production deployment: not performed

## Human review

- Reviewer: pending
- Result: `pending`
- Date: pending

## TASK-P8-002 remediation update

On 2026-07-28, `TASK-P8-002` replaced the temporary Not Found shell with the
Tom-approved final RC fallback and updated its route name to `NotFound`.
Automated unit and Chromium checks pass for the approved copy, shared chrome,
Home recovery, title, responsive behavior and absence of backend calls.

The Issue remains `open` because this task is prohibited from creating the
exact source-freeze commit. Human visual approval is also pending. The original
45-entry Gate evidence and previous HEAD remain unchanged above as historical
evidence; the worktree is reclassified in the `TASK-P8-002` instruction record.
