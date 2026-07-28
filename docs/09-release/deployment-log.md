# Deployment Log

## Policy

Record every staging and production deployment using
`docs/templates/deployment-record-template.md`. A successful command is not
enough; the deployed artifact, compatibility baseline, configuration identity,
smoke results, monitoring, and human authorization must be traceable.

Do not record secrets or personal data.

## Deployments

- `REL-FE-0.2.0`, production, 2026-07-28:
  `completed_human_confirmed` by Tom. Deployment model:
  `git_push_automatic_production`. Application Source Commit:
  `5773c9474be8731f8350a8f3ff542be4f0fce91d`. No packaged artifact or
  checksum is required. See `releases/REL-FE-0.2.0-deployment.md`.
