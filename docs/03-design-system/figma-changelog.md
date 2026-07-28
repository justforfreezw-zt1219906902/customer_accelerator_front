# Figma Design System Changelog

This changelog records reviewed changes to the Figma Design System. It does not
constitute design approval.

## Required future entry structure

Every version entry must contain:

- Added
- Changed
- Deprecated
- Removed
- Breaking Changes
- Migration Notes
- Affected code layers

Entries should identify Figma nodes or variables, code mappings, compatibility
impact, reviewer, review date, and approval evidence.

## [1.1.0] — 2026-07-28

### Added

- `11 Thank You Page` (`321:28`) and desktop frame `321:29`.

### Changed

- The expected Figma page inventory now includes the successful Contact
  submission destination.

### Deprecated

- None.

### Removed

- None.

### Breaking Changes

- None. This is compatible new page functionality.

### Migration Notes

- Replace the temporary `/thank-you` shell with the Figma-backed Page.
- Reuse the approved Contact-style shared chrome shown in the frame.

### Affected code layers

- Pages, content configuration, routing layout mapping, tests, and traceability.

Human scope approval: Tom, 2026-07-28. Implementation visual approval remains
pending.

## [1.0.0] — 2026-07-24

### Added

- Initial Figma version registered from project input.
- Expected Foundation-through-Contact Page structure registered.

### Changed

- Phase 2 read-only inspection confirmed seven variable collections, two color
  modes, twelve text styles, and five effect styles.
- Token naming normalization and exact code mappings are now recorded in
  `token-map.yaml`.

### Deprecated

- None recorded.

### Removed

- None recorded.

### Breaking Changes

- None identified during the initial extraction. No prior implemented token
  baseline existed for comparison.

### Migration Notes

- The Phase 1 temporary foundation values were replaced with Figma-backed
  runtime CSS variables.
- Breakpoints and motion easing require a future confirmed source before use.

### Affected code layers

- Implemented: Tokens and Theme
- Planned: Core, Composite, Product, Sections, and Pages

Human visual approval for the Phase 2 token scope: **approved by Tom on
2026-07-24** (`TASK-P2-001`). Uninspected component, Section, and Page visuals
remain outside this approval.
