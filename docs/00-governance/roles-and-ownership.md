# Roles and Ownership

## Responsibility matrix

| Role | Responsibilities | Approval authority |
| --- | --- | --- |
| **Design reviewer / colleague** | Review Foundation, Tokens, Core, and Composite Components for visual fidelity, responsive intent, and applicable accessibility considerations | Visual approval for Foundation, Tokens, Core, and Composite Components |
| **Product owner / Tom** | Own Product Components, Sections, Pages, content, interactions, backend integration priorities, phase acceptance, and releases | Product, content, interaction, integration, phase, and release approval |
| **Codex / Claude** | Assist with inspection, analysis, documentation, implementation, testing, traceability, and reporting | None; implementation assistant, never an approval authority |
| **Backend owner** | Own backend contracts, backend behavior, OpenAPI, official API versions, authentication, responses, and errors | Backend contract, behavior, and API-version approval |

## Decision boundaries

- Figma cannot redefine backend contracts or interaction behavior.
- Backend implementation cannot redefine product or visual intent by itself.
- Product ownership does not convert AI-generated output into approval without
  an identifiable human record.
- Design approval for visual layers does not approve backend integration.
- AI assistants may recommend or implement changes but may not approve,
  impersonate reviewers, or change `pending` to `approved`.

## Required approval record

Every approval must identify:

- human reviewer and role;
- artifact, version, and scope;
- decision and conditions;
- date and evidence;
- unresolved items or expiry, where applicable.

## Escalation

Conflicts are routed to owners of each controlling concern. A task pauses when a
missing decision would require inventing design intent, product behavior,
backend contracts, content, acceptance criteria, or approval.

## Ownership still unresolved

- Name of the design reviewer referred to as “colleague”
- Name of the backend owner
- Content and translation owner
- Legal, accessibility, quality, security/privacy, and operations owners
- Backup approvers and absence procedure

