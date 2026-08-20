# Cross-Page Account Identity Consistency Audit

Status: `cross_page_account_identity_consistency_pending_human_review`

The shared `AccountAvatar` derives initials from the account display name and
presentation tone from the stable account ID. Tone is decorative only.

| Account | ID | P13 | P14 | P15 | P16 | P17 | P18 |
|---|---|---|---|---|---|---|---|
| Oracle | `demo-acc-001` (fixture) | O / deep | O / deep | O / deep | O / deep | O / deep | O / deep |
| Oracle | `44e6bd9d-dc77-5a70-93f4-ed06527ab359` (API) | O / amber | O / amber | O / amber | O / amber | O / amber | O / amber |
| NVIDIA Corporation | `b0e18742-3249-592f-9eef-b6830fb8ba56` (API) | NC / deep | NC / deep | NC / deep | NC / deep | NC / deep | NC / deep |

API and fixture IDs are intentionally distinct; the same ID remains stable
across all pages. Human visual review is pending.
