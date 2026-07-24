# Error Handling

## Principles

- Preserve a safe and understandable user path.
- Distinguish validation, network, timeout, backend, route, configuration, and
  unexpected failures.
- Never expose secrets, stack traces, raw backend payloads, or personal data.
- Make errors accessible, actionable, observable, localized, and testable.
- Follow OpenAPI for backend errors and interaction specifications for user
  behavior.

## Planned error classes

| Class | Required treatment |
| --- | --- |
| Client validation | Associate approved messages with fields and provide recovery |
| Network | Explain connection failure without claiming backend rejection |
| Timeout | Prevent duplicates and offer specified recovery |
| Backend contract | Map documented status/error to approved user behavior |
| Rate limit | Follow authoritative retry guidance |
| Route | Use approved not-found and recovery behavior |
| Content/configuration | Fail predictably; never target an unsafe environment |
| Unexpected runtime | Provide a safe fallback and sanitized telemetry if approved |

## Contact submission

The UI must distinguish validation failure, in-progress, backend rejection,
transport failure, timeout, and success. `/thank-you` navigation occurs only
after the approved success condition. Exact mappings are `decision_required`
until OpenAPI and interaction specifications are reviewed.

## Logging and privacy

Lead fields, secrets, tokens, and sensitive identifiers must not enter client
logs or analytics. Logging, redaction, retention, monitoring, and incident
ownership remain unresolved.

## Decisions required

- OpenAPI error schemas and status mappings
- Localized user messages
- Timeout and retry limits
- Duplicate-submission behavior
- Not-found and fatal-error Pages
- Telemetry, monitoring, retention, and incident ownership

