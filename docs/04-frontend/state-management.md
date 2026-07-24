# State Management

## Principle

Global state must not be introduced unless a documented requirement justifies
it. Use the narrowest state scope that supports approved behavior.

## Local component state

Use for transient presentation behavior owned by one component, such as:

- open or closed state;
- focus or hover-related presentation;
- locally selected visual option; and
- component-specific pending feedback.

It must not duplicate router, content, or backend state.

## Form state

Own Contact form values, validation, submission state, and errors at the Contact
feature/Page boundary. Persistence, clearing, duplicate prevention, retry, and
privacy rules are `decision_required`.

Expected lifecycle categories are provisional:

- idle;
- validating;
- submitting;
- success; and
- failure.

## Language state

Language selection may require shared state, but storage and URL behavior remain
`decision_required`. It must coordinate with content, document language,
metadata, routing, fallback, and consent requirements.

## Application-wide state

Introduce shared state only for requirements that genuinely span independent
features and cannot be represented by:

- the router;
- content configuration;
- immutable environment configuration;
- component/feature ownership; or
- API responses.

Any global state package requires a Phase 1 architecture decision, ownership
rules, persistence/privacy review, and tests.

## Decisions required

- Whether any global state package is needed
- Language storage and URL strategy
- Form persistence across route or language changes
- Analytics and consent ownership
- Server data caching
- Reset and recovery behavior

