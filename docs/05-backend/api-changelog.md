# Backend Contract Changelog

Contract revisions document known contract changes. They do not assign a
Backend API semantic version.

## Backend Contract Revision 1 — 2026-07-24

### Added

- `POST /api/lead`
- JSON request fields `firstName`, `familyName`, `company`, `workEmail`, and
  optional `owner`
- Required non-empty validation for the four required fields
- Email-format validation for `workEmail`
- Success response with `message` and `hubspot_contact_id`
- Confirmed `400`, `500`, and `502` error responses
- Local server `http://localhost:8080`

### Changed

- None recorded.

### Deprecated

- None recorded.

### Removed

- None recorded.

### Breaking Changes

- None assessed because no earlier contract revision is registered.

### Migration Notes

- Frontend API integration has not started, so no code migration applies.
- Production URL, authentication, CORS, timeout, retry, and official semantic
  API version remain unresolved.

Official Backend API semantic version: **not supplied**

