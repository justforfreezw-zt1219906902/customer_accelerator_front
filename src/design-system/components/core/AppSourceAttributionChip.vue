<script setup lang="ts">
type SourceAttributionTone = 'neutral' | 'amber';

withDefaults(
  defineProps<{
    source: string;
    tone?: SourceAttributionTone;
  }>(),
  {
    tone: 'neutral',
  },
);
</script>

<template>
  <span
    class="app-source-attribution-chip"
    :class="`app-source-attribution-chip--${tone}`"
  >
    <span class="app-source-attribution-chip__mark" aria-hidden="true">◇</span>
    <span>{{ source }}</span>
  </span>
</template>

<style scoped>
.app-source-attribution-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-6);
  padding: var(--spacing-6) var(--spacing-10);
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--font-size-11);
  line-height: var(--typography-app-mono-data-line-height);
}

.app-source-attribution-chip--amber {
  border-color: var(--color-border-amber);
  color: var(--color-accent-amber);
  background: var(--color-card-highlighted);
}

.app-source-attribution-chip__mark {
  flex: 0 0 auto;
}
</style>
