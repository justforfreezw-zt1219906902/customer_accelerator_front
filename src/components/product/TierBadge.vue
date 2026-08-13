<script setup lang="ts">
defineProps<{ tier: string | null }>();
</script>
<template>
  <span
    class="tier-badge"
    :class="tier ? `tier-badge--${tier.toLowerCase().replaceAll(' ', '-')}` : 'tier-badge--unknown'"
    >{{ tier ?? 'INSUFFICIENT DATA' }}</span
  >
</template>
<style scoped>
.tier-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-8);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font: var(--font-weight-medium) var(--font-size-9)/1.4 var(--font-family-mono);
  text-transform: uppercase;
  white-space: nowrap;
}
.tier-badge--focus-accounts {
  border-color: var(--color-border-brand);
  background: var(--color-brand-tint-900);
  color: var(--color-brand-light);
}
.tier-badge--tier-1 {
  border-color: var(--color-border-amber);
  color: var(--color-accent-amber-light);
}
</style>
