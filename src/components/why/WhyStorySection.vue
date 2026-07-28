<script setup lang="ts">
import type { whyContentEn } from '../../content/why/en';

defineProps<{ content: typeof whyContentEn.story }>();
</script>

<template>
  <section id="story" class="why-story" aria-labelledby="why-story-title">
    <p class="why-label">{{ content.eyebrow }}</p>
    <h2 id="why-story-title">{{ content.title }}</h2>
    <p class="why-story__lead">{{ content.introduction }}</p>
    <p v-for="paragraph in content.paragraphs" :key="paragraph">
      {{ paragraph }}
    </p>

    <h3>{{ content.insightLabel }}</h3>
    <p v-for="paragraph in content.insight" :key="paragraph">
      {{ paragraph }}
    </p>

    <blockquote>{{ content.quote }}</blockquote>

    <h3>{{ content.companyLabel }}</h3>
    <p v-for="paragraph in content.company" :key="paragraph">
      {{ paragraph }}
    </p>
  </section>
</template>

<style scoped>
.why-story {
  display: grid;
  max-width: 704px;
  gap: 22px;
  margin: 0 auto;
  padding: 88px 0;
  scroll-margin-top: 24px;
}

.why-label,
h3 {
  margin: 0;
  color: var(--color-brand-light);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
}

h2 {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 36px;
  line-height: 58px;
}

p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 16px;
  line-height: 26px;
}

.why-story__lead {
  color: var(--color-text-primary);
  font-size: 18px;
  line-height: 29px;
}

h3 {
  margin-top: 10px;
}

blockquote {
  margin: 10px 0;
  padding: var(--spacing-32) 30px;
  border-left: 5px solid var(--color-accent-amber);
  color: var(--color-text-primary);
  font-size: 20px;
  font-style: italic;
  line-height: 28px;
}

@media (max-width: 48rem) {
  .why-story {
    padding: var(--spacing-64) var(--spacing-24);
  }

  h2 {
    font-size: 30px;
    line-height: 1.3;
  }
}
</style>
