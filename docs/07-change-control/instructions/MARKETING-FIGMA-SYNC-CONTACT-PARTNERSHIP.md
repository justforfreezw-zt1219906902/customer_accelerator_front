# Marketing Figma Sync — Contact + Developer Partner

## Scope

Focused synchronization of the latest Figma Contact Page copy and Landing
Developer Partner partnership section. Product/Demo Pages 13–18, backend
code, API-CONTRACT-R2, and release records are out of scope.

## Sources

- Figma file: `vyr3TvF5lAUOnuuxdW8iRb`
- Contact page: `269:2`, desktop frame `269:3`
- Contact textarea reference: `68:329`, target instance `709:7746`
- Landing partnership node: `697:1062`, component `696:1292`

## Applied changes

- Contact visible copy changed from Family name to Last name; internal field
  remains `familyName`.
- Landing partnership content was synchronized to the current single-offer
  Developer Partner copy, five features, CTA, and supporting note.
- Generic multi-package rendering remains available in `PackagesSection`.

## Contract gate and resolution

The previous run was blocked because `context` was not in the Lead contract.
The authoritative backend update now supports optional `context` and removes
client-controlled `owner`. The frontend trims context and omits it when blank;
it never sends owner. No undocumented field is sent.

## Status

`marketing_final_sync_pending_human_review`

Human review remains pending. No version bump, release, deployment, Git
mutation, or Product/Demo page change was performed.
