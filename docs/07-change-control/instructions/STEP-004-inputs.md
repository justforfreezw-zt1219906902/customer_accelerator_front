# STEP-004: Input Registries

## Task purpose

Register known and unknown Phase 0 inputs for Figma, backend, content, assets,
environments, assumptions, constraints, and required human decisions.

## Input files read

- `AGENTS.md`
- `VERSION.yaml`
- `docs/phases/phase-0-project-audit.md`
- `docs/01-roadmap/current-state.yaml`
- `docs/00-governance/source-of-truth-policy.md`
- Existing `docs/02-inputs/` contents (directory was empty)
- Current Git status

## Files created

- `docs/02-inputs/figma-source-map.yaml`
- `docs/02-inputs/backend-source-map.yaml`
- `docs/02-inputs/content-inventory.yaml`
- `docs/02-inputs/asset-inventory.yaml`
- `docs/02-inputs/environment-inputs.md`
- `docs/02-inputs/assumptions-and-constraints.md`
- `docs/07-change-control/instructions/STEP-004-inputs.md`

## Files modified

- `CHANGELOG.md` — recorded the Phase 0 input registries.

## Existing content preserved

- Governance and roadmap documentation
- Phase 0 status and approval state
- Previous instruction records
- Existing `.idea/workspace.xml` changes outside task scope

## Registered unknowns

- Figma node IDs, inspection state, reviewer, and review dates
- Official backend semantic version, owner, OpenAPI verification, and production URL
- API schemas, status codes, authentication, errors, and runtime constraints
- Content, translation, legal, and asset ownership and source material
- Asset paths, formats, licenses, and production suitability
- Chinese locale standardization
- Environment, hosting, privacy, monitoring, and recovery decisions

## Validation

- Parsed all four YAML registries successfully.
- Compared Figma and backend compatibility values with `VERSION.yaml`.
- Confirmed eleven Figma page records contain required fields, `unknown` node
  IDs, and `pending_inspection` status.
- Confirmed eight content items and Header/Footer
  `preservation_required: true`.
- Confirmed seven asset categories contain empty item lists and no invented paths.
- Verified no application code or wrapper directory was created.
- Checked whitespace and final Git status; STEP-004 changes remain uncommitted.

## Human approval

**pending**
