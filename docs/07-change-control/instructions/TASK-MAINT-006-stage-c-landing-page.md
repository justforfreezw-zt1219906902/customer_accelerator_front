# TASK-MAINT-006 — Stage C Landing Page

- Status: `stageC_landing_page_complete_pending_human_visual_review`
- Figma page: `350:8`
- Formal frame: `502:297`
- Route: `/demo/content-studio?account=demo-acc-001`

Implemented Landing Page as a dedicated Content Studio asset state with the
Figma-derived 360px Guidance + 32px gap + 760px Draft Preview composition.
The preview includes the Consideration badge, Edit, Regenerate, Copy and
disabled Export actions, Oracle micro-site hero, The Shift, Preparation,
deliverables and Proof Footer sections, plus traceability.

Landing content is deterministic and local. Edit mode updates structured local
fields; Regenerate restores deterministic defaults using the current advertiser
value; Copy uses the current draft. Oracle remains the target account and
TechSmith remains the default editable advertiser. No publishing, forms,
backend, AI, persistence, export or deployment was added.

Validation: typecheck, ESLint, focused Stage C Chromium (2 tests), production
build, management validation and diff checks passed. Formal screenshot:
`test-results/task-maint-006-stage-c-landing-page-1440x900.png`, CSS viewport
`1440 × 900`, screenshot `1440 × 1239`. Human visual review remains pending.
