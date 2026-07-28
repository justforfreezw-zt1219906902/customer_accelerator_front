<script setup lang="ts">
import type { whyContentEn } from '../../content/why/en';

defineProps<{ content: typeof whyContentEn.principle }>();
</script>

<template>
  <section class="why-principle" aria-labelledby="why-principle-title">
    <div class="why-principle__panel">
      <p>{{ content.tag }}</p>
      <h2 id="why-principle-title">{{ content.title }}</h2>
      <p class="why-principle__description">{{ content.description }}</p>
    </div>
  </section>
</template>

<style scoped>
.why-principle {
  display: grid;
  min-height: 420px;
  place-items: center;
  padding: 72px var(--spacing-24);
}

.why-principle__panel {
  display: grid;
  width: min(100%, 1064px);
  min-height: 230px;
  place-content: center;
  justify-items: center;
  gap: 12px;
  padding: 36px 40px;
  border: var(--stroke-1) solid var(--color-border-amber);
  border-radius: 14px;
  background: var(--color-card-default);
  text-align: center;
}

p,
h2 {
  margin: 0;
}

p {
  color: var(--color-accent-amber);
  font-family: var(--font-family-mono);
  font-size: 11px;
}

h2 {
  color: var(--color-text-primary);
  font-size: 26px;
  line-height: 34px;
}

.why-principle__description {
  max-width: 760px;
  color: var(--color-text-muted);
  font-family: var(--font-family-inter);
  font-size: 14px;
  line-height: 22px;
}
</style>
