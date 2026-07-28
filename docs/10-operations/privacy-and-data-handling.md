# Privacy and Data Handling

## Data in the lead flow

Confirmed request fields:

- first name;
- family name;
- company;
- work email; and
- optional owner identifier.

The backend may return a HubSpot contact ID. These values require appropriate
privacy classification and handling.

## Principles

- Collect only contract-required and product-approved data.
- Provide approved notice and consent where required.
- Do not store lead data in browser persistence unless explicitly approved.
- Do not put personal data in URLs, logs, analytics, screenshots, test fixtures,
  or instruction records.
- Use safe non-production test data.
- Send data only to the approved backend origin.
- Backend, HubSpot, and email processing require documented purpose, retention,
  access, deletion, and incident procedures.

## Frontend

- Client validation supports UX but does not create additional collection.
- Clear or preserve form data only according to approved interactions/privacy.
- VITE variables cannot contain private credentials.
- Error messages must not expose backend internals or other personal data.
- `TASK-P7-001` keeps form values only in component memory, omits blank owner,
  uses no browser storage, and never places lead or HubSpot values in the URL.
- The Thank You Page remains directly accessible and does not receive or render
  submitted personal data.

## Production Incident

Accidental personal-data logging or disclosure is an Incident. Contain access,
preserve appropriate evidence without copying exposed data, notify the
security/privacy owner, assess obligations, remediate, and document human
closure.

## Decisions required

- Data controller/processor roles
- Legal basis, notice, and consent
- Data retention, deletion, and subject-request workflow
- HubSpot/email subprocessors and regions
- Access controls and audit
- Test-data policy
- Security/privacy owner and incident notification requirements
