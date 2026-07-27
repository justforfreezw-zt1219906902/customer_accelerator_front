<script setup lang="ts">
import { computed } from 'vue';

import {
  AppCard,
  AppSectionContainer,
} from '../../design-system/components/core';
import { AIInsightPreviewCard } from '../product';
import type { PreviewInsight, SectionIntro } from './section.types';

type PreviewVariant =
  'dashboard-preview' | 'insight-cards' | 'split-preview' | 'principle-panel';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    insights: PreviewInsight[];
    sectionId?: string;
    variant?: PreviewVariant;
  }>(),
  {
    sectionId: 'product-preview',
    variant: 'dashboard-preview',
  },
);

const headingTag = computed(() => `h${props.intro.headingLevel ?? 2}`);
</script>

<template>
  <AppSectionContainer
    :id="sectionId"
    class="landing-section product-preview-section"
    :class="`product-preview-section--${variant}`"
  >
    <div class="landing-section__content">
      <header
        v-if="variant !== 'principle-panel'"
        class="landing-section__intro"
      >
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
      <AppCard
        v-if="variant === 'principle-panel'"
        class="product-preview-section__principle-panel"
        data-testid="insufficient-data-card"
      >
        <header class="product-preview-section__principle-content">
          <p
            v-if="intro.eyebrow"
            class="landing-section__eyebrow"
            data-testid="insufficient-data-label"
          >
            {{ intro.eyebrow }}
          </p>
          <component :is="headingTag" class="landing-section__title">
            {{ intro.title }}
          </component>
          <p v-if="intro.description" class="landing-section__description">
            {{ intro.description }}
          </p>
        </header>
      </AppCard>
      <AppCard v-if="$slots.preview" class="product-preview-section__stage">
        <slot name="preview" />
      </AppCard>
      <div v-if="insights.length" class="landing-section__grid">
        <AIInsightPreviewCard
          v-for="insight in insights"
          :key="insight.title"
          v-bind="insight"
          :heading-level="3"
        />
      </div>
    </div>
  </AppSectionContainer>
</template>

<style scoped>
@import './sections.css';

.product-preview-section__stage {
  min-width: 0;
  overflow: hidden;
}

.product-preview-section--split-preview .landing-section__content {
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, calc(var(--spacing-96) * 4)), 1fr)
  );
}

.product-preview-section--split-preview .landing-section__intro {
  align-content: center;
}

.product-preview-section--principle-panel .landing-section__content {
  max-width: var(--content-max-width-landing);
}

.product-preview-section__principle-panel {
  min-width: 0;
  overflow: hidden;
  padding: 36px 40px;
  border-color: var(--color-border-amber);
  border-radius: 14px;
  box-shadow: none;
}

.product-preview-section__principle-content {
  display: grid;
  gap: var(--spacing-12);
  justify-items: center;
  max-width: 640px;
  margin-inline: auto;
  text-align: center;
}

.product-preview-section__principle-content .landing-section__description {
  font-size: var(--typography-body-sm-font-size);
  line-height: 22px;
}
</style>
