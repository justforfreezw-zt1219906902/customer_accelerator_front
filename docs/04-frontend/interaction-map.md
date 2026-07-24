# Interaction Map

## Status

All behavior in this document is provisional until approved Product and
Interaction Specifications exist. Unresolved items are marked
`decision_required`.

## Provisional navigation

| Label | Destination | Status | Notes |
| --- | --- | --- | --- |
| `THE PROBLEM` | `/#problem` | provisional | `decision_required`: anchor ID, scroll offset, focus, history, and reduced motion |
| `THE SOLUTION` | `/#solution` | provisional | `decision_required`: anchor ID, scroll offset, focus, history, and reduced motion |
| `PACKAGES` | `/#packages` | provisional | `decision_required`: anchor ID, Section existence, scroll/focus behavior |
| `CONTACT` | `/contact` | provisional | `decision_required`: active-state and source tracking |
| `STRATEGY DISCUSSION` | `/contact` | provisional | `decision_required`: CTA source, query parameters, and analytics |

## Contact submission

Provisional product flow:

```text
Landing Page
→ Contact Page
→ POST /api/lead
→ Backend, HubSpot and email processing
→ Thank You Page
```

Successful production submit → `/thank-you`.

`decision_required`:

- form fields, validation, consent, and payload;
- loading, duplicate prevention, timeout, retry, and error behavior;
- authoritative success status and response;
- whether navigation uses push, replace, or server redirect;
- focus movement and accessibility announcements;
- whether values are preserved after failure or cleared after success;
- direct access to `/thank-you`;
- privacy, analytics, spam protection, and data retention.

## Development submit behavior

`decision_required`:

- real local Go backend versus mock transport;
- whether local success navigates to `/thank-you`;
- isolation from production HubSpot and email processing;
- safe test data;
- simulated validation, loading, error, timeout, and retry states.

Development must not silently send real production leads.

## Language switching

Status: `decision_required` pending final localization decision.

Decisions include:

- whether `CN` maps to `zh-CN`;
- default language and detection;
- URL prefixes versus application state;
- persistence and consent;
- fallback language and missing translations;
- whether route, hash, form input, and scroll position are preserved;
- page language and localized metadata updates.

## Global unresolved behavior

- Not-found route and legacy redirects
- External-link behavior
- Sticky navigation and mobile menu interaction
- Scroll restoration between routes
- Route and CTA analytics
- Consent and privacy behavior
- Error and support escalation

