# CR-2026-005 — Shared brand in compact Footers

## Metadata

- Status: `approved_implemented`
- Requested and approved by: Tom
- Date: 2026-07-28
- Owner: Product owner / Tom
- Starting baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Target phase: Phase 8
- Implementation task: `TASK-P8-003`
- Human approval: `approved`

## Current design

Figma compact Footer `257:1671` contains copyright and Home/legal links but no
logo. Landing Footer `105:494` contains logo `105:474`.

## Approved change

For the current RC, every shared Footer, including Contact and Why compact
variants, must render the same approved brand treatment as the Header and link
to `/`.

## Reason

Tom explicitly required consistent Footer branding after rejecting
`TASK-P8-002`. This requirement overrides the absence of a logo in the compact
Figma Footer and must be traceable rather than silently diverging.

## Scope

- In scope: shared Core brand primitive, shared Footer variants, layout Home
  navigation, tests and governance.
- Out of scope: unrelated Footer content, columns, legal/contact links,
  Packages, Not Found, Figma writes, backend and release actions.

## Acceptance criteria

- [x] Header and Footer reuse one Core brand implementation.
- [x] All Footer variants use the high-density transparent asset.
- [x] Exactly one Footer brand link appears per Page.
- [x] Link destination is `/`, with accessible name and keyboard focus.
- [x] Existing Footer content and links remain.
- [x] Human visual review approves the result.

## Decision

- Result: `approved`
- Approver: Tom
- Date: 2026-07-28
- Conditions: no Footer redesign beyond the brand integration; no Figma write;
  Source Freeze remains prohibited until review.
- Implementation review: approved by Tom on 2026-07-28
