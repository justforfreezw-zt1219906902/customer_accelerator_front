<script setup lang="ts">
import PageShell from './PageShell.vue';
</script>

<template>
  <PageShell
    eyebrow="mi-goTo"
    title="Landing Page"
    description="Temporary Phase 5 routing shell. Final page content belongs to Phase 6A."
  >
    <section id="problem" class="landing-anchor">
      <h2>THE PROBLEM</h2>
    </section>
    <section id="solution" class="landing-anchor">
      <h2>THE SOLUTION</h2>
    </section>
    <section id="packages" class="landing-anchor">
      <h2>PACKAGES</h2>
    </section>
  </PageShell>
</template>

<style scoped>
.landing-anchor {
  min-height: 12rem;
  padding-block: var(--spacing-32);
  scroll-margin-top: calc(var(--spacing-64) + var(--spacing-16));
}

.landing-anchor:focus,
.landing-anchor h2:focus {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}
</style>
