# Issues

Use this directory for `ISSUE-YYYY-NNN` records when implementation fails an
existing approved requirement.

Use `docs/templates/issue-template.md`. Link requirements, expected and actual
behavior, reproducible evidence, severity, fix, tests, and human verification.

Recorded Issues:

- `ISSUE-2026-001` — resolved Phase 5B approval gate; retained as historical
  evidence.
- `ISSUE-2026-002` — resolved Phase 6A Landing content approval gate; retained
  as historical evidence.
- `ISSUE-2026-003` — resolved Phase 6A visual-fidelity failure. Fixes under
  `TASK-P4A-002` and `TASK-P6A-006` passed automated, Chromium, and Tom's final
  browser/Figma review on 2026-07-27; retained as historical evidence.
- `ISSUE-2026-004` — resolved Phase 6C legal-content Gate through Tom's
  explicit Product Owner override and risk acceptance on 2026-07-28; retained
  as historical evidence. Professional legal review remains deferred.
- `ISSUE-2026-005` — resolved Phase 6D legal-content Gate through Tom's
  explicit Product Owner content approval and risk acceptance on 2026-07-28;
  retained as historical evidence. Professional legal review remains deferred.
- `ISSUE-2026-006` — resolved Phase 8 Release Candidate entry Gate through
  Tom's final visual approval and exact source freeze under `TASK-P8-004`.
- `ISSUE-2026-007` — shared Header logo sharpness, background and Home-link
  defect; corrected by `TASK-P8-002` and approved by Tom.
- `ISSUE-2026-008` — Packages card and CTA alignment defect; corrected by
  `TASK-P8-002` and approved by Tom.
- `ISSUE-2026-009` — Footer logo rendering, transparent background and Home
  navigation defect; corrected by `TASK-P8-003` and approved by Tom.
- `ISSUE-2026-010` — open blocking RC reproducibility failure: the frozen
  clean checkout omits four required empty directories, causing documentation
  and management validation to fail. Planned remediation: `TASK-P8-006`.
