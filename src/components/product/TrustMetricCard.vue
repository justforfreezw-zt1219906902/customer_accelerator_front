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
    <p class="trust-metric-card__value">{{ value }}</p>
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
  height: 100%;
  min-width: 0;
  padding: var(--spacing-24) var(--spacing-32);
}

.trust-metric-card__value,
.trust-metric-card__label,
.trust-metric-card__explanation {
  margin: 0;
  overflow-wrap: anywhere;
}

.trust-metric-card__value {
  color: var(--color-brand-light);
  font-size: var(--typography-heading-h2-font-size);
  font-weight: var(--font-weight-semibold);
  line-height: var(--typography-heading-h2-line-height);
}

.trust-metric-card__label {
  font-size: var(--typography-body-lg-font-size);
  line-height: var(--typography-body-lg-line-height);
}

.trust-metric-card__explanation {
  color: var(--color-text-muted);
}
</style>
