# TASK-MAINT-006 — Stage A Company Preview / Workflow Foundation

- Status: `stageA_company_preview_complete_pending_human_visual_review`
- Date: 2026-08-13
- Figma source: Page 18 `350:8`, Company Preview `361:2`
- Route: `/demo/content-studio`
- Fixture: Oracle, opaque ID `demo-acc-001`

## Scope

Implemented the Company Preview account-selection state, deterministic local
Search/Industry/Tier/Lifecycle filters, valid and invalid opaque account query
states, and the local persona/asset workflow foundation. The five asset choices
are LinkedIn Ad, Landing Page, Outreach Email, LinkedIn Outreach, and Sales
Talking Points. Persona choices are Marketing, Sales, and Executive.

No editor, backend, AI, CRM, analytics, persistence, export, PDF, or real lead
generation was added. Stage B+ editors remain deferred pending human review.

## Evidence and validation

- `npm run typecheck`: passed
- `npm run lint`: passed
- focused unit tests: 3 passed
- focused Chromium tests: 3 passed at CSS viewport `1440 × 900`
- production build: passed
- formal screenshot: `test-results/task-maint-006-stage-a-company-preview-1440x900.png`
- formal content width: 1152px inside the 1200px Demo workspace

## Governance

Frontend remains `0.2.0`; Figma Design System remains `1.2.0`; compatibility
baseline remains provisional `DS1.2.0_API0.0.0_FE0.2.0`. No Git mutation,
release, deployment, or version change was performed.

Human visual review: `PENDING` (Tom). Stage B is blocked until acceptance.
