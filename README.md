# mi-goTo Frontend

Frontend repository for **mi-goTo**, an AI-powered B2B customer intelligence
and account-based marketing (ABM) platform.

The project is currently in planning at **Phase 0: Project Audit**. This
repository contains the governance and documentation baseline only; Vue
application code has not been initialized.

## Sources of truth

- Visual hierarchy, tokens, appearance, and responsive intent:
  [Figma design](https://www.figma.com/design/vyr3TvF5lAUOnuuxdW8iRb/prototype?node-id=0-1&p=f&t=AdHvWZgIn8DrsmI6-0)
- Project phase, versions, and compatibility: [`VERSION.yaml`](VERSION.yaml)
- AI and contributor rules: [`AGENTS.md`](AGENTS.md)
- Phase scope and gates: [`docs/phases/`](docs/phases/)
- Backend contracts: OpenAPI documentation under `docs/05-backend/`
- Product behavior: approved product and interaction specifications
- Implementation correctness: tests and human-reviewed evidence

These sources have independent authority. Figma does not define API contracts
or application behavior by itself.

## Development phases

1. Phase 0: Project Audit
2. Phase 1: Vue Foundation
3. Phase 2: Design Tokens
4. Phase 3: Core Components
5. Phase 4: Composite + Product + Section Components
6. Phase 5: Routing + Page Interaction Map
7. Phase 6: Static Pages Implementation
8. Phase 7: Backend Integration
9. Phase 8: QA + Deployment

## Environment

Copy `.env.example` into the local environment file chosen by the future
toolchain. Never commit secrets. Variables prefixed with `VITE_` are exposed to
browser-delivered code and must be treated as public.

## Documentation

See [`docs/README.md`](docs/README.md) for the documentation structure and
record-keeping responsibilities.

## Current limitations

- The Phase 0 audit has not been executed.
- The backend contract is known, but its official semantic version is unassigned.
- No work is approved until a human approval record exists.
- No Vue application code exists.

