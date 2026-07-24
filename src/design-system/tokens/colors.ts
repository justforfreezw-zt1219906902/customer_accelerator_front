export const colors = {
  background: {
    default: 'var(--color-bg-default)',
    surface: 'var(--color-bg-surface)',
    elevated: 'var(--color-bg-elevated)',
  },
  surface: {
    default: 'var(--color-surface-default)',
    elevated: 'var(--color-surface-elevated)',
  },
  card: {
    default: 'var(--color-card-default)',
    highlighted: 'var(--color-card-highlighted)',
  },
  border: {
    default: 'var(--color-border-default)',
    subtle: 'var(--color-border-subtle)',
    brand: 'var(--color-border-brand)',
    amber: 'var(--color-border-amber)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    muted: 'var(--color-text-muted)',
    inverse: 'var(--color-text-inverse)',
    onBrand: 'var(--color-text-on-brand)',
  },
  brand: {
    core: 'var(--color-brand-core)',
    light: 'var(--color-brand-light)',
    deep: 'var(--color-brand-deep)',
    tint50: 'var(--color-brand-tint-50)',
    tint200: 'var(--color-brand-tint-200)',
    tint900: 'var(--color-brand-tint-900)',
    primary: 'var(--color-brand-primary)',
  },
  accent: {
    amber: 'var(--color-accent-amber)',
    amberLight: 'var(--color-accent-amber-light)',
    amberDeep: 'var(--color-accent-amber-deep)',
  },
  state: {
    error: 'var(--color-state-error)',
    errorSubtle: 'var(--color-state-error-subtle)',
    disabled: 'var(--color-state-disabled)',
    success: 'var(--color-state-success)',
    successSubtle: 'var(--color-state-success-subtle)',
  },
  focus: {
    ring: 'var(--color-focus-ring)',
  },
  shadow: {
    card: 'var(--color-shadow-card)',
    elevated: 'var(--color-shadow-elevated)',
    glowViolet: 'var(--color-shadow-glow-violet)',
    glowAmber: 'var(--color-shadow-glow-amber)',
    focusRing: 'var(--color-shadow-focus-ring)',
  },
  input: {
    background: 'var(--color-input-background)',
    backgroundDisabled: 'var(--color-input-background-disabled)',
    border: 'var(--color-input-border)',
    borderHover: 'var(--color-input-border-hover)',
    borderFocus: 'var(--color-input-border-focus)',
    borderError: 'var(--color-input-border-error)',
    placeholder: 'var(--color-input-placeholder)',
    helper: 'var(--color-input-helper)',
    errorText: 'var(--color-input-error-text)',
  },
} as const;
