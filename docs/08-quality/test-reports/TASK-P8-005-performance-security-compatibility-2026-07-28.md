# TASK-P8-005 Performance, Security, Privacy and Compatibility

## Performance

The production build succeeded. Output is 396 KiB on disk. Largest generated
JavaScript chunk is 96.35 kB (37.42 kB gzip); largest Page JavaScript chunk is
35.16 kB (9.79 kB gzip); the logo asset is 15.32 kB. No source maps were
emitted. Route chunks demonstrate lazy loading.

Lighthouse, LCP, CLS and INP were not run because the repository has no
approved performance tool or budget. No real-user performance claim is made.

## Security and privacy

- Blank production RC configuration was used; no production API URL was
  guessed.
- No `.idea`, `.DS_Store`, source map, test file or local absolute path was
  found in `dist`.
- No configured owner ID, example personal email or HubSpot contact ID was
  found as a value in the build.
- The Contact build exposes only public `VITE_*` configuration keys and fails
  safely when the API URL is absent.
- Production dependency audit: zero vulnerabilities.
- Full dependency audit: nine high-severity findings, all in development
  tooling; human risk disposition is pending.
- No live personal lead data or production credential was used.

## Backend compatibility

Mocked tests confirm `API-CONTRACT-R1`: `POST /api/lead`, exact required fields,
optional blank-owner omission, 200 mapping, 400/500/502 handling, no automatic
retry, pending duplicate prevention, `/thank-you` success, `/contact` failure,
and privacy-safe navigation/logging.

Backend semantic version remains `0.0.0` and unverified. Compatibility baseline
`DS1.1.0_API0.0.0_FE0.2.0` remains provisional. Live smoke test:
`not_run_environment_unavailable`.
