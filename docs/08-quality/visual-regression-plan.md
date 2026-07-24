# Visual Regression Plan

## Purpose

Detect unintended visual drift while preserving Figma as the visual authority.
The concrete comparison tool is `decision_pending`.

## Required identity for every review

Every visual record must link:

- Figma version;
- Frontend version;
- compatibility baseline;
- viewport;
- component state;
- Page;
- reviewer; and
- approved Deviation, when applicable.

It should also record Figma node IDs, theme/mode, locale, browser, commit/artifact,
comparison result, and Issue links.

## Initial target widths

| Width | Planning label |
| --- | --- |
| `1440` | Desktop |
| `1024` | Tablet |
| `768` | Tablet/mobile boundary |
| `390` | Mobile |

These widths seed review coverage. Exact responsive breakpoints must come from
Phase 2 token extraction and may add or replace captures.

## Coverage

- Tokens and theme modes
- Core, Composite, Product, and Section components
- Default, hover, focus, active, disabled, loading, error, empty, and success
  states where applicable
- Landing, Why mi-goTo, Contact, legal, and Thank You Pages
- EN, DE, and confirmed Chinese locale
- Approved browser and device matrix

## Baseline workflow

1. Confirm approved Figma and Frontend versions.
2. Capture deterministic fixtures at approved viewports/states/locales.
3. Obtain human review for the initial code baseline.
4. Compare changes against that baseline.
5. Classify differences:
   - implementation mismatch → Issue;
   - desired design change → Change Request;
   - intentional code/Figma difference → approved Deviation.
6. Update the baseline only after human review.

## Evidence and retention

Store reports under `test-reports/` or the approved external system and link them
to requirements, release manifest, Issues, and Deviations. Retention and storage
tooling are `decision_pending`.

