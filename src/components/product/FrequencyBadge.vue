<script setup lang="ts">
import type { DemoFrequency } from '../../demo/types';
defineProps<{ level: DemoFrequency }>();
</script>
<template>
  <span class="frequency-badge"
    ><span class="sr-only">Observed frequency: </span>{{ level }}</span
  >
</template>
<style scoped>
.frequency-badge {
  display: inline-flex;
  padding: var(--spacing-3) var(--spacing-8);
  border-radius: var(--radius-3);
  background: var(--color-brand-tint-900);
  color: var(--color-brand-light);
  font: var(--font-weight-medium) var(--font-size-9)/1.2 var(--font-family-mono);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
