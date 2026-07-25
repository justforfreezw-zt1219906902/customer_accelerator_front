<script setup lang="ts">
import { computed } from 'vue';

type CardVariant = 'default' | 'hover' | 'selected' | 'glass';

const props = withDefaults(
  defineProps<{
    variant?: CardVariant;
    interactive?: boolean;
    disabled?: boolean;
  }>(),
  {
    variant: 'default',
    interactive: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  activate: [event: MouseEvent];
}>();

const element = computed(() => (props.interactive ? 'button' : 'article'));
</script>

<template>
  <component
    :is="element"
    class="app-card"
    :class="[`app-card--${variant}`, { 'app-card--interactive': interactive }]"
    :type="interactive ? 'button' : undefined"
    :disabled="interactive ? disabled : undefined"
    @click="interactive && !disabled && emit('activate', $event)"
  >
    <p v-if="$slots.eyebrow" class="app-card__eyebrow">
      <slot name="eyebrow" />
    </p>
    <h3 v-if="$slots.title" class="app-card__title">
      <slot name="title" />
    </h3>
    <div class="app-card__body">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.app-card {
  display: grid;
  gap: var(--spacing-16);
  width: 100%;
  padding: var(--spacing-32);
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
  background: var(--color-card-default);
  box-shadow: var(--shadow-card);
  font: inherit;
  text-align: start;
}

.app-card--hover,
.app-card--interactive:hover:not(:disabled) {
  border-color: var(--color-border-brand);
  background: var(--color-card-highlighted);
  box-shadow: var(--shadow-elevated);
}

.app-card--selected {
  border: var(--stroke-2) solid var(--color-border-brand);
  background: var(--color-card-highlighted);
  box-shadow: var(--shadow-glow-violet);
}

.app-card--glass {
  border-radius: var(--radius-xl);
  background: var(--color-card-default);
  box-shadow: var(--shadow-elevated);
}

.app-card--interactive {
  cursor: pointer;
}

.app-card--interactive:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.app-card--interactive:disabled {
  cursor: not-allowed;
  opacity: var(--opacity-disabled);
}

.app-card__eyebrow,
.app-card__title,
.app-card__body {
  margin: 0;
}

.app-card__eyebrow {
  color: var(--color-brand-light);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
  line-height: var(--typography-label-mono-kicker-line-height);
  letter-spacing: var(--typography-label-mono-kicker-letter-spacing);
  text-transform: uppercase;
}

.app-card__title {
  font-size: var(--typography-body-lg-font-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--typography-body-lg-line-height);
}

.app-card__body {
  font-size: var(--typography-body-base-font-size);
  line-height: var(--typography-body-base-line-height);
}
</style>
