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
  width: min(100% - 2rem, 48rem);
  padding: 3rem;
  border: 1px solid var(--foundation-border-color);
  border-radius: var(--foundation-radius);
  background: var(--foundation-surface-color);
}

.foundation-placeholder__eyebrow {
  color: var(--foundation-muted-color);
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin-block: 0.75rem;
  font-size: clamp(2rem, 6vw, 3.5rem);
  line-height: 1.05;
}

p {
  margin-block: 0;
  line-height: 1.6;
}
</style>
