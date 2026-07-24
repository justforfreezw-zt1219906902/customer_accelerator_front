# Authentication

## Confirmed status

`POST /api/lead` authentication requirement: **not specified**

No API key, bearer token, cookie, session, client secret, or other
authentication mechanism is defined by the confirmed contract.

## Rules

- Do not add a `securitySchemes` or operation-level security requirement to
  OpenAPI until the backend owner supplies one.
- Do not store private credentials in `VITE_*` variables or frontend code.
- Do not infer authentication from HubSpot processing; the browser does not
  communicate directly with HubSpot under the current contract.
- If anonymous submission is intended, the backend still needs approved abuse,
  rate-limit, CORS, privacy, and monitoring controls.

## Decisions required

- Whether the endpoint is intentionally anonymous
- Authentication or anti-abuse requirements
- CSRF relevance and allowed origins
- Rate limits, spam prevention, and bot protection
- Credential ownership and rotation if authentication is added
- Error/status behavior for authentication failures

