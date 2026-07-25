<script setup lang="ts">
import { computed } from 'vue';

import { AppButton, AppCard } from '../../design-system/components/core';
import type { ProductHeadingLevel } from './product.types';

type CtaVariant = 'primary' | 'secondary' | 'compact';

const props = withDefaults(
  defineProps<{
    title: string;
    ctaLabel: string;
    description?: string;
    eyebrow?: string;
    ctaHref?: string;
    variant?: CtaVariant;
    headingLevel?: ProductHeadingLevel;
  }>(),
  {
    description: undefined,
    eyebrow: undefined,
    ctaHref: undefined,
    variant: 'primary',
    headingLevel: 2,
  },
);

const emit = defineEmits<{
  action: [event: MouseEvent];
}>();

const headingTag = computed(() => `h${props.headingLevel}`);
</script>

<template>
  <AppCard
    class="landing-cta-panel"
    :class="`landing-cta-panel--${variant}`"
    :variant="variant === 'primary' ? 'selected' : 'default'"
  >
    <div class="landing-cta-panel__copy">
      <p v-if="eyebrow" class="landing-cta-panel__eyebrow">
        {{ eyebrow }}
      </p>
      <component :is="headingTag" class="landing-cta-panel__title">
        {{ title }}
      </component>
      <p v-if="description" class="landing-cta-panel__description">
        {{ description }}
      </p>
    </div>
    <AppButton
      :variant="variant === 'secondary' ? 'secondary' : 'primary'"
      :size="variant === 'compact' ? 'sm' : 'md'"
      :href="ctaHref"
      @click="emit('action', $event)"
    >
      {{ ctaLabel }}
    </AppButton>
  </AppCard>
</template>

<style scoped>
.landing-cta-panel {
  min-width: 0;
}

.landing-cta-panel--primary {
  max-width: 1068px;
  padding: var(--spacing-64);
}

.landing-cta-panel--secondary,
.landing-cta-panel--compact {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-24);
}

.landing-cta-panel--secondary {
  max-width: 760px;
  padding: var(--spacing-32);
}

.landing-cta-panel--compact {
  max-width: 520px;
  padding: var(--spacing-24);
}

.landing-cta-panel__copy {
  display: grid;
  flex: 1 1 280px;
  gap: var(--spacing-12);
  min-width: 0;
}

.landing-cta-panel__eyebrow,
.landing-cta-panel__title,
.landing-cta-panel__description {
  margin: 0;
  overflow-wrap: anywhere;
}

.landing-cta-panel__eyebrow {
  color: var(--color-brand-light);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
  letter-spacing: var(--typography-label-mono-kicker-letter-spacing);
}

.landing-cta-panel__title {
  font-size: var(--typography-heading-h2-font-size);
  line-height: var(--typography-heading-h2-line-height);
}

.landing-cta-panel__description {
  color: var(--color-text-muted);
}
</style>
