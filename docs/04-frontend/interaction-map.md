# Interaction Map

## Status

- Phase 5A status: `approved`
- Human approval: Tom, 2026-07-25
- Formal specification:
  `docs/04-frontend/product-interaction-specification.md`
- No final routes or Pages were implemented.

## Proposed navigation

| Source | Label | Destination | Status |
| --- | --- | --- | --- |
| Header | THE PROBLEM | `/#problem` | `proposed_needs_review` |
| Header | THE SOLUTION | `/#solution` | `proposed_needs_review` |
| Header | PACKAGES | `/#packages` | `proposed_needs_review` |
| Header | CONTACT | `/contact` | `proposed_needs_review` |
| Header/CTA | STRATEGY DISCUSSION | `/contact` | `proposed_needs_review` |
| Footer | The problem | `/#problem` | `proposed_needs_review` |
| Footer | Solutions | `/#solution` | `proposed_needs_review` |
| Footer | Packages | `/#packages` | `proposed_needs_review` |
| Footer | Contact | `/contact` | `proposed_needs_review` |
| Footer | Imprint | `/imprint` | `proposed_needs_review` |
| Footer | Data protection | `/data-protection` | `proposed_needs_review` |
| Footer | hello@mi-goto.com | `mailto:hello@mi-goto.com` | confirmed content; behavior proposed |
| Footer | LinkedIn | unknown HTTPS URL | `decision_required` |

## Contact state map

```text
idle
→ client validation
  → invalid: show accessible errors and preserve input
  → valid: submitting
      → 200: production /thank-you; development behavior decision required
      → 400: recoverable form error
      → 500: generic temporary failure
      → 502: generic integration failure
      → network/timeout/unexpected: generic safe failure
```

Submitting prevents concurrent duplicate requests. Automatic retry is not
proposed. Exact timeout, manual retry, cancellation, focus, copy, and navigation
semantics require human approval.

## Locale state

EN is proposed as initially active. DE and CN remain visible. The recommended
interim state is disabled-with-explanation until translations and locale mapping
are approved. An announced EN fallback is an alternative requiring approval.

## Figma evidence

- Landing Page: `212:2`
- Why Mi-goTo Page: `259:2`
- Imprint: `122:2`
- Data Protection: `128:2`
- Contact Page: `269:2`
- Thank You Page: no registered Figma source

Figma confirms Page structure and visible entry elements. It does not confirm
the route, anchor, locale, success, error, or analytics behavior in this map.

## Decisions

The authoritative decision table is `INT-001` through `INT-021` in the formal
Product Interaction Specification. The specification is approved; all named
decisions remain `decision_required`.
