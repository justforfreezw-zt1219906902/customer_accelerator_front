# Production Maintenance Policy

Release `REL-FE-0.2.0` starts the `0.2.x` maintenance line.

- Small backwards-compatible production fix: `0.2.0` → `0.2.1`
- Next small fix: `0.2.1` → `0.2.2`
- New backwards-compatible feature: evaluate `0.3.0`
- Breaking change: evaluate `1.0.0` or the next appropriate major version

New work uses IDs such as `TASK-MAINT-001`. Every maintenance task records its
reason, affected files, validation, human approval, release version and
production Git commit. Application changes must not leave the released version
unchanged. A full Phase 0–8 cycle is not required for each patch, but applicable
source-of-truth, test, privacy, compatibility and release gates still apply.

The next Gate is `Maintenance Change Review`.
