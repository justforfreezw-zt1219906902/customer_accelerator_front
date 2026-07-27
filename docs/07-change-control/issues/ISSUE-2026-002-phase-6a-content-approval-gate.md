# ISSUE-2026-002 — Phase 6A Landing content approval gate is not satisfied

## Classification

- Type: Issue
- Date: 2026-07-27
- Status: resolved
- Resolution date: 2026-07-27
- Resolver task: `TASK-P6A-002`
- Human reviewer: Tom
- Resolved by: Tom's explicit content, commercial, Team, FAQ, asset, and language approval
- Owner: Product owner / Tom
- Affected phase: Phase 6A
- Affected task: `TASK-P6A-001`
- Baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Human verification: pending

## Existing requirement

Phase 6 requires approved content before a final Page is implemented.
`AGENTS.md` and the source-of-truth policy state that content configuration,
not Figma alone, controls website copy and that unknown requirements must not
be invented.

## Observed conflict

- `CONTENT-LANDING` in `docs/02-inputs/content-inventory.yaml` has
  `source: unknown`, `owner: unknown`, `status: pending_source`, and an unknown
  English translation status.
- The active Figma Landing Page includes marketing claims, numerical metrics,
  package prices, team biographies, and FAQ copy.
- The Phase 6A instruction prohibits invented statistics and prices and
  requires approved content configuration.
- The active Page contains Team and FAQ sections, but the approved Section
  Registry contains only the eight Phase 4C Sections.

Implementing the Figma text as production content would incorrectly treat
visual source material as content approval and would introduce unapproved
claims and prices.

## Impact

Phase 6A cannot safely replace the temporary Landing route shell. No
application code, tests, Page registry status, or implementation baseline was
changed.

## Required resolution

Product owner / Tom must:

1. confirm the authoritative English Landing content source and owner;
2. approve, replace, or remove the numerical marketing claims;
3. approve, replace, or remove the package prices;
4. decide whether Team and FAQ belong in Phase 6A and, if so, authorize the
   required Section/component scope or an approved composition approach;
5. update or explicitly authorize updating `CONTENT-LANDING`.

After these decisions are recorded, a new Phase 6A execution may implement the
approved content and run the required validation suite.

## Evidence

- `docs/02-inputs/content-inventory.yaml`
- `docs/phases/phase-6-static-pages.md`
- `docs/03-design-system/section-registry.yaml`
- Figma page `06 Landing Page` (`212:2`)
- Figma desktop frame `212:3`, inspected read-only on 2026-07-27

## Human review

- Reviewer: Tom
- Result: APPROVED
- Date: 2026-07-27

## Resolution

Tom explicitly approved the active Figma `06 Landing Page` English content as
the initial Frontend 1.0 content source. He approved the exact metrics,
customer-result claims, prices, commercial details, qualitative claims, Team
content, Team asset publication permission, FAQ questions and answers, and EN
language scope.

The following Gate conditions are satisfied:

1. `CONTENT-LANDING` owner and approver are Tom.
2. English Figma content is approved.
3. Metrics are approved and restricted to the active baseline.
4. Prices are commercially confirmed and restricted to the active baseline.
5. Marketing claims are approved.
6. Team content and asset publication permission are approved.
7. Team is registered as `SEC-LANDING-009`.
8. FAQ content is approved.
9. FAQ is registered as `SEC-LANDING-010`.
10. EN is active; DE and CN remain visible but unavailable.
11. No unresolved content item blocks Phase 6A.

Read-only verification found no Team photograph/image nodes in the active
Figma instance; the current visual source uses text initials. This is recorded
without inventing file paths and does not block implementation of the active
baseline.
