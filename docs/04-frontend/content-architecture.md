# Content Architecture

## Authority

Content configuration controls website copy, language variants, legal content,
and reusable labels. Figma may show layout examples but is not authoritative
copy unless the content owner explicitly confirms it.

## Planned domains

- Header
- Footer
- Landing Page
- Why mi-goTo Page
- Contact Page
- Imprint Page
- Data Protection Page
- Thank You Page

EN, DE, and CN are registered inputs. The exact Chinese locale is unresolved.

## Planned model

- Stable semantic keys independent of visual position and final wording
- Matching key structures across approved locales
- Explicit metadata, links, labels, validation messages, and accessibility text
- Content passed into visual layers instead of embedded in reusable components
- Schema validation after Phase 1 selects tooling

## Preservation and legal controls

- Header and Footer have `preservation_required: true`.
- They cannot change without a human-approved content change.
- Imprint and Data Protection remain locked until supplied and approved by an
  authorized legal owner.
- Content changes record owner, source, locale impact, review status, and change
  reference.

## Fallback behavior

Missing translations must be detectable and must not silently produce empty UI.
Fallback locale, build blocking, and reporting are `decision_required`. Legal
content must not silently fall back across jurisdictions.

## Decisions required

- Content owner and authoritative source
- Format and validation schema
- Locale tags, default, fallback, pluralization, and review workflow
- CMS versus repository-managed content
- SEO, metadata, structured data, and canonical URL ownership
- Whether Figma copy is sample or authoritative

