# Account Intelligence API Integration — Initial Evidence

Contract revision 2 (`API-CONTRACT-R2`) is authorized by Tom. Frontend
documentation now includes the four Account Intelligence GET operations and
the runtime configuration supports `VITE_DEMO_DATA_SOURCE=fixtures|api`.

The existing fixture mode remains the default. Page 13 has explicit API loading,
error and API-derived collection behavior. Pages 14–15 API data service and DTO
boundaries are established for subsequent page wiring review. Pages 16–18
remain fixture/local by explicit scope. Page 13 API loading/error and API-derived
collection behavior is wired; Pages 14–15 service/DTO boundaries are present but
page-level API integration is not yet complete, so this task remains partial.

Typecheck and management validation passed. Human review remains pending; no
release or deployment is authorized.
