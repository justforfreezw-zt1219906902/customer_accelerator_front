<script setup lang="ts">
import { computed } from 'vue';

import { AppSectionContainer } from '../../design-system/components/core';
import { ValuePropositionCard } from '../product';
import type { SectionIntro, SolutionItem } from './section.types';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    items: SolutionItem[];
    sectionId?: string;
    variant?: 'grid' | 'split-layout';
  }>(),
  {
    sectionId: 'solution',
    variant: 'grid',
  },
);

const headingTag = computed(() => `h${props.intro.headingLevel ?? 2}`);
</script>

<template>
  <AppSectionContainer
    :id="sectionId"
    class="landing-section solution-overview-section"
    :class="`solution-overview-section--${variant}`"
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
        <ValuePropositionCard
          v-for="item in items"
          :key="item.title"
          v-bind="item"
          :heading-level="3"
        />
      </div>
    </div>
  </AppSectionContainer>
</template>

<style scoped>
@import './sections.css';

.solution-overview-section--split-layout
  :deep(.landing-section__grid > :first-child) {
  grid-column: 1 / -1;
}
</style>
