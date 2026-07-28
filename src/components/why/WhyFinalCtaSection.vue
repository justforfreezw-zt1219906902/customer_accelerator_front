<script setup lang="ts">
import { AppButton } from '../../design-system/components/core';
import type { whyContentEn } from '../../content/why/en';

defineProps<{ content: typeof whyContentEn.finalCta }>();
</script>

<template>
  <section class="why-cta" aria-labelledby="why-cta-title">
    <div>
      <p>{{ content.eyebrow }}</p>
      <h2 id="why-cta-title">{{ content.title }}</h2>
      <p class="why-cta__description">{{ content.description }}</p>
      <AppButton size="md" :href="content.href">{{ content.label }}</AppButton>
    </div>
  </section>
</template>

<style scoped>
.why-cta {
  padding: 56px;
  border: var(--stroke-1) solid var(--color-border-subtle);
  border-radius: var(--radius-xl);
}

.why-cta > div {
  display: grid;
  place-items: center;
  gap: 18px;
  padding: 60px;
  border: var(--stroke-1) solid var(--color-border-brand);
  border-radius: var(--radius-lg);
  background: var(--color-card-highlighted);
  text-align: center;
}

p,
h2 {
  margin: 0;
}

p {
  color: var(--color-brand-primary);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
}

h2 {
  color: var(--color-text-primary);
  font-size: 26px;
}

.why-cta__description {
  max-width: 560px;
  color: var(--color-text-muted);
  font-size: 15px;
  font-weight: var(--font-weight-regular);
  line-height: 1.4;
}

@media (max-width: 48rem) {
  .why-cta {
    padding: var(--spacing-24);
  }

  .why-cta > div {
    padding: var(--spacing-48) var(--spacing-24);
  }
}
</style>
