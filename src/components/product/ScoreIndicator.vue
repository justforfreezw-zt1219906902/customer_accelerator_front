<script setup lang="ts">
withDefaults(
  defineProps<{ label: string; value: number | null; display?: 'bar' | 'ring'; tone?: 'brand' | 'amber' | 'success' }>(),
  { display: 'bar', tone: 'brand' },
);
</script>
<template>
  <div
    class="score-indicator"
    :class="[`score-indicator--${display}`, `score-indicator--${tone}`]"
    :aria-label="`${label}: ${value === null ? 'not analyzed' : `${value} out of 100`}`"
  >
    <template v-if="display === 'ring'">
      <span v-if="value !== null"
        class="score-indicator__ring"
        :style="{ '--score': `${value * 3.6}deg` }"
      />
      <strong>{{ value ?? '—' }}</strong>
    </template>
    <template v-else>
      <span v-if="value !== null" class="score-indicator__track" aria-hidden="true"
        ><i :style="{ width: `${value}%` }"
      /></span>
      <strong>{{ value ?? '—' }}</strong>
    </template>
  </div>
</template>
<style scoped>
.score-indicator {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
  color: var(--color-text-secondary);
}
.score-indicator__ring {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background:
    radial-gradient(
      circle closest-side,
      var(--color-card-default) 82%,
      transparent 84%
    ),
    conic-gradient(
      var(--score-accent) var(--score),
      var(--color-border-default) 0
    );
}
.score-indicator__track {
  width: 64px;
  height: 4px;
  overflow: hidden;
  border-radius: var(--radius-2);
  background: var(--color-border-default);
}
.score-indicator__track i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--score-accent);
}
.score-indicator--brand { --score-accent: var(--color-brand-light); }
.score-indicator--amber { --score-accent: var(--color-accent-amber-light); }
.score-indicator--success { --score-accent: var(--color-state-success); }
.score-indicator strong {
  color: var(--color-text-primary);
  font: var(--font-weight-regular) var(--font-size-11)/1 var(--font-family-mono);
}
</style>
