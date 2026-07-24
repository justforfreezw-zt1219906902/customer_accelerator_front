# Monitoring

## Objectives

Detect availability, route, asset, API, integration, performance, security, and
privacy failures early without collecting unnecessary personal data.

## Planned signals

- Frontend availability and blank-Page detection
- Critical route and asset success
- JavaScript error rate with sanitized context
- Page performance and Core Web Vitals if approved
- `POST /api/lead` request count and status distribution without payloads
- Timeout and network-failure rate
- Backend `400`, `500`, and `502` trends
- HubSpot/company/email workflow health from backend monitoring
- Deployment and smoke-test outcome
- CORS/configuration failures

## Alert principles

- Alerts require an owner, severity, threshold, window, runbook, and escalation.
- Avoid alerting on individual expected validation `400` responses without
  aggregation and context.
- Page on production user-impacting failures, security/privacy signals, or
  sustained critical-path degradation according to the approved policy.
- Monitoring tools and thresholds are `decision_pending`.

## Privacy

Do not use names, emails, owner IDs, complete lead payloads, credentials, or raw
responses as labels, dimensions, events, or alert content. Use sanitized
aggregate metrics and approved correlation identifiers.

## Release integration

Every production deployment must annotate monitoring with release ID and
compatibility baseline. Smoke results and post-deployment observation are linked
to the deployment record.

## Decisions required

- Monitoring provider and owners
- Service-level objectives and thresholds
- Correlation strategy
- Retention and access controls
- On-call and escalation contacts
- HubSpot/email monitoring boundary

