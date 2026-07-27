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

### DEV-2026-007 — Product spacing token normalization

- Affected Figma: `1.0.0`, Product nodes `82:37` through `82:197`
- Affected frontend: `0.0.1`, `src/components/product`
- Difference: Un-tokenized 14px, 36px, and 60px spacing values use the nearest
  approved 16px, 32px, and 64px tokens.
- Reason: Product components must not introduce unapproved raw design values.
- Impact: Minor spacing differences with token consistency preserved.
- Approval: Approved by Tom on 2026-07-25 for `TASK-P5-001`
- Owner: Product owner / Tom
- Review date: 2026-07-25
- Next review: Phase 4B human review

### DEV-2026-008 — Fluid Product component widths

- Affected Figma: `1.0.0`, Product nodes `82:37` through `82:197`
- Affected frontend: `0.0.1`, `src/components/product`
- Difference: Fixed library specimen widths become fluid components with
  optional maximum widths for compact and CTA variants.
- Reason: Components must fit responsive parent layouts without an invented
  breakpoint.
- Impact: Content wraps and components shrink safely; maximum visual proportions
  remain traceable to Figma.
- Approval: Approved by Tom on 2026-07-25 for `TASK-P5-001`
- Owner: Product owner / Tom
- Review date: 2026-07-25
- Next review: Phase 4B human review

### DEV-2026-009 — Fluid Section responsiveness

- Affected Figma: `1.0.0`, Section nodes `90:543`, `90:593`, `90:691`,
  `90:833`, `90:903`, `90:1051`, `195:714`, `90:1157`
- Affected frontend: `0.0.1`, `src/components/sections`
- Difference: Figma provides fixed 1180px specimens and an explicit mobile
  layout variant only for How It Works. Code uses fluid, token-bounded grids
  that wrap without an invented breakpoint.
- Reason: Figma 1.0.0 and the implemented token baseline contain no approved
  breakpoint values; responsive failure is not acceptable.
- Impact: Intermediate viewport wrapping is implementation-defined and requires
  visual review. Content hierarchy, component composition, and named variants
  remain traceable to Figma.
- Approval: Approved by Tom on 2026-07-25 for `TASK-P6-001`
- Owner: Product owner / Tom
- Review date: 2026-07-25
- Next review: Phase 4C human review or approval of breakpoint tokens

### DEV-2026-010 — Contact Page shared layout chrome

- Affected Figma: `1.0.0`, Contact Header `314:44`, compact Footer `257:1671`
- Affected frontend: `0.0.1`, Contact route using `MarketingLayout`
- Difference: The Contact main content follows frame `269:3`, while global
  chrome remains the approved shared Header/Footer from the route registry.
- Reason: Changing route layout or duplicating Page chrome is outside
  `TASK-P6B-001` and conflicts with the approved shared-layout architecture.
- Impact: Contact-specific Figma header/footer are not reproduced.
- Approval: not accepted as final implementation
- Human disposition: `not_accepted`
- Decision reason: Contact Page must match its own approved Figma Header and
  Footer.
- Superseded by Change Request: `CR-2026-001`
- Implementation correction complete: `true` under `TASK-P6B-003`
- Corrected implementation: `/contact` now uses `ContactLayout` with the shared
  Contact Header and Footer variants.
- Human verification: `approved` by Tom on 2026-07-28
- Human reviewer: Tom
- Owner: Product owner / Tom
- Review date: 2026-07-28
- Resolution: corrected implementation approved; historical evidence retained

## Resolved deviations

### DEV-2026-005 — Text wordmark fallback

Resolved on 2026-07-27. The Figma-derived shared logo asset is implemented in
the Navbar and Footer, and Tom approved both shared consumers during the final
`TASK-P6A-006` browser/Figma review.
