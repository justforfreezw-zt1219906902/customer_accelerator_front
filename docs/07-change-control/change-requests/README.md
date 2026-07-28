# Change Requests

Use this directory for `CR-YYYY-NNN` records when a human requests a changed
requirement or design even though the current implementation may be correct.

Use `docs/templates/change-request-template.md`. Do not create a Change Request
for an implementation defect; create an Issue instead.

## Registry

| ID | Title | Status | Requested by | Affected phase | Implementation |
| --- | --- | --- | --- | --- | --- |
| `CR-2026-001` | Contact Page Chrome Variants | approved | Tom | Phase 6B | `TASK-P4A-003` → `TASK-P6B-003` |
| `CR-2026-002` | Why Page Chrome Variants | approved | Tom | Phase 6E | `TASK-P6E-001` approved through `TASK-P6E-002` |
| `CR-2026-003` | Phase 6F Thank You Page | approved | Tom | Phase 6F | `TASK-P6F-001` approved through `TASK-P6F-002` |
| `CR-2026-004` | Release Candidate Packages alignment correction | approved_implementation_needs_review | Miroslav / Tom | Phase 8 | `TASK-P8-002` |
| `CR-2026-005` | Shared brand in compact Footers | approved_implementation_needs_review | Tom | Phase 8 | `TASK-P8-003` |

The approved record is
`CR-2026-001-contact-page-chrome-variants.md`. Approval changes the
specification; implementation and its human review remain pending.

`CR-2026-002-why-page-chrome-variants.md` preserves the previous
`MarketingLayout` decision and records the approved move to `WhyLayout`.

`CR-2026-003-phase-6f-thank-you-page.md` records the approved addition of the
Figma-backed Thank You Page and its semantic-version impact.
