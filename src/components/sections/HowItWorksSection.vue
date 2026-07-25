<script setup lang="ts">
import { computed } from 'vue';

import { AppSectionContainer } from '../../design-system/components/core';
import { ProcessStepCard } from '../product';
import type { ProcessStep, SectionIntro } from './section.types';

type HowItWorksVariant =
  'horizontal-desktop-layout' | 'vertical-mobile-layout' | 'five-step-method';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    steps: ProcessStep[];
    sectionId?: string;
    variant?: HowItWorksVariant;
  }>(),
  {
    sectionId: 'how-it-works',
    variant: 'horizontal-desktop-layout',
  },
);

const headingTag = computed(() => `h${props.intro.headingLevel ?? 2}`);
</script>

<template>
  <AppSectionContainer
    :id="sectionId"
    class="landing-section how-it-works-section"
    :class="`how-it-works-section--${variant}`"
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
      <ol class="how-it-works-section__steps">
        <li v-for="step in steps" :key="step.step">
          <ProcessStepCard
            v-bind="step"
            :density="
              variant === 'vertical-mobile-layout' ? 'default' : 'compact'
            "
            :heading-level="3"
          />
        </li>
      </ol>
    </div>
  </AppSectionContainer>
</template>

<style scoped>
@import './sections.css';

.how-it-works-section__steps {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, calc(var(--spacing-64) * 3)), 1fr)
  );
  gap: var(--spacing-24);
  margin: 0;
  padding: 0;
  list-style: none;
}

.how-it-works-section--vertical-mobile-layout .how-it-works-section__steps {
  grid-template-columns: 1fr;
}
</style>
