# TASK-P6D-002 Imprint test report

## Result

Automated implementation validation passed. Human page approval has not been
inferred.

## Scope

- Content revision: `FIGMA-122-3-EN-1.0.0`
- Figma source: Page `122:2`, frame `122:3`
- Publication language: English
- Published public content groups: 10
- Desktop viewport: 1440 × 1000
- Mobile viewport: 390 × 844

## Results

| Check | Result |
| --- | --- |
| Management validation | Passed — 5 scripts |
| Documentation validation | Passed — 119 checks |
| Version validation | Passed — 12 checks |
| Compatibility validation | Passed — 19 checks |
| Registry validation | Passed — 54 checks |
| OpenAPI validation | Passed — 21 checks |
| Type checking | Passed |
| ESLint | Passed |
| Unit/component tests | Passed — 92 tests in 28 files |
| Phase 6D Chromium tests | Passed — 3 tests |
| Production build | Passed — 167 modules transformed |
| Git diff check | Passed |

## Verified behavior

- `/imprint` renders through `LegalLayout`.
- Exactly one approved Landing Header and Footer render.
- Ten current public content groups and ten stable index links render.
- Current Tempelhof-Schöneberg authority information is present.
- Telephone, email and website links have approved destinations.
- The temporary route-shell wording is absent.
- The future Treptow-Köpenick authority block is absent.
- The relocation editor instruction is absent.
- No German or Chinese body variant is published.
- Revision and Figma source metadata are present.
- No PDF link or dependency exists.
- Data Protection, Landing and Contact regressions passed.
- Responsive structure passed at 1440px and 390px.

## Review status

- Task: `approved` through review task `TASK-P6D-003`
- Phase 6D: `approved`
- Human visual/content review: approved by Tom on 2026-07-28
- Professional legal review: deferred by explicit Product Owner risk
  acceptance

The original automated results above are preserved unchanged. Human approval
evidence is recorded in
`phase-6d-TASK-P6D-003-approval-2026-07-28.md`.
