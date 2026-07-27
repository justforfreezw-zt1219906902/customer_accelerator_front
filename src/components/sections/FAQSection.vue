<script setup lang="ts">
import { computed, ref } from 'vue';

import { AppSectionContainer } from '../../design-system/components/core';
import type { FAQItem, SectionIntro } from './section.types';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    items: FAQItem[];
    sectionId?: string;
    initiallyOpenIndex?: number;
  }>(),
  {
    sectionId: 'faq',
    initiallyOpenIndex: 0,
  },
);

const headingTag = computed(() => `h${props.intro.headingLevel ?? 2}`);
const openIndex = ref<number | null>(props.initiallyOpenIndex);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <AppSectionContainer :id="sectionId" class="landing-section faq-section">
    <div class="landing-section__content faq-section__content">
      <header class="landing-section__intro">
        <p v-if="intro.eyebrow" class="landing-section__eyebrow">
          {{ intro.eyebrow }}
        </p>
        <component :is="headingTag" class="landing-section__title">
          {{ intro.title }}
        </component>
      </header>
      <div class="faq-section__list">
        <article
          v-for="(item, index) in items"
          :key="item.question"
          class="faq-section__item"
          :class="{ 'faq-section__item--open': openIndex === index }"
        >
          <h3>
            <button
              type="button"
              :aria-expanded="openIndex === index"
              :aria-controls="`faq-answer-${index}`"
              @click="toggle(index)"
            >
              <span>{{ item.question }}</span>
              <span aria-hidden="true">{{
                openIndex === index ? '−' : '+'
              }}</span>
            </button>
          </h3>
          <p
            v-show="openIndex === index"
            :id="`faq-answer-${index}`"
            class="faq-section__answer"
          >
            {{ item.answer }}
          </p>
        </article>
      </div>
    </div>
  </AppSectionContainer>
</template>

<style scoped>
@import './sections.css';

.faq-section__content {
  max-width: calc(var(--spacing-96) * 9);
}

.faq-section__list {
  display: grid;
}

.faq-section__item {
  padding: var(--spacing-16) var(--spacing-24);
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}

.faq-section__item--open {
  border-color: var(--color-border-brand);
}

.faq-section__item h3,
.faq-section__answer {
  margin: 0;
}

.faq-section__item button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-16);
  border: 0;
  background: transparent;
  color: var(--color-text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.faq-section__item button:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.faq-section__answer {
  padding-top: var(--spacing-12);
  color: var(--color-text-muted);
}
</style>
