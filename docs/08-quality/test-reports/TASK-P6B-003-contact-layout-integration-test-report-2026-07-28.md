# TASK-P6B-003 Contact Layout Integration Test Report

## Scope

- Date: 2026-07-28
- Baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Figma: `1.0.0`
- Frontend: `0.0.1`
- Environment: local
- Browser: Playwright Chromium
- Human approval: approved by Tom on 2026-07-28

## Automated results

| Check | Result |
| --- | --- |
| Management validation | Passed |
| Documentation validation | Passed |
| Version validation | Passed |
| Compatibility validation | Passed |
| Registry validation | Passed |
| OpenAPI validation | Passed |
| Typecheck | Passed |
| ESLint | Passed |
| Unit/component tests | Passed — 26 files, 88 tests |
| Playwright Chromium | Passed — 6 tests |
| Production build | Passed |
| Git diff check | Passed |

## Contact regression

- `/contact` renders `ContactLayout`.
- Exactly one shared Contact Header and one shared Contact Footer render.
- Landing chrome is absent from Contact.
- `ContactPage` and `LeadForm` render once.
- The four approved visible fields remain present.
- Required/email validation remains functional.
- The owner field remains absent.
- No request to `/api/lead` occurs.
- Page title and Page-heading focus behavior pass.

## Cross-route regression

- Landing Header/Footer desktop and mobile checks pass.
- Landing section and duplicate-ID checks pass.
- Approved Legal-layout consumers remain on shared Legal/Marketing chrome.

## Browser evidence

Captured for review, not automatically accepted:

- Contact Header, form, Footer, and full Page at 1440px
- Contact Header, form, Footer, and full Page at 390px
- Landing full Page at 1440px and 390px

Evidence is stored in the Playwright `test-results/` output for this run.

## Execution note

The first browser run used a stale `dist` preview and failed because it rendered
the previous Marketing layout. After creating the current production build,
the unchanged regression suite passed. This was an environment/output freshness
problem, not an accepted visual difference.

## Review status

- Automated result: passed
- Visual/Figma review: approved by Tom
- Review result: `APPROVED`
- Review notes: `good`
- Task: `approved`
- Phase 6B: `approved`
- Next Gate: Phase 6C Data Protection Page Review
