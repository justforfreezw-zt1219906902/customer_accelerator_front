<script setup lang="ts">
import { computed } from 'vue';

import { AppBadge, AppCard } from '../../design-system/components/core';
import type { ProductHeadingLevel } from './product.types';

type FeatureCardVariant = 'default' | 'with-icon' | 'highlighted';

const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    kicker?: string;
    badgeLabel?: string;
    variant?: FeatureCardVariant;
    headingLevel?: ProductHeadingLevel;
  }>(),
  {
    kicker: undefined,
    badgeLabel: undefined,
    variant: 'default',
    headingLevel: 3,
  },
);

const headingTag = computed(() => `h${props.headingLevel}`);
const cardVariant = computed(() =>
  props.variant === 'highlighted' ? 'selected' : 'default',
);
</script>

<template>
  <AppCard
    class="feature-card"
    :class="`feature-card--${variant}`"
    :variant="cardVariant"
  >
    <div v-if="kicker || $slots.icon || badgeLabel" class="feature-card__top">
      <slot v-if="variant === 'with-icon'" name="icon" />
      <span v-if="kicker" class="feature-card__kicker">{{ kicker }}</span>
      <AppBadge v-if="badgeLabel" type="signal">{{ badgeLabel }}</AppBadge>
    </div>
    <component :is="headingTag" class="feature-card__title">
      {{ title }}
    </component>
    <p class="feature-card__description">{{ description }}</p>
  </AppCard>
</template>

<style scoped>
.feature-card {
  height: 100%;
  min-width: 0;
  padding: var(--spacing-24);
}

.feature-card__top {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-12);
}

.feature-card__kicker {
  color: var(--color-brand-light);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
  line-height: var(--typography-label-mono-kicker-line-height);
  letter-spacing: var(--typography-label-mono-kicker-letter-spacing);
}

.feature-card__title,
.feature-card__description {
  margin: 0;
  overflow-wrap: anywhere;
}

.feature-card__title {
  font-size: var(--typography-heading-h4-font-size);
  line-height: var(--typography-heading-h4-line-height);
}

.feature-card__description {
  color: var(--color-text-muted);
}
</style>
