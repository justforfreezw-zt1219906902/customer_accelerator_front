# Security Checklist

## Frontend secrets and configuration

- [ ] No secrets exist in frontend code, assets, configuration, or source maps
- [ ] `VITE_*` variables are treated as public
- [ ] No HubSpot private token or credential is stored in frontend variables
- [ ] Environment configuration is validated and cannot silently target the wrong environment

## Input and output safety

- [ ] Client validation mirrors confirmed contract requirements
- [ ] Backend validation remains authoritative
- [ ] Error display is safe and localized
- [ ] Backend stack traces and raw internal errors are never shown
- [ ] HTML/content rendering prevents injection
- [ ] Safe external links use approved destination and opener/referrer behavior

## Data and logging

- [ ] No personal lead data appears in production client logs
- [ ] Complete lead payloads are not logged
- [ ] Analytics and telemetry follow consent and privacy decisions
- [ ] Retention and redaction policies are approved

## Dependencies and browser policy

- [ ] Dependency audit tool and cadence selected
- [ ] Known vulnerabilities assessed before release
- [ ] Lockfile and dependency provenance reviewed
- [ ] Content Security Policy decision recorded
- [ ] Other required security headers and hosting controls reviewed

## Backend boundary

- [ ] CORS validated for each approved environment
- [ ] Authentication/anonymous-access decision recorded
- [ ] Rate limit, spam, and bot protection decisions recorded
- [ ] Timeout, retry, and duplicate-submission behavior reviewed
- [ ] API contract version and compatibility baseline confirmed

## Evidence

- [ ] Findings recorded as Issues or security Incidents where applicable
- [ ] Exceptions time-bounded and human-approved
- [ ] Security/privacy owner review recorded

