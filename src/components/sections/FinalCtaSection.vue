<script setup lang="ts">
import { LandingCtaPanel, AIInsightPreviewCard } from '../product';
import type {
  PreviewInsight,
  SectionAction,
  SectionIntro,
} from './section.types';

withDefaults(
  defineProps<{
    intro: SectionIntro;
    action: SectionAction;
    supportingInsight?: PreviewInsight;
    sectionId?: string;
    variant?: 'primary' | 'compact' | 'with-supporting-card';
  }>(),
  {
    supportingInsight: undefined,
    sectionId: 'final-cta',
    variant: 'primary',
  },
);

const emit = defineEmits<{
  action: [event: MouseEvent];
}>();
</script>

<template>
  <section
    :id="sectionId"
    class="final-cta-section"
    :class="`final-cta-section--${variant}`"
  >
    <LandingCtaPanel
      :title="intro.title"
      :description="intro.description"
      :eyebrow="intro.eyebrow"
      :cta-label="action.label"
      :cta-href="action.href"
      :variant="variant === 'compact' ? 'compact' : 'primary'"
      :heading-level="2"
      @action="emit('action', $event)"
    />
    <AIInsightPreviewCard
      v-if="variant === 'with-supporting-card' && supportingInsight"
      v-bind="supportingInsight"
      :heading-level="3"
    />
  </section>
</template>

<style scoped>
.final-cta-section {
  display: grid;
  width: calc(100% - (2 * var(--spacing-48)));
  max-width: 1180px;
  margin-inline: auto;
  padding: clamp(var(--spacing-24), 4vw, 56px);
  border: var(--stroke-1) solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
  background: var(--color-bg-default);
  box-shadow: var(--shadow-glow-violet);
}

.final-cta-section--compact {
  grid-template-columns: 1fr;
}

@media (max-width: 48rem) {
  .final-cta-section {
    width: calc(100% - (2 * var(--spacing-24)));
  }
}
</style>
