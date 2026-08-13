<script setup lang="ts">
defineProps<{ count: number | null; pattern: readonly ('active' | 'inactive')[] }>();
</script>
<template>
  <div class="signal-summary" :aria-label="`${count ?? 'insufficient data'} active signals`">
    <span class="signal-summary__dots" aria-hidden="true"
      ><i
        v-for="(state, index) in pattern"
        :key="index"
        :class="`is-${state}`" /></span
    ><strong>{{ count === null ? 'INSUFFICIENT DATA' : `${count} active` }}</strong>
  </div>
</template>
<style scoped>
.signal-summary {
  display: grid;
  gap: var(--spacing-6);
}
.signal-summary__dots {
  display: flex;
  gap: var(--spacing-3);
}
.signal-summary i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-border-default);
}
.signal-summary i.is-active {
  background: var(--color-state-success);
}
.signal-summary strong {
  color: var(--color-text-secondary);
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-medium);
}
</style>
