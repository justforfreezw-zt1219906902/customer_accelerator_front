<script setup lang="ts">
import type { whyContentEn } from '../../content/why/en';

defineProps<{ content: typeof whyContentEn.hero }>();
</script>

<template>
  <section class="why-hero" aria-labelledby="why-hero-title">
    <p class="why-label">{{ content.eyebrow }}</p>
    <h1 id="why-hero-title">
      {{ content.title }}<br />
      <span>{{ content.highlightedTitle }}</span>
    </h1>
    <p class="why-hero__description">{{ content.description }}</p>
  </section>
</template>

<style scoped>
.why-hero {
  display: grid;
  min-height: 400px;
  place-content: center;
  justify-items: center;
  gap: 22px;
  padding: 70px var(--spacing-64);
  text-align: center;
}

.why-label {
  margin: 0;
  color: var(--color-brand-light);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
}

h1 {
  max-width: 900px;
  margin: 0;
  color: var(--color-text-primary);
  font-size: clamp(40px, 5vw, 54px);
  line-height: 1.15;
}

h1 span {
  color: var(--color-brand-light);
}

.why-hero__description {
  max-width: 620px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: 17px;
  line-height: 27px;
}

@media (max-width: 48rem) {
  .why-hero {
    min-height: auto;
    padding: var(--spacing-64) var(--spacing-24);
  }
}
</style>
