# TASK-P7-001 Backend Integration Test Report

## Scope

- Contract identifier: `API-CONTRACT-R1`
- OpenAPI: `docs/05-backend/openapi.yaml`
- Contract revision: `1`
- Backend semantic version: `0.0.0` (`contract_documented_version_unassigned`)
- Frontend version: `0.2.0`
- Compatibility baseline: `DS1.1.0_API0.0.0_FE0.2.0`
- Environment: local mocked browser integration

## Results

| Check | Result |
| --- | --- |
| Version validation | 12 passed, 0 failed |
| Documentation validation | 119 passed, 0 failed |
| Compatibility validation | 19 passed, 0 failed |
| Registry validation | 61 passed, 0 failed |
| OpenAPI validation | 21 passed, 0 failed |
| Management validation | 5 suites passed, 0 failed |
| Targeted Prettier check | passed |
| Typecheck | passed |
| ESLint | passed |
| Unit/component/integration tests | 112 passed, 0 failed |
| Phase 7 Chromium tests | 3 passed, 0 failed |
| Full Chromium regression | 21 passed, 0 failed |
| Production build | passed |
| Live backend smoke test | `not_run_backend_unavailable` |

## Contract evidence

- Exact `POST http://localhost:8080/api/lead` mapping was verified with mocked
  network interception.
- Required fields are included and no unsupported fields are sent.
- Blank owner is omitted and owner is not rendered as an input.
- A valid confirmed response navigates with router `replace` to `/thank-you`.
- Malformed success does not navigate.
- 400, 500, 502, unexpected status, malformed/empty response, network failure,
  configuration failure and cancellation have stable safe categories.
- Automatic retry is disabled; one active request is permitted.
- No numeric timeout was introduced because `INT-015` explicitly defers it.
- No lead values or HubSpot contact ID enter the URL, browser storage or UI.

## Recorded transient failures

- The first production build exposed a preserved `publicEnvironment` export
  dependency. The approved configuration module was corrected without creating
  a duplicate, and the final build passed.
- The first full Chromium run had one ambiguous test selector. The selector was
  scoped to the form summary; the targeted rerun passed 3/3 and the final full
  run passed 21/21.
- The sandbox initially prevented binding the preview port. The approved local
  browser-test permission was used; this was an execution-environment issue,
  not an application failure.

## Review state

Implementation evidence is complete and awaiting human review. Phase 7 and
`TASK-P7-001` are `needs_review`; no approval is inferred.
