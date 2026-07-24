<script setup lang="ts">
import AppLayout from '../layouts/AppLayout.vue';
</script>

<template>
  <AppLayout>
    <section class="foundation-placeholder" aria-labelledby="foundation-title">
      <p class="foundation-placeholder__eyebrow">mi-goTo Frontend</p>
      <h1 id="foundation-title">Vue foundation is ready for review</h1>
      <p>
        Product pages and design-system implementation begin only in their
        approved phases.
      </p>
    </section>
  </AppLayout>
</template>

<style scoped>
.foundation-placeholder {
  width: min(calc(100% - var(--spacing-32)), 48rem);
  padding: var(--spacing-48);
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background: var(--color-surface-elevated);
  box-shadow: var(--shadow-card);
}

.foundation-placeholder__eyebrow {
  color: var(--color-text-muted);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
  line-height: var(--typography-label-mono-kicker-line-height);
  letter-spacing: var(--typography-label-mono-kicker-letter-spacing);
  text-transform: uppercase;
}

h1 {
  margin-block: var(--spacing-12);
  font-size: var(--typography-heading-h1-font-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--typography-heading-h1-line-height);
  letter-spacing: var(--typography-heading-h1-letter-spacing);
}

p {
  margin-block: 0;
  font-size: var(--typography-body-base-font-size);
  line-height: var(--typography-body-base-line-height);
  letter-spacing: var(--typography-body-base-letter-spacing);
}
</style>
