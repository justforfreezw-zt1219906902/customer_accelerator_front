# TASK-MAINT-006 — Stage B LinkedIn Ad

- Status: `stageB_linkedin_ad_complete_pending_human_visual_review`
- Reviewer: Tom (Stage A gate accepted; Stage B visual review pending)
- Figma page: `350:8`
- Formal frame: `361:325`
- Route: `/demo/content-studio?account=demo-acc-001`

## Implemented

Single Image Ad is the formal visual state. The implementation provides the
Figma-derived editor/preview composition, deterministic local fields, local
Generate/Regenerate, structured editing with preview synchronization, local
image preview and clear behavior, Clipboard Copy feedback, traceability
disclosure, and semantically disabled Export.

Document Ad and Thought Leadership Ad are functional local secondary states
only. They do not implement PDF, Lead Gen, LinkedIn, AI, backend or publishing
features. Asset switching remains local and does not change the URL.

## Validation

- Typecheck: passed
- ESLint: passed
- Stage A focused unit tests: 3 passed
- Stage A + Stage B focused Chromium tests: 4 passed
- Production build: passed
- Management validation: 5 validator groups passed
- Git diff check: passed
- Formal CSS viewport: `1440 × 900`
- Screenshot: `test-results/task-maint-006-stage-b-single-image-1440x900.png`
- Screenshot dimensions: `1440 × 1467` full page

Known non-blocking test warning: jsdom reports its existing unimplemented
`window.scrollTo` warning during router unit tests.

## Boundaries

Frontend remains `0.2.0`, Figma DS remains `1.2.0`, compatibility remains
`DS1.2.0_API0.0.0_FE0.2.0`. No dependency, backend, AI, persistence, release,
deployment or Git operation was performed. Human visual review is pending.

## Focused correction checkpoint

The formal preview distinguishes target account Oracle from advertiser TechSmith.
The Preview Brand Row is `TechSmith / Promoted`, the advertiser-owned
destination is `techsmith.com/oracle`, and Copy/Export are inside the 560px ×
520px preview header. Best Practice opens by default with all four bullets;
Persona displays `Head of Marketing / CMO · signal match` for the supported
Oracle context.
