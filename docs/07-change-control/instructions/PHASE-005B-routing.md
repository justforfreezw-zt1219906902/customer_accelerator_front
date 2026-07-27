# PHASE-005B: Routing and Shared Page Interaction Infrastructure

## Current execution

- Record ID: `PHASE-005B`
- Task ID: `TASK-P5B-002`
- Date: `2026-07-27`
- Tool: Codex
- Operator: User-directed Codex task
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Starting status: `planned`
- Result: `approved`
- Human approval: Tom, `APPROVED`, 2026-07-27
- Approval evidence:
  `docs/08-quality/test-reports/TASK-P5B-002-phase-5-approval-2026-07-27.md`
- Git commit: pending

## Preconditions

- Phase 5A Product Interaction Specification: approved.
- `INT-001`–`INT-021`: approved or validly deferred by Tom.
- Route map before execution: `implementation_ready`.
- `ISSUE-2026-001`: resolved.

## Files read

- `AGENTS.md`
- `VERSION.yaml`
- Approved Product Interaction Specification
- Approved route map
- Page registry
- AppNavbar and AppFooter APIs
- Content architecture
- Accessibility guidelines
- Phase 5 specification, current state, traceability, and implementation baseline

## Implemented scope

- Typed route names and records.
- Lazy Page and layout imports.
- Marketing and Legal shared layouts.
- No duplicated Navbar/Footer markup.
- Approved Header and Footer destinations.
- Saved-position restoration and route-top scrolling.
- Same-route and cross-route Landing anchors.
- Reduced-motion-safe anchor scrolling.
- Route title updates and page/anchor focus management.
- Accessible unknown-route fallback.
- EN as the only active language.
- DE and CN visible but disabled with unavailable descriptions.
- Temporary route shells for Landing, Why mi-goTo, Contact, Imprint, Data
  Protection, Thank You, and Not Found.
- Removal of the superseded `VITE_APP_MODE` public configuration.

## Explicitly excluded

- Final Page design and content
- Contact form
- Backend calls
- Invented translations
- Invented external URLs
- Analytics
- Legacy redirects
- Final legal or Thank You copy

## Files created

- `src/router/routes.ts`
- `src/router/scrollBehavior.ts`
- `src/layouts/MarketingLayout.vue`
- `src/layouts/LegalLayout.vue`
- `src/layouts/index.ts`
- `src/pages/PageShell.vue`
- `src/pages/LandingPage.vue`
- `src/pages/WhyMiGotoPage.vue`
- `src/pages/ContactPage.vue`
- `src/pages/ImprintPage.vue`
- `src/pages/DataProtectionPage.vue`
- `src/pages/ThankYouPage.vue`
- `src/pages/NotFoundPage.vue`
- `tests/unit/Routing.spec.ts`

## Files modified

- `src/router/index.ts`
- `src/content/header/defaultHeaderContent.ts`
- `src/content/footer/defaultFooterContent.ts`
- `src/design-system/components/composite/AppNavbar.vue`
- `src/design-system/components/composite/AppFooter.vue`
- `src/app/configuration/environment.ts`
- `.env.example`
- `.env.development`
- `tests/unit/AppNavbar.spec.ts`
- Phase, roadmap, route, Page registry, traceability, implementation baseline,
  and changelog records

## Tests

`tests/unit/Routing.spec.ts` verifies:

- all approved route names and paths;
- Header and Footer destinations;
- shared Navbar/Footer composition;
- SPA navigation;
- Landing anchor resolution;
- unknown-route fallback;
- document-title and focus behavior;
- saved scroll positions;
- reduced-motion anchor behavior.

`tests/unit/AppNavbar.spec.ts` verifies that EN remains active while DE and CN
are visible but unavailable.

## Validation

- Formatting: passed for changed implementation and test files.
- Typecheck: passed.
- Lint: passed, 0 errors and 0 warnings.
- Unit tests: 21 files, 58 tests passed.
- Build: passed; 91 modules transformed.
- Management validation: passed, 5 suites and 0 failures.
- Test report:
  `docs/08-quality/test-reports/TASK-P5B-002-phase-5b-test-report-2026-07-27.md`

## Errors and recovery

The first validation run exposed three test-only issues:

1. route helper inputs used a narrower normalized-route type than
   `router.resolve()` returns;
2. assertions ran before asynchronous SPA navigation completed;
3. jsdom does not implement `window.scrollTo`.

The tests and helper boundary were corrected without changing approved
behavior. A later review also replaced a fixed 80px anchor offset with
token-derived CSS `scroll-margin`, avoiding an undocumented hardcoded design
value.

The final management run also found that the Page registry validator accepts
only `implemented` or `not_started`. Temporary shells were therefore recorded
as `implementation_status: implemented` with the separate, explicit
`implementation_scope: temporary_route_shell_only`; this does not claim final
Page completion.

## Deviations

No new Figma deviation was introduced. Temporary Page shells are explicitly
authorized Phase 5 infrastructure and are not represented as final Pages.
Existing approved breakpoint and fluid-layout deviations remain unchanged.

## Historical blocked attempt

`TASK-P5B-001` stopped on 2026-07-25 before application changes because the
interaction decisions were not approved. Its blocker, `ISSUE-2026-001`, remains
preserved as resolved historical evidence. `TASK-P5A-003` later satisfied the
decision gate and authorized this new execution task.

## Completion report

Phase 5 routing and shared interaction infrastructure is implemented,
validated, and approved by Tom. Final Page implementation remains Phase 6 scope.
