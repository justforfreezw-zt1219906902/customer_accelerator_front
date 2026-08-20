# mi-goTo Communication DNA Categorical Color Coverage

Status: `communication_dna_categorical_color_coverage_pending_human_review`

This focused visual correction adds deterministic, presentation-only category
tones for Communication DNA dimensions and sibling vocabulary tags. Existing
tokens are used; no raw colors, dependencies, API fields, routes, semantics,
or layout structure were changed.

Semantic/state colors remain reserved for product truth: Do uses the success
family and Don't uses the error/risk family. Generic category tags use stable
categorical tones and are not evaluative. Company avatar identity remains
owned by the canonical account identity helper.

Files: `src/utils/categoricalTone.ts`, `DnaEvidenceCard.vue`,
`DnaPortfolioCard.vue`, `AccountDnaPage.vue`, `DnaPortfolioPage.vue`,
`tests/unit/categoricalTone.spec.ts`, and DESIGN.md.

Human review: pending. API-CONTRACT-R2, frontend 0.2.0, Figma DS 1.2.0;
release and deployment remain unauthorized.
