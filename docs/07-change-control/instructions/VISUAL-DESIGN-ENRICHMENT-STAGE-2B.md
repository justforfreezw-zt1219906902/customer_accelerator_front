# Visual Design Enrichment — Stage 2B Page 13 Pilot

- Date: 2026-08-20
- Task: Page 13 Account Discovery visual pilot
- Operator: Codex
- Human owner: Tom
- Status: `page13_list_visual_pilot_complete_pending_human_review`

## Gate and scope

- Stage 1 remains approved.
- Stage 2A remains `page14_visual_pilot_complete_pending_human_review` with
  directionally positive feedback; it is not marked approved here.
- Scope is limited to Page 13 list hierarchy and the minimum shared identity
  presentation needed to safely display real API account names.
- Pages 14–18, Demo Shell global styling, routes, backend, API-CONTRACT-R2,
  and content semantics are out of scope.

## Implementation summary

- Account identity can wrap safely in Account Row cells instead of truncating
  long real company names.
- Next Best Action uses existing readable text tokens while preserving the
  verified desktop table geometry and responsive layout.
- Signal dots are fixed neutral decoration in both API and fixture modes,
  `aria-hidden`, and never represent Signal records or counts. The numeric
  `N active` label remains the semantic value.

## Evidence and validation

Evidence must cover API mode with real backend UUIDs at 1440×900, 1024×768,
and 390×844, plus fixture mode at 1440×900 and the required 768×1024 check.
Automated management, type, lint, unit, build, and documentation validators
are required before the human checkpoint.

## Frozen boundaries

- Frontend remains `0.2.0`; Figma Design System remains `1.2.0`.
- API-CONTRACT-R2 and backend semantic version status are unchanged.
- No release, deployment, persistence, or Git operation is authorized.

## Human review

`PENDING` — Tom must review Page 13 evidence before any broader Stage 2
rollout. No approval is claimed by this record.
