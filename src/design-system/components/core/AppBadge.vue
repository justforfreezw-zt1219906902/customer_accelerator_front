<script setup lang="ts">
import { computed } from 'vue';

type BadgeType =
  | 'sourced'
  | 'insufficient-data'
  | 'signal'
  | 'neutral'
  | 'source-amber'
  | 'recommended';
type BadgeState = 'default' | 'hover' | 'disabled';

const props = withDefaults(
  defineProps<{
    type?: BadgeType;
    state?: BadgeState;
    showIcon?: boolean | null;
  }>(),
  {
    type: 'sourced',
    state: 'default',
    showIcon: null,
  },
);

const iconTypes: BadgeType[] = ['sourced', 'insufficient-data', 'source-amber'];
const shouldShowIcon = computed(
  () => props.showIcon ?? iconTypes.includes(props.type),
);
</script>

<template>
  <span
    class="app-badge"
    :class="[`app-badge--${type}`, `app-badge--${state}`]"
    :aria-disabled="state === 'disabled' || undefined"
  >
    <span v-if="shouldShowIcon" class="app-badge__icon" aria-hidden="true" />
    <span><slot /></span>
  </span>
</template>

<style scoped>
.app-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-4) var(--spacing-12);
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: var(--radius-full);
  color: var(--color-text-primary);
  background: var(--color-card-default);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
  line-height: var(--typography-label-mono-kicker-line-height);
  letter-spacing: var(--typography-label-mono-kicker-letter-spacing);
  text-transform: uppercase;
  white-space: nowrap;
}

.app-badge__icon {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: currentColor;
}

.app-badge--sourced {
  border-color: var(--color-border-brand);
  color: var(--color-brand-light);
  background: var(--color-brand-tint-900);
}

.app-badge--insufficient-data,
.app-badge--source-amber {
  border-color: var(--color-border-amber);
  color: var(--color-accent-amber-light);
}

.app-badge--signal {
  border-color: var(--color-border-brand);
}

.app-badge--neutral {
  border-color: var(--color-border-default);
  background: var(--color-surface-elevated);
}

.app-badge--recommended {
  border-color: var(--color-brand-light);
  color: var(--color-text-on-brand);
  background: var(--color-brand-core);
}

.app-badge--hover {
  box-shadow: var(--shadow-glow-violet);
}

.app-badge--insufficient-data.app-badge--hover,
.app-badge--source-amber.app-badge--hover {
  box-shadow: var(--shadow-glow-amber);
}

.app-badge--disabled {
  opacity: var(--opacity-disabled);
}
</style>
