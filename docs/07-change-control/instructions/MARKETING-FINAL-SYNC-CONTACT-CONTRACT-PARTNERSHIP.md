# Marketing Final Sync — Contact Contract + Latest Partnership Figma

## Outcome

`marketing_final_sync_pending_human_review`

## Contact contract

The previous `contact_optional_context_blocked_by_api_contract` state is
resolved by the authoritative Contact contract update. `POST /api/lead` now
accepts required `firstName`, `familyName`, `company`, `workEmail` and optional
`context`. The public frontend request no longer contains `owner`; ownership is
backend-controlled. Contract identifier remains `API-CONTRACT-R1` because no
new revision was supplied.

Context is a real optional textarea using the approved Design System component.
It is trimmed and omitted when blank, and included when populated.

## Landing Partnership

Figma node `697:1062` was re-inspected. The Developer Partner offer now uses a
980px horizontal panel with a 420px prototype preview on the left, description
and five benefits on the right, and an internal Partner-rate/CTA bottom row.
The current Figma image asset was downloaded to
`src/assets/marketing/account-discovery-prototype.png`; it is not referenced by
an expiring remote URL.

## Boundaries

Product Pages 13–18, API-CONTRACT-R2, backend code, versions, release,
deployment, and Git state were not changed.
