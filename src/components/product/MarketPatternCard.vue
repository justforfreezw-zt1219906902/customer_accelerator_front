<script setup lang="ts">
import type { DemoMarketPattern } from '../../demo/types';
defineProps<{ pattern: DemoMarketPattern; showActions?: boolean }>();
defineEmits<{ draft: []; save: [] }>();
</script>

<template>
  <article class="market-pattern-card">
    <strong>{{ pattern.count }}</strong>
    <h3>{{ pattern.title }}</h3>
    <p>{{ pattern.accounts }}</p>
    <div class="market-pattern-card__opportunity">▣ Content opportunity</div>
    <p v-if="showActions" class="market-pattern-card__angle">
      {{ pattern.contentAngle }}
    </p>
    <div v-if="showActions" class="market-pattern-card__actions">
      <button type="button" @click="$emit('draft')">Draft Content</button>
      <button type="button" disabled aria-disabled="true">Save Brief</button>
    </div>
  </article>
</template>

<style scoped>
.market-pattern-card {
  display: grid;
  min-width: 0;
  min-height: 165px;
  align-content: start;
  gap: var(--spacing-7);
  padding: var(--spacing-18) var(--spacing-20) var(--spacing-16);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.market-pattern-card strong {
  color: var(--color-brand-light);
  font-size: var(--font-size-24);
}
.market-pattern-card h3,
.market-pattern-card p {
  margin: 0;
}
.market-pattern-card h3 {
  font-size: var(--font-size-15);
}
.market-pattern-card p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-12);
}
.market-pattern-card__opportunity {
  margin-top: auto;
  padding-top: var(--spacing-7);
  border-top: 1px solid var(--color-border-subtle);
  color: var(--color-accent-amber-light);
  font-size: var(--font-size-12);
  font-weight: var(--font-weight-semibold);
}
.market-pattern-card__angle {
  color: var(--color-text-primary) !important;
}
.market-pattern-card__actions {
  display: flex;
  gap: var(--spacing-8);
}
.market-pattern-card button {
  padding: var(--spacing-5) var(--spacing-8);
  border: 1px solid var(--color-border-brand);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-brand-light);
}
.market-pattern-card button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
