<script setup lang="ts">
import { computed } from 'vue';

import {
  AppCard,
  AppSectionContainer,
} from '../../design-system/components/core';
import type { SectionIntro, TeamMember } from './section.types';

const props = withDefaults(
  defineProps<{
    intro: SectionIntro;
    members: TeamMember[];
    sectionId?: string;
  }>(),
  {
    sectionId: 'team',
  },
);

const headingTag = computed(() => `h${props.intro.headingLevel ?? 2}`);
</script>

<template>
  <AppSectionContainer :id="sectionId" class="landing-section team-section">
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
      <div class="landing-section__grid team-section__grid">
        <AppCard
          v-for="member in members"
          :key="member.name"
          class="team-section__card"
          :variant="member.highlighted ? 'selected' : 'default'"
        >
          <span class="team-section__initials" aria-hidden="true">
            {{ member.initials }}
          </span>
          <h3>{{ member.name }}</h3>
          <p class="team-section__role">{{ member.role }}</p>
          <p>{{ member.description }}</p>
        </AppCard>
      </div>
    </div>
  </AppSectionContainer>
</template>

<style scoped>
@import './sections.css';

.team-section__grid {
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, calc(var(--spacing-64) * 3)), 1fr)
  );
}

.team-section__card {
  align-content: start;
  min-height: calc(var(--spacing-64) * 4);
  padding: var(--spacing-24);
}

.team-section__initials {
  display: inline-grid;
  width: var(--spacing-48);
  height: var(--spacing-48);
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--color-brand-tint-900);
  color: var(--color-brand-light);
  font-weight: var(--font-weight-semibold);
}

.team-section__card h3,
.team-section__card p {
  margin: 0;
}

.team-section__role {
  color: var(--color-accent-amber);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
}
</style>
