# Environment Matrix

## Local

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_MODE=development
```

- `VITE_HUBSPOT_OWNER_ID` value is unresolved.
- The Go backend runs separately.
- Local CORS, runtime availability, and test-data behavior require validation.
- No secret belongs in `VITE_*`.

## Staging

| Input | Value/status |
| --- | --- |
| Frontend URL | Unresolved |
| Backend URL | Unresolved |
| `VITE_APP_MODE` | Unresolved |
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
| `VITE_APP_MODE` | Unresolved |
| `VITE_HUBSPOT_OWNER_ID` | Unresolved; must be confirmed safe for public exposure |
| CORS origins | Unresolved |
| Monitoring/logging | Unresolved |
| Privacy/retention | Unresolved |

The production backend URL remains unresolved. Production deployment is blocked
until configuration ownership, validation, compatibility, security/privacy,
monitoring, and rollback procedures are approved.

## Shared rules

- VITE values are public.
- No environment record includes credentials or tokens.
- Environment configuration must fail safely.
- Every deployment links environment, release manifest, compatibility baseline,
  test report, and human approval.

