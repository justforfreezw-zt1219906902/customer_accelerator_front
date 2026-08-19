# Visual Design Enrichment — Stage 2C-R1 Page 13 Categorical Palette

- Date: 2026-08-20
- Operator: Codex
- Human owner: Tom
- Status: `page13_palette_refinement_pending_human_review`

## Governance

- Page 13 hierarchy/list treatment: `APPROVED` by Tom.
- Page 13 palette refinement: authorized, pending human review.
- Previous Page 16 palette experiment: `NOT ADOPTED`.
- No Git stash was inspected or manipulated.
- Phase 6 remains `PASS / FROZEN`; Product remains `HUMAN TESTING /
  STABILIZATION`.

## Scope

Only Page 13 Account Discovery and narrowly required optional shared variants
are changed. Page 16 is untouched. Pages 14, 15, 17, and 18 are untouched.
No backend, DTO, route, persistence, release, deployment, or version change
is included.

## Color model

Semantic color continues to represent actual Product state. Categorical /
identity color is presentation-only and distinguishes repeated identities or
dimensions. Existing approved tokens used here are brand purple variants,
amber variants, success variants, and approved neutral/deep brand tints.
No raw colors or new palette tokens were added.

## Implementation

- Account avatars use a deterministic account-ID hash mapped to stable approved
  identity tones; the account name remains the authoritative identity.
- ICP Fit, Signal Score, and Resonance use stable metric-dimension tones and
  do not vary with score values.
- API decorative dots use one fixed approved amber accent; fixture patterns
  remain intact. Dots are `aria-hidden`; `N active` remains semantic truth.
- Large workspace, table, row, and filter surfaces remain dark-neutral.

## Human review

`PENDING` — Tom must review the Page 13 categorical palette evidence. No Page
16 or later-page work is authorized by this checkpoint.
