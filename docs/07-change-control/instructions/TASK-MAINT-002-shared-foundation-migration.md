# TASK-MAINT-002 — Shared Foundation Migration

## Task metadata

- Date: 2026-08-12
- Tool: Codex with Figma read-only access
- Operator: Human-directed Codex task
- Starting baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Target baseline: `DS1.2.0_API0.0.0_FE0.2.0`
- Status: `needs_review`
- Human review: `pending`
- Git commit: `pending — human controlled`

## Authorization and scope

Tom accepted `TASK-MAINT-001`, assigned Figma DS `1.2.0`, authorized verified
shared token migration, context-aware Logo support and Source Attribution Chip,
and deferred Avatar and all ABM Product/App work. Existing Marketing APIs,
routes, content and default visuals must remain compatible.

## Figma evidence

- Foundation and logo usage: `25:2`
- ABM token additions: `349:13`
- Foundation additions/governance: `467:5`
- Source Attribution Chip: `167:14`
- Additional verified variable consumers: `351:9`, `352:9`, `353:24`,
  `353:30`, `356:51`, `358:1352`, `357:1775`, `382:45`, `443:1080`

Figma was read only. Exact structured variable definitions were used; no
screenshot-estimated values were introduced.

## Implementation

- Added compatible CSS/TypeScript spacing, radius, font-size, app typography
  and soft-violet-glow tokens.
- Replaced the Navbar's reusable literal 22px block padding with
  `--spacing-22` without changing output.
- Added the verified dark lockup and a typed `context` prop to `AppBrandLogo`;
  default behavior remains the light lockup for dark surfaces.
- Added `AppSourceAttributionChip` with Neutral/Amber tones and text semantics.
- Added focused token and Core component tests.

Semantic text/documentation colors were left pending because complete verified
Light Impact mode values were unavailable. No fallback values were invented.

## Deferred and prohibited work

Avatar, Marketing Composite refactors, ABM Core/Composite/Product components,
App Shell, Demo routes, fixtures, state and Pages 13–18 were not implemented.
No dependency, backend, Figma, release, commit, push or deployment change was
performed.

## Validation

Validation results and browser evidence are recorded in
`docs/08-quality/test-reports/TASK-MAINT-002-shared-foundation-migration-2026-08-12.md`.

Management validation, typecheck, ESLint, 124 unit/component/router tests,
production build and 16 focused Marketing Chromium tests passed. The full
Chromium suite reported 26 passed and two existing Phase 7 failures because the
preview runtime lacked `VITE_API_BASE_URL`; those tests observed the documented
safe configuration error instead of the mocked API behavior. Prettier continues
to report the 13 accepted historical warnings and did not identify a new task
file.

## Errors and unexpected events

- Initial Figma Page-level context calls required verified descendant targets;
  the migration used those descendant node IDs without guessing.
- The first asset download failed in the restricted network sandbox and
  succeeded after approved network access.
- The first Chromium attempt could not bind the preview port in the sandbox;
  the approved rerun completed.
- Complete Light Impact values for the new semantic text/documentation colors
  were unavailable from structured Figma source, so those tokens were not
  guessed or implemented.

## Human gate

Mandatory Marketing regression review is pending. `TASK-MAINT-003` remains
unauthorized until Tom accepts that checkpoint.
