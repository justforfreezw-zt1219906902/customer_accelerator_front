# Change Control

## Purpose

Change control separates requested changes, implementation defects, intentional
design differences, production failures, durable architecture decisions, and AI
task evidence. Choose the record type based on the event, not its urgency.

## Classification rules

### Change Request

Use when an existing implementation may be correct against current sources, but
a human wants a changed requirement or design.

Examples:

- Hero message should be stronger.
- A new Page must be added.
- Contact form needs a new field.
- Figma changed a component layout.

Create `CR-YYYY-NNN` under `change-requests/`. A Change Request must identify
the current and requested state, source owners, impact, compatibility,
acceptance criteria, migration, and human decision.

### Issue

Use when implementation fails an existing requirement.

Examples:

- Navbar overlaps on mobile.
- Button does not use the correct token.
- Form payload field is wrong.
- Route is broken.

Create `ISSUE-YYYY-NNN` under `issues/`. Link the failing requirement, expected
and actual behavior, evidence, severity, owner, and verification.

### Deviation

Use when code intentionally differs from approved Figma.

Examples:

- Browser performance requires reduced blur.
- Accessibility requires a larger click target.
- Responsive behavior needs a code-specific adjustment.

Create `DEV-YYYY-NNN` using the deviation template and add it to
`deviation-log.md`. Every deviation must include:

- reason;
- affected Figma version;
- affected Frontend version;
- approval; and
- review date.

Unknown or uninspected Figma information is not a deviation.

### Incident

Use only for a production or major operational failure.

Examples:

- All production form submissions fail.
- Deployment serves a blank Page.
- Personal data is accidentally logged.

Create `INC-YYYY-NNN` under `incidents/`. Preserve the timeline, impact,
containment, recovery, communication, evidence, and follow-up actions.

### Architecture Decision

Use `ADR-NNN` for a durable technical decision involving context, alternatives,
trade-offs, consequences, and migration. Do not use an ADR for a transient task
or a defect.

### AI Instruction Record

Every important Codex or Claude task must record:

- task ID;
- date;
- tool;
- operator;
- starting baseline;
- files read;
- full prompt or prompt reference;
- permitted scope;
- prohibited scope;
- files created;
- files modified;
- files preserved;
- validation;
- errors;
- human review; and
- Git commit.

Store instruction records under `instructions/`.

## Decision guide

| Question | Record |
| --- | --- |
| Is a human asking to change a currently correct requirement/design? | Change Request |
| Does implementation fail an existing requirement? | Issue |
| Is code intentionally different from approved Figma? | Deviation |
| Is this a production or major operational failure? | Incident |
| Is this a durable technical choice among alternatives? | ADR |
| Is this an important AI-assisted task? | AI Instruction Record |

One event may require linked records—for example, an Incident can reveal an
Issue and lead to an ADR—but each record keeps its own responsibility.

## Approval

AI agents may create or update records but cannot approve them. Approval must
identify the human, scope, date, decision, and conditions.

