<script setup lang="ts">
import { computed } from 'vue';

import { CustomerProblemCard } from '../product';
import { AppSectionContainer } from '../../design-system/components/core';
import type { ProblemItem, SectionIntro } from './section.types';

type ProblemVariant = 'three-card-grid' | 'four-card-grid' | 'split-with-quote';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    items: ProblemItem[];
    quote?: string;
    quoteAttribution?: string;
    sectionId?: string;
    variant?: ProblemVariant;
  }>(),
  {
    quote: undefined,
    quoteAttribution: undefined,
    sectionId: 'problem',
    variant: 'three-card-grid',
  },
);

const headingTag = computed(() => `h${props.intro.headingLevel ?? 2}`);
</script>

<template>
  <AppSectionContainer
    :id="sectionId"
    class="landing-section problem-section"
    :class="`problem-section--${variant}`"
    divider="without-top-divider"
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
      <blockquote v-if="quote" class="problem-section__quote">
        <p>{{ quote }}</p>
        <footer v-if="quoteAttribution">{{ quoteAttribution }}</footer>
      </blockquote>
      <div class="landing-section__grid">
        <CustomerProblemCard
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

.problem-section__quote {
  display: grid;
  gap: var(--spacing-12);
  margin: 0;
  padding: var(--spacing-24);
  border-left: var(--stroke-2) solid var(--color-border-brand);
  color: var(--color-text-primary);
  background: var(--color-card-default);
}

.problem-section__quote p,
.problem-section__quote footer {
  margin: 0;
  overflow-wrap: anywhere;
}

.problem-section__quote footer {
  color: var(--color-text-muted);
}
</style>
