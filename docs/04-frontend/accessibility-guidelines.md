# Accessibility Guidelines

## Status

These are baseline planning requirements. The conformance target, supported
assistive technologies, and reviewer require human approval.

## Core requirements

- Use semantic HTML before ARIA.
- Ensure all interactive behavior is keyboard operable.
- Provide visible focus and logical focus order.
- Give controls accessible names, roles, states, and relationships.
- Preserve meaningful heading hierarchy and landmarks.
- Provide text alternatives for meaningful images.
- Do not use color alone to convey meaning.
- Validate contrast against the approved target.
- Support text resizing, zoom, reflow, and responsive viewports.
- Respect reduced-motion preferences and avoid harmful flashing.
- Announce asynchronous status, validation, and submission results.
- Use correct page language and localized metadata.

## Navigation and anchors

- Provide skip navigation where applicable.
- Mobile navigation must expose state and restore focus.
- `/#problem`, `/#solution`, and `/#packages` must move focus predictably and
  account for sticky navigation.
- Smooth scrolling must respect reduced motion.
- Current route and language must be programmatically identifiable.

## Forms

- Every field requires a persistent programmatic label.
- Required, format, and consent rules must be understandable.
- Errors must identify the problem and recovery action.
- Error messages must be associated with their fields.
- Submission state must not trap focus or permit accidental duplicates.
- Success and failure behavior require predictable focus placement.

## Testing

Accessibility requirements belong in component/Page acceptance criteria and
tests. Automation is necessary but insufficient; keyboard, screen reader,
zoom/reflow, contrast, motion, and visual focus require human evidence.

## Decisions required

- Accessibility standard and level
- Browser, OS, screen reader, and device matrix
- Target size, zoom, reflow, and viewport expectations
- Motion and reduced-motion behavior
- Accessibility reviewer and exception process
- Automated and manual test tools

