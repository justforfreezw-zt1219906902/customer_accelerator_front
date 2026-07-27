# Deviation Log

## Purpose

Track intentional, human-reviewed differences between approved Figma and code.
Do not record missing design information, defects, or requested design changes
as deviations.

## Required fields

- Deviation ID: `DEV-YYYY-NNN`
- Reason
- Affected Figma version and node
- Affected Frontend version and code
- Visual, accessibility, performance, responsive, and compatibility impact
- Alternatives considered
- Resolution or expiry
- Owner
- Approval status and approver
- Review date and next review date
- Linked Change Request, Issue, or ADR

## Active deviations

### DEV-2026-001 — Fluid Section Container sizing

- Reason: Responsive web sections must scale beyond the fixed 720px Figma
  specimen without inventing breakpoints.
- Affected Figma: `1.0.0`, node `42:66`
- Affected Frontend: `0.0.1`,
  `src/design-system/components/core/AppSectionContainer.vue`
- Impact: Fluid width; approved spacing tokens remain authoritative.
- Alternatives: Fixed 720px width; unapproved breakpoint media queries.
- Resolution or expiry: Approved for Phase 3; revisit after breakpoint approval.
- Owner: Tom
- Approval: Approved by Tom for `TASK-P3-001` on 2026-07-25
- Review date: 2026-07-24
- Next review date: When the breakpoint baseline changes
- Linked record: `PHASE-003-core-components.md`

### DEV-2026-002 — Accessibility focus-visible treatment

- Reason: Native keyboard focus must remain visible.
- Affected Figma: `1.0.0`, nodes `34:60` and `36:22`
- Affected Frontend: `0.0.1`, `AppButton.vue`, `AppCard.vue`
- Impact: Token-backed focus ring appears only for keyboard-visible focus.
- Alternatives: No visible focus; wait for a future Figma focus variant.
- Resolution or expiry: Approved for Phase 3; revisit if Figma adds focus variants.
- Owner: Tom
- Approval: Approved by Tom for `TASK-P3-001` on 2026-07-25
- Review date: 2026-07-24
- Next review date: When Figma adds focus variants
- Linked record: `PHASE-003-core-components.md`

### DEV-2026-003 — Disabled opacity normalization

- Reason: Core components must consume approved tokens rather than repeated raw
  opacity values.
- Affected Figma: `1.0.0`, nodes `34:60`, `35:26`, and `41:42`
- Affected Frontend: `0.0.1`, `AppButton.vue`, `AppInput.vue`, `AppBadge.vue`
- Impact: Button and Input disabled states use `0.4` instead of approximately
  `0.58` and `0.56`.
- Alternatives: Preserve component-local raw opacity values.
- Resolution or expiry: Approved for Phase 3; revisit when disabled specifications change.
- Owner: Tom
- Approval: Approved by Tom for `TASK-P3-001` on 2026-07-25
- Review date: 2026-07-24
- Next review date: When Figma disabled states or tokens change
- Linked record: `PHASE-003-core-components.md`

### DEV-2026-004 — Native Select open-state rendering

- Reason: The approved behavior source does not define a custom listbox
  interaction model. Native select semantics provide reliable keyboard and
  assistive-technology behavior.
- Affected Figma: `1.0.0`, node `68:389`
- Affected Frontend: `0.0.1`,
  `src/design-system/components/composite/AppSelect.vue`
- Impact: Closed states follow the token-backed control treatment; the open
  option list is rendered by the browser rather than the Figma specimen.
- Alternatives: Build an unapproved custom listbox; defer the entire Select.
- Resolution or expiry: Pending human review; revisit when interaction behavior
  for a custom Select is approved.
- Owner: Product owner / Tom
- Approval: Approved by Tom for `TASK-P4-001` on 2026-07-25
- Review date: 2026-07-25
- Next review date: Phase 4A human review
- Linked record: `PHASE-004A-composite-components.md`

### DEV-2026-006 — Explicit mobile Navbar variant

- Reason: Figma defines Desktop and Mobile variants but Figma 1.0.0 does not
  define a breakpoint token.
- Affected Figma: `1.0.0`, node `68:432`
- Affected Frontend: `0.0.1`, `AppNavbar.vue`
- Impact: Consumers select the mobile variant explicitly; no unapproved
  viewport threshold is embedded in the component.
- Alternatives: Invent a breakpoint; make Desktop and Mobile simultaneously
  responsive through an undocumented threshold.
- Resolution or expiry: Revisit after breakpoint approval.
- Owner: Product owner / Tom
- Approval: Approved by Tom for `TASK-P4-001` on 2026-07-25
- Review date: 2026-07-25
- Next review date: When a breakpoint baseline is approved
- Linked record: `PHASE-004A-composite-components.md`

### DEV-2026-007 — Product spacing token normalization

- Reason: Figma Product specimens use 14px gaps and CTA padding values of 60px
  and 36px, which are not present in the approved spacing token set.
- Affected Figma: `1.0.0`, nodes `82:37`, `82:66`, `82:93`, `82:110`,
  `82:149`, `82:170`, `82:197`
- Affected Frontend: `0.0.1`, `src/components/product`
- Impact: Code uses the nearest approved spacing values: 16px for 14px, 64px
  for 60px, and 32px for 36px.
- Alternatives: Embed unapproved raw values; change the approved token baseline.
- Resolution or expiry: Pending human review; revisit when the spacing baseline changes.
- Owner: Product owner / Tom
- Approval: Approved by Tom for `TASK-P5-001` on 2026-07-25
- Review date: 2026-07-25
- Next review date: Phase 4B human review
- Linked record: `PHASE-004B-product-components.md`

### DEV-2026-008 — Fluid Product component widths

- Reason: Reusable Product components must accept responsive parent sizing
  while Figma library specimens use fixed presentation widths.
- Affected Figma: `1.0.0`, nodes `82:37`, `82:66`, `82:93`, `82:110`,
  `82:149`, `82:170`, `82:197`
- Affected Frontend: `0.0.1`, `src/components/product`
- Impact: Specimen widths are represented as maximum widths where relevant;
  cards can shrink within responsive layouts and long copy can wrap safely.
- Alternatives: Force fixed widths; invent breakpoint-specific widths.
- Resolution or expiry: Pending human review; revisit after breakpoint approval.
- Owner: Product owner / Tom
- Approval: Approved by Tom for `TASK-P5-001` on 2026-07-25
- Review date: 2026-07-25
- Next review date: Phase 4B human review
- Linked record: `PHASE-004B-product-components.md`

### DEV-2026-009 — Fluid Section responsiveness

- Reason: Figma 1.0.0 and the implemented token baseline contain no approved
  breakpoint values, while Sections must remain responsive.
- Affected Figma: `1.0.0`, nodes `90:543`, `90:593`, `90:691`, `90:833`,
  `90:903`, `90:1051`, `195:714`, `90:1157`
- Affected Frontend: `0.0.1`, `src/components/sections`
- Impact: Fluid, token-bounded grids define intermediate viewport wrapping;
  named variants and content hierarchy remain traceable to Figma.
- Alternatives: Fixed 1180px layouts; unapproved breakpoint media queries.
- Resolution or expiry: Approved for Phase 4C; revisit after breakpoint approval.
- Owner: Product owner / Tom
- Approval: Approved by Tom for `TASK-P6-001` on 2026-07-25
- Review date: 2026-07-25
- Next review date: When the breakpoint baseline changes
- Linked record: `PHASE-004C-sections.md`

## Resolved deviations

### DEV-2026-005 — Text wordmark fallback

- Original reason: No approved logo asset path was available during Phase 4A.
- Resolution: `TASK-P4A-002` introduced the Figma-derived shared logo asset,
  and Tom approved the Header/Footer browser and Figma regression under
  `TASK-P6A-006`.
- Resolution date: 2026-07-27
- Resolver: `TASK-P6A-006`
- Human reviewer: Tom
