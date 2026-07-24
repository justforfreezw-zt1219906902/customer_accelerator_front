# Versioning Policy

## Semantic version format

Machine-readable versions use:

```text
MAJOR.MINOR.PATCH
```

- **MAJOR:** breaking or incompatible change
- **MINOR:** compatible new functionality
- **PATCH:** compatible correction

Figma Design System, Backend API, and Frontend App versions are maintained
independently by their responsible owners.

## Figma Design System

### Figma MAJOR

- destructive token changes;
- renamed or removed component properties;
- deleted components required by existing pages; or
- major page architecture changes.

### Figma MINOR

- new page;
- new component;
- new compatible variant; or
- new token.

### Figma PATCH

- spacing adjustment;
- copy correction;
- visual polish; or
- non-breaking token value correction.

The design reviewer owns version confirmation and visual approval.

## Backend API

### Backend MAJOR

- removed or renamed endpoint;
- incompatible request or response field change;
- incompatible type, authentication, status, or error change; or
- behavior change that breaks existing clients.

### Backend MINOR

- new compatible endpoint;
- new optional request or response field;
- new compatible response or error capability; or
- compatible authentication capability.

### Backend PATCH

- contract clarification;
- documentation correction;
- compatible validation or error correction; or
- non-breaking implementation correction.

The backend owner assigns the official semantic version. Contract revision `1`
is not semantic version `1.0.0`. Until a version is supplied,
`backend_api: 0.0.0` remains a non-release placeholder with status
`contract_documented_version_unassigned`.

## Frontend App

### Frontend MAJOR

- incompatible route or public behavior change;
- removal of supported functionality;
- incompatible content/configuration contract change; or
- dropping a supported environment without an approved migration.

### Frontend MINOR

- new compatible page, route, feature, component capability, or integration; or
- compatible user-facing functionality.

### Frontend PATCH

- compatible bug, accessibility, content, styling, performance, or
  implementation correction.

Documentation-only changes do not automatically change the Frontend App version
unless they are included in a published app release policy.

## Compatibility ID

Machine-readable compatibility records use:

```text
DS<figma-version>_API<backend-version>_FE<frontend-version>
```

Example:

```text
DS1.1.0_API2.2.0_FE1.0.0
```

An optional human-readable compatibility alias is supported:

```text
figma1.01_backend2.02
```

The human-readable alias is informational and does not replace semantic
versions in `VERSION.yaml`, traceability, automation, or release manifests.

## Version-change workflow

1. Identify the owning source and classify compatibility impact.
2. Obtain the authoritative version from its human owner.
3. Record affected requirements, mappings, contracts, tests, and consumers.
4. Update the source version and compatibility ID together.
5. Add migration guidance for breaking changes.
6. Run applicable validation.
7. Update the changelog and release records.
8. Record human approval.

