<script setup lang="ts">
import { computed } from 'vue';

import { AppCard } from '../../design-system/components/core';
import type {
  ProductCardVariant,
  ProductHeadingLevel,
} from './product.types';

type CustomerProblemVariant = ProductCardVariant | 'severe';

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    variant?: CustomerProblemVariant;
    headingLevel?: ProductHeadingLevel;
  }>(),
  {
    description: undefined,
    variant: 'default',
    headingLevel: 3,
  },
);

const headingTag = computed(() => `h${props.headingLevel}`);
const cardVariant = computed(() =>
  props.variant === 'severe'
    ? 'selected'
    : props.variant === 'highlighted'
      ? 'hover'
      : 'default',
);
</script>

<template>
  <AppCard
    class="customer-problem-card"
    :class="`customer-problem-card--${variant}`"
    :variant="cardVariant"
  >
    <span class="customer-problem-card__accent" aria-hidden="true" />
    <component :is="headingTag" class="customer-problem-card__title">
      {{ title }}
    </component>
    <p v-if="description" class="customer-problem-card__description">
      {{ description }}
    </p>
  </AppCard>
</template>

<style scoped>
.customer-problem-card {
  position: relative;
  height: 100%;
  min-width: 0;
  padding: var(--spacing-24);
}

.customer-problem-card--compact {
  max-width: 300px;
}

.customer-problem-card__accent {
  position: absolute;
  top: var(--spacing-24);
  bottom: var(--spacing-24);
  left: 0;
  width: var(--stroke-2);
  background: var(--color-accent-amber);
}

.customer-problem-card--severe .customer-problem-card__accent {
  background: var(--color-state-error);
}

.customer-problem-card__title,
.customer-problem-card__description {
  margin: 0;
  overflow-wrap: anywhere;
}

.customer-problem-card__title {
  font-size: var(--typography-heading-h4-font-size);
  line-height: var(--typography-heading-h4-line-height);
}

.customer-problem-card__description {
  color: var(--color-text-muted);
}
</style>
