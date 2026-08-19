<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    value: string | number;
    detail?: string;
    tone?: 'default' | 'brand' | 'warning' | 'success' | 'error';
  }>(),
  { detail: undefined, tone: 'default' },
);
</script>
<template>
  <article class="app-metric-card" :class="`app-metric-card--${tone}`">
    <span>{{ label }}</span
    ><strong>{{ value }}</strong
    ><small v-if="detail">{{ detail }}</small>
  </article>
</template>
<style scoped>
.app-metric-card {
  display: grid;
  height: 112px;
  align-content: space-between;
  gap: var(--spacing-8);
  padding: var(--spacing-18);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-bg-surface);
}
.app-metric-card > span {
  color: var(--color-text-secondary);
  font: var(--font-size-10)/1.4 var(--font-family-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.app-metric-card strong {
  color: var(--color-text-primary);
  font-size: var(--font-size-28);
  line-height: 1;
}
.app-metric-card small {
  color: var(--color-text-secondary);
  font-size: var(--font-size-11);
}
.app-metric-card--brand {
  border-color: var(--color-border-brand);
  box-shadow: inset 3px 0 var(--color-brand-light);
}
.app-metric-card--warning {
  border-color: var(--color-border-amber);
}
.app-metric-card--warning strong { color: var(--color-accent-amber-light); }
.app-metric-card--success { border-color: var(--color-state-success); }
.app-metric-card--success strong { color: var(--color-state-success); }
.app-metric-card--error { border-color: var(--color-state-error); }
.app-metric-card--error strong { color: var(--color-state-error); }
</style>
