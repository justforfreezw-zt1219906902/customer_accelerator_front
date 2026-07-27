# Content Architecture

## Authority

Content configuration controls website copy, language variants, legal content,
and reusable labels. Figma may show layout examples but is not authoritative
copy unless the content owner explicitly confirms it.

Tom explicitly confirmed the active Figma `06 Landing Page` at Figma Design
System `1.0.0` as the authoritative English content source for the initial
Frontend 1.0 Landing Page under `TASK-P6A-002`.

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
For Frontend 1.0, EN is the only active language. DE and CN remain visible in
the Header but unavailable; they must never display invented translations or
silently reuse English as though localized.

## Approved Landing content controls

- Content owner and approver: Tom
- Source: Figma `06 Landing Page` (`212:2`), version `1.0.0`
- Publication status: approved
- Metrics and customer-result claims: approved, exact baseline wording only
- Prices and commercial details: commercially confirmed, exact baseline only
- Qualitative claims: approved, no strengthening or new guarantees
- Team content and asset publication permission: confirmed
- FAQ questions and answers: approved
- Future modifications require an approved Change Request
- Code destination: `src/content/landing/en.ts`

The current Team design uses initials-only avatars. No image fill or binary
photograph asset exists in the inspected `212:615` instance, so implementation
must not invent a photograph path.

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

- Format and validation schema
- Locale tags, default, fallback, pluralization, and review workflow
- CMS versus repository-managed content
- SEO, metadata, structured data, and canonical URL ownership
- Content ownership and authority for Pages other than Landing
