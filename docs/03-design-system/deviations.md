# Design Deviations

## Policy

A design deviation is a known difference between an approved Figma source and
the frontend implementation. Missing or uninspected design information is an
unknown input, not a deviation.

Each deviation must record:

- `DEV-YYYY-NNN` identifier;
- affected Figma version and node;
- affected code path and Frontend version;
- description and reason;
- visual, accessibility, behavior, and compatibility impact;
- resolution or expiry;
- owner;
- human approval status; and
- linked change request or ADR.

## Active deviations

### DEV-2026-001 — Fluid Section Container sizing

- Affected Figma: `1.0.0`, `mi-goTo/Section Container` (`42:66`)
- Affected frontend: `0.0.1`,
  `src/design-system/components/core/AppSectionContainer.vue`
- Difference: Figma library specimens are fixed at 720px. The code container is
  fluid and uses token-bounded `clamp()` padding.
- Reason: A production section wrapper must support responsive page widths
  without relying on an unapproved breakpoint.
- Impact: Same spacing scale and visual hierarchy, with fluid width behavior.
- Approval: Approved by Tom on 2026-07-25 for `TASK-P3-001`
- Owner: Tom
- Review date: 2026-07-24
- Next review: When the breakpoint baseline changes

### DEV-2026-002 — Accessibility focus-visible treatment

- Affected Figma: `1.0.0`, Button `34:60` and Card `36:22`
- Affected frontend: `0.0.1`, `AppButton.vue` and `AppCard.vue`
- Difference: Code adds token-backed `:focus-visible` rings; Figma has no
  explicit Button or interactive Card focus variant.
- Reason: Keyboard users require a visible focus indicator.
- Impact: Accessibility improvement with no default-state change.
- Approval: Approved by Tom on 2026-07-25 for `TASK-P3-001`
- Owner: Tom
- Review date: 2026-07-24
- Next review: When Figma adds focus variants

### DEV-2026-003 — Disabled opacity normalization

- Affected Figma: `1.0.0`, Button `34:60`, Input `35:26`, Badge `41:42`
- Affected frontend: `0.0.1`, `AppButton.vue`, `AppInput.vue`, `AppBadge.vue`
- Difference: Code consistently uses the approved `opacity/disabled` token
  (`0.4`). Button and Input specimens expose component-local raw opacity values
  near `0.58` and `0.56`; Badge is bound to the approved token.
- Reason: Core styling must consume approved tokens and avoid repeated raw
  values.
- Impact: Button and Input disabled states are more subdued than their Figma
  specimens.
- Approval: Approved by Tom on 2026-07-25 for `TASK-P3-001`
- Owner: Tom
- Review date: 2026-07-24
- Next review: When Figma disabled states or tokens change

### DEV-2026-004 — Native Select open-state rendering

- Affected Figma: `1.0.0`, Select `68:389`
- Affected frontend: `0.0.1`, `AppSelect.vue`
- Difference: The browser renders the open option list instead of a custom
  replica of the Figma Open specimen.
- Reason: No custom listbox behavior is approved; native semantics are the
  accessible baseline.
- Impact: Platform-dependent open-state visuals with stable keyboard behavior.
- Approval: Approved by Tom on 2026-07-25 for `TASK-P4-001`
- Owner: Product owner / Tom
- Review date: 2026-07-25
- Next review: Phase 4A human review

### DEV-2026-005 — Text wordmark fallback

- Affected Figma: `1.0.0`, Navbar `68:432`, Footer `68:517`
- Affected frontend: `0.0.1`, `AppNavbar.vue`, `AppFooter.vue`
- Difference: Code renders the preserved `mi-goTo` text while Figma references
  a logo asset.
- Reason: No approved logo asset path is registered.
- Impact: Brand remains present but is not the final approved lockup.
- Approval: Approved by Tom on 2026-07-25 for `TASK-P4-001`
- Owner: Product owner / Tom
- Review date: 2026-07-25
- Next review: Phase 4A human review

### DEV-2026-006 — Explicit mobile Navbar variant

- Affected Figma: `1.0.0`, Navbar `68:432`
- Affected frontend: `0.0.1`, `AppNavbar.vue`
- Difference: Mobile mode is selected through a typed prop rather than an
  inferred viewport breakpoint.
- Reason: Figma 1.0.0 defines no breakpoint token.
- Impact: Responsive orchestration remains a consumer responsibility until the
  breakpoint baseline is approved.
- Approval: Approved by Tom on 2026-07-25 for `TASK-P4-001`
- Owner: Product owner / Tom
- Review date: 2026-07-25
- Next review: When a breakpoint baseline is approved

## Resolved deviations

None.
