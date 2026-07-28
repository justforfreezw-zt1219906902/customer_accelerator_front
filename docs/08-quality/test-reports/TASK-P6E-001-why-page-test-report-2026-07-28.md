# TASK-P6E-001 Why Page test report

## Result

Automated implementation validation passed. Human visual approval has not been
inferred.

## Scope

- Figma source: Page `259:2`, desktop frame `259:3`
- Header: `259:4` / `257:1655`
- Footer: `259:167` / `257:1671`
- Publication language: English
- Sections: 7
- Desktop viewport: 1440 × 1000
- Mobile viewport: 390 × 844

## Results

| Check | Result |
| --- | --- |
| Management validation | Passed |
| Documentation validation | Passed |
| Version validation | Passed |
| Compatibility validation | Passed |
| Registry validation | Passed |
| OpenAPI validation | Passed |
| Type checking | Passed |
| ESLint | Passed |
| Unit/component tests | Passed — 95 tests in 29 files |
| Phase 6E Chromium tests | Passed — 3 tests |
| Full Chromium regression suite | Passed — 14 tests |
| Production build | Passed — 201 modules transformed |
| Git diff check | Passed |

## Verified behavior

- `/why-mi-goto` renders through `WhyLayout`.
- Exactly one Why Header and one Why Footer render.
- Landing and Contact chrome do not render on Why.
- Hero, Story, Principle, Mission, Pillars, Impact and Final CTA render in the
  Figma order.
- One `<h1>` renders.
- Five Figma pillar assets and six approved SDG impact cards render.
- The temporary route-shell wording is absent.
- No horizontal overflow occurs at 1440px or 390px.
- Landing, Contact and Legal layout regressions pass.

The first full-suite run exposed two stale Phase 6A assertions that still
assumed Contact and Why used Landing chrome. They were aligned with approved
`CR-2026-001` and `CR-2026-002`; the final complete suite passed 14/14.

## Manual review targets

- Compare the full 1440px Page against frame `259:3`.
- Review the conservative 390px adaptation because Figma has no mobile frame.
- Review Header mobile-menu presentation and anchor behavior.
- Review Footer compact spacing and all Section heights.

## Review status

- Task: `approved` through review task `TASK-P6E-002`
- Phase 6E: `approved`
- Human browser/Figma review: approved by Tom on 2026-07-28

The original automated results above are preserved unchanged. Human approval
evidence is recorded in
`phase-6e-TASK-P6E-002-approval-2026-07-28.md`.
