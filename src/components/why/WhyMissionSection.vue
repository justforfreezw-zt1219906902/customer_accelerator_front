<script setup lang="ts">
import type { whyContentEn } from '../../content/why/en';

defineProps<{ content: typeof whyContentEn.mission }>();
</script>

<template>
  <section id="mission" class="why-mission" aria-labelledby="why-mission-title">
    <div>
      <p class="why-label">{{ content.eyebrow }}</p>
      <h2 id="why-mission-title">{{ content.title }}</h2>
      <p class="why-mission__lead">{{ content.lead }}</p>
      <p>{{ content.body }}</p>
    </div>
  </section>
</template>

<style scoped>
.why-mission {
  padding: 90px 58px;
  background: var(--color-bg-surface);
  scroll-margin-top: 24px;
}

.why-mission > div {
  display: grid;
  max-width: 720px;
  gap: 18px;
}

p,
h2 {
  margin: 0;
}

.why-label {
  color: var(--color-accent-amber);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
}

h2 {
  color: var(--color-text-primary);
  font-size: 36px;
  line-height: 54px;
}

.why-mission__lead {
  color: var(--color-text-primary);
  font-size: 21px;
  line-height: 32px;
}

p {
  color: var(--color-text-muted);
  font-size: 15px;
  line-height: 23px;
}

@media (max-width: 48rem) {
  .why-mission {
    padding: var(--spacing-64) var(--spacing-24);
  }
}
</style>
