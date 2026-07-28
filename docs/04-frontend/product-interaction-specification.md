# Product Interaction Specification

## Document status

- Specification scope: Phase 5A
- Status: `approved`
- Human approval: `approved`
- Reviewer: Tom
- Approval date: 2026-07-25
- Current reviewed task supplied: `TASK-P7-001`
- Original specification task: `TASK-P5A-001`
- Review notes: good
- Figma Design System: `1.0.0`
- Frontend planning version: `0.0.1`
- Backend contract revision: `1`
- Compatibility baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Implementation: not authorized by this document

This document is the proposed behavioral source of truth for routes,
navigation, page transitions, and the Contact flow. Figma supplies page layout
evidence but does not independently approve these behaviors.

## Evidence inspected

| Figma page | Page node | Primary desktop frame | Interaction evidence |
| --- | --- | --- | --- |
| 06 Landing Page | `212:2` | `212:3` | Header `212:4`, Problem band `212:195`, Solution band `212:239`, Packages band `212:453`, Final CTA `212:715`, Footer `212:737` |
| 07 Why Mi-goTo Page | `259:2` | `259:3` | Header `259:4`, Final CTA `259:166`, Footer `259:167` |
| 08 Imprint | `122:2` | `122:3` | Header `122:439`, legal content and page index |
| 09 Data Protection | `128:2` | desktop legal page | Header/Footer, long-form legal content and page index; Footer `128:542` |
| 10 Contact Page | `269:2` | `269:3` | Header `269:4`, default four-field form `269:47`, direct email `269:44`, submit action `269:99`, Footer `269:103` |
| 11 Thank You Page | `321:28` | `321:29` | Compact Header `321:30`, confirmation `321:129`, next steps `321:143`, compact Footer `321:84` |

The inspected pages are desktop compositions. They do not contain authoritative
route reactions, mobile Page compositions, locale transitions, unknown-route
behavior or Contact loading/error frames. The Thank You Page was added in Figma
1.1.0 under Tom's approved Phase 6F scope extension.

## Proposed route contract

These routes require human approval before implementation.

| Path | Page | Entry behavior | Status |
| --- | --- | --- | --- |
| `/` | Landing Page | Canonical marketing entry | `approved_for_implementation` |
| `/why-mi-goto` | Why mi-goTo Page | Direct entry and future internal link target | `approved_for_implementation` |
| `/imprint` | Imprint Page | Footer legal entry | `approved_for_implementation` |
| `/data-protection` | Data Protection Page | Footer legal and Contact privacy-note entry | `approved_for_implementation` |
| `/contact` | Contact Page | Header, Footer, and CTA entry | `approved_for_implementation` |
| `/thank-you` | Thank You Page | Successful submission, direct access and refresh-safe rendering | `implemented_needs_review`; Figma `321:28` |

Route names, metadata, canonical URL rules, and legacy redirects remain
implementation inputs for a later approved task.

## Header behavior

| Label | Proposed destination | Behavior |
| --- | --- | --- |
| THE PROBLEM | `/#problem` | Navigate to Landing, then reveal and focus the Problem section |
| THE METHOD | `/#method` | Navigate to Landing, then reveal and focus the Method section |
| PROOF | `/#proof` | Navigate to Landing, then reveal and focus the Proof section |
| PACKAGES | `/#packages` | Navigate to Landing, then reveal and focus the Packages section |
| WHY MI-GOTO | `/why-mi-goto` | Open Why mi-goTo Page |
| STRATEGY DISCUSSION | `/contact` | Open Contact Page without invented tracking parameters |

The preserved Navbar API emits navigation, language, and strategy-discussion
events and closes its mobile menu after an item is selected. Route execution is
future implementation scope.

## Footer behavior

| Label | Proposed destination | Behavior |
| --- | --- | --- |
| The Problem | `/#problem` | Same anchor behavior as Header |
| The Method | `/#method` | Same anchor behavior as Header |
| Packages | `/#packages` | Same anchor behavior as Header |
| Team | `/#team` | Navigate to Landing, then reveal and focus Team |
| Why mi-goTo | `/why-mi-goto` | Open Why mi-goTo Page |
| Imprint | `/imprint` | Open Imprint Page |
| Data protection | `/data-protection` | Open Data Protection Page |
| hello@mi-goto.com | `mailto:hello@mi-goto.com` | Invoke the user’s configured mail client in the current context |
| LinkedIn | exact URL required | Open a supplied HTTPS URL in a new tab with `noopener noreferrer` |

LinkedIn must remain non-navigable until its exact approved URL is supplied.

The visible Header/Footer labels above supersede the former Phase 5 content
labels under Tom's explicit Figma-authority decision recorded by
`TASK-P6A-005`. The established route and anchor infrastructure is reused;
Figma version remains `1.0.0`.

## Anchor and scroll behavior proposal

1. Same-page anchor activation updates the URL hash.
2. Cross-page anchor activation navigates to `/` with the target hash and waits
   until the Landing content is mounted.
3. The target is scrolled into view and receives programmatic focus so the
   context change is announced.
4. Smooth scrolling is permitted only when the user has not requested reduced
   motion; reduced-motion users receive immediate scrolling.
5. A normal route navigation without a hash starts at the top.
6. Browser back/forward restores the browser history position where reliable.
7. Missing anchor targets fail safely at the top of the requested Page and must
   be recorded as an Issue during implementation.

Sticky-header offset, exact focus target, and history policy require approval.

## Language behavior proposal

- EN is initially active.
- DE and CN remain visible because Header content preservation is approved.
- No DE or CN translation is currently approved.
- Recommended interim behavior: render DE and CN as visibly disabled controls
  with an accessible “translation unavailable” description.
- Do not silently show EN after a user selects DE or CN.
- Do not infer that `CN` means `zh-CN`; the locale mapping requires a human
  content/localization decision.
- Locale URL prefixes, persistence, detection, translated metadata, and
  restoration of route/hash/form state remain unresolved.

An explicit EN fallback with an announcement is an alternative, but it must not
be implemented unless approved.

## Mobile navigation proposal

- Use the approved Navbar disclosure button and `aria-expanded`.
- Opening reveals navigation, locale controls, and the strategy CTA.
- Escape closes the menu.
- Activating an internal item closes the menu before route or anchor handling.
- Focus remains on a predictable control after closing.
- A disclosure menu is not a modal and should not receive a focus trap.
- Outside-click, route-change, viewport-change, and focus-return behavior require
  human approval.

Figma Page inspection provided desktop frames only. The approved Composite
Navbar API supplies the current mobile interaction evidence.

## Contact flow

### Entry and fields

The Contact Page may be entered from Header, Footer, Landing/Why CTAs, or a
direct URL. Figma confirms the default four-field layout. OpenAPI Contract
Revision 1 controls the payload:

| Visible field | API field | Requirement |
| --- | --- | --- |
| First name | `firstName` | Required, non-empty string |
| Family name | `familyName` | Required, non-empty string |
| Company | `company` | Required, non-empty string |
| Work email | `workEmail` | Required, non-empty valid email |
| Owner | `owner` | No visible field; optional configured value only |

No message, website, telephone, consent checkbox, or other payload field is
approved.

### Validation

- Validate required values and email format before submission.
- Associate field errors with their controls and provide an error summary.
- Move focus to the first invalid field or the error summary according to the
  approved accessibility decision.
- Backend validation remains authoritative.
- Whitespace normalization, exact copy, validation timing, and localization
  require approval.

### Loading and duplicate prevention

- Set the form and submit action to an explicit submitting state.
- Disable the submit action while one request is active.
- Set `aria-busy="true"` on the form region and announce a concise loading
  status.
- Repeated clicks, Enter presses, and manual retry actions must not create a
  second concurrent request.
- Do not automatically retry.
- Navigation-away and request-cancellation behavior require approval.

### Success

- A confirmed `200` response is the only documented success.
- Production proposal: navigate to `/thank-you`.
- Approved behavior: no `VITE_APP_MODE` branch is required. Every confirmed
  successful submission navigates to `/thank-you`. API base URL configuration
  continues to control which backend environment receives the request.
- No lead payload or HubSpot contact ID may be placed in the URL, Page content,
  analytics, or browser logs.
- The Thank You Page must be refresh-safe and display only generic approved
  content.
- Push versus replace, direct `/thank-you` access, form clearing, focus, and
  development-mode behavior require approval.

### Errors

| Condition | Presentation | Recovery |
| --- | --- | --- |
| Client validation failure | Field messages plus accessible summary | Correct fields and resubmit |
| HTTP 400 | Recoverable validation/request message; preserve safe input | Correct input; no automatic retry |
| HTTP 500 | Generic temporary service failure | Manual retry only if approved |
| HTTP 502 | Generic integration failure without exposing HubSpot detail | Manual retry only if approved |
| Timeout/network/unexpected response | Generic safe failure | Timeout and retry policy require approval |

Backend error text is not a stable machine code. Technical details, stack
traces, raw responses, lead data, and HubSpot identifiers must not be shown or
logged.

## Unknown routes proposal

Recommended behavior is a dedicated accessible Not Found view that retains
global navigation, sets an appropriate document title, and offers a route back
to `/`. Redirecting silently to Landing is not recommended because it hides
broken links. A new Not Found Page is not in the approved Page registry, so this
proposal requires a human decision and a registry change before implementation.

## External links and privacy

- `mailto:` links use the approved address and do not receive `_blank`.
- External HTTPS links open in a new tab only when explicitly marked external,
  with `noopener noreferrer`.
- The exact LinkedIn URL is unresolved.
- Route/CTA analytics, consent, referrer behavior, and external-link analytics
  are not approved.
- Personal lead data must never be included in route state, query parameters,
  URL fragments, or analytics.

## Human decision table

| ID | Decision | Recommendation | Alternative | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| INT-001 | Approve the six proposed route paths | Approve as listed | Supply replacements and migration rules | Product owner / Tom | `approved` |
| INT-002 | Anchor scroll/focus/history behavior | Hash + mount wait + focus + reduced-motion-safe scroll | Browser-default hash only | Product owner / Tom | `approved` |
| INT-003 | Sticky Header offset and focus target | Focus section heading/container with documented offset | No offset/focus management | Product owner / Tom | `approved` |
| INT-004 | Unknown route behavior | Add dedicated Not Found Page | Redirect to `/` | Product owner / Tom | `approved` |
| INT-005 | Trailing slash and canonical URL policy | Canonical paths without trailing slash | Accept both without canonical redirect | Product owner / Tom | `approved` |
| INT-006 | Legacy redirects | Supply previous-site URL inventory first | No redirects | Product owner / Tom | `explicitly_deferred` |
| INT-007 | DE/CN interim behavior | Visible disabled controls | Explicit announced EN fallback | Product owner / Tom | `approved` |
| INT-008 | Locale codes and URL strategy | Decide `CN` mapping before prefixes | Keep locale only in application state | Product/content owner | `explicitly_deferred` |
| INT-009 | Exact LinkedIn destination | Supply approved HTTPS URL | Hide/non-link label | Product owner / Tom | `explicitly_deferred` |
| INT-010 | Mobile close/focus behavior | Close on item, Escape, route change, and outside click; return focus when appropriate | Minimal toggle and Escape only | Product owner / Tom | `approved` |
| INT-011 | Contact validation timing and copy | On blur and submit with accessible summary | Submit-only | Product owner / Tom | `approved` |
| INT-012 | Production success navigation | Router replace to `/thank-you` | Router push | Product owner / Tom | `approved` |
| INT-013 | Environment-specific success behavior | No `VITE_APP_MODE`; every confirmed success navigates to `/thank-you` | Environment-specific behavior | Product/operations owner | `approved_with_exception` |
| INT-014 | Direct `/thank-you` access and missing Figma design | Allow generic refresh-safe Page after design/content approval | Guard and redirect to `/contact` | Product owner / Tom | `approved` |
| INT-015 | Timeout threshold and cancellation | Define with backend/operations owner | Browser/network default | Backend and product owners | `explicitly_deferred` |
| INT-016 | Retry policy | No automatic retry; approve explicit manual retry | No retry action | Backend and product owners | `approved` |
| INT-017 | Navigation away during submission | Warn/block only when an active request risks ambiguity | Allow navigation and ignore late result | Product owner / Tom | `approved` |
| INT-018 | Error focus and input preservation | Focus summary/first invalid field and preserve safe input | Inline-only errors | Product owner / Tom | `approved` |
| INT-019 | Route and CTA analytics | No analytics until consent/privacy specification exists | Approve named events and consent rules | Product/privacy owner | `explicitly_deferred` |
| INT-020 | Legal page index links | Use internal accessible anchors matching approved legal headings | Static non-interactive index | Legal/product owner | `approved` |
| INT-021 | Contact privacy-note destination and legal copy | Link to `/data-protection` after legal approval | Plain text note | Legal/product owner | `approved` |

## Implementation gate

The affected decisions were approved and recorded by Tom on 2026-07-27.
Application implementation still requires a separately authorized Phase 5B
execution task.

## Specification approval

Tom approved this Phase 5A specification on 2026-07-25. The approval establishes
this document as the reviewed behavioral decision framework. The decisions were
subsequently approved by Tom on 2026-07-27 as recorded below.

Approval evidence:
`docs/08-quality/test-reports/phase-5a-task-p7-001-approval-2026-07-25.md`.

The earlier Phase 5A approval evidence using `TASK-P6-001` remains preserved as
historical traceability.

All `INT-001`–`INT-021` recommendations were explicitly approved by Tom on
2026-07-27, with the `INT-013` exception that `VITE_APP_MODE` is not required
and every confirmed successful submission navigates to `/thank-you`. Evidence:
`docs/08-quality/test-reports/phase-5-interactions-TASK-P5A-002-approval-2026-07-27.md`.
