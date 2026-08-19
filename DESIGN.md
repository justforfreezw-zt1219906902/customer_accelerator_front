# mi-goTo Product Design System

Status: `proposed_pending_human_review`  
Figma Design System: `1.2.0`  
Frontend: `0.2.0`  
Lifecycle: `HUMAN TESTING / STABILIZATION`

This document governs the visual enrichment of the mi-goTo Product experience.
It organizes the existing design language; it does not replace the palette,
change Product behavior, or authorize implementation by itself.

## 1. Visual Theme & Atmosphere

mi-goTo is a dark enterprise intelligence interface with controlled high
contrast and richer use of its existing palette. It should feel intelligent,
premium, analytical, confident, modern, and visually rich without becoming
noisy.

The visual system should make three questions easy to answer:

1. What matters most?
2. Why does it matter now?
3. What should the user do next?

Dark space is purposeful. Color identifies meaning, priority, selection, and
state. It is not general decoration.

## 2. Color Palette & Semantic Roles

Only existing project tokens are permitted. New raw colors require a separately
reviewed token change.

| Semantic role | Existing token(s) | Recommended usage | Avoid |
| --- | --- | --- | --- |
| Application background | `--color-bg-default` | Level 0 canvas and page gutters | Using it for interactive cards that need separation |
| Standard surface | `--color-surface-default`, `--color-bg-surface` | Level 1 filters, toolbars, ordinary panels | Giving every standard panel a strong accent border |
| Elevated surface | `--color-surface-elevated`, `--color-bg-elevated`, `--color-card-default` | Level 2 cards, rows, editor and preview panels | Treating elevation as a selected state by itself |
| Primary text | `--color-text-primary` | Headings, decisive values, primary recommendations | Applying it to all metadata |
| Secondary text | `--color-text-secondary` | Explanations, metadata, helper copy | Using it below practical contrast at small sizes |
| Muted/tertiary text | Existing muted/tertiary text tokens | Non-critical labels and disabled context | Using muted text for required actions or evidence status |
| Neutral border | `--color-border-default`, `--color-border-subtle` | Structure, row division, ordinary cards | Equal-strength borders around every nested surface |
| Brand emphasis | `--color-brand-core`, `--color-brand-light`, `--color-brand-deep`, `--color-brand-tint-900`, `--color-border-brand` | Primary action, selection, active navigation, primary insight | Using purple for warning, verified, danger, and every link simultaneously |
| Attention/timing | `--color-accent-amber`, `--color-accent-amber-light`, `--color-accent-amber-deep`, `--color-border-amber` | Why Now, urgency, opportunities, time-sensitive intelligence, watchlist | Using amber for ordinary metadata or permanent navigation |
| Positive/verified | `--color-state-success`, `--color-state-success-subtle` | Active, verified, source-supported, healthy score where semantically accurate | Applying green to decorative dots or unknown data |
| Danger/error | `--color-state-error`, `--color-state-error-subtle` | Failed state, critical risk, going cold, destructive warning | Using red for generic absence or ordinary low-priority content |
| Disabled | `--color-state-disabled`, `--opacity-disabled` | Disabled controls and unavailable actions | Using disabled styling for actions that remain available |
| Focus | `--color-focus-ring`, `--shadow-focus-ring` | Keyboard focus only | Reusing focus treatment as persistent selection styling |
| Brand atmosphere | `--shadow-glow-violet`, `--color-shadow-glow-violet-soft` | Sparse selected or hero emphasis | Glow on every card |
| Attention atmosphere | `--shadow-glow-amber` | Rare time-sensitive emphasis | Continuous use across a full dashboard |

### Color budget

A normal screen uses one dominant brand accent plus no more than two concurrent
semantic accents. Neutral surfaces remain the majority.

- Purple: selection, primary action, primary intelligence.
- Amber: attention, timing, opportunity, watchlist.
- Green: verified, active, healthy, source-supported.
- Red: error, critical risk, going cold.
- Neutral: ordinary metadata, unselected content, unavailable data.

Color never acts alone. Text, icons, badges, borders, and accessible names must
continue to communicate the state.

### Contrast guardrail

The current dark palette provides strong contrast for primary and secondary
text. Small `--color-brand-light` text on elevated or brand-tint surfaces is a
known risk and must be checked at implementation time; use larger/semibold text,
a stronger token-backed surface relationship, or primary text when needed.
Every proposed foreground/background pair must be validated against practical
WCAG 2.2 AA expectations in its actual size and weight.

## 3. Typography

Use the existing Inter and JetBrains Mono system.

- Inter carries page titles, section titles, body copy, actions, and readable
  recommendations.
- JetBrains Mono carries compact intelligence labels, evidence states, counts,
  technical metadata, and short data values.
- Page titles establish place; section titles establish task; mono labels
  establish evidence or data category.
- Important recommendations use primary text and semibold weight before they
  use additional color.
- Avoid turning entire paragraphs or long actions into purple link text.
- Keep small uppercase labels short; do not use them for explanations.

## 4. Component Styling

### Actions

- Primary action: brand-filled, one per local task region.
- Secondary action: neutral or brand outline.
- Tertiary action: text action with a clear hover/focus state.
- Disabled action: visibly unavailable, never the most prominent item.
- Urgent action may use amber only when urgency is semantically confirmed.

### Metrics

- Default metrics use neutral surfaces.
- The one primary portfolio metric may use brand emphasis.
- Time-sensitive metrics use amber.
- Verified/healthy metrics may use success.
- Risk metrics use error.
- A number, label, and accessible name remain present; color is supplementary.

### Cards and rows

- Ordinary cards use subtle borders.
- Interactive cards use elevated surfaces and a stronger hover state.
- Selected cards use brand border plus a non-color cue such as check state.
- High-priority cards use a controlled accent edge or header, not a full rainbow
  fill.
- Tables distinguish header, row, hover, and selected states without changing
  column geometry.

### Evidence and status

- `SOURCE_BACKED`: success role.
- `DERIVED`: brand role.
- `INSUFFICIENT_DATA`: warning or neutral-incomplete treatment unless it is an
  actual error; do not imply failure automatically.
- Errors: error role.
- Status text remains visible and machine-readable.

### Decorative signal dots

The Account Discovery dots are presentation only. They are `aria-hidden`, do
not encode individual signals or history, and do not vary as a semantic count.
The numeric `N active` text is the single source of truth.

## 5. Layout Principles

- Preserve the 240px desktop Demo Sidebar and the established 24px Product
  content gutter at the formal 1440px state.
- Prefer common page-content boundaries over independently constrained panels.
- Align filters, actions, grids, and comparison results to shared edges.
- Keep dense intelligence scannable through stable columns, consistent vertical
  rhythm, and deliberate grouping.
- Do not use font enlargement, zoom, transforms, or arbitrary scaling to create
  hierarchy.
- Long real data must wrap or reflow without changing meaning.
- Avoid large empty regions created by a single unbounded grid track.

## 6. Surface / Depth / Elevation

| Level | Purpose | Treatment |
| --- | --- | --- |
| Level 0 | Application canvas | `--color-bg-default`; no card border |
| Level 1 | Standard grouping | `--color-surface-default`; subtle border when structure needs it |
| Level 2 | Interactive/elevated content | `--color-surface-elevated` / `--color-card-default`; default border; optional card shadow |
| Level 3 | Selected/high-priority content | Level 2 plus one semantic border/edge and a non-color state cue |

Depth is primarily established with surface contrast, spacing, and grouping.
Shadows and glows are reserved for overlays, focused elevation, or a small
number of high-priority elements.

## 7. Information Hierarchy

The default hierarchy is:

1. Page task or account identity.
2. Primary insight, risk, selection, or generation action.
3. Supporting evidence, controls, metadata, and secondary actions.

For Account Overview, this becomes:

`WHY THIS ACCOUNT → WHY NOW → WHAT NEXT`

For Content Studio, it becomes:

`CONTEXT → CREATE/EDIT → PREVIEW → GUIDANCE/TRACEABILITY`

Do not assign equal border, color, and type weight to all levels.

## 8. Do / Don't

### Do

- Reuse semantic tokens before proposing new ones.
- Make selection, urgency, verification, and risk visually distinct.
- Use typography and surface depth before adding another accent color.
- Keep neutral unavailable states neutral.
- Pair color with explicit text and accessible state.
- Preserve fixture/API semantics and real-data robustness.

### Don't

- Replace the mi-goTo palette.
- Use purple as the answer to every hierarchy problem.
- Give every card a strong colored border.
- Use success green for decorative or unknown data.
- Use error red for ordinary missing information.
- Create rainbow category cards.
- Infer backend meaning from visual treatment.
- reduce contrast or information density merely to resemble a prototype.

## 9. Responsive Behavior

- Desktop preserves the formal Product canvas and shared alignment rules.
- Tablet reduces columns deliberately while retaining semantic grouping.
- Mobile reorders by attention priority, not desktop source order alone.
- Sidebar becomes the approved Drawer; Topbar and main focus behavior remain.
- Horizontal tables become structured cards or intentional scroll regions only
  where already approved.
- Accents, labels, and state text remain visible after reflow.
- Decorative effects may reduce on small screens; semantic indicators may not.

## 10. Accessibility

- Target WCAG 2.2 AA for text and interactive controls.
- Do not claim compliance from visual review alone.
- Preserve semantic headings, labels, live regions, and focus management.
- Focus indicators remain distinct from persistent selection.
- State is never color-only.
- Disabled and unavailable controls remain understandable.
- Touch targets and Drawer controls remain operable at mobile sizes.
- Respect reduced-motion preferences for any future visual enrichment.
- Recheck contrast in browser for every new token pairing, including small mono
  labels and status badges.

## 11. Agent Prompt Guide

When implementing approved visual enrichment, an AI agent must:

1. Read `AGENTS.md`, `VERSION.yaml`, this `DESIGN.md`, the relevant phase/task
   record, and the active Figma/source documents.
2. Preserve Product semantics, API contracts, routing, fixture/API isolation,
   generation behavior, and accepted responsive architecture.
3. Use existing semantic tokens; do not introduce raw colors in page or
   component code.
4. State the intended semantic role before applying an accent.
5. Modify shared tokens/components before duplicating page styles.
6. Validate fixture and API states, desktop and mobile states, keyboard focus,
   accessible names, and practical contrast.
7. Record visual differences and human review status.
8. Never mark visual work approved without Tom or another identified human
   reviewer.

Suggested implementation prompt fragment:

> Enrich the visual hierarchy using the existing mi-goTo palette. Assign
> purple to selection/primary action, amber to timing/opportunity, green to
> verified/active states, red to errors/critical risk, and neutrals to ordinary
> content. Preserve semantics and responsive geometry. Do not introduce raw
> colors or make color the only state carrier.

## Governance State

- Phase 6 functional semantics: `PASS / FROZEN`
- Current Product: `HUMAN TESTING / STABILIZATION`
- Visual enrichment: `PROPOSED / PENDING HUMAN REVIEW`
- Release: `NOT AUTHORIZED`
