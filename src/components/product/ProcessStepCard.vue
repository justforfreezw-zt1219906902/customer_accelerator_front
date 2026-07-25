<script setup lang="ts">
import { computed } from 'vue';

import { AppCard } from '../../design-system/components/core';
import type { ProductHeadingLevel } from './product.types';

type ProcessVariant = 'default' | 'active' | 'completed';
type ProcessDensity = 'default' | 'compact';

const props = withDefaults(
  defineProps<{
    step: string | number;
    title: string;
    description: string;
    variant?: ProcessVariant;
    density?: ProcessDensity;
    headingLevel?: ProductHeadingLevel;
  }>(),
  {
    variant: 'default',
    density: 'default',
    headingLevel: 3,
  },
);

const headingTag = computed(() => `h${props.headingLevel}`);
const cardVariant = computed(() =>
  props.variant === 'active'
    ? 'selected'
    : props.variant === 'completed'
      ? 'hover'
      : 'default',
);
</script>

<template>
  <AppCard
    class="process-step-card"
    :class="[
      `process-step-card--${variant}`,
      `process-step-card--${density}`,
    ]"
    :variant="cardVariant"
    :aria-current="variant === 'active' ? 'step' : undefined"
  >
    <div class="process-step-card__header">
      <span class="process-step-card__number" aria-hidden="true">
        {{ step }}
      </span>
      <slot name="icon" />
    </div>
    <component :is="headingTag" class="process-step-card__title">
      {{ title }}
    </component>
    <p class="process-step-card__description">{{ description }}</p>
    <span class="process-step-card__accent" aria-hidden="true" />
  </AppCard>
</template>

<style scoped>
.process-step-card {
  position: relative;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  padding: var(--spacing-24);
}

.process-step-card--compact {
  max-width: 206px;
}

.process-step-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-12);
}

.process-step-card__number {
  display: inline-grid;
  min-width: var(--spacing-32);
  min-height: var(--spacing-32);
  place-items: center;
  border: var(--stroke-1) solid var(--color-border-brand);
  border-radius: var(--radius-full);
  color: var(--color-brand-light);
  font-family: var(--font-family-mono), monospace;
}

.process-step-card__title,
.process-step-card__description {
  margin: 0;
  overflow-wrap: anywhere;
}

.process-step-card__title {
  font-size: var(--typography-heading-h4-font-size);
  line-height: var(--typography-heading-h4-line-height);
}

.process-step-card__description {
  color: var(--color-text-muted);
}

.process-step-card__accent {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: var(--stroke-2);
  background: var(--color-border-default);
}

.process-step-card--active .process-step-card__accent {
  background: var(--color-brand-light);
}

.process-step-card--completed .process-step-card__accent {
  background: var(--color-state-success);
}
</style>
