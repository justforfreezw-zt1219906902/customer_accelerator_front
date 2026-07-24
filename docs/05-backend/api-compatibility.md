# API Compatibility Policy

## Purpose

Compatibility is assessed against consumers of the authoritative OpenAPI
contract. The backend owner assigns the resulting semantic version.

| Change | Default assessment | Reason and required action |
| --- | --- | --- |
| Added optional field | Compatible MINOR | Existing clients can omit it; document behavior and test tolerant responses |
| Added required field | Breaking MAJOR | Existing clients cannot satisfy the new request without changes |
| Renamed field | Breaking MAJOR | Equivalent to removing the old field and adding another unless an overlap migration exists |
| Removed field | Breaking MAJOR | Existing clients may send, read, or depend on it |
| Changed field type | Breaking MAJOR | Serialization, validation, and consumer types change |
| Changed status code | Potentially breaking; normally MAJOR | Clients may branch on exact HTTP outcomes; assess each consumer |
| Changed response shape | Breaking MAJOR unless strictly additive and optional | Required properties, nesting, or meaning can break parsing and behavior |

## Additional rules

- Adding an optional response field is normally compatible MINOR when clients
  are permitted to ignore unknown properties.
- Tightening validation may be breaking even without a schema-field change.
- Changing human-readable error text should not drive client logic, but may
  still affect UX, translation, and tests.
- A migration window can reduce operational risk but does not make an
  incompatible contract change semantically compatible.
- Contract revision numbers and semantic versions remain separate.

## Assessment record

Every change must record:

- old and new contract revisions;
- old and new semantic versions;
- affected operations and schemas;
- frontend mapping and behavior impact;
- test and migration evidence;
- rollback strategy; and
- backend-owner and consumer approval.

