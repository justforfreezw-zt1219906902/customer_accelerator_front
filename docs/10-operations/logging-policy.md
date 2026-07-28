# Logging Policy

## Production prohibition

Never log in production:

- `firstName`;
- `familyName`;
- `workEmail`;
- complete lead payload;
- HubSpot contact ID unless operationally necessary and explicitly approved;
- credentials;
- tokens; or
- backend stack traces.

Also avoid company and owner identifiers where they can identify a person or
customer unless a documented operational need and privacy approval exists.

## Frontend logging

- No request/response payload logging.
- No personal data in console, analytics, error reports, URLs, or storage.
- Disable or remove debug logging before production.
- Present safe user messages instead of internal details.

## Backend and operational logging

- Use structured event categories and sanitized context.
- Prefer approved correlation IDs over personal identifiers.
- Apply access control, redaction, retention, and deletion policies.
- Stack traces remain in secured backend systems only when approved.
- Authentication and secret values are always redacted.

## Error handling

Backend human-readable error text is not a stable machine code. Frontend
classification uses HTTP status and confirmed contract context without logging
personal payloads.

## Review

Logging tooling, retention, access, correlation, and operational necessity for
HubSpot IDs are `decision_pending` and require security/privacy approval.

`TASK-P7-001` adds no frontend diagnostic logging. Contract tests verify safe
mapping and navigation without logging request or response payloads.
