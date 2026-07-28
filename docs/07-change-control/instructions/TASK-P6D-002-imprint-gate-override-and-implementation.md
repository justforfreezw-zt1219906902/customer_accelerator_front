# TASK-P6D-002 — Imprint Gate override and implementation

## Task metadata

- Date: 2026-07-28
- Tool: Codex with Figma MCP read-only inspection
- Operator: Codex
- Human reviewer / Product Owner: Tom
- Starting baseline: `DS1.0.0_API0.0.0_FE0.0.1`
- Status: `approved`
- Human implementation review: approved through `TASK-P6D-003`
- Prompt reference:
  `/Users/zhaowei/.codex/attachments/d1bd27f6-0e38-40b7-8c0f-4e34f8fe2b84/pasted-text.txt`

## Human Gate override

Tom accepted the current public-facing content in Figma Page `122:2`, frame
`122:3`, as the authoritative content source for this frontend baseline. He
waived a PDF, separately registered legal asset, separately assigned legal
owner/approver and external legal counsel approval. He approved complete
English publication and accepted the associated Product Owner risk.

Approval classification:
`product_owner_content_approval_and_risk_acceptance`.

Professional legal review remains deferred. The implementation must not be
represented as lawyer-approved.

Decision evidence:
`docs/07-change-control/decisions/ADR-002-phase-6d-figma-imprint-content-gate-override.md`.

## Figma evidence

Read-only inspection:

- Page `122:2`
- Desktop frame `122:3`
- Header `122:439`
- Hero `122:454`
- Content area `122:459`
- Content grid `122:460`
- Main legal column `122:461`
- Sidebar `122:462`
- Footer `122:577`
- Public section nodes: `122:470`, `122:483`, `122:498`, `122:504`,
  `122:510`, `122:515`, `122:521`, `122:527`, `122:533`, `122:540`
- Excluded editorial section: `122:545`
- Explicit mobile frame: not discovered

The Header and Footer match the approved Landing shared components. No Figma
write was performed.

## Source classification

### Published `public_current_content`

Ten groups:

1. Provider
2. Contact
3. Legal Form and Business Registration, including current
   Tempelhof-Schöneberg trade authority
4. VAT Identification Number
5. Commercial Register
6. Responsible for Content Pursuant to Section 18(2) MStV
7. Consumer Dispute Resolution
8. Liability for Content
9. Liability for Links
10. Copyright

### Deferred `future_conditional_content`

- “Nach Ummeldung wird die zuständige Gewerbebehörde wie folgt aktualisiert:”
- The future Treptow-Köpenick trade-authority block, including its address,
  telephone, fax and email.

### Excluded `editorial_instruction`

Original German note:

> Kleiner Hinweis: Sobald die Ummeldung zu Treptow-Köpenick tatsächlich
> erfolgt ist, solltest du den Abschnitt „Aktuell zuständige Gewerbebehörde“
> entfernen und nur noch Treptow-Köpenick stehen lassen.

It is excluded because Tom explicitly classified editor and migration
instructions as non-public content.

### `design_label` and `navigation_content`

Presentation labels such as `LEGAL INFORMATION`, `QUICK INFO` and `SECTIONS`
are used for visual hierarchy. Navbar and Footer content comes from the
approved shared components, not the Imprint content file.

## Translation notes

- “Impressum” is published as “Imprint”.
- “Einzelunternehmen” is translated literally as “Sole proprietorship”.
- German authority proper names and statutory identifiers (`DDG`, `BGB`,
  `MStV`) are preserved.
- The VAT and commercial-register statements remain conditional and are not
  converted into current registration facts.
- No address, authority, registration number, tax number, representative,
  URL, telephone or email was invented.

## Implementation

- Added typed structured content and source manifest revision
  `FIGMA-122-3-EN-1.0.0`.
- Extended the shared legal-content type with safe link blocks and manifest
  governance metadata.
- Removed the Imprint route shell.
- Implemented the Hero, ten legal cards, quick-info sidebar and stable section
  index.
- Reused `LegalLayout` and the approved Landing Header/Footer.
- Added telephone, email and website links with accessible native semantics.
- Added unit/content-integrity and Chromium desktop/mobile/regression tests.
- Added no PDF file, PDF dependency, PDF link, backend call or tracking.

## Responsive assumption

No explicit mobile Imprint frame was discovered. At widths up to 64rem, the
sidebar moves before the main legal column, cards retain readable widths, and
content avoids horizontal overflow. This is a conservative implementation
detail derived from the approved responsive system.

## Validation

- Management validation: passed, 5 scripts; 0 failures
- Version validation: 12 passed, 0 failed
- Documentation validation: 119 passed, 0 failed
- Compatibility validation: 19 passed, 0 failed
- Registry validation: 54 passed, 0 failed
- OpenAPI validation: 21 passed, 0 failed
- Type checking: passed
- ESLint: passed
- Unit/component tests: 28 files, 92 tests passed
- Relevant Playwright Chromium tests: 3 passed
- Production build: passed; 167 modules transformed
- Git diff check: passed

## Governance outcome

- `TASK-P6D-001`: remains blocked historical evidence
- `ISSUE-2026-005`: resolved by `human_gate_override`
- `TASK-P6D-002`: `approved` through `TASK-P6D-003`
- Phase 6D: `approved`
- Phase 6: `in_progress`
- Human reviewer: Tom
- Approval date: 2026-07-28
- Review notes: `good`
- Approval evidence:
  `docs/08-quality/test-reports/phase-6d-TASK-P6D-003-approval-2026-07-28.md`
- Next Gate: Phase 6E Why mi-goTo Page Review
- Professional legal review: deferred

## Git commit

Not created.
