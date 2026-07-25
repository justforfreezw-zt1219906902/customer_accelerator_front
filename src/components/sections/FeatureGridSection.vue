<script setup lang="ts">
import { computed } from 'vue';

import { AppSectionContainer } from '../../design-system/components/core';
import { FeatureCard } from '../product';
import type { FeatureItem, SectionIntro } from './section.types';

type FeatureGridVariant =
  'three-column-grid' | 'two-column-grid' | 'highlighted-first-feature';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    items: FeatureItem[];
    sectionId?: string;
    variant?: FeatureGridVariant;
  }>(),
  {
    sectionId: 'features',
    variant: 'three-column-grid',
  },
);

const headingTag = computed(() => `h${props.intro.headingLevel ?? 2}`);
</script>

<template>
  <AppSectionContainer
    :id="sectionId"
    class="landing-section feature-grid-section"
    :class="`feature-grid-section--${variant}`"
  >
    <div class="landing-section__content">
      <header class="landing-section__intro">
        <p v-if="intro.eyebrow" class="landing-section__eyebrow">
          {{ intro.eyebrow }}
        </p>
        <component :is="headingTag" class="landing-section__title">
          {{ intro.title }}
        </component>
        <p v-if="intro.description" class="landing-section__description">
          {{ intro.description }}
        </p>
      </header>
      <div class="landing-section__grid">
        <FeatureCard
          v-for="(item, index) in items"
          :key="item.title"
          v-bind="item"
          :variant="
            variant === 'highlighted-first-feature' && index === 0
              ? 'highlighted'
              : item.variant
          "
          :heading-level="3"
        />
      </div>
    </div>
  </AppSectionContainer>
</template>

<style scoped>
@import './sections.css';

.feature-grid-section--two-column-grid .landing-section__grid {
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, calc(var(--spacing-96) * 4)), 1fr)
  );
}

.feature-grid-section--highlighted-first-feature
  :deep(.landing-section__grid > :first-child) {
  grid-column: 1 / -1;
}
</style>
