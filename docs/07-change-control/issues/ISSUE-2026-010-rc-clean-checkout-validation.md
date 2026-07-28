# ISSUE-2026-010 — RC clean-checkout management validation fails

## Metadata

- Status: `open`
- Severity: `blocking`
- Priority: `high`
- Reported by: Codex
- Date: 2026-07-28
- Source task: `TASK-P8-005`
- Resolving task: `TASK-P8-006`
- Affected phase: Phase 8
- RC: `REL-FE-0.2.0-rc.1`
- Frozen source: `5773c9474be8731f8350a8f3ff542be4f0fce91d`
- Human approval: `pending`

## Expected

The committed management validation must pass in a clean checkout of the frozen
source without adding uncommitted files.

## Actual

`npm run validate:docs` fails four checks because Git did not preserve these
empty required directories:

- `docs/05-backend/migration-guides`
- `docs/08-quality/acceptance-criteria`
- `docs/09-release/releases`
- `docs/09-release/release-manifests`

Consequently `npm run validate:management` fails even though its other four
child validations pass.

## Reproduction

1. Create a clean detached worktree at the frozen source commit.
2. Run `npm ci`.
3. Run `npm run validate:docs`.
4. Run `npm run validate:management`.

## Impact

The frozen candidate does not reproduce its required management baseline.
TASK-P8-005 cannot produce a final RC artifact or enter Release Candidate
Approval.

## Acceptance criteria

1. Required directories are represented by committed documentation files.
2. Documentation and management validation pass in a new clean checkout.
3. All existing automated checks remain passing.
4. A new immutable remediation source commit is reviewed and approved.
5. RC QA restarts from that new source commit.

## Additional release-readiness findings

These do not replace the clean-checkout blocker but require human decisions
before production release:

- only Chromium is configured; browser-support policy is unresolved;
- accessibility automation and its conformance target are unresolved;
- performance tooling and budgets are unresolved;
- nine high-severity npm audit findings affect development tooling, while
  `npm audit --omit=dev` reports zero production dependency vulnerabilities;
- production API URL and official Backend API semantic version remain
  unresolved;
- no authorized live backend environment was available for smoke testing.

## Resolution

Pending `TASK-P8-006`. Do not patch the frozen worktree or retain a misleading
artifact.
