# Environment Matrix

## Local

```env
VITE_API_BASE_URL=http://localhost:8080
```

- `VITE_HUBSPOT_OWNER_ID` is optional and omitted when blank.
- The Go backend runs separately.
- Local CORS, runtime availability, and test-data behavior require validation.
- No secret belongs in `VITE_*`.

## Staging

| Input | Value/status |
| --- | --- |
| Frontend URL | Unresolved |
| Backend URL | Unresolved |
| HubSpot/email isolation | Unresolved |
| CORS origins | Unresolved |
| Monitoring/logging | Unresolved |
| Data and retention policy | Unresolved |

Staging must use non-production data and approved integration isolation.

## Production

| Input | Value/status |
| --- | --- |
| Frontend URL | Unresolved |
| Backend URL | Unresolved |
| `VITE_HUBSPOT_OWNER_ID` | Optional public routing identifier; blank values are omitted |
| CORS origins | Unresolved |
| Monitoring/logging | Unresolved |
| Privacy/retention | Unresolved |

The production backend URL remains unresolved in repository documentation.
Tom confirmed production deployment of `REL-FE-0.2.0`; absence of a live
backend smoke test is explicitly accepted by `DEV-2026-011`. This is not
evidence that the live backend test passed.

## Shared rules

- VITE values are public.
- No environment record includes credentials or tokens.
- Environment configuration must fail safely.
- Every deployment links environment, release manifest, compatibility baseline,
  test report, and human approval.
- Production deployment is triggered by a designated production-branch push;
  Git commit is the immutable runtime reference.
- `VITE_APP_MODE` is not required. Confirmed successful Contact submissions use
  the same `/thank-you` destination in all environments.
- `VITE_API_BASE_URL` is required for live submission and is normalized without
  a trailing slash. Missing or invalid values fail safely.
- All `VITE_*` values are public browser configuration. No private HubSpot,
  backend, or email-service credential may be stored in them.
