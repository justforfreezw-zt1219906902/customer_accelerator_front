<script setup lang="ts">
const props = defineProps<{
  count: number;
  /** Optional fixture decoration; API mode uses fixed neutral decoration. */
  pattern?: readonly ('active' | 'inactive')[];
}>();

const decorativeDots = props.pattern ?? Array.from({ length: 5 }, () => 'neutral');
</script>
<template>
  <div class="signal-summary" :aria-label="`${count} active signals`">
    <span class="signal-summary__dots" aria-hidden="true"
      ><i
        v-for="(state, index) in decorativeDots"
        :key="index"
        :class="state === 'neutral' ? undefined : `is-${state}`" /></span
      ><strong>{{ count }} active</strong>
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
