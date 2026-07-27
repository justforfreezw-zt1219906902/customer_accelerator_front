<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <article class="page-shell">
    <p class="page-shell__eyebrow">{{ eyebrow }}</p>
    <h1 data-page-heading>{{ title }}</h1>
    <p>{{ description }}</p>
    <slot />
  </article>
</template>

<style scoped>
.page-shell {
  width: min(calc(100% - var(--spacing-32)), 72rem);
  margin-inline: auto;
  padding-block: var(--spacing-64);
}

.page-shell__eyebrow {
  color: var(--color-text-muted);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
  text-transform: uppercase;
}

h1 {
  margin-block: var(--spacing-12);
}

p {
  max-width: 48rem;
}
</style>
