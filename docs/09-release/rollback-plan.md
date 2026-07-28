# Rollback Plan

## Purpose

Restore the last known-good approved release when a deployment causes material
user, contract, security, privacy, or operational harm. Provider-specific
commands remain `decision_pending`.

## Rollback triggers

- Blank Page, unavailable application, or broken critical route
- Widespread form submission failure
- Incorrect API/environment target
- Material CORS or backend compatibility failure
- Personal data, credentials, or stack traces exposed
- Critical accessibility or security regression
- Corrupt/missing assets or content
- Release manifest does not match the deployed artifact
- Monitoring shows unacceptable failure rate or performance
- Incident commander or authorized release owner directs rollback

## Required evidence before release

- Last known-good release ID, artifact, commit, and compatibility baseline
- Reproducible immutable artifact storage
- Environment/configuration identity without secret values
- Provider-approved restore procedure and authorized operator
- Backup/migration compatibility assessment
- Health and smoke checks
- Monitoring dashboards/alerts
- Communication and Incident paths
- Rollback decision authority

## Rollback procedure

1. Confirm impact and open an Incident when production or major operations are affected.
2. Stop or pause rollout where the platform supports it.
3. Identify the last known-good compatible release.
4. Assess data, API, content, migration, and configuration compatibility.
5. Obtain required rollback authorization.
6. Restore through the approved provider procedure.
7. Verify routes, assets, configuration, API reachability, lead flow, logs, and monitoring.
8. Communicate status and preserve evidence.
9. Keep the Incident open until stability and follow-up actions are confirmed.

For the current push-based hosting workflow, rollback means redeploying or
reverting to a known-good Git application commit through the approved
production-branch process. Do not force-push the production branch. The last
known-good runtime reference must be recorded separately from documentation-only
governance commits.

## When rollback is unsafe

If an irreversible data/contract migration prevents rollback, apply the approved
forward-fix or containment plan and document the decision. This requires backend,
operations, product, and security/privacy coordination as applicable.

## Recovery evidence

- Incident and deployment record
- Before/after health evidence
- Restored release/manifest identity
- Smoke and monitoring results
- User/data impact assessment
- Human decision and closure

## Phase 7 integration containment

- Restore the prior approved frontend release to return to the static Contact
  experience without changing the backend.
- If rollback cannot be deployed immediately, publish an approved
  submission-unavailable state with the existing direct-email route.
- Never automatically replay a failed or ambiguous lead request.
- Revert the compatibility record to the prior baseline and preserve
  `API-CONTRACT-R1` evidence for investigation.
- Escalate widespread production submission failures as an Incident.
