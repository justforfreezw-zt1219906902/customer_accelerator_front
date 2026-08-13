# CR-2026-006 — ABM Product Demo and Shared Design System Migration

## Metadata

- Status: `approved_in_progress`
- Requested and approved by: Tom
- Date: 2026-08-12
- Owner: Product owner / Tom
- Starting baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Target Figma baseline: `1.2.0`
- Current task: `TASK-MAINT-006` Page 18 authorized to begin
- Human Marketing regression approval: `accepted by Tom on 2026-08-12`

## Approved change

Migrate the shared Foundation/Core system compatibly before implementing the
ABM Product Demo. Figma Pages 00–05 control the shared visual baseline. Product
and App additions remain additive and are deferred to later maintenance tasks.

## TASK-MAINT-002 scope

- Verified shared token additions and no-output-change normalization.
- Typed dark/light context support for `AppBrandLogo`.
- Shared Core Source Attribution Chip.
- Automated validation and Marketing regression evidence.

Avatar, ABM primitives, App Shell, Demo routes and Pages 13–18 are excluded.
No existing Marketing public API, route, content or default visual behavior may
be replaced incompatibly.

## Compatibility and recovery

Frontend remains `0.2.0`. The target compatibility record is provisional and
not approved. Recovery is to revert only the maintenance migration files and
restore the historical `DS1.1.0_API0.0.0_FE0.2.0` source; no backend or data
migration is involved.

## Gate

Tom accepted the TASK-MAINT-002 desktop/mobile Marketing regression checkpoint
on 2026-08-12. Tom then accepted TASK-MAINT-003 and its Product Foundation/Demo
Shell checkpoint on 2026-08-12. This authorizes TASK-MAINT-004 but does not
assign a release version or authorize release, deployment, or backend work.

## TASK-MAINT-003 scope

The additive Demo route contract, reusable DemoLayout, Product navigation and
topbar, accessible mobile Drawer, local typed account provider, invalid-account
state and Demo indexing protection are implemented. Pages 13–18 remain detailed
implementation scope for later approved tasks.

## TASK-MAINT-004 scope

Figma Pages 13–14 are implemented as Account Discovery and Account Overview
using the accepted Demo Shell and typed local fixtures. Search, source-defined
filters, account navigation, safe evidence presentation, responsive behavior,
and navigation into deferred DNA and Content Studio route hosts are included.
Pages 15–18 business UI remains excluded. Human review accepted Pages 13–14
and authorized TASK-MAINT-004 closure on 2026-08-13. The reviewer name was not
supplied in the closure instruction. No later maintenance task is authorized by
this acceptance.

## TASK-MAINT-005 Stage A scope

Figma Page 15 is implemented for the formal Oracle fixture under the accepted
Demo Shell and accepted by Tom. The implementation is fixture-only, has no
backend or persistence, and preserves Pages 13–14.

Tom accepted Page 15 and Page 16 on 2026-08-13 and explicitly authorized Stage
C. Page 17 Communication DNA Portfolio is implemented from Figma frame
`360:2385` and accepted by Tom. Stage D integrated responsive and regression
validation is complete and TASK-MAINT-005 was accepted and closed by Tom on
2026-08-13. Page 18 is now authorized under TASK-MAINT-006.

TASK-MAINT-006 Stage A implements only the Page 18 Company Preview and local
workflow foundation from Figma page `350:8`, frame `361:2`. Stage A is pending
Tom's visual review; editor stages remain deferred.

Tom accepted Stage A on 2026-08-13. Stage B LinkedIn Ad is authorized and
awaits its separate human visual review; later asset editors remain deferred.

Stage D Outreach Email was accepted by Tom on 2026-08-13. Stage E LinkedIn
Outreach is implemented as a deterministic local editor from Figma frame
`502:662`, with human visual review pending. Stage F and Sales Talking Points
remain deferred.
