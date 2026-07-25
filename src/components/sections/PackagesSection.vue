<script setup lang="ts">
import { computed } from 'vue';

import {
  AppBadge,
  AppButton,
  AppCard,
  AppSectionContainer,
} from '../../design-system/components/core';
import type {
  PackageOption,
  SectionAction,
  SectionIntro,
} from './section.types';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    packages: PackageOption[];
    sectionId?: string;
    variant?: 'standard' | 'featured-center';
    sectionAction?: SectionAction;
  }>(),
  {
    sectionId: 'packages',
    variant: 'standard',
    sectionAction: undefined,
  },
);

const emit = defineEmits<{
  packageAction: [packageName: string, event: MouseEvent];
  sectionAction: [event: MouseEvent];
}>();

const headingTag = computed(() => `h${props.intro.headingLevel ?? 2}`);
</script>

<template>
  <AppSectionContainer
    :id="sectionId"
    class="landing-section packages-section"
    :class="`packages-section--${variant}`"
  >
    <div class="landing-section__content">
      <header class="landing-section__intro">
        <p v-if="intro.eyebrow" class="landing-section__eyebrow">
          {{ intro.eyebrow }}
        </p>
        <component :is="headingTag" class="landing-section__title">
          {{ intro.title }}
        </component>
        <p v-if="intro.description" class="landing-section__description">
          {{ intro.description }}
        </p>
      </header>
      <div class="landing-section__grid">
        <AppCard
          v-for="option in packages"
          :key="option.name"
          class="packages-section__card"
          :variant="option.highlighted ? 'selected' : 'default'"
        >
          <AppBadge v-if="option.badgeLabel" type="sourced">
            {{ option.badgeLabel }}
          </AppBadge>
          <h3>{{ option.name }}</h3>
          <p>{{ option.description }}</p>
          <ul>
            <li v-for="feature in option.features" :key="feature">
              {{ feature }}
            </li>
          </ul>
          <AppButton
            v-if="option.action"
            :href="option.action.href"
            :variant="option.highlighted ? 'primary' : 'secondary'"
            @click="emit('packageAction', option.name, $event)"
          >
            {{ option.action.label }}
          </AppButton>
        </AppCard>
      </div>
      <AppButton
        v-if="sectionAction"
        :href="sectionAction.href"
        @click="emit('sectionAction', $event)"
      >
        {{ sectionAction.label }}
      </AppButton>
    </div>
  </AppSectionContainer>
</template>

<style scoped>
@import './sections.css';

.packages-section__card {
  align-content: start;
}

.packages-section__card h3,
.packages-section__card p,
.packages-section__card ul {
  margin: 0;
  overflow-wrap: anywhere;
}

.packages-section__card p,
.packages-section__card li {
  color: var(--color-text-muted);
}

.packages-section__card ul {
  display: grid;
  gap: var(--spacing-8);
  padding-inline-start: var(--spacing-24);
}

.packages-section--featured-center
  :deep(.landing-section__grid > :nth-child(2)) {
  transform: translateY(calc(var(--spacing-12) * -1));
}
</style>
