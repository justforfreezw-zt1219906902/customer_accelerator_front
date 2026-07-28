# Operations Runbook

## Status and safety

Production uses push-triggered automatic deployment from the designated
production branch. The Git application commit is the immutable runtime
reference; packaged artifacts are not required. Exact provider commands,
hosting access, URLs, alerts and escalation contacts remain
`decision_pending`. Never put secrets or personal lead data into records.

## Common evidence to collect

- Environment and time
- Release ID, commit/artifact, and compatibility baseline
- Route/operation and HTTP status
- Sanitized browser/network/server evidence
- Monitoring/alert references
- Scope and user impact
- Recent deployment/configuration/contract changes

## Troubleshooting guide

### Frontend does not install

Verify approved runtime/package-manager versions, lockfile integrity, registry
access, and dependency audit output. Do not delete lockfiles or broadly reset
the repository without authorization. Record an Issue if the approved setup is
not reproducible.

### Frontend does not build

Run the Phase 1-approved type, lint, test, and build commands. Inspect the first
actionable error, environment validation, generated artifacts, and version
compatibility. Preserve logs without secrets.

### Route returns 404

Determine whether the failure is client routing, hosting fallback/rewrite,
legacy redirect, or unknown route. Check the route map and deployed artifact.
Do not mask a missing Page with an unrelated redirect.

### Deployment fails

Stop rollout, preserve provider evidence, verify artifact/configuration identity,
check approval and environment access, and follow the approved provider
procedure. Roll back if a partial deployment creates material impact.

For the current workflow, verify the production-branch commit and automation
result. Do not force-push. Rollback redeploys or reverts to a known-good commit.

### Backend cannot be reached

Confirm environment target, network/DNS/TLS, backend health, and safe browser
network evidence. Never switch to another environment silently.

### CORS fails

Confirm requesting origin, method, headers, preflight response, and approved
backend CORS configuration. The frontend cannot safely bypass CORS.

### Form validation fails

Compare UI rules and payload mapping with `LeadRequest` and approved interactions.
Distinguish client validation from a backend `400`. Record failing requirements
and safe reproduction data.

### POST /api/lead returns 400

Check JSON shape, required non-empty fields, email format, and safe backend error
context. Do not log the payload. Preserve user input and display approved
recoverable feedback.

### POST /api/lead returns 500

Treat as an unexpected backend failure. Show a generic safe message, capture
sanitized correlation/evidence if available, assess scale, and contact the
backend owner. Retry behavior remains governed by the integration specification.

### POST /api/lead returns 502

Treat as an upstream integration failure. Check backend and HubSpot health via
approved operational access. Do not expose internal HubSpot detail to users.

### HubSpot does not receive contact

Confirm a successful frontend request and backend evidence without personal
data. Check backend-to-HubSpot configuration, permissions, rate limits, and
partial-failure behavior with the backend owner.

### Company association fails

Inspect sanitized backend workflow evidence for company lookup/create and
association stages. Determine whether contact creation succeeded and follow the
approved partial-failure/reconciliation process.

### Notification email fails

Check approved backend mail-provider health and sanitized delivery evidence.
Determine whether lead/HubSpot processing succeeded and whether reconciliation
or notification retry is authorized.

### Redirect is wrong

Confirm `200` success, interaction specification, router history behavior,
environment mode, and `/thank-you` route. Do not redirect on `400`, `500`, `502`,
timeout, or an invalid success shape.

### Environment variables are wrong

Stop unsafe rollout, compare non-secret configuration identity with the
environment matrix, and redeploy only through the approved platform mechanism.
Rotate credentials if exposure occurred; VITE values themselves must not be
secret.

### Temporarily disable Contact submission

Use the approved release process to restore the last approved static frontend
artifact or deploy an explicitly reviewed unavailable-state correction. Do not
introduce a hidden runtime flag or silently redirect the API. Keep the form
disabled only with clear safe user messaging and an approved direct-contact
alternative.

### Submission remains pending

`INT-015` defines no numeric client timeout. Confirm network/backend state
before asking the user to retry. Navigation confirmation may abort the browser
request, but it does not prove the backend, HubSpot or email side effects were
cancelled. Avoid repeated submissions until the result is understood.

## Escalation

Open an Incident for production or major operational failure. Open an Issue for
implementation failure against an existing requirement. Use a Change Request
for desired changed behavior.
