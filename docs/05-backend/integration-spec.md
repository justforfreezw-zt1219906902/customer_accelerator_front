# Lead API Integration Specification

## Status

This specification plans future frontend integration. No frontend API calls are
implemented. OpenAPI controls the contract; Product and Interaction
Specifications control user behavior.

## Base URL configuration

- Use `VITE_API_BASE_URL`.
- Local value: `http://localhost:8080`.
- Production value: `decision_required`; it has not been supplied.
- `VITE_*` values are browser-visible and cannot contain secrets.
- A missing or invalid base URL must fail safely rather than defaulting to an
  unintended environment.

## Request mapping

| Frontend value | API field | Contract |
| --- | --- | --- |
| First name | `firstName` | Required non-empty string |
| Family name | `familyName` | Required non-empty string |
| Company | `company` | Required non-empty string |
| Work email | `workEmail` | Required non-empty valid email string |
| Owner identifier | `owner` | Optional string |

Do not add `website`, `phoneNumber`, `message`, or other unconfirmed fields.

## Owner field behavior

- Send `owner` only when an approved non-empty string is available.
- The source may be `VITE_HUBSPOT_OWNER_ID` only if a human confirms that the
  value is safe to expose in browser-delivered code.
- Omit the optional field when no approved value exists.
- Empty-string versus omitted behavior requires backend-owner confirmation.

## Client-side validation

Mirror the confirmed required/non-empty and email-format constraints for user
feedback. Client validation does not replace backend validation. Exact
whitespace normalization, email validation strategy, messages, focus, and
localization remain `decision_required`.

## Loading and double-submit prevention

- Enter a distinct submitting state before sending.
- Disable or otherwise guard the submission action while the request is active.
- Prevent duplicate requests from repeated click, keyboard, or retry actions.
- Preserve accessible status and focus behavior.
- Exact cancellation and navigation behavior remains `decision_required`.

## Success

On confirmed `200 OK`, validate that `message` and `hubspot_contact_id` are
present, then apply the approved success behavior.

Production success: redirect to `/thank-you`.

`decision_required`: router push versus replace, direct-access behavior,
analytics, focus placement, form clearing, and treatment of an unexpected
success response shape.

## Error presentation

### 400 Bad Request

Present a recoverable validation/request error. Preserve safe user input and
focus the relevant error summary or field according to the approved interaction
specification. Backend text may inform the display but is not a stable machine
code.

### 500 Internal Server Error

Present a generic temporary service failure without exposing technical detail.
Provide retry or support behavior only after product approval.

### 502 Bad Gateway

Present an integration/service failure without exposing internal HubSpot
details beyond approved copy. Retry behavior is unresolved.

## Timeout

Status: `decision_required`.

Required decisions include threshold, cancellation, user message, duplicate
protection, observability, and whether retry is safe.

## Retry

Status: `decision_required`.

Automatic retry must not be introduced without idempotency and duplicate-lead
analysis. Manual retry rules also require product and backend approval.

## CORS

The backend must allow approved frontend origins and methods/headers for
`POST /api/lead`. Local, staging, and production origins and preflight behavior
are `decision_required`.

## Production logging restrictions

- Do not log request bodies, names, email addresses, owner IDs, HubSpot contact
  IDs, credentials, secrets, or raw backend responses in browser logs.
- Do not send personal data to analytics without approved privacy and consent.
- Operational telemetry must be sanitized and follow approved retention.
- Correlation identifiers may be used only if defined by the contract or
  operations policy; none are currently confirmed.

