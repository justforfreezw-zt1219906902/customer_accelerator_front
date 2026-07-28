<script setup lang="ts">
import type { whyContentEn } from '../../content/why/en';

defineProps<{ content: typeof whyContentEn.impact }>();
</script>

<template>
  <section id="impact" class="why-impact" aria-labelledby="why-impact-title">
    <p class="why-label">{{ content.eyebrow }}</p>
    <h2 id="why-impact-title">{{ content.title }}</h2>
    <p class="why-description">{{ content.description }}</p>
    <div class="why-impact__grid">
      <article v-for="item in content.items" :key="item.number" :class="`why-impact__card--${item.tone}`">
        <span>{{ item.number }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.why-impact {
  display: grid;
  gap: 32px;
  padding: 76px 58px;
  background: var(--color-bg-surface);
  scroll-margin-top: 24px;
}

.why-label,
h2,
h3,
p {
  margin: 0;
}

.why-label {
  color: var(--color-accent-amber);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
}

h2 {
  color: var(--color-text-primary);
  font-size: 34px;
}

.why-description,
article p {
  color: var(--color-text-muted);
  font-size: 12px;
}

.why-impact__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

article {
  display: grid;
  align-content: start;
  gap: 12px;
  min-height: 224px;
  padding: 22px;
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: 12px;
  background: var(--color-card-default);
}

article[class$='amber'] {
  border-color: var(--color-border-amber);
}

article > span {
  justify-self: start;
  padding: 5px 10px;
  border-radius: 6px;
  background: var(--color-brand-core);
  color: var(--color-text-on-brand);
  font-size: 10px;
  font-weight: var(--font-weight-semibold);
}

article[class$='amber'] > span {
  background: var(--color-accent-amber);
}

h3 {
  color: var(--color-text-primary);
  font-size: 16px;
}

@media (max-width: 48rem) {
  .why-impact {
    padding: var(--spacing-64) var(--spacing-24);
  }

  .why-impact__grid {
    grid-template-columns: 1fr;
  }

  article {
    min-height: auto;
  }
}
</style>
