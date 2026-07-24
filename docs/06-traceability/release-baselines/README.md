# Release Baselines

This directory stores immutable compatibility snapshots for reviewed releases.
No release baseline exists yet because application implementation has not
started and the current planning baseline is not approved.

## Required release-baseline content

- Release ID and date
- Compatibility baseline ID and human alias
- Figma, Backend API, backend contract revision, and Frontend versions
- Exact implementation artifact or commit
- Requirements and migrations included
- Test environments and evidence
- Known limitations and approved deviations
- Human approvals
- Superseded baseline, when applicable

## Figma update workflow

1. Human supplies the new Figma version.
2. Figma changelog is updated.
3. Impact analysis is created.
4. Compatibility baseline becomes pending.
5. Code migration occurs.
6. Tests run.
7. Frontend version is released.
8. New baseline receives human approval.

## Backend update workflow

1. Backend owner supplies the new semantic API version and contract revision.
2. OpenAPI and API changelog are updated.
3. Compatibility and consumer impact analysis is created.
4. Compatibility baseline becomes pending.
5. Frontend contract mapping and code migration occur.
6. Contract, integration, regression, and build checks run.
7. Frontend version is released.
8. New baseline receives backend-owner, product-owner, and release approval.

Contract revision alone does not replace the semantic Backend API version.

## Baseline state transitions

Planning or changed-source baselines begin as pending and not approved. They may
become approved only after compatible source versions, implementation evidence,
tests, environment results, limitations, migrations, and human approvals are
recorded.

