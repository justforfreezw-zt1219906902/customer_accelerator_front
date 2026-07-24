# Project Charter

## Project identity

- Project: **mi-goTo Frontend**
- Product: **mi-goTo**
- Current maturity: governance initialization and Phase 0 planning
- Current phase: **Phase 0 — Project Audit**
- Phase status: `planned`
- Human approval: `pending`

## Product purpose

mi-goTo is an AI-powered B2B customer intelligence and account-based marketing
(ABM) platform. The frontend will communicate the product's value, support lead
conversion, and provide approved interfaces for future customer-intelligence
and ABM capabilities.

## Target users

- B2B marketing and demand-generation teams
- Account-based marketing practitioners
- Sales and business-development teams
- Revenue operations and go-to-market leaders
- Prospective customers evaluating mi-goTo
- Internal product, support, and operational stakeholders

Detailed personas, authenticated roles, permissions, and prioritized user needs
remain Phase 0 inputs requiring product-owner confirmation.

## Business objective

Establish a trustworthy, accessible, maintainable frontend that converts
qualified visitors into leads and can evolve into the approved mi-goTo product
experience. Conversion, quality, accessibility, performance, and operational
success measures must be defined and approved before they are used as release
criteria.

## Current scope

- Governance, source-of-truth, ownership, versioning, and change-control records
- Project audit and readiness assessment
- Future Vue foundation and validation tooling
- Figma-aligned design tokens and layered components
- Routes, interactions, static pages, and content architecture
- OpenAPI-governed backend integration
- Quality assurance, release, deployment, and operational readiness

During Phase 0, work is limited to audit and documentation. Application
implementation is not authorized.

## Out of scope

Until separately specified and approved:

- Backend or HubSpot implementation changes
- Invention or modification of backend contracts
- Unapproved changes to Figma
- Native mobile or desktop applications
- Unspecified authenticated workflows
- Unapproved analytics, tracking, consent, CRM, or marketing automation
- Final legal content, copy, or translations without an authoritative owner
- Production deployment or claims of production readiness
- Approval performed or implied by an AI assistant

## Design direction

The supplied Figma Design System is the visual foundation. It controls visual
hierarchy, tokens, component appearance, section and page layout, and responsive
design intent. Implementation must preserve a reusable layered system rather
than copying page-specific styling.

Figma must be audited for completeness, accessibility implications, responsive
states, implementation feasibility, and version ownership. No visual approval
is recorded by this charter.

## Primary conversion flow

```text
Landing Page
→ Contact Page
→ POST /api/lead
→ Backend, HubSpot and email processing
→ Thank You Page
```

This is a product intent. Product and interaction specifications must define
CTA, form, loading, success, error, retry, duplicate-submission, privacy, and
navigation behavior. OpenAPI must define the endpoint contract.

## Known technical constraints

- Vue application code has not been initialized.
- Phase 0 must assess readiness before Phase 1 begins.
- Figma, interaction specifications, OpenAPI, content, code, and tests have
  independent authority.
- The backend contract is documented, but its official semantic version is
  unassigned.
- `backend_api: 0.0.0` is a compatibility placeholder, not a backend release.
- `VITE_*` configuration is client-visible and must not contain secrets.
- Browser, device, accessibility, localization, analytics, hosting, CI/CD,
  security, privacy, and performance requirements remain unconfirmed.

## Known backend integration

- Backend implementation technology: not yet recorded in this charter
- Known operation: `POST /api/lead`
- Processing intent: backend, HubSpot, and email processing
- Backend contract revision: `1`
- Official backend semantic version: unassigned
- Authentication, request schema, response schema, errors, rate limits, CORS,
  timeout, retry, and production URL: require authoritative contract review

## Current project maturity

The repository has a governance bootstrap, a planned Phase 0 document, and an
initial compatibility baseline. The audit has not been executed, frontend
implementation has not started, and no phase or deliverable is approved.

## Open charter questions

- Which personas and conversion outcomes have highest priority?
- What measurable business and product outcomes define success?
- Who owns product, design, backend, content, legal, quality, security, and
  operations decisions?
- Where are interaction specifications and the authoritative OpenAPI document?
- What are the browser, accessibility, localization, privacy, performance,
  analytics, hosting, support, and release requirements?

