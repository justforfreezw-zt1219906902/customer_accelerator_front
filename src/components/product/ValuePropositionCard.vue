<script setup lang="ts">
import { computed } from 'vue';

import { AppBadge, AppCard } from '../../design-system/components/core';
import type {
  ProductBadgeType,
  ProductCardVariant,
  ProductHeadingLevel,
} from './product.types';

const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    badgeLabel: string;
    badgeType?: ProductBadgeType;
    variant?: ProductCardVariant;
    headingLevel?: ProductHeadingLevel;
  }>(),
  {
    badgeType: 'sourced',
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
    class="value-proposition-card"
    :class="`value-proposition-card--${variant}`"
    :variant="cardVariant"
  >
    <AppBadge :type="badgeType">{{ badgeLabel }}</AppBadge>
    <component :is="headingTag" class="value-proposition-card__title">
      {{ title }}
    </component>
    <p class="value-proposition-card__description">{{ description }}</p>
  </AppCard>
</template>

<style scoped>
.value-proposition-card {
  height: 100%;
  min-width: 0;
  padding: var(--spacing-24);
}

.value-proposition-card--compact {
  max-width: 300px;
  padding: var(--spacing-24);
}

.value-proposition-card__title,
.value-proposition-card__description {
  margin: 0;
  overflow-wrap: anywhere;
}

.value-proposition-card__title {
  font-size: var(--typography-heading-h4-font-size);
  line-height: var(--typography-heading-h4-line-height);
}

.value-proposition-card__description {
  color: var(--color-text-muted);
  line-height: var(--typography-body-base-line-height);
}
</style>
