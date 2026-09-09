<script setup lang="ts">
import { computed } from 'vue';

import { AppCard } from '../../design-system/components/core';
import type { ProductHeadingLevel } from './product.types';

type TrustMetricVariant = 'default' | 'emphasized';

const props = withDefaults(
  defineProps<{
    value: string;
    label: string;
    explanation?: string;
    variant?: TrustMetricVariant;
    headingLevel?: ProductHeadingLevel;
  }>(),
  {
    explanation: undefined,
    variant: 'default',
    headingLevel: 3,
  },
);

const headingTag = computed(() => `h${props.headingLevel}`);
</script>

<template>
  <AppCard
    class="trust-metric-card"
    :class="`trust-metric-card--${variant}`"
    :variant="variant === 'emphasized' ? 'selected' : 'default'"
  >
    <p
      class="trust-metric-card__value"
      :class="{ 'trust-metric-card__value--long': value.length > 12 }"
    >
      {{ value }}
    </p>
    <component :is="headingTag" class="trust-metric-card__label">
      {{ label }}
    </component>
    <p v-if="explanation" class="trust-metric-card__explanation">
      {{ explanation }}
    </p>
  </AppCard>
</template>

<style scoped>
.trust-metric-card {
  display: grid;
  align-content: start;
  gap: var(--spacing-8);
  height: 100%;
  min-width: 0;
  padding: var(--spacing-24) var(--spacing-32);
  background: linear-gradient(145deg, var(--color-card-default), color-mix(in srgb, var(--color-card-default) 82%, var(--color-brand-primary)));
}

.trust-metric-card__value,
.trust-metric-card__label,
.trust-metric-card__explanation {
  margin: 0;
  overflow-wrap: anywhere;
}

.trust-metric-card__value {
  color: var(--color-brand-light);
  font-size: clamp(1.15rem, 3.2vw, var(--typography-heading-h2-font-size));
  font-weight: var(--font-weight-semibold);
  line-height: 1.08;
  white-space: nowrap;
}

.trust-metric-card__value--long {
  font-size: clamp(1rem, 2vw, 1.5rem);
  letter-spacing: -0.02em;
}

.trust-metric-card__label {
  color: var(--color-text-primary);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--font-weight-semibold);
  line-height: 1.25;
}

.trust-metric-card__explanation {
  color: var(--color-text-muted);
  font-size: var(--typography-body-sm-font-size);
  line-height: 1.45;
}
</style>
