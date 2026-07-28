# Implementation Roadmap

## Purpose

This roadmap defines the planned delivery sequence for mi-goTo Frontend. It is
not evidence that any phase has started or completed. Entry to a downstream
phase requires the preceding gate and recorded human approval.

## Sequence

| Order | Phase | Planned outcome | Why it depends on the previous phase |
| --- | --- | --- | --- |
| 1 | Phase 0: Project Audit | Verify sources, constraints, risks, owners, and Phase 1 readiness | Governance must identify what is authoritative before implementation decisions |
| 2 | Phase 1: Vue Foundation | Establish approved Vue tooling, application shell, boundaries, and quality commands | Foundation choices must use audited requirements and constraints |
| 3 | Phase 2: Design Tokens | Translate approved Figma foundations into code-ready tokens | Tokens need the approved toolchain and storage strategy from Phase 1 |
| 4 | Phase 3: Core Components | Build accessible primitives using Tokens only | Core appearance and APIs require stable approved tokens |
| 5 | Phase 4A: Composite Components | Compose reusable patterns from Core | Composite patterns must reuse approved Core primitives |
| 6 | Phase 4B: Product Components | Build mi-goTo domain components from Core and Composite | Product UI depends on stable reusable patterns and approved interactions |
| 7 | Phase 4C: Sections | Assemble page-ready regions from Core, Composite, and Product | Sections require stable product components and content structure |
| 8 | Phase 5: Routing and Page Interaction Map | Define routes, links, CTAs, state transitions, and form flows | Interaction design must reference available Sections and product behavior |
| 9 | Phase 6A: Landing Page | Assemble the static Landing Page | Pages require approved routing, interactions, Sections, and content |
| 10 | Phase 6B: Contact Page | Assemble the static Contact Page and non-live form states | Contact must use the established page/layout and interaction patterns |
| 11 | Phase 6C: Data Protection Page | Assemble approved legal content | Legal pages require the established page shell and approved legal copy |
| 12 | Phase 6D: Imprint Page | Assemble approved imprint content | It reuses the approved legal/page patterns from preceding static work |
| 13 | Phase 6E: Why mi-goTo Page | Assemble the product-value page | It reuses approved page, Section, content, and navigation patterns |
| 14 | Phase 6F: Thank You Page | Implement the confirmed successful-submission destination | It depends on approved Contact success behavior, route infrastructure, and shared chrome |
| 15 | Phase 7: Backend Integration | Integrate the verified lead contract and runtime states | Integration is isolated until static UI and interaction intent are stable |
| 16 | Phase 8: QA and Deployment | Verify, release, deploy, monitor, and recover | QA must test the complete compatible application and backend integration |

## Gate rule

Written implementation alone does not open the next phase. The predecessor must
meet its acceptance criteria, complete required validation, update affected
registries, review compatibility, and record human approval. Exceptions require
an approved change request or architecture decision.

## Current position

- Phase 0 through Phase 8: completed and human-approved.
- Current project status: `production_maintenance`
- Current release: `REL-FE-0.2.0`
- Maintenance line: `0.2.x`
- Next task pattern: `TASK-MAINT-NNN`
- Next gate: Maintenance Change Review
