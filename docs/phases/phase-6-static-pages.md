---
phase: 6
name: Static Pages
status: in_progress
human_approval: pending
---

# Phase 6: Static Pages

## Goal

Assemble reviewed, responsive static Pages from approved Sections and layouts
before enabling live backend behavior.

## Scope

- Phase 6A: Landing Page
- Phase 6B: Contact Page
- Phase 6C: Data Protection Page
- Phase 6D: Imprint Page
- Phase 6E: Why mi-goTo Page
- Responsive, accessibility, visual, content, and route validation

Phase 6A approved scope includes all previously approved Landing Sections plus
`TeamSection` and `FAQSection`. It includes the exact Figma 1.0.0 English
content approved by Tom: metrics, customer-result claims, package prices,
commercial qualifiers, qualitative claims, Team information, and FAQ content.

## Out of Scope

- Live `POST /api/lead` integration
- Backend contract implementation
- Unapproved legal content, translations, tracking, or consent behavior
- Production deployment

## Required Inputs

- Approved Phase 5 route and interaction map
- Approved Figma Page designs and responsive intent
- Approved content and translations
- Human-approved legal content for Data Protection and Imprint
- Metadata, accessibility, SEO, analytics, and consent requirements

## Expected Outputs

- Five static Page implementations
- Responsive accessible Page composition
- Content and Figma traceability
- Visual, route, and automated evidence

## Dependencies

Initial sequence:

```text
Phase 5 → Phase 6A → Phase 6B → Phase 6C → Phase 6D → Phase 6E
```

Parallel Page delivery requires human confirmation.

## Tasks

1. Confirm design, content, metadata, and states for each Page.
2. Assemble Landing from approved Sections.
3. Assemble Contact with non-live submission states.
4. Implement legal Pages only from approved legal content.
5. Assemble Why mi-goTo from approved product content.
6. Validate responsiveness, accessibility, routes, content, and visuals.
7. Record Page-level review evidence.

## Acceptance Criteria

- Approved Pages match Figma and content at required viewports.
- Page composition follows architecture boundaries.
- No live backend behavior is presented as integrated.
- Installed accessibility, visual, route, test, lint, type checking, and build
  checks pass.
- Legal content has human approval.
- Design and product-owner approvals are recorded.

## Validation

**Planned.** Use Phase 1-approved installed commands and approved viewport,
visual, and accessibility workflows.

## Risks

- Missing responsive Figma intent
- Unapproved legal or marketing content
- Static Contact Page implying live submission success
- Page duplication caused by incomplete Sections
- Unconfirmed sequential versus parallel delivery

## Recovery Strategy

Revert only the affected Page while preserving approved shared layers. Restore
the last approved content and mapping; preserve a legal-content audit trail.

## Status

Phase 6: `in_progress`

- Phase 6A: `approved`
- Phases 6B–6E: `not_started`

Phase 6A was opened under `TASK-P6A-001` on 2026-07-27. The required Figma
Landing Page was inspected read-only, but implementation stopped before code
changes because `CONTENT-LANDING` has no confirmed source or owner and remains
`pending_source`. This is a missing Required Input, not a completed audit or
implementation.

Tom resolved the content and Section-scope decisions under `TASK-P6A-002` on
2026-07-27. `ISSUE-2026-002` is retained as resolved history. Phase 6A may
proceed under the separately authorized implementation task `TASK-P6A-003`.

`TASK-P6A-003` implemented the Landing Page from the approved Figma and content
sources. Phase 6A now awaits human visual and implementation review and is not
approved.

Tom rejected the `TASK-P6A-003` visual implementation on 2026-07-27 with
changes required. Because `rejected` is not an allowed task status,
`TASK-P6A-003` remains `needs_review` with
`review_result: changes_required`. `ISSUE-2026-003` is open and blocks Phase 6A
approval. Phase 6A returns to `in_progress`; `TASK-P6A-004` is the next task
and the next Gate is `Phase 6A Visual Fidelity Review`.

`TASK-P6A-004` passed its available automated checks, but Tom's browser review
returned `CHANGES REQUIRED`. `TASK-P6A-005` then completed a read-only
Figma-to-code impact audit. `ISSUE-2026-003` remains open with
`implementation_fix_complete: false`. The next implementation task is the
shared-component correction `TASK-P4A-002`, followed by Landing regression task
`TASK-P6A-006`.

`TASK-P4A-002` has completed the shared Header/Footer implementation and is
`needs_review`. `ISSUE-2026-003` remains open. The next implementation task is
`TASK-P6A-006` for the unintended Principle fallback, Landing regression, and
human visual verification.

`TASK-P6A-006` completed the Landing regression implementation. The unapproved
preview fallback was removed from the DOM, Team/FAQ anchors were explicitly
stabilized, and the Primary Final CTA was aligned to Figma node `212:716`.
Automated and Chromium checks pass. Phase 6A is `needs_review`;
`ISSUE-2026-003` remains open pending Tom's full browser/Figma review.

Tom approved `TASK-P6A-006` and Phase 6A on 2026-07-27 after completing the
full 1440px and 390px browser/Figma review. `ISSUE-2026-003` is resolved.
Phase 6 remains `in_progress`; Phase 6B Contact Page is next.

## Human Approval

Phase 6A: `approved` by Tom on 2026-07-27.

Phase 6 overall: `pending`; Phases 6B–6E remain.

## Completion Report

### Phase 6A blocked execution — 2026-07-27

- Task: `TASK-P6A-001`
- Figma page: `06 Landing Page` (`212:2`)
- Desktop frame inspected: `212:3`, 1440 × 8337
- Visual hierarchy inspected: Header, Hero, Problem, Solution, Method,
  Source-Grounded Principle, Evidence Metrics, Benefits, Packages, Team, FAQ,
  Final CTA, Footer
- Application files modified: none
- Blocker: `ISSUE-2026-002`
- Required decision: Product owner / Tom must approve the Landing Page English
  content source and the marketing claims, metrics, and package prices that may
  be implemented.
- Additional scope decision: the active Page includes Team and FAQ content,
  while the approved Section Registry contains only the eight Sections named
  for Phase 6A.
- Human approval: pending

Implementation and validation evidence are not available because the task
stopped at the content approval gate.

### Phase 6A content Gate resolution — 2026-07-27

- Task: `TASK-P6A-002`
- Content owner and approver: Tom
- Approved source: active Figma `06 Landing Page`, Design System `1.0.0`
- Metrics, customer-result claims, prices, commercial details, and qualitative
  claims: approved for exact publication
- Team Section: approved and registered as `SEC-LANDING-009`
- FAQ Section: approved and registered as `SEC-LANDING-010`
- Language scope: EN active; DE and CN visible but unavailable
- Blocker: `ISSUE-2026-002` resolved
- Application files modified: none
- Next task: `TASK-P6A-003`
- Next Gate: Phase 6A Landing Page Implementation Review

### Phase 6A implementation — 2026-07-27

- Task: `TASK-P6A-003`
- Figma page: `06 Landing Page` (`212:2`)
- Desktop frame: `212:3`
- Implemented the Landing Page using the shared Marketing layout and approved
  Hero, Problem, Solution, Method, Principle, Evidence Metrics, Benefits,
  Packages, Team, FAQ, and Final CTA Sections.
- Preserved the approved Header and Footer content through shared typed content
  configuration.
- Added exact Figma-approved metrics, claims, commercial prices, Team content,
  and FAQ content without extending or rewriting them.
- Added `TrustMetricsSection`, `TeamSection`, and `FAQSection` with typed APIs.
- Validation: management validation passed; type checking passed; lint passed;
  66 unit tests in 23 files passed; production build passed.
- Browser-based visual review and human approval: pending.
- Status: `needs_review`

### Phase 6A human visual review — 2026-07-27

- Reviewed task: `TASK-P6A-003`
- Reviewer: Tom
- Result: `REJECTED — changes required`
- Task status retained: `needs_review`
- Phase 6A status: `in_progress`
- Issue opened: `ISSUE-2026-003`
- Resolving task: `TASK-P6A-004`
- Findings:
  - Header content and visual/structural composition do not match Figma.
  - Footer content and visual/structural composition do not match Figma; its
    content area is too wide.
  - `INSUFFICIENT_DATA` is outside its intended card.
  - Hero validation data is not left of `Account Intelligence` underneath
    `PREDICTABLE ENTERPRISE PIPELINE`.
- Existing automated evidence is preserved, but it does not satisfy visual
  fidelity or human approval.
- Application files modified by this review-record task: none.

### Phase 6A visual-fidelity correction — 2026-07-27

- Task: `TASK-P6A-004`
- Source Issue: `ISSUE-2026-003`
- Header: shared `AppNavbar` retained; Figma logo, 1180px content width,
  desktop alignment, language/CTA grouping, and responsive menu structure
  applied.
- Footer: shared `AppFooter` retained; Figma 1180px inner width, narrower
  columns, divider, spacing, and responsive stacking applied.
- Principle `INSUFFICIENT_DATA`: label, heading, and explanation are contained
  by the Figma-derived Principle Panel.
- Hero: validation metrics are inside Hero copy, below the pipeline kicker and
  before the Account Intelligence panel in DOM/desktop composition.
- Locked Header/Footer text was preserved. Figma text differences are recorded
  as a source conflict and remain subject to human review.
- Validation: type checking, lint, 71 unit/component tests, production build,
  and management/documentation/registry validation passed.
- Playwright evidence tests: added for 1440px and 390px; execution remains
  pending the previously unresolved Chromium browser installation.
- Human browser approval: pending.
- Status: `needs_review`

### Phase 6A failed re-review and impact audit — 2026-07-27

- Reviewed task: `TASK-P6A-004`
- Reviewer: Tom
- Result: `CHANGES REQUIRED`
- Audit task: `TASK-P6A-005`
- Figma authority: the active Figma 1.0.0 prototype controls Header/Footer
  visible content and presentation; conflicting older content records are
  outdated.
- New findings: unintended Principle fallback, continuing Header mismatch, and
  continuing Footer mismatch/excessive width.
- Audit outputs:
  `docs/03-design-system/header-footer-fidelity-audit.md` and
  `docs/06-traceability/header-footer-impact-matrix.yaml`
- Phase 6A status: `in_progress`
- Active blocker: `ISSUE-2026-003`
- Next task: `TASK-P4A-002`
- Next Gate: `Shared Header and Footer Fidelity Review`
- Application files modified by the audit: none

### Phase 6A Landing regression correction — 2026-07-27

- Task: `TASK-P6A-006`
- Source issue: `ISSUE-2026-003`
- Removed `Preview content is not available.` and its fallback wrapper from
  the approved Landing DOM.
- Confirmed Footer Team destination `/#team`; explicitly bound unique `team`
  and `faq` roots and verified cross-route scrolling in Chromium.
- Confirmed the Page element immediately before Footer `212:737` is Final CTA
  instance `212:716`, sourced from component `90:1157`.
- Corrected Final CTA boundary, nested panel hierarchy, exact copy/order,
  alignment, width, padding, border, radius, glow, and responsive contraction.
- Shared Header, Footer, and Button visual code remained unchanged.
- Validation: typecheck passed; lint passed; 74 unit/component tests passed;
  production build passed; four Playwright Chromium tests passed.
- Audit:
  `docs/03-design-system/phase-6a-landing-regression-audit.md`
- Impact matrix:
  `docs/06-traceability/phase-6a-regression-impact-matrix.yaml`
- Human browser/Figma review: pending.
- Task and Phase 6A status: `needs_review`.
- Phase 6 status: `in_progress`.
- `ISSUE-2026-003`: open; implementation fix complete; human approval pending.

### Phase 6A final browser and Figma approval — 2026-07-27

- Reviewed task: `TASK-P6A-006`
- Reviewer: Tom
- Result: `APPROVED`
- Reviewed viewports: 1440px desktop and 390px mobile
- Preview fallback, insufficient-data card, Team/FAQ anchors, Final CTA,
  shared Header/Footer regression, responsive behavior, and route consumers:
  approved
- Automated evidence: management, documentation, registry, compatibility,
  type checking, ESLint, 74 unit/component tests, production build, Git diff,
  and four Playwright Chromium tests passed
- `ISSUE-2026-003`: resolved
- Phase 6A: approved
- Phase 6: remains in progress
- Next task: `TASK-P6B-001`
- Next Gate: Phase 6B Contact Page UI Review
- Application code modified by this approval task: none
