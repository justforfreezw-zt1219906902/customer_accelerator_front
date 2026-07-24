# STEP-006: Backend Contract Revision 1

## Task purpose

Document the confirmed Go backend lead contract and future frontend integration
requirements without implementing API calls or assigning an invented semantic
version.

## Input files read

- `AGENTS.md`
- `VERSION.yaml`
- `docs/phases/phase-0-project-audit.md`
- `docs/02-inputs/backend-source-map.yaml`
- `docs/04-frontend/interaction-map.md`
- `docs/00-governance/source-of-truth-policy.md`
- Existing `docs/05-backend/` contents (directory was empty)
- Current Git status

## Files created

- `docs/05-backend/openapi.yaml`
- `docs/05-backend/api-overview.md`
- `docs/05-backend/api-changelog.md`
- `docs/05-backend/api-compatibility.md`
- `docs/05-backend/integration-spec.md`
- `docs/05-backend/error-catalog.yaml`
- `docs/05-backend/authentication.md`
- `docs/05-backend/migration-guides/` directory
- `docs/07-change-control/instructions/STEP-006-backend-contract.md`

## Files modified

- `docs/02-inputs/backend-source-map.yaml`
- `CHANGELOG.md`

## Contract constraints preserved

- Official backend semantic version remains unassigned.
- `versions.backend_api` remains the `0.0.0` compatibility placeholder.
- Contract revision remains `1`.
- Authentication remains not specified.
- Production URL remains unresolved.
- No unconfirmed request fields were added.
- Backend error text is not treated as a stable machine code.

## Unresolved backend questions

- Backend owner and official semantic API version
- Backend-owner review/approval of the documented OpenAPI
- Production and staging base URLs
- Authentication or intentional anonymous access
- CORS origins, preflight behavior, rate limits, and anti-abuse controls
- Empty/whitespace normalization and optional `owner` empty-string behavior
- Full validation-error text stability
- Timeout, cancellation, idempotency, and retry behavior
- Whether HubSpot/email partial failure can occur after contact creation
- Logging, redaction, retention, correlation, monitoring, and incident ownership
- Direct access and exact navigation behavior for `/thank-you`

## Validation

- Parsed `openapi.yaml` and `error-catalog.yaml` successfully.
- Structurally validated OpenAPI 3.1, both servers, `POST /api/lead`, request
  schema, required fields, email format, and `200`/`400`/`500`/`502` responses.
- Confirmed no authentication scheme or unconfirmed request field exists.
- Confirmed `VERSION.yaml` Backend API remains `0.0.0`, status remains
  `contract_documented_version_unassigned`, and contract revision remains `1`.
- A dedicated OpenAPI validator is not installed; package-dependent validation
  remains planned rather than reported as passed.
- Verified no frontend implementation or wrapper directory was created.
- Checked whitespace and final Git status; STEP-006 changes remain uncommitted.

## Human approval

**pending**
