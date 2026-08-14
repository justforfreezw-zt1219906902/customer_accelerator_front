# Real-Data Frontend Stabilization Report

## Outcome

`stabilization_complete_needs_human_review`

## Product status

- Phase 6 implementation: `PASS / FROZEN`
- Overall product: `NOT FINAL`
- Human testing: `IN PROGRESS`
- Release authorized: `NO`

## Browser environment

- Frontend origin: `http://127.0.0.1:5173`
- Data mode: `VITE_DEMO_DATA_SOURCE=api`
- Backend: reachable from the in-app Chromium browser at the configured local API origin
- Primary tested UUID: `266463eb-3096-5209-a2ca-b533d6cb42a3` (ServiceNow)
- Additional account-switch UUID: `4156ffe2-f91a-5efc-984c-37cd2d6b9333` (Microsoft)
- Tooling: in-app Chromium browser and Playwright Chromium

## Defects found and corrected

| ID | Route | Viewport | Component | Trigger | Root cause | Fix |
|---|---|---:|---|---|---|---|
| STAB-001 | `/demo` | 1440 | Account Row | long real Next Best Action and metadata | fixed 72px height and rigid action layout | content-driven min-height, wrapping and shared responsive grid |
| STAB-002 | `/demo` | 1024 | Discovery grid/filter/table | tablet workspace narrower than desktop tracks | grid items retained intrinsic minimum width | minmax page track, zero minimums and tablet card layout |
| STAB-003 | `/demo/accounts/{uuid}` | 390 | Account Overview | long description, reasons and actions | 820px intrinsic grid width and fixed reason-card height | bounded 100% summary, shrinkable tracks and content-driven cards |
| STAB-004 | `/demo/accounts/{uuid}/dna` | 768 and narrow | DNA evidence/source content | long vocabulary and source URLs | missing shrink/wrap boundaries; topbar breadcrumb pressure | shrinkable grids, safe URL/text wrapping and compact tablet breadcrumb |
| STAB-005 | `/demo/dna` | desktop and narrow | DNA Portfolio cards/comparison | long real vocabulary and comparison copy | fixed card height and rigid comparison tracks | min-height cards, wrapping vocabulary and minmax comparison columns |
| STAB-006 | `/demo/content-studio` | 1440 and 390 | context, asset tabs, Outreach editor/preview | variable account/signal/generated email text | fixed editor/preview tracks and non-shrinking children | bounded minmax tracks, wrapping tabs/context and responsive editor/preview |

## Page results

### Page 13 — Account Discovery

Long real account metadata and Next Best Actions now remain inside content-driven
rows. The accepted 1440 column model remains intact; 1024 and smaller use a
readable card-like row arrangement. Search, Tier filtering, clearing filters and
real-UUID navigation passed. No final viewport has page-level horizontal overflow.

### Page 14 — Account Overview

The former 820px mobile overflow is removed. Long description, Why This Account,
Why Now, Next Best Action and Signal content wrap without fixed-height clipping.
Dynamic Signal filtering and Communication DNA navigation passed.

### Page 15 — Communication DNA

Long source URLs, vocabulary, quotes and evidence text wrap within their cards.
External sources retain `_blank` plus `noopener noreferrer`; Back navigation
returns to the same real UUID Account Overview.

### Page 16 — Signal Pulse

No layout correction was required beyond the shared tablet topbar resilience.
Backend metric semantics, persona tabs, urgency filters and API-only unavailable
Market Patterns behavior remained intact.

### Page 17 — DNA Portfolio

Cards and comparison tracks now grow with long real content. Multi-account
selection, automatic backend comparison and deselection passed. No local
comparison or fixture fallback was introduced.

### Page 18 — Content Studio

Context controls, five asset tabs and Outreach editor/preview now remain within
the workspace across desktop and mobile. Real API Generate All succeeded; Value
Regenerate changed Value only while manual Subject, Opening, CTA and Signature
remained unchanged. Copy used the current email draft. Switching from ServiceNow
to Microsoft reset the prior account draft and kept real UUID query state.

## Long-content stress tests

Focused unit coverage now exercises a 100-character account name, extensive
metadata, a roughly 300-word Next Best Action, long Signal title/action content,
long DNA identity/vocabulary and multiple vocabulary entries. Chromium coverage
fills long Outreach Opening, Value and CTA text and verifies reachable controls
with no page-level horizontal overflow.

## Browser console and network

- Console errors: none observed
- Vue warnings: none observed in browser
- Unhandled rejections: none observed
- Failed API requests: none observed in the successful route/interaction pass
- Browser log contained Vite connection/debug messages only

## Viewport matrix

All six routes passed at 1440×900, 1280×800, 1024×768, 768×1024 and
390×844: 30/30 combinations without page-level horizontal overflow.

## Automated validation

| Validation | Result | Notes |
|---|---|---|
| Typecheck | PASS | `vue-tsc --noEmit` |
| ESLint | PASS WITH WARNINGS | 0 errors; two pre-existing formatting warnings |
| Unit/component/router | PASS | 44 files, 214 tests |
| Account API parser | PASS | Included in full suite; 40 tests |
| Phase 6 API UI | PASS | Included in full suite; 12 tests |
| Relevant Chromium | 52 PASS / 1 PRE-EXISTING FAILURE | obsolete `.demo-route-host` placeholder expectation after approved Content Studio implementation |
| Production build | PASS | Vite production build |
| Management validators | PASS | management 5/5; docs 119/119; version 12/12; compatibility 19/19; registries 84/84; OpenAPI 21/21 |
| Git whitespace check | PASS | `git diff --check` returned no errors |

An initial broad Chromium attempt served the already-built API-mode bundle to
fixture-ID tests. Those fixture-contract failures were environment/mode
mismatches and are not represented as passing. The correctly built fixture-mode
relevant suite produced the result above.

## Visual/browser evidence

Evidence directory:
`docs/08-quality/test-reports/evidence/post-phase-6-stabilization-2026-08-15/`

It contains paired before/after API-mode captures for Pages 13–18 at required
desktop/mobile targets plus additional 1024/768 captures for corrected defects.

## Frozen semantic protection

- `API-CONTRACT-R2` unchanged
- Backend contract revision `2` unchanged
- Frontend `0.2.0` and Figma DS `1.2.0` unchanged
- Signal Pulse backend metric semantics unchanged
- DNA comparison remains `POST /api/dna-portfolio/compare`
- Outreach Email generation and partial Regenerate semantics unchanged
- API/fixture isolation and account-switch isolation unchanged

## Known remaining UX and test issues

- Human visual/real-user acceptance of this stabilization pass remains pending.
- Product readiness remains pending ongoing internal/external testing.
- The legacy Chromium assertion expecting `.demo-route-host` is obsolete after
  the approved real Content Studio replaced that placeholder; application
  behavior was not reverted to satisfy the stale selector.
- Two existing ESLint formatting warnings remain outside this focused scope.

## Human review

`PENDING`

## Git

- Source files modified locally: authorized Product layout robustness files
- Staged: `NO`
- Committed: `NO`
- Pushed by Codex: `NO`
- Deployment: `NO`
