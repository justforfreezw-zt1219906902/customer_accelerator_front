# Environment Inputs

## Public frontend configuration

```env
VITE_API_BASE_URL=http://localhost:8080
```

These are names and non-secret example values only.

## Security rules

- `VITE_*` variables are included in browser bundles and are visible to users.
- No secrets may be stored in `VITE_*` variables.
- HubSpot private credentials, private access tokens, API secrets, client
  secrets, and signing keys must never be stored in frontend variables.
- Sensitive integration credentials belong in backend/deployment secret
  management and must not be returned to the browser.
- `.env.example` must remain free of real credentials.

## Variable expectations

| Variable | Purpose | Current state |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Select the backend base URL | Local value supplied; production unresolved |
| HubSpot owner configuration | Backend-only assignment | Never exposed to the browser |

## Local

- Expected backend base URL: `http://localhost:8080`
- The Go backend must be run separately.
- Availability, CORS, and endpoint behavior still require validation.
- Local values belong in an ignored environment file when Phase 1 tooling exists.
- Phase 1 records the non-secret local values in `.env.development` and
  `.env.example`.

## Staging

No staging URL or environment policy has been supplied. A dedicated API,
non-production data, access controls, compatibility record, and approved
configuration injection mechanism are required before staging use.

## Production

- Production API URL remains unresolved.
- Production configuration must be injected through the approved hosting system.
- `POST /api/lead`, HubSpot processing, email processing, and Thank You behavior
  require verified OpenAPI and interaction specifications.
- A release manifest must record versions and configuration names, never secret
  values.

## Decisions required

- Production and staging URLs
- CORS origins, logging, privacy, retention, monitoring, and incident handling

## Superseded input

`VITE_APP_MODE` has been removed. It is not part of the runtime configuration.
Tom approved one success path on 2026-07-27: every confirmed successful Contact
submission navigates to `/thank-you`. Existing application configuration that
Any future environment-mode configuration requires a separately authorized
implementation task.
