# TASK-MAINT-003 — ABM Product Foundation and Demo Shell

## Status

`implementation_complete_needs_human_review`

## Gate and authority

- Exact repository root verified.
- Tom's TASK-MAINT-002 and Marketing regression acceptance was supplied on 2026-08-12.
- Figma DS `1.2.0`; frontend remains `0.2.0`; release authorization remains `NO`.
- Figma was read-only. App Shell `358:1352` and Topbar `356:40` / `356:51` were inspected.

## Scope implemented

- Additive `/demo` router tree and `DemoLayout` without Marketing chrome changes.
- Desktop Product sidebar/topbar and mobile left Drawer.
- Accessible navigation, disabled future destinations and logo routing to `/demo`.
- Typed local provider with opaque account IDs and Product-level invalid-account handling.
- `noindex, nofollow` on Demo routes with Marketing metadata restoration.
- Empty architectural route hosts only; no Page 13–18 business content.

## Explicit exclusions

No backend, auth, AI, persistence, `/app/:companyId`, dependency, release,
deployment or Git mutation was introduced. TASK-MAINT-004 is not authorized by
this record.

## Human review

Pending Tom review of desktop/mobile shell fidelity and interaction evidence.

## Validation evidence

- Management validation: passed, 5 validators and 0 failures.
- Typecheck and ESLint: passed.
- Unit/component/router suite: 130 passed.
- Production build: passed.
- Focused Chromium Demo/Marketing suite: 8 passed.
- Full Chromium suite: incomplete at the pre-existing Phase 7 environment-dependent segment; no TASK-MAINT-003 failure observed and it is not reported as passed.
- Responsive screenshots: 1440, 1024, 768, 390 closed, 390 Drawer open.
