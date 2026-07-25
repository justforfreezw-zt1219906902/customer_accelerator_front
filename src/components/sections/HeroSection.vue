<script setup lang="ts">
import { computed } from 'vue';

import { AppButton } from '../../design-system/components/core';
import type { SectionAction, SectionIntro } from './section.types';

type HeroVariant =
  'default' | 'compact' | 'with-product-preview' | 'evidence-perspective';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    primaryAction: SectionAction;
    secondaryAction?: SectionAction;
    sectionId?: string;
    variant?: HeroVariant;
  }>(),
  {
    secondaryAction: undefined,
    sectionId: 'hero',
    variant: 'default',
  },
);

const emit = defineEmits<{
  primaryAction: [event: MouseEvent];
  secondaryAction: [event: MouseEvent];
}>();

const headingTag = computed(() => `h${props.intro.headingLevel ?? 1}`);
</script>

<template>
  <section
    :id="sectionId"
    class="hero-section"
    :class="`hero-section--${variant}`"
  >
    <div class="hero-section__copy">
      <p v-if="intro.eyebrow" class="hero-section__eyebrow">
        {{ intro.eyebrow }}
      </p>
      <component :is="headingTag" class="hero-section__title">
        {{ intro.title }}
      </component>
      <p v-if="intro.description" class="hero-section__description">
        {{ intro.description }}
      </p>
      <div class="hero-section__actions">
        <AppButton
          :href="primaryAction.href"
          @click="emit('primaryAction', $event)"
        >
          {{ primaryAction.label }}
        </AppButton>
        <AppButton
          v-if="secondaryAction"
          :href="secondaryAction.href"
          variant="secondary"
          @click="emit('secondaryAction', $event)"
        >
          {{ secondaryAction.label }}
        </AppButton>
      </div>
    </div>
    <div
      v-if="$slots.preview"
      class="hero-section__preview"
      aria-label="Product preview"
    >
      <slot name="preview" />
    </div>
  </section>
</template>

<style scoped>
@import './sections.css';

.hero-section {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, calc(var(--spacing-64) * 5)), 1fr)
  );
  gap: var(--spacing-48);
  align-items: center;
  width: 100%;
  max-width: 1180px;
  margin-inline: auto;
  padding: var(--spacing-48) var(--spacing-64) var(--spacing-64);
}

.hero-section--compact {
  padding-block: var(--spacing-32);
}

.hero-section__copy {
  display: grid;
  gap: var(--spacing-24);
  min-width: 0;
}

.hero-section__eyebrow,
.hero-section__title,
.hero-section__description {
  margin: 0;
  overflow-wrap: anywhere;
}

.hero-section__eyebrow {
  color: var(--color-brand-light);
  font-family: var(--font-family-mono), monospace;
}

.hero-section__title {
  font-size: var(--typography-heading-h1-font-size);
  line-height: var(--typography-heading-h1-line-height);
}

.hero-section__description {
  color: var(--color-text-muted);
  font-size: var(--typography-body-lg-font-size);
  line-height: var(--typography-body-lg-line-height);
}

.hero-section__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-16);
}

.hero-section__preview {
  min-width: 0;
}
</style>
