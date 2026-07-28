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

- Production deployment is triggered by a push to the designated production
  branch.
- The immutable runtime reference is the Git application commit.
- A packaged artifact and checksum are not required for the current hosting
  workflow unless the deployment architecture changes.
- Record environment, time, operator, Git commit, baseline, and outcome.
- Do not include secrets in release records.

Application changes must pass applicable checks before push. Documentation-only
pushes may trigger a production rebuild without changing runtime behavior. The
production branch must not be force-pushed. Provider evidence is preferred;
when unavailable, explicit confirmation by an authorized human owner is valid
deployment verification.

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

- Unassigned Backend API version unless explicitly accepted by a release deviation
- Pending compatibility or human approval
- Failed required quality/security/privacy check
- Unresolved critical/high Issue without accepted risk
- Missing legal content or approval
- Missing deployment/rollback/monitoring evidence

Release `REL-FE-0.2.0` uses approved deviation `DEV-2026-011`.
