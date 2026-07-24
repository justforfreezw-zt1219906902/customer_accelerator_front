# Assumptions and Constraints

## Confirmed facts

- The repository root is the existing `customer_accelerator_front` Git root.
- The project is mi-goTo Frontend and is currently in Phase 0 planning.
- The Phase 0 audit has not been executed.
- Figma Design System version `1.0.0` is the initialized project input.
- The backend is a Go backend.
- The local backend base URL is `http://localhost:8080`.
- `POST /api/lead` is the known conversion endpoint.
- Backend contract revision is `1`.
- The official backend semantic version has not been supplied.
- The planned OpenAPI destination is `docs/05-backend/openapi.yaml`.
- EN, DE, and CN content variants must be tracked.
- Header and Footer content require preservation.
- No Vue application code exists.

## Assumptions

- The listed Figma pages represent the intended design-to-code structure.
- The supplied Figma `1.0.0` value is suitable for planning but not yet visual
  approval.
- Planned `src/` paths are implementation targets, not existing files.
- Local integration will run the Go backend separately.
- Locked legal content may change only after authorized legal review.
- Staging and production will use environment-specific API URLs.

Assumptions are not implementation requirements until the responsible human
owner confirms them.

## Unknowns

- Figma page node IDs, exact page names, modes, variants, responsive coverage,
  reviewer, and last-reviewed dates
- Whether Figma `1.0.0` is formally assigned and implementation-ready
- Backend owner, official API version, authoritative OpenAPI status, staging URL,
  production URL, and deployment availability
- Request/response schemas, status codes, authentication, errors, CORS, rate
  limits, timeouts, retries, privacy, and security requirements
- Content owners, source locations, approved copy, and translation state
- Whether `CN` means `zh-CN` or another locale
- Asset files, paths, owners, licenses, formats, and production suitability
- Hosting, CI/CD, secret management, consent, analytics, monitoring, support,
  incident, and recovery ownership
- Browser, device, accessibility, performance, and SEO baselines

## Constraints

- Figma controls visuals, not backend contracts or behavior.
- Product and Interaction Specifications control routes and behavior.
- OpenAPI controls backend contracts.
- Content configuration controls copy and translations.
- Tests provide evidence; humans provide approval.
- No Vue code may be created during Phase 0 input registration.
- Unknown inputs must not be inferred.
- Figma node IDs and nonexistent asset paths must not be invented.
- `VITE_*` values are browser-visible and cannot contain secrets.
- Backend `0.0.0` is a compatibility placeholder, not a release.
- Contract revision `1` is not semantic version `1.0.0`.
- No phase may be marked approved without human evidence.

## Decisions required

- Confirm Figma pages, node IDs, semantic version, and design reviewer.
- Assign the backend owner and official backend semantic version.
- Confirm the OpenAPI file and environment URLs.
- Confirm whether `VITE_HUBSPOT_OWNER_ID` may be public.
- Assign content, translation, asset, and legal owners.
- Approve copy, legal content, and translation workflow.
- Standardize the Chinese locale tag.
- Inventory and license all assets and fonts.
- Choose hosting, CI/CD, secret management, consent, analytics, monitoring,
  incident, and recovery processes.
- Approve browser/device support, accessibility target, performance budgets, and
  SEO requirements.

