# TASK-MAINT-002 Shared Foundation Migration Test Report

- Date: 2026-08-12
- Baseline: `DS1.2.0_API0.0.0_FE0.2.0`
- Status: `automated_validation_complete_needs_human_review`
- Human Marketing review: `pending`

## Scope

Automated checks and browser evidence for the compatible shared token,
AppBrandLogo and Source Attribution Chip migration. No Product/App scope is
included.

## Automated results

| Validation | Result | Evidence |
| --- | --- | --- |
| Management validation | passed | 12 version, 119 documentation, 19 compatibility, 65 registry and 21 OpenAPI checks passed |
| Prettier check | pre_existing_warnings | The same 13 historical source/test files remain unformatted; no TASK-MAINT-002 file was listed |
| Typecheck | passed | `vue-tsc --noEmit -p tsconfig.app.json` |
| ESLint | passed | repository ESLint command |
| Unit/component/router tests | passed | 124 tests in 34 files |
| Production build | passed | Vite, 211 modules transformed |
| Focused Marketing Chromium | passed | 16 tests covering required shared routes and widths |
| Full Chromium suite | 26 passed, 2 failed | Both failures are existing Phase 7 preview runtime-configuration failures: absent API base URL produces configuration behavior instead of mocked request behavior |

The initial sandboxed Chromium attempt could not bind `127.0.0.1:4173`
(`EPERM`). The authorized local-server rerun executed successfully. No failing
assertion involved the migrated token, Logo, Source Attribution, Header,
Footer, layout or static Page behavior.

## Marketing regression evidence

Desktop 1440px and mobile 390px evidence is required for `/`,
`/why-mi-goto`, `/contact`, `/imprint`, and `/thank-you`.

| Route | Widths | Evidence | Observed change | Classification |
| --- | --- | --- | --- | --- |
| `/` | 1440, 390 | full Page plus Header/Footer screenshots | no task-introduced layout change observed | unchanged; human review required |
| `/why-mi-goto` | 1440, 390 | full Page screenshots | no task-introduced layout change observed | unchanged; human review required |
| `/contact` | 1440, 390 | full Page, Header, form and Footer screenshots | no task-introduced layout change observed | unchanged; human review required |
| `/imprint` | 1440, 390 | full Page screenshots | no task-introduced layout change observed | unchanged; human review required |
| `/thank-you` | 1440, 390 | full Page screenshots | no task-introduced layout change observed | unchanged; human review required |

The newly supported dark lockup is additive and has no existing consumer, so
current route screenshots intentionally retain the prior light lockup. Its
asset selection and default preservation are covered by focused component tests.

## Human review

- Reviewer: Tom
- Decision: `pending`
- Gate: TASK-MAINT-003 remains prohibited.
