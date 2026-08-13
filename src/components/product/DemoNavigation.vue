<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { routeNames } from '../../router/routes';

const props = defineProps<{ accountCount?: number }>();
defineEmits<{ navigate: [] }>();

const route = useRoute();
const groups = [
  {
    label: 'INTELLIGENCE',
    items: [
      { label: 'Account Discovery', name: routeNames.demoDiscovery },
      { label: 'Signal Pulse', name: routeNames.demoSignals },
      { label: 'Communication DNA', name: routeNames.demoDna },
    ],
  },
  {
    label: 'ACTIVATE',
    items: [
      { label: 'Content Studio', name: routeNames.demoContentStudio },
      { label: 'Campaigns', disabled: true },
    ],
  },
  {
    label: 'SETTINGS',
    items: [
      { label: 'Company Profile', disabled: true },
      { label: 'ICP Configuration', disabled: true },
      { label: 'Data Integration', disabled: true },
    ],
  },
] as const;

const activeName = computed(() => route.name);
const discoveryCountFor = (label: string) =>
  label === 'Account Discovery' ? props.accountCount : undefined;
</script>

<template>
  <nav class="demo-navigation" aria-label="Product navigation">
    <section
      v-for="group in groups"
      :key="group.label"
      class="demo-navigation__group"
    >
      <h2>{{ group.label }}</h2>
      <template v-for="item in group.items" :key="item.label">
        <span
          v-if="'disabled' in item"
          class="demo-navigation__item is-disabled"
          aria-disabled="true"
        >
          <span class="demo-navigation__label">{{ item.label }}</span>
        </span>
        <RouterLink
          v-else
          class="demo-navigation__item"
          :class="{ 'is-active': activeName === item.name }"
          :to="{ name: item.name }"
          :aria-current="activeName === item.name ? 'page' : undefined"
          @click="$emit('navigate')"
        >
          <span class="demo-navigation__marker" aria-hidden="true" />
          <span class="demo-navigation__label">{{ item.label }}</span>
          <span
            v-if="discoveryCountFor(item.label) !== undefined"
            class="demo-navigation__count"
            :aria-label="`${discoveryCountFor(item.label)} accounts`"
            >{{ discoveryCountFor(item.label) }}</span
          >
        </RouterLink>
      </template>
    </section>
  </nav>
</template>

<style scoped>
.demo-navigation {
  display: grid;
  gap: var(--spacing-12);
}
.demo-navigation__group {
  display: grid;
  gap: 5px;
}
.demo-navigation__group h2 {
  margin: 0;
  color: var(--color-text-muted);
  font: var(--font-weight-medium) var(--font-size-9)/1.4 var(--font-family-mono);
}
.demo-navigation__item {
  display: flex;
  min-height: 40px;
  align-items: center;
  gap: var(--spacing-10);
  padding: var(--spacing-10) var(--spacing-12);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-size: var(--font-size-13);
  text-decoration: none;
}
.demo-navigation__item.is-active {
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}
.demo-navigation__marker {
  width: 3px;
  height: 18px;
  border-radius: var(--radius-2);
  background: transparent;
}
.is-active .demo-navigation__marker {
  background: var(--color-brand-core);
}
.demo-navigation__item.is-disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}
.demo-navigation__item:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}
.demo-navigation__label {
  min-width: 0;
  flex: 1;
}
.demo-navigation__count {
  display: grid;
  min-width: 22px;
  height: 20px;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--color-bg-default);
  color: var(--color-text-secondary);
  font: var(--font-size-9)/1 var(--font-family-mono);
}
</style>
