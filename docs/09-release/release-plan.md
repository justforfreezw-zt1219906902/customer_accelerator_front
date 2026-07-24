# Release Plan

## Promotion flow

```text
development
→ staging
→ release candidate
→ human approval
→ production
→ smoke test
```

No stage may be skipped without an approved Change Request or Incident recovery
decision.

## Development

- Build and validate against local configuration.
- Run available lint, type checking, unit, component, and integration checks.
- Use non-production data and prevent unintended HubSpot/email activity.
- Record current Figma, Backend, Frontend, contract revision, and baseline.

## Staging

- Deploy the immutable candidate to approved staging.
- Validate environment configuration, routing, assets, CORS, API integration,
  errors, accessibility, responsiveness, security, and end-to-end journeys.
- Use approved staging data and integrations.
- Record Issues, Deviations, and limitations.

## Release candidate

- Freeze the exact artifact/commit and dependency lock state.
- Create the release manifest and compatibility assessment.
- Attach QA reports, migrations, rollback evidence, and known limitations.
- Verify the candidate is identical to the artifact proposed for production.

## Human approval

An identifiable product/release owner reviews the candidate, QA evidence,
compatibility, risks, Issues, Deviations, privacy/security, and rollback
readiness. Automation cannot approve a release.

## Production

- Deploy only the approved immutable candidate.
- Record environment, time, operator, artifact, baseline, and outcome.
- Do not include secrets in release records.

## Smoke test

Verify approved critical checks immediately after deployment:

- application loads without a blank Page;
- static assets and routes resolve;
- environment mode and API target are correct;
- critical navigation and legal Pages work;
- lead submission behavior works with approved safe data;
- errors, monitoring, and logs are safe; and
- rollback readiness remains available.

## Release blockers

- Unassigned Backend API version
- Pending compatibility or human approval
- Failed required quality/security/privacy check
- Unresolved critical/high Issue without accepted risk
- Missing legal content or approval
- Missing deployment/rollback/monitoring evidence

