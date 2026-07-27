# Phase 5 Interaction Decision Review

## Review control

- Task: `TASK-P5A-002`
- Scope: `INT-001`–`INT-021`
- Status: `approved`
- Human reviewer: Tom
- Approval date: `2026-07-27`
- Phase 5B: `planned`; implementation is not approved by this record
- Former blocking issue: `ISSUE-2026-001`, resolved by this decision approval
- Authoritative question source:
  `docs/04-frontend/product-interaction-specification.md`

Tom explicitly approved all recommended decisions for `INT-001`–`INT-021`,
subject to the `INT-013` exception below. This approval establishes the
interaction baseline but does not itself authorize application implementation.

Historical decision labels below are preserved as approval evidence.
`TASK-P6A-005` later established the active Figma 1.0.0 Header/Footer visible
content as authoritative; `TASK-P4A-002` maps those superseding labels to the
existing approved route and anchor infrastructure.

## Approval exception and additional requirements

- `INT-013`: do not use `VITE_APP_MODE`. Successful Contact submission follows
  one approved behavior and navigates to `/thank-you`.
- EN is the only active initial language.
- DE and CN remain visible in the Header but clearly unavailable.
- Translations must not be invented.
- `THE PROBLEM` → `/#problem`
- `THE SOLUTION` → `/#solution`
- `PACKAGES` → `/#packages`
- `CONTACT` and `STRATEGY DISCUSSION` → `/contact`
- Legal links → `/imprint` and `/data-protection`
- Unknown routes use the approved accessible Not Found behavior.
- External URLs must not be invented.

## Final human decision register

Rejected alternatives remain preserved in each detailed decision section.

| ID | Final status | Approved decision or alternative | Rationale | Reviewer | Date |
| --- | --- | --- | --- | --- | --- |
| INT-001 | `approved` | Six documented paths | Stable public route baseline | Tom | 2026-07-27 |
| INT-002 | `approved` | Managed same/cross-route anchors, focus, history, reduced motion | Predictable and accessible anchor navigation | Tom | 2026-07-27 |
| INT-003 | `approved` | Heading/container focus with layout-derived offset | Prevent focused content being hidden | Tom | 2026-07-27 |
| INT-004 | `approved` | Accessible Not Found behavior | Avoid silent redirects and provide recovery | Tom | 2026-07-27 |
| INT-005 | `approved` | Canonical paths without trailing slash | Avoid duplicate URL forms | Tom | 2026-07-27 |
| INT-006 | `explicitly_deferred` | No invented redirects until old URL inventory is approved | Authoritative legacy inventory is absent | Tom | 2026-07-27 |
| INT-007 | `approved` | EN active; DE/CN visible and unavailable | Preserve Header without false localization | Tom | 2026-07-27 |
| INT-008 | `explicitly_deferred` | No localized routes or locale mapping yet | Translations and locale ownership are absent | Tom | 2026-07-27 |
| INT-009 | `explicitly_deferred` | Non-interactive LinkedIn label until URL approval | External URLs must not be invented | Tom | 2026-07-27 |
| INT-010 | `approved` | Close menu on selection, Escape, route change, outside interaction; manage focus | Keyboard and mobile navigation safety | Tom | 2026-07-27 |
| INT-011 | `approved` | Validate on blur/submit with associated messages and summary | Accessible correction workflow | Tom | 2026-07-27 |
| INT-012 | `approved` | Router replace to `/thank-you` | Avoid stale resubmission history | Tom | 2026-07-27 |
| INT-013 | `approved` | Approved exception: no `VITE_APP_MODE`; all confirmed successes go to `/thank-you` | One consistent success path | Tom | 2026-07-27 |
| INT-014 | `approved` | Public refresh-safe Thank You route | Direct access and refresh must recover safely | Tom | 2026-07-27 |
| INT-015 | `explicitly_deferred` | No invented timeout; backend/operations decide later | Service expectation is not confirmed | Tom | 2026-07-27 |
| INT-016 | `approved` | No automatic retry; manual retry only after duplicate handling is confirmed | Prevent duplicate backend side effects | Tom | 2026-07-27 |
| INT-017 | `approved` | Prevent duplicates and warn only during ambiguous active submission | Balance safety and navigation freedom | Tom | 2026-07-27 |
| INT-018 | `approved` | Focus useful error state; retain input only in component memory | Accessibility and privacy | Tom | 2026-07-27 |
| INT-019 | `explicitly_deferred` | No analytics until privacy/consent specification | Avoid unapproved tracking | Tom | 2026-07-27 |
| INT-020 | `approved` | Legal anchors only after stable headings | Avoid stale legal navigation | Tom | 2026-07-27 |
| INT-021 | `approved` | Link to `/data-protection` only with approved legal wording | Preserve legal accuracy | Tom | 2026-07-27 |

## INT-001 — Route paths

- **Exact decision question:** Should `/`, `/why-mi-goto`, `/contact`,
  `/imprint`, `/data-protection`, and `/thank-you` be approved?
- **Current status / classification:** `approved`
- **Existing recommendation:** Approve the six listed routes.
- **Recommended final decision:** Approve the six listed paths and their
  registered pages; use `INT-004` for unknown routes.
- **Alternatives:** Different paths; aliases or migrations; reject selected
  routes.
- **Blocks Phase 5B:** Yes.
- **Impacts:** Route—defines the public route table. Navbar/Footer—enables all
  internal destinations. Page—establishes six page entry points.
  Content—canonical links must match. Language—localized URLs remain governed
  by `INT-008`. Accessibility—stable paths support predictable titles and
  focus. Backend—Thank You is used only after confirmed success.
- **Risks:** Later path changes break links, bookmarks, redirects, and
  measurement.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-002 — Anchor navigation

- **Exact decision question:** How should same-page and cross-route anchor
  scrolling, focus, and history behave?
- **Current status / classification:** `approved`
- **Existing recommendation:** Retain the hash, wait for the target to mount,
  focus it, and use reduced-motion-safe scrolling.
- **Recommended final decision:** Same-page links scroll to the target;
  cross-route links navigate to `/` and then scroll after mount; retain the
  hash, focus the heading or section, and disable smooth animation when reduced
  motion is preferred.
- **Alternatives:** Browser-default hash behavior; no managed focus; replace
  hash history.
- **Blocks Phase 5B:** Yes.
- **Impacts:** Route—requires hash-aware scrolling. Navbar/Footer—governs
  Problem, Solution, and Packages. Page—requires stable section targets.
  Content—headings remain associated with IDs. Language—IDs stay
  language-independent. Accessibility—focus and motion preferences are
  respected. Backend—none.
- **Risks:** Missing targets, premature scrolling, bad history, or lost focus.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-003 — Sticky Header offset and focus target

- **Exact decision question:** What sticky Header offset and focus target
  should anchor navigation use?
- **Current status / classification:** `approved`
- **Existing recommendation:** Focus the section heading or container with a
  documented offset.
- **Recommended final decision:** Focus the heading when present, otherwise the
  section container; derive scroll offset from approved layout/tokens so the
  sticky Header does not obscure it.
- **Alternatives:** No managed offset; container-only focus; main-content focus.
- **Blocks Phase 5B:** Yes.
- **Impacts:** Route—scroll behavior uses the offset. Navbar/Footer—responsive
  Header height is relevant. Page—targets may need programmatic focus.
  Content—heading order is preserved. Language—same structure across
  languages. Accessibility—focused content stays visible. Backend—none.
- **Risks:** A magic-number offset drifts from responsive Header dimensions.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-004 — Unknown routes

- **Exact decision question:** Should an unknown route render a dedicated Not
  Found Page or redirect to `/`?
- **Current status / classification:** `approved`
- **Existing recommendation:** Dedicated Not Found Page.
- **Recommended final decision:** Render accessible Not Found behavior with a
  clear route to `/`; a temporary shell may remain until final design/content
  approval.
- **Alternatives:** Redirect to `/`; use hosting-provider error behavior.
- **Blocks Phase 5B:** Yes.
- **Impacts:** Route—requires a catch-all. Navbar/Footer—may use the shared
  Marketing layout. Page—requires Not Found behavior. Content—final copy is
  pending. Language—only approved content. Accessibility—announce the state
  and recovery action. Backend—none.
- **Risks:** Silent redirects conceal broken links and disorient users.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-005 — Canonical URL form

- **Exact decision question:** Should canonical URLs omit trailing slashes, or
  should both forms be accepted without canonical redirection?
- **Current status / classification:** `approved`
- **Existing recommendation:** Canonical URLs without trailing slashes.
- **Recommended final decision:** Use the documented paths without trailing
  slashes and normalize equivalent navigation when hosting permits.
- **Alternatives:** Treat both forms independently; trailing-slash canonical.
- **Blocks Phase 5B:** Yes.
- **Impacts:** Route—defines normalization. Navbar/Footer—all links use the
  canonical form. Page—metadata avoids duplicate URLs. Content—stored links use
  canonical paths. Language—same future policy. Accessibility—consistent
  navigation state. Backend—hosting/proxy alignment may be required.
- **Risks:** Duplicate URLs fragment indexing, history, and measurement.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-006 — Legacy redirects

- **Exact decision question:** Are legacy redirects required, and what is the
  authoritative old-site URL inventory?
- **Current status / classification:** `explicitly_deferred`
- **Existing recommendation:** Obtain the old URL inventory before defining
  redirects.
- **Recommended final decision:** Explicitly defer redirects until a human
  supplies and approves that inventory; Phase 5B must invent none.
- **Alternatives:** Confirm none are required; approve a redirect matrix now.
- **Blocks Phase 5B:** Yes, until deferral or redirect scope is approved.
- **Impacts:** Route—aliases/redirects remain absent. Navbar/Footer—old links
  may need mapping. Page—old entry points may redirect later.
  Content—existing-link inventory is needed. Language—old localized URLs may
  differ. Accessibility—prevents dead ends. Backend—hosting may own redirects.
- **Risks:** Lost inbound links and search ranking.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended explicit deferral approved.

## INT-007 — Interim DE/CN behavior

- **Exact decision question:** Until translations exist, should DE/CN be
  unavailable/disabled or provide an explicit English fallback?
- **Current status / classification:** `approved`
- **Existing recommendation:** Keep visible as disabled controls.
- **Recommended final decision:** Keep EN active; preserve visible DE/CN
  controls but mark them explicitly unavailable and prevent activation. Never
  present DE/CN as active while showing English.
- **Alternatives:** Announced English fallback; remove controls through an
  approved content change.
- **Blocks Phase 5B:** Yes.
- **Impacts:** Route—no localized routes. Navbar/Footer—defines language-control
  state. Page—all pages remain EN. Content—needs approved unavailable wording
  or label. Language—prevents false localization. Accessibility—state must be
  perceivable and keyboard-safe. Backend—none.
- **Risks:** Misleading active language or inaccessible disabled controls.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** EN active; DE/CN visible but clearly unavailable.

## INT-008 — Locale identifiers and URL strategy

- **Exact decision question:** What locale identifier should CN use, and should
  future languages use URL prefixes or application state only?
- **Current status / classification:** `explicitly_deferred`
- **Existing recommendation:** Decide CN mapping before introducing prefixes.
- **Recommended final decision:** Explicitly defer the identifier and localized
  URL strategy until translations and ownership are approved; add no localized
  routes in Phase 5B.
- **Alternatives:** Approve a locale plus URL prefixes now; approve
  application-state-only localization.
- **Blocks Phase 5B:** Yes, until explicit deferral or a strategy is approved.
- **Impacts:** Route—prevents unapproved prefixes. Navbar/Footer—controls remain
  display-only under `INT-007`. Page—EN-only. Content—no translation files.
  Language—primary localization architecture decision. Accessibility—document
  language must match content. Backend—none currently.
- **Risks:** An ambiguous CN mapping creates incorrect language metadata and
  costly migrations.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended explicit deferral approved; no translations invented.

## INT-009 — LinkedIn URL

- **Exact decision question:** What exact approved HTTPS URL should the Footer
  LinkedIn item use?
- **Current status / classification:** `explicitly_deferred`
- **Existing recommendation:** Supply a URL or hide/render the item without a
  link.
- **Recommended final decision:** Keep the preserved label non-interactive
  until the owner supplies an approved HTTPS URL; do not guess.
- **Alternatives:** Approve the exact URL; approve removal through content
  change control.
- **Blocks Phase 5B:** Yes, until URL or non-link behavior is approved.
- **Impacts:** Route—none. Navbar/Footer—determines link versus text.
  Page—affects every shared Footer. Content—preserves the label.
  Language—none. Accessibility—non-links must not appear actionable; external
  links need clear names and safe attributes. Backend—none.
- **Risks:** Wrong organization destination or unsafe opener behavior.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** External URL must not be invented.

## INT-010 — Mobile menu close and focus

- **Exact decision question:** When should the mobile menu close, and where
  should focus move afterward?
- **Current status / classification:** `approved`
- **Existing recommendation:** Close on selection, Escape, route change, and
  outside click; return focus appropriately.
- **Recommended final decision:** Approve those four close triggers; Escape
  returns focus to the trigger, while navigation transfers focus according to
  the approved page/anchor behavior.
- **Alternatives:** Toggle and Escape only; omit outside interaction; always
  return to trigger.
- **Blocks Phase 5B:** Yes.
- **Impacts:** Route—route completion closes stale state. Navbar/Footer—defines
  Navbar contract. Page—navigation focus moves to page/anchor target.
  Content—none. Language—same future behavior. Accessibility—keyboard,
  expanded state, Escape, and focus are affected. Backend—none.
- **Risks:** Lost focus, an open off-screen menu, or inaccessible content.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-011 — Contact validation timing and copy

- **Exact decision question:** When should Contact validation appear, and how
  should errors be presented?
- **Current status / classification:** `approved`
- **Existing recommendation:** Validate on blur and submit with an accessible
  summary.
- **Recommended final decision:** Validate on blur and submit; show associated
  field messages and a summary that leads to invalid fields. Approve copy
  separately.
- **Alternatives:** Submit-only; post-blur validation while typing.
- **Blocks Phase 5B:** No; blocks final Contact behavior.
- **Impacts:** Route/Navbar/Footer—none. Page—Contact form states.
  Content—validation copy. Language—translated messages later.
  Accessibility—association, announcements, and focus. Backend—must align with
  but not replace OpenAPI validation.
- **Risks:** Premature errors frustrate; submit-only errors can be hard to find.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-012 — Production success navigation

- **Exact decision question:** Should production success navigate to
  `/thank-you` using router `replace` or `push`?
- **Current status / classification:** `approved`
- **Existing recommendation:** `replace`.
- **Recommended final decision:** After confirmed `200` success, use `replace`
  to `/thank-you` to reduce accidental resubmission via Back.
- **Alternatives:** `push`; inline success.
- **Blocks Phase 5B:** No; blocks submit-flow implementation.
- **Impacts:** Route—uses Thank You. Navbar/Footer—none. Page—connects Contact
  and Thank You. Content—Thank You copy. Language—approved active language.
  Accessibility—title/focus update. Backend—only confirmed success navigates.
- **Risks:** `push` may expose a stale submitted form; redirect on failure loses
  user input.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Successful submission navigates to `/thank-you`.

## INT-013 — Development success behavior

- **Exact decision question:** Should successful submission vary by environment
  or use one behavior without `VITE_APP_MODE`?
- **Current status / classification:** `approved`
- **Existing recommendation:** Inline success in development; redirect in
  production.
- **Approved final decision:** Do not use `VITE_APP_MODE`; after successful
  Contact submission, navigate to `/thank-you` in every environment.
- **Alternatives:** Redirect in every environment; separate mock mode.
- **Blocks Phase 5B:** No; blocks environment-specific submit behavior.
- **Impacts:** Route—development may not redirect. Navbar/Footer—none.
  Page—Contact inline state. Content—success copy. Language—translations later.
  Accessibility—announce/focus success. Backend—do not fabricate success
  without an approved mock strategy.
- **Risks:** Undefined modes mask integration failures.
- **Human decision:** `APPROVED_WITH_EXCEPTION` by Tom on 2026-07-27.
- **Human notes:** No `VITE_APP_MODE`; use one successful-submit destination.

## INT-014 — Direct Thank You access

- **Exact decision question:** Should `/thank-you` be directly accessible and
  refresh-safe before final design/content approval?
- **Current status / classification:** `approved`
- **Existing recommendation:** Generic refresh-safe page after approval.
- **Recommended final decision:** Keep it directly accessible and refresh-safe;
  retain a temporary shell until generic content and design are approved.
- **Alternatives:** Guard and redirect direct visits to Contact; require
  transient submission state.
- **Blocks Phase 5B:** No; final page remains blocked.
- **Impacts:** Route—must not depend on transient state. Navbar/Footer—layout
  remains a decision. Page—controls refresh/direct entry. Content—needs
  approval. Language—approved content only. Accessibility—title/heading/focus.
  Backend—never expose lead or HubSpot data in URL/state.
- **Risks:** Guards fail on refresh; unapproved copy misstates success.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-015 — Timeout and cancellation

- **Exact decision question:** What timeout threshold and cancellation behavior
  should Contact submission use?
- **Current status / classification:** `explicitly_deferred`
- **Existing recommendation:** Decide with backend and operations owners.
- **Recommended final decision:** Explicitly defer the numeric threshold and
  cancellation policy until those owners approve a service expectation.
- **Alternatives:** Browser defaults; approved fixed timeout and cancellation.
- **Blocks Phase 5B:** No; blocks backend integration behavior.
- **Impacts:** Route—navigation-away handling. Navbar/Footer—none.
  Page—loading/recovery states. Content—timeout messages.
  Language—translations later. Accessibility—announce long waits/cancellation.
  Backend—must reflect HubSpot workflow duration.
- **Risks:** False failures from short timeouts or ambiguity from unlimited
  waits.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended explicit deferral approved.

## INT-016 — Retry policy

- **Exact decision question:** Should failed submission use automatic retry,
  manual retry, or no retry?
- **Current status / classification:** `approved`
- **Existing recommendation:** No automatic retry; approve manual retry if
  wanted.
- **Recommended final decision:** Never retry automatically; permit a labeled
  manual retry only after backend duplicate/idempotency behavior is confirmed.
- **Alternatives:** No retry; approved automatic retry with idempotency.
- **Blocks Phase 5B:** No; blocks failure recovery.
- **Impacts:** Route—failure remains on Contact. Navbar/Footer—none.
  Page—optional retry action. Content—labels/guidance. Language—translations
  later. Accessibility—announce and keyboard support. Backend—HubSpot side
  effects and duplicate notifications matter.
- **Risks:** Automatic retry duplicates side effects; no recovery strands users.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-017 — Navigation during submit

- **Exact decision question:** Should navigation be blocked or warned while a
  submission is active?
- **Current status / classification:** `approved`
- **Existing recommendation:** Warn/block only during genuine ambiguity.
- **Recommended final decision:** Prevent duplicate submissions; warn before
  abandoning an active ambiguous request, and remove the guard when it settles.
- **Alternatives:** Allow departure and ignore late result; block all navigation.
- **Blocks Phase 5B:** No; blocks Contact loading behavior.
- **Impacts:** Route—temporary navigation guard. Navbar/Footer—links may trigger
  warning. Page—Contact owns pending state. Content—warning copy.
  Language—translations later. Accessibility—accessible warning dialog.
  Backend—client cancellation may not cancel server side effects.
- **Risks:** Over-blocking traps users; silent departure causes ambiguous
  success and resubmission.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-018 — Error focus and input preservation

- **Exact decision question:** After validation or API failure, where should
  focus move and which inputs should remain?
- **Current status / classification:** `approved`
- **Existing recommendation:** Focus summary/first invalid field and preserve
  safe input.
- **Recommended final decision:** Focus validation summary and support movement
  to the first invalid field; focus API error status; retain values only in
  component memory while mounted, never logs or persistent storage.
- **Alternatives:** Inline only; clear all input; persist drafts.
- **Blocks Phase 5B:** No; blocks Contact error behavior.
- **Impacts:** Route—failure stays on Contact. Navbar/Footer—none.
  Page—focus recovery and transient state. Content—error copy.
  Language—translations later. Accessibility—error discovery/correction.
  Backend—categorize safe errors; do not expose raw details.
- **Risks:** Clearing burdens users; persistence creates privacy risk.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-019 — Analytics and consent

- **Exact decision question:** Should Phase 5B introduce analytics events, and
  if so, which events and consent rules are approved?
- **Current status / classification:** `explicitly_deferred`
- **Existing recommendation:** No analytics before privacy/consent approval.
- **Recommended final decision:** Introduce no analytics in Phase 5B; explicitly
  defer provider, events, payloads, and consent until privacy/legal approval.
- **Alternatives:** Approve named, privacy-reviewed events and consent now.
- **Blocks Phase 5B:** Yes, until the no-analytics baseline or a specification
  is approved.
- **Impacts:** Route—no view events. Navbar/Footer—no click tracking.
  Page—no CTA/page analytics. Content—no consent copy while absent.
  Language—future consent translations. Accessibility—future controls must be
  accessible. Backend—no data beyond confirmed API contract.
- **Risks:** Unapproved tracking exposes behavioral or personal data.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** No analytics until privacy and consent approval.

## INT-020 — Legal-page anchors

- **Exact decision question:** Should legal pages have internal anchor
  navigation, and which approved headings define it?
- **Current status / classification:** `approved`
- **Existing recommendation:** Accessible anchors matching approved headings.
- **Recommended final decision:** Add anchors only after legal owners approve
  stable headings; otherwise keep pages static.
- **Alternatives:** Approve an index now; permanently omit internal navigation.
- **Blocks Phase 5B:** No; blocks optional legal navigation.
- **Impacts:** Route—may add hashes. Navbar/Footer—legal links still target page
  roots. Page—optional internal index. Content—IDs derive from approved
  headings. Language—localized headings need stable IDs.
  Accessibility—semantic links, focus, heading order. Backend—none.
- **Risks:** Draft-derived anchors become stale.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Recommended decision approved.

## INT-021 — Contact privacy note

- **Exact decision question:** Should the Contact privacy note link to
  `/data-protection`, and what approved wording should it use?
- **Current status / classification:** `approved`
- **Existing recommendation:** Link after legal approval.
- **Recommended final decision:** Link to `/data-protection` only after legal
  approval of the wording; invent no consent or privacy claims.
- **Alternatives:** Approved plain text; omit only with legal approval.
- **Blocks Phase 5B:** No; blocks final Contact/legal content.
- **Impacts:** Route—reuses Data Protection. Navbar/Footer—none.
  Page—appears near submit. Content—legal wording required.
  Language—approval for every active language. Accessibility—meaningful link
  context/focus. Backend—must describe confirmed lead handling accurately.
- **Risks:** Incomplete or invented wording creates legal and trust risk.
- **Human decision:** `APPROVED` by Tom on 2026-07-27.
- **Human notes:** Legal wording approval remains required.

## Concise review table

| INT ID | Decision question | Recommended decision | Blocking | Human approval required |
| --- | --- | --- | --- | --- |
| `INT-001` | Approve six routes? | Approve the specified paths. | Yes | Yes |
| `INT-002` | Anchor scroll/focus/history? | Route if needed, then focus and reduced-motion-safe scroll. | Yes | Yes |
| `INT-003` | Header offset/focus target? | Heading/container plus layout-derived offset. | Yes | Yes |
| `INT-004` | Unknown route behavior? | Accessible Not Found behavior. | Yes | Yes |
| `INT-005` | Trailing-slash policy? | Canonical URLs without trailing slash. | Yes | Yes |
| `INT-006` | Legacy redirects? | Explicitly defer pending approved inventory. | Yes | Yes |
| `INT-007` | Interim DE/CN? | Visible but unavailable; EN active. | Yes | Yes |
| `INT-008` | Locale and localized URLs? | Explicitly defer; no localized routes. | Yes | Yes |
| `INT-009` | LinkedIn URL? | Non-interactive until exact URL approval. | Yes | Yes |
| `INT-010` | Mobile close/focus? | Close on selection/Escape/route/outside; move focus appropriately. | Yes | Yes |
| `INT-011` | Validation timing/copy? | Blur + submit, associated errors and summary. | No | Yes |
| `INT-012` | Production success? | `replace` to `/thank-you`. | No | Yes |
| `INT-013` | Environment-specific success? | No `VITE_APP_MODE`; every confirmed success navigates to `/thank-you`. | No | Approved with exception |
| `INT-014` | Direct Thank You access? | Refresh-safe with approved generic content. | No | Yes |
| `INT-015` | Timeout/cancellation? | Explicitly defer to backend/operations. | No | Yes |
| `INT-016` | Retry? | No automatic retry; conditional manual retry. | No | Yes |
| `INT-017` | Navigation during submit? | Prevent duplicates; warn only while ambiguous. | No | Yes |
| `INT-018` | Error focus/input retention? | Focus useful error state; memory-only retention. | No | Yes |
| `INT-019` | Analytics? | None until privacy/consent approval. | Yes | Yes |
| `INT-020` | Legal anchors? | Only after stable legal headings are approved. | No | Yes |
| `INT-021` | Contact privacy link? | Link only after legal wording approval. | No | Yes |

## Outcome

All decisions are approved. `INT-006`, `INT-008`, `INT-015`, `INT-019`, and
other recommendations that explicitly defer later details remain approved
deferrals rather than invented requirements. The interaction-decision gate is
satisfied; Phase 5B still requires separate execution authorization.
