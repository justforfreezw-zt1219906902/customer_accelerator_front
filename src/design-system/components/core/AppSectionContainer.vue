<script setup lang="ts">
import { computed } from 'vue';

type SectionStyle = 'default' | 'elevated' | 'light-context' | 'bleed';
type Divider = 'default' | 'with-top-divider' | 'without-top-divider';
type ContentWidth = 'full' | 'landing';

const props = withDefaults(
  defineProps<{
    style?: SectionStyle;
    divider?: Divider;
    contentWidth?: ContentWidth;
    as?: 'section' | 'div' | 'main' | 'aside';
  }>(),
  {
    style: 'default',
    divider: 'default',
    contentWidth: 'full',
    as: 'section',
  },
);

const theme = computed(() =>
  props.style === 'light-context' ? 'light-impact' : undefined,
);
const showDivider = computed(() => props.divider !== 'without-top-divider');
</script>

<template>
  <component
    :is="as"
    class="app-section-container"
    :class="[
      `app-section-container--${style}`,
      `app-section-container--content-${contentWidth}`,
    ]"
    :data-theme="theme"
  >
    <div v-if="showDivider" class="app-section-container__divider" />
    <div class="app-section-container__content">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.app-section-container {
  display: grid;
  gap: var(--spacing-48);
  width: 100%;
  padding-block: clamp(var(--spacing-48), 8vw, var(--spacing-96));
  padding-inline: clamp(var(--spacing-24), 6vw, var(--spacing-64));
  color: var(--color-text-primary);
  background: var(--color-bg-default);
}

.app-section-container--elevated {
  background: var(--color-surface-default);
}

.app-section-container--light-context {
  background: var(--color-bg-default);
}

.app-section-container--bleed {
  padding: var(--spacing-48) var(--spacing-24);
}

.app-section-container__divider {
  width: 100%;
  height: var(--stroke-1);
  background: var(--color-border-subtle);
}

.app-section-container__content {
  width: 100%;
  min-width: 0;
}

.app-section-container--content-landing .app-section-container__content {
  max-width: var(--content-max-width-landing);
  margin-inline: auto;
}
</style>
