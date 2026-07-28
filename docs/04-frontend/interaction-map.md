# Interaction Map

## Status

- Phase 5A status: `approved`
- Human approval: Tom, 2026-07-25
- Interaction decisions: approved by Tom, 2026-07-27
- Route map status: `implementation_ready`
- Phase 5B implementation status: `planned`
- Formal specification:
  `docs/04-frontend/product-interaction-specification.md`
- No final routes or Pages were implemented.

## Proposed navigation

| Source | Label | Destination | Status |
| --- | --- | --- | --- |
| Header | THE PROBLEM | `/#problem` | `approved` |
| Header | THE METHOD | `/#method` | `approved_figma_content_supersession` |
| Header | PROOF | `/#proof` | `approved_figma_content_supersession` |
| Header | PACKAGES | `/#packages` | `approved` |
| Header | WHY MI-GOTO | `/why-mi-goto` | `approved_figma_content_supersession` |
| Header/CTA | STRATEGY DISCUSSION | `/contact` | `approved` |
| Footer | The Problem | `/#problem` | `approved_figma_content_supersession` |
| Footer | The Method | `/#method` | `approved_figma_content_supersession` |
| Footer | Packages | `/#packages` | `approved` |
| Footer | Team | `/#team` | `approved_figma_content_supersession` |
| Footer | Why mi-goTo | `/why-mi-goto` | `approved_figma_content_supersession` |
| Footer | Imprint | `/imprint` | `approved` |
| Footer | Data protection | `/data-protection` | `approved` |
| Footer | hello@mi-goto.com | `mailto:hello@mi-goto.com` | `approved` |
| Footer | LinkedIn | unknown HTTPS URL | `approved_non_interactive_until_url_confirmed` |

## Contact state map

```text
idle
→ client validation
  → invalid: show accessible errors and preserve input
  → valid: submitting
      → 200: /thank-you in every environment; no VITE_APP_MODE branch
      → 400: recoverable form error
      → 500: generic temporary failure
      → 502: generic integration failure
      → network/timeout/unexpected: generic safe failure
```

Submitting prevents concurrent duplicate requests. Automatic retry is not
allowed. A numeric timeout is explicitly deferred to backend and operations.
Approved focus, input preservation, safe error, and navigation behavior is
recorded in the decision review.

## Locale state

EN is the only active initial language. DE and CN remain visible but clearly
unavailable. No translations or localized routes may be invented.

## Figma evidence

- Landing Page: `212:2`
- Why Mi-goTo Page: `259:2`
- Imprint: `122:2`
- Data Protection: `128:2`
- Contact Page: `269:2`
- Thank You Page: `321:28`; desktop frame `321:29`

Figma confirms Page structure and visible entry elements. It does not confirm
the route, anchor, locale, success, error, or analytics behavior in this map.

## Decisions

The authoritative decision table is `INT-001` through `INT-021` in the formal
Product Interaction Specification. Tom approved all recommended decisions on
2026-07-27, with the documented `INT-013` exception.
