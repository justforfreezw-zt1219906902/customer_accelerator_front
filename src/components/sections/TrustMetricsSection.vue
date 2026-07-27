<script setup lang="ts">
import { computed } from 'vue';

import { AppSectionContainer } from '../../design-system/components/core';
import { TrustMetricCard } from '../product';
import type { SectionIntro, TrustMetricItem } from './section.types';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    metrics: TrustMetricItem[];
    sectionId?: string;
  }>(),
  {
    sectionId: 'proof',
  },
);

const headingTag = computed(() => `h${props.intro.headingLevel ?? 2}`);
</script>

<template>
  <AppSectionContainer
    :id="sectionId"
    class="landing-section trust-metrics-section"
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
        <TrustMetricCard
          v-for="metric in metrics"
          :key="metric.label"
          v-bind="metric"
          :heading-level="3"
        />
      </div>
    </div>
  </AppSectionContainer>
</template>

<style scoped>
@import './sections.css';
</style>
