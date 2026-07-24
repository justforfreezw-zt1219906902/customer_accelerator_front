# Backup and Recovery

## Scope

This document distinguishes source/artifact recovery from backend business-data
recovery. Provider-specific implementation remains `decision_pending`.

## Frontend source and documentation

- Git is the source history after commits are created.
- Protect branches/tags and preserve reviewed release commits.
- Documentation and registries must be included in repository backups.
- Recovery verifies content integrity and the intended baseline.

## Build artifacts and releases

- Preserve immutable approved artifacts and release manifests.
- Link artifact checksum/identity, commit, environment, and compatibility baseline.
- Retain the last known-good release needed for rollback.

## Configuration

- Back up configuration definitions through the approved platform without
  copying secrets into Git or release documents.
- Maintain secure secret backup/rotation through the chosen secret manager.
- VITE variables are public and still require environment integrity.

## Backend data

HubSpot contacts, companies, associations, and email records are outside
frontend backup authority. The backend/operations owners must define backup,
reconciliation, deletion, retention, and disaster-recovery responsibilities.

## Recovery validation

- Restore into an approved safe environment where practical.
- Verify repository/artifact integrity and compatibility.
- Validate routes, assets, configuration, backend reachability, and critical flow.
- Confirm monitoring and logging safety.
- Record evidence, owner, date, duration, and unresolved limitations.

## Decisions required

- Git/artifact/configuration providers
- Backup frequency and retention
- Recovery point/time objectives
- Restore test cadence
- Backend/HubSpot reconciliation
- Recovery authority and contacts

