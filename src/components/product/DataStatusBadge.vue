<script setup lang="ts">
import type { DemoDataStatus } from '../../demo/types';
defineProps<{ status: DemoDataStatus }>();
</script>
<template>
  <span class="data-status" :class="`is-${status.toLowerCase()}`">
    <span class="sr-only">Evidence status: </span>{{ status }}
  </span>
</template>
<style scoped>
.data-status {
  display: inline-flex;
  padding: var(--spacing-3) var(--spacing-7);
  border-radius: var(--radius-3);
  font: var(--font-weight-medium) var(--font-size-10)/14px
    var(--font-family-mono);
  letter-spacing: 0.08em;
  white-space: nowrap;
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
.is-source_backed {
  background: var(--color-state-success-subtle);
  color: var(--color-state-success);
}
.is-derived {
  background: var(--color-brand-tint-900);
  color: var(--color-brand-light);
}
.is-insufficient_data {
  background: var(--color-state-error-subtle);
  color: var(--color-state-error);
}
</style>
