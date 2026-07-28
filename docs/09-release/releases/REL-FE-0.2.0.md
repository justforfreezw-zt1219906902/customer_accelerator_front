# REL-FE-0.2.0

## Release identity

- Frontend version: `0.2.0`
- Release date: 2026-07-28
- Status: `released`
- Production status: `deployed`
- Maintenance line: `0.2.x`
- Previous RC: `REL-FE-0.2.0-rc.1`
- Product Owner: Tom
- Deployment model: Git-push automatic production
- Deployment verification: `human_confirmed`
- Application Source Commit:
  `5773c9474be8731f8350a8f3ff542be4f0fce91d`
- Source-freeze governance commit:
  `cbfc9386b2e835afcc68cd52e2860c634f4af817`
- TASK-P8-005 governance commit:
  `4c0a45a062feed3973bbe212ac6e662737429131`
- Figma version: `1.1.0`
- Backend API version/status: `0.0.0`,
  `contract_documented_version_unassigned`
- Backend contract: `API-CONTRACT-R1`
- Compatibility baseline: `DS1.1.0_API0.0.0_FE0.2.0` (provisional)

## Included scope

Routes and Pages: Landing, Why mi-goTo, Contact, Data Protection, Imprint,
Thank You and Not Found. The release includes the layered design system, shared
Header/Footer variants, responsive interaction infrastructure, accessible
navigation and Contact lead integration.

## Evidence

- Typecheck and ESLint passed.
- Unit/component/router: 120/120 passed.
- Chromium E2E: 28/28 passed.
- Production build passed.
- Mocked `API-CONTRACT-R1` compatibility passed.
- Header, Footer, Packages and Not Found visual review approved by Tom.
- Accessibility evidence: implemented assertions and human review; no full
  conformance claim.
- Live backend smoke: `not_run_environment_unavailable`.
- Firefox/WebKit: not run; browser policy unresolved.
- Historical formatting: 13 accepted warnings.

## Issues and deviations

Resolved Issues include `ISSUE-2026-006` through `ISSUE-2026-010`.
Accepted Deviations: `DEV-2026-001`–`DEV-2026-004`,
`DEV-2026-006`–`DEV-2026-009`, and release deviation `DEV-2026-011`.

No packaged artifact or checksum is required. Git Source Commit is the
immutable application reference. Rollback follows
`docs/09-release/rollback-plan.md`.
