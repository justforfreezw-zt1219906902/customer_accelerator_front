# Support Playbook

## Intake

Collect only necessary non-sensitive information:

- environment and time;
- route/action;
- expected and actual behavior;
- safe reproduction steps;
- release/baseline if visible;
- sanitized screenshot or error reference.

Do not request lead payloads, credentials, tokens, or personal data through
unapproved support channels.

## Classification

- Desired changed requirement/design → Change Request
- Failure against existing requirement → Issue
- Intentional code/Figma difference → Deviation
- Production or major operational failure → Incident
- Durable technical choice → ADR

## Severity guidance

- Critical: security/privacy exposure, blank production site, or total critical
  lead-flow failure
- High: widespread production feature failure without safe workaround
- Medium: limited functional/accessibility defect with workaround
- Low: minor non-blocking defect or documentation problem

Final severity policy and response targets are `decision_pending`.

## Triage

1. Confirm environment, release, and scope.
2. Check monitoring, deployment log, known Issues, Deviations, and Incidents.
3. Reproduce safely without production personal data.
4. Route to frontend, backend, design, product, content/legal, operations, or
   security/privacy ownership.
5. Communicate status and next update.
6. Verify resolution against the requirement and record human closure.

## Escalation examples

- `400` caused by user correction → support/UX guidance unless implementation is wrong
- Sustained `500`/`502` → backend/operations; Incident if production impact is major
- CORS after deployment → backend/operations and deployment owner
- Wrong design → Issue if code mismatch, Change Request if design preference changed
- Personal data logged → immediate security/privacy Incident

## Decisions required

- Support channels and hours
- Named owners and escalation contacts
- Severity definitions, response targets, and communication templates
- Customer notification authority
- Privacy-safe evidence tooling

