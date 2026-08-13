# Account Intelligence API Integration — Initial Evidence

Contract revision 2 (`API-CONTRACT-R2`) is authorized by Tom. Frontend
documentation now includes the four Account Intelligence GET operations and
the runtime configuration supports `VITE_DEMO_DATA_SOURCE=fixtures|api`.

The existing fixture mode remains the default. Page 13 has explicit API loading,
error and API-derived collection behavior. Pages 14–15 API data service and DTO
boundaries are established for subsequent page wiring review. Pages 16–18
remain fixture/local by explicit scope. Pages 13–15 now have explicit API-mode
rendering boundaries with no fixture fallback: Page 13 derives metrics and
truthful unavailable values, Page 14 renders account detail and signals, and
Page 15 renders supported DNA collections and nullable states.

Typecheck, lint, focused parser tests, fixture regressions, production build and
management validation passed. The host-side browser smoke was completed by Tom
and passed for Pages 13–15, including API account list, detail, signals, DNA,
UUID navigation, CORS communication, and nullable/data states. The earlier
Codex-shell inability to reach localhost:8080 is recorded as execution-
environment network isolation. Human acceptance: APPROVED by Tom on
2026-08-14. No release or deployment is authorized.
