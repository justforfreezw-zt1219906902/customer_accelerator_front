# TASK-P8-005 Full Automated QA

## Identity

- RC ID: `REL-FE-0.2.0-rc.1`
- Frozen source / build commit:
  `5773c9474be8731f8350a8f3ff542be4f0fce91d`
- Starting governance metadata commit:
  `cbfc9386b2e835afcc68cd52e2860c634f4af817`
- Isolated workspace:
  `/private/tmp/mi-goto-frontend-0.2.0-rc.1-5773c947`
- Node: `v24.2.0`
- npm: `11.6.0`
- Lockfile SHA-256:
  `b76a684aef8c955ba0eb3ef31971a281ae246990b6946bea295c8fb3a6370844`
- OS: Darwin 24.6.0 arm64
- Date: 2026-07-28

## Gate and installation

RC Entry Gate passed before the ID was assigned. `npm ci` installed 328
packages without modifying the lockfile. It reported deprecation warnings and
nine high-severity development-tooling vulnerabilities. Production dependency
audit (`--omit=dev`) reported zero vulnerabilities.

## Results

| Check | Result |
|---|---|
| Version | passed, 12/12 |
| Compatibility | passed, 19/19 |
| Registries | passed, 63/63 |
| OpenAPI | passed, 21/21 |
| Documentation | **failed, 4 missing clean-checkout directories** |
| Management | **failed because documentation validation failed; 4/5 children passed** |
| Typecheck | passed |
| ESLint | passed |
| Unit/component/router | passed, 120 tests in 33 files |
| Playwright Chromium | passed, 28 tests |
| Production build | passed, 207 modules |

Documentation failure details are recorded in `ISSUE-2026-010`.

## Formatting

Status: `passed_with_13_accepted_historical_warnings`.

The pure Prettier check reported the 13 already-recorded files. None changed in
the frozen source commit relative to its parent. The repository `format` script
contains `--write`; its initial invocation rewrote the temporary worktree.
Those exact files were immediately restored to the frozen commit, the worktree
was verified, and the non-writing check was used. No source change was retained.

Affected files:

1. `src/components/product/AIInsightPreviewCard.vue`
2. `src/components/product/CustomerProblemCard.vue`
3. `src/components/product/ProcessStepCard.vue`
4. `src/components/why/WhyImpactSection.vue`
5. `src/components/why/WhyPillarsSection.vue`
6. `src/content/why/en.ts`
7. `src/design-system/components/composite/AppFormField.vue`
8. `src/design-system/components/composite/AppTextarea.vue`
9. `src/pages/WhyMiGotoPage.vue`
10. `tests/e2e/phase-6e-why.spec.ts`
11. `tests/unit/AIInsightPreviewCard.spec.ts`
12. `tests/unit/TrustMetricCard.spec.ts`
13. `tests/unit/WhyMiGotoPage.spec.ts`

## Conclusion

Automated application checks pass, but the required clean-checkout management
Gate fails. The task is blocked and no final RC artifact was created.
