<script setup lang="ts">
import type { DemoDataStatus } from '../../demo/types';
import DataStatusBadge from './DataStatusBadge.vue';
import { dnaDimensionTone } from '../../utils/categoricalTone';
defineProps<{ title: string; status: DemoDataStatus }>();
</script>
<template>
  <article class="dna-evidence-card" :class="`dna-evidence-card--${dnaDimensionTone(title)}`">
    <header>
      <h2>{{ title }}</h2>
      <DataStatusBadge :status="status" />
    </header>
    <div class="dna-evidence-card__body"><slot /></div>
  </article>
</template>
<style scoped>
.dna-evidence-card {
  min-width: 0;
  padding: var(--spacing-20);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.dna-evidence-card header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-12);
  margin-bottom: var(--spacing-14);
}
.dna-evidence-card h2 {
  margin: 0;
  font-size: var(--font-size-18);
  line-height: 1.25;
}
.dna-evidence-card header::before { width: 4px; height: 1.1em; flex: 0 0 4px; border-radius: 2px; background: var(--color-brand-light); content: ''; }
.dna-evidence-card--amber header::before { background: var(--color-accent-amber-light); }
.dna-evidence-card--success header::before { background: var(--color-state-success); }
.dna-evidence-card--deep header::before { background: var(--color-brand-deep); }
.dna-evidence-card__body {
  display: grid;
  gap: var(--spacing-10);
  color: var(--color-text-secondary);
  font-size: var(--font-size-13);
  line-height: 1.45;
}
</style>
