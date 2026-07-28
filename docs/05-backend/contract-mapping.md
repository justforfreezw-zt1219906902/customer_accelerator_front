# API-CONTRACT-R1 Frontend Mapping

## Authority and status

- OpenAPI: `docs/05-backend/openapi.yaml`
- Contract revision: `1`
- Provisional implementation identifier: `API-CONTRACT-R1`
- Backend semantic version: `0.0.0`, unassigned placeholder
- Frontend version: `0.2.0`
- Implementation task: `TASK-P7-001`
- Production-release approval: not granted

Tom explicitly authorized implementation and local testing against this
documented contract while the official Backend API semantic version remains
unassigned. `API-CONTRACT-R1` is not semantic version `1.0.0`.

## Operation trace

```text
POST /api/lead
→ LeadRequest in src/types/lead.ts
→ submitLead in src/services/leadApi.ts
→ LeadForm in src/components/contact/LeadForm.vue
→ ContactPage in src/pages/ContactPage.vue
→ router.replace("/thank-you") on validated HTTP 200
→ safe error categories on all failures
```

## Mapping

| Contract concern | Frontend evidence |
| --- | --- |
| Required request fields | `firstName`, `familyName`, `company`, `workEmail` in `LeadRequest` |
| Optional request field | `owner`, sourced only from public runtime configuration and omitted when blank |
| Success response | `LeadSuccessResponse` validates `message` and `hubspot_contact_id` |
| Known HTTP errors | 400, 500 and 502 mapped in `httpClient.ts` |
| Other/malformed responses | `unexpected_response` |
| Configuration failure | `configuration_error` |
| Network/cancellation | `network_error` and `cancelled` |
| Timeout | `INT-015` defers a numeric client timeout; no timer is invented |
| Retry | Automatic retry disabled; deliberate resubmission is possible after failure |
| Duplicate prevention | `LeadForm` accepts only one active submission |
| Navigation during submit | User confirmation is required; confirmed navigation aborts the browser request |
| Privacy | No payload, personal field, owner, or HubSpot contact ID is logged or routed |

## Tests

- `tests/unit/RuntimeConfig.spec.ts`
- `tests/unit/LeadApi.spec.ts`
- `tests/unit/LeadForm.spec.ts`
- `tests/unit/ContactPage.spec.ts`
- `tests/e2e/phase-7-backend-integration.spec.ts`

Browser cancellation only stops the frontend wait. It does not prove that
backend or HubSpot side effects were cancelled.
