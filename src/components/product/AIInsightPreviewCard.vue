<script setup lang="ts">
import { computed } from 'vue';

import { AppBadge, AppCard } from '../../design-system/components/core';
import type {
  ProductBadgeType,
  ProductHeadingLevel,
} from './product.types';

type InsightVariant = 'default' | 'high-fit' | 'medium-fit';

const props = withDefaults(
  defineProps<{
    title: string;
    badgeLabel: string;
    insight?: string;
    confidence?: number | null;
    badgeType?: ProductBadgeType;
    emptyText?: string;
    variant?: InsightVariant;
    headingLevel?: ProductHeadingLevel;
  }>(),
  {
    insight: undefined,
    confidence: null,
    badgeType: 'signal',
    emptyText: undefined,
    variant: 'default',
    headingLevel: 3,
  },
);

const headingTag = computed(() => `h${props.headingLevel}`);
const normalizedConfidence = computed(() =>
  props.confidence === null
    ? null
    : Math.min(100, Math.max(0, props.confidence)),
);
const cardVariant = computed(() =>
  props.variant === 'high-fit'
    ? 'selected'
    : props.variant === 'medium-fit'
      ? 'hover'
      : 'default',
);
</script>

<template>
  <AppCard
    class="ai-insight-preview-card"
    :class="`ai-insight-preview-card--${variant}`"
    :variant="cardVariant"
  >
    <div class="ai-insight-preview-card__top">
      <AppBadge :type="badgeType">{{ badgeLabel }}</AppBadge>
      <span
        v-if="normalizedConfidence !== null"
        class="ai-insight-preview-card__confidence"
      >
        {{ normalizedConfidence }}%
      </span>
    </div>
    <component :is="headingTag" class="ai-insight-preview-card__title">
      {{ title }}
    </component>
    <p v-if="insight" class="ai-insight-preview-card__insight">
      {{ insight }}
    </p>
    <p
      v-else-if="emptyText"
      class="ai-insight-preview-card__empty"
      role="status"
    >
      {{ emptyText }}
    </p>
    <div
      v-if="normalizedConfidence !== null"
      class="ai-insight-preview-card__track"
      role="progressbar"
      aria-label="Confidence"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="normalizedConfidence"
    >
      <span
        class="ai-insight-preview-card__fill"
        :style="{ width: `${normalizedConfidence}%` }"
      />
    </div>
  </AppCard>
</template>

<style scoped>
.ai-insight-preview-card {
  height: 100%;
  min-width: 0;
  padding: var(--spacing-24);
}

.ai-insight-preview-card__top {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-12);
}

.ai-insight-preview-card__confidence {
  color: var(--color-brand-light);
  font-family: var(--font-family-mono), monospace;
}

.ai-insight-preview-card__title,
.ai-insight-preview-card__insight,
.ai-insight-preview-card__empty {
  margin: 0;
  overflow-wrap: anywhere;
}

.ai-insight-preview-card__title {
  font-size: var(--typography-heading-h4-font-size);
  line-height: var(--typography-heading-h4-line-height);
}

.ai-insight-preview-card__insight,
.ai-insight-preview-card__empty {
  color: var(--color-text-muted);
}

.ai-insight-preview-card__track {
  height: var(--spacing-8);
  overflow: hidden;
  border-radius: var(--radius-full);
  background: var(--color-border-default);
}

.ai-insight-preview-card__fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--color-brand-light);
}

.ai-insight-preview-card--medium-fit .ai-insight-preview-card__fill {
  background: var(--color-accent-amber);
}
</style>
