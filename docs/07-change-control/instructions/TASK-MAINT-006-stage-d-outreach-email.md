# TASK-MAINT-006 — Stage D Outreach Email

- Status: `stageD_outreach_email_complete_pending_human_visual_review`
- Figma page: `350:8`
- Formal frame: `502:473`
- Route: `/demo/content-studio?account=demo-acc-001`

Implemented a dedicated Outreach Email draft state with the formal 544px
editor + 32px gap + 560px preview geometry. The editor includes the open Cold
Email guidance, Generate all parts, recipient placeholders, subject, opening,
value, interest CTA and structured signature fields. The preview is plain text,
with Copy, disabled Export .txt, readiness checks, deterministic cold-email
validation and traceability.

No recipient lookup, sending, CRM, backend, AI, persistence, attachment,
HTML-email or export behavior was added. Oracle remains the target account and
the editable advertiser remains separate.

Validation passed: typecheck, ESLint, focused Stage D Chromium, production
build, management validation and Git diff check. Formal evidence is
`test-results/task-maint-006-stage-d-outreach-email-1440x900.png`, CSS viewport
`1440 × 900`, screenshot `1440 × 1445`. Human visual review remains pending.
