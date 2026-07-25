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
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, calc(var(--spacing-64) * 4)), 1fr)
  );
  gap: var(--spacing-28, var(--spacing-24));
  align-items: center;
  width: 100%;
  max-width: 1180px;
  margin-inline: auto;
  padding: var(--spacing-48) var(--spacing-64);
}

.final-cta-section--compact {
  grid-template-columns: 1fr;
}
</style>
