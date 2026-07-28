# TASK-P8-004 Working-Tree Classification

## Scope

- Review date: 2026-07-28
- Source commit found at task start:
  `5773c9474be8731f8350a8f3ff542be4f0fce91d`
- Source commit changed paths reviewed: 46
- Working-tree entries at task start: 2
- Ambiguous entries: 0

## Source commit classification

| Paths | State | Classification | RC build input | Reason |
|---|---|---|---|---|
| `src/**` | committed | `rc_application_source` | yes | Frontend implementation and approved brand asset |
| `playwright.config.ts` | committed | `rc_tests` | yes | Isolated browser-test configuration |
| `tests/**` | committed | `rc_tests` | yes | Unit, router and Chromium regression coverage |
| `CHANGELOG.md`, `docs/**` except test reports | committed | `rc_governance` | yes | Required status, traceability, registry and change-control records |
| `docs/08-quality/test-reports/TASK-P8-002-*`, `TASK-P8-003-*` | committed | `rc_registered_test_evidence` | yes | Registered automated and review evidence |
| `.idea/workspace.xml` | committed by the user before TASK-P8-004 | `user_local_file` | no | IDE session metadata; not used by build or artifact construction |

The user-created source commit included `.idea/workspace.xml`. TASK-P8-004 did
not modify, stage, remove or rewrite it. RC construction must use application,
test and governance inputs only and must not treat IDE state as release input.

## Working-tree entries at task start

| Path | State | Classification | Include in metadata commit | Reason |
|---|---|---|---|---|
| `.idea/workspace.xml` | tracked, modified | `user_local_file` | no | IDE-generated state after the source commit |
| `.DS_Store` | untracked | `user_local_file` | no | macOS Finder metadata |

## TASK-P8-004 records

All new or modified `TASK-P8-004` Markdown/YAML records are
`rc_governance` or `rc_registered_test_evidence` and are included in the
separate metadata commit. No application source is changed by TASK-P8-004.

## Ignored and absent categories

- `dist/`, `test-results/`, `playwright-report/` and `node_modules/` are
  `generated_ignored_output`; they are ignored and not staged.
- `.env`, `.env.local` and `.env.*.local` are `secret_or_environment_file`;
  none is staged.
- Tracked `.env.development` and `.env.example` contain only documented public
  browser configuration. They were not changed by the source commit.
- No `unrelated_change` or `ambiguous_change` affects the candidate.

## Formatting classification

The historical check at parent commit `c137702a` reported these 14 files:

1. `src/components/product/AIInsightPreviewCard.vue`
2. `src/components/product/CustomerProblemCard.vue`
3. `src/components/product/ProcessStepCard.vue`
4. `src/components/why/WhyImpactSection.vue`
5. `src/components/why/WhyPillarsSection.vue`
6. `src/content/why/en.ts`
7. `src/design-system/components/composite/AppFooter.vue`
8. `src/design-system/components/composite/AppFormField.vue`
9. `src/design-system/components/composite/AppTextarea.vue`
10. `src/pages/WhyMiGotoPage.vue`
11. `tests/e2e/phase-6e-why.spec.ts`
12. `tests/unit/AIInsightPreviewCard.spec.ts`
13. `tests/unit/TrustMetricCard.spec.ts`
14. `tests/unit/WhyMiGotoPage.spec.ts`

`AppFooter.vue` was modified by `TASK-P8-003` and now passes targeted
formatting. The remaining 13 are historical files not modified by
`TASK-P8-002`, `TASK-P8-003` or `TASK-P8-004`. Repository-wide formatting
therefore remains a recorded non-blocking warning; lint, typecheck, tests and
the production build pass. The quality policy does not classify formatting
warnings as a Phase 8 RC-entry blocker.
