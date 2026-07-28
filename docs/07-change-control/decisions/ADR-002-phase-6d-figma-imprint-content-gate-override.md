# ADR-002 — Phase 6D Figma Imprint content Gate override

## Status

Accepted by Product Owner on 2026-07-28.

## Context

`TASK-P6D-001` stopped before application changes because no authoritative
human-approved Imprint source or publication disposition was recorded.
`ISSUE-2026-005` captured the blocker. Figma frame `122:3` contains current
public content, future post-relocation authority information, and an editorial
instruction.

## Decision

Tom, acting as Product Owner, explicitly:

- accepts the public-facing current content in Figma frame `122:3` as the
  authoritative source for this baseline;
- waives a PDF, separately registered legal asset, separate legal owner and
  external legal counsel approval;
- approves complete English translation and public frontend use as revision
  `FIGMA-122-3-EN-1.0.0`;
- approves publication of the currently applicable Tempelhof-Schöneberg trade
  authority information;
- excludes the future Treptow-Köpenick authority information until it becomes
  applicable;
- excludes the German editorial relocation/deletion instruction from runtime
  content; and
- accepts the Product Owner risk while professional legal review is deferred.

Approval classification:
`product_owner_content_approval_and_risk_acceptance`.

## Excluded source content

Future conditional content:

- “Nach Ummeldung wird die zuständige Gewerbebehörde wie folgt aktualisiert:”
- The complete “Künftige Gewerbebehörde” Treptow-Köpenick address, telephone,
  fax and email block.

Editorial instruction:

- “Kleiner Hinweis: Sobald die Ummeldung zu Treptow-Köpenick tatsächlich
  erfolgt ist, solltest du den Abschnitt „Aktuell zuständige Gewerbebehörde“
  entfernen und nur noch Treptow-Köpenick stehen lassen.”

## Consequences

- `ISSUE-2026-005` is resolved by human Gate override.
- English is the only published Imprint body language.
- No PDF or PDF link is added.
- The implementation must not be described as lawyer-approved.
- A relocation or future professional legal review may require a new content
  revision and compatibility impact assessment.
