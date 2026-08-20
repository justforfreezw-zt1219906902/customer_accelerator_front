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
    variant?: 'standard' | 'featured-center' | 'developer-partner';
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
          <div
            v-if="variant !== 'developer-partner'"
            class="packages-section__badge-region"
            :aria-hidden="option.badgeLabel ? undefined : 'true'"
          >
            <AppBadge v-if="option.badgeLabel" type="sourced">
              {{ option.badgeLabel }}
            </AppBadge>
          </div>
          <div class="packages-section__heading">
            <h3>{{ option.name }}</h3>
            <p v-if="option.price" class="packages-section__price">
              {{ option.price }}
              <span v-if="option.priceQualifier">{{
                option.priceQualifier
              }}</span>
            </p>
          </div>
          <p class="packages-section__description">{{ option.description }}</p>
          <ul class="packages-section__features">
            <li v-for="feature in option.features" :key="feature">
              <template v-if="variant === 'developer-partner'"><span aria-hidden="true">—</span>{{ feature }}</template>
              <template v-else>{{ feature }}</template>
            </li>
          </ul>
          <div class="packages-section__action">
            <AppButton
              v-if="option.action"
              :href="option.action.href"
              :variant="option.highlighted ? 'primary' : 'secondary'"
              @click="emit('packageAction', option.name, $event)"
            >
              {{ option.action.label }}
            </AppButton>
          </div>
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
  height: 100%;
  align-content: stretch;
}

.packages-section__card :deep(.app-card__body) {
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
  gap: var(--spacing-32);
  height: 100%;
}

.packages-section__badge-region {
  display: flex;
  min-height: 30px;
  align-items: center;
}

.packages-section__badge-region :deep(.app-badge) {
  width: 100%;
}

.packages-section__heading {
  display: grid;
  gap: var(--spacing-16);
}

.packages-section__card h3,
.packages-section__card .packages-section__price,
.packages-section__card p,
.packages-section__card ul {
  margin: 0;
  overflow-wrap: anywhere;
}

.packages-section__features {
  align-content: start;
}

.packages-section__action {
  display: flex;
  align-items: end;
}

.packages-section__action :deep(.app-button) {
  width: 100%;
}

.packages-section__price {
  color: var(--color-text-primary) !important;
  font-size: var(--typography-heading-h2-font-size);
  font-weight: var(--font-weight-semibold);
}

.packages-section__price span {
  color: var(--color-text-muted);
  font-size: var(--typography-body-sm-font-size);
  font-weight: var(--font-weight-regular);
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

.packages-section--featured-center :deep(.landing-section__grid) {
  align-items: stretch;
}

.packages-section--developer-partner {
  padding-block: var(--spacing-76, 76px);
}
.packages-section--developer-partner :deep(.landing-section__content) {
  gap: var(--spacing-34, 34px);
}
.packages-section--developer-partner .landing-section__intro {
  width: 100%;
  max-width: none;
}
.packages-section--developer-partner :deep(.landing-section__grid) {
  min-height: 780px;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
.packages-section--developer-partner .packages-section__card {
  width: min(520px, 100%);
  min-height: 732px;
  box-sizing: border-box;
  padding: 0;
  text-align: start;
  border: var(--stroke-2) solid var(--color-border-brand);
  border-radius: var(--radius-xl);
}
.packages-section--developer-partner .packages-section__card :deep(.app-card__body) {
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
  gap: var(--spacing-32);
  height: 100%;
  padding: var(--spacing-48);
  text-align: start;
}
.packages-section--developer-partner .packages-section__heading { gap: var(--spacing-10); }
.packages-section--developer-partner .packages-section__heading h3 {
  font-size: var(--font-size-28);
  line-height: 36px;
}
.packages-section--developer-partner .packages-section__price {
  font-size: var(--font-size-44);
  line-height: 54px;
}
.packages-section--developer-partner .packages-section__description {
  color: var(--color-text-muted);
  font-size: var(--font-size-21);
  line-height: 32px;
}
.packages-section--developer-partner .packages-section__features {
  display: grid;
  gap: var(--spacing-24);
  padding: 0;
  list-style: none;
}
.packages-section--developer-partner .packages-section__features li {
  display: flex;
  gap: var(--spacing-12);
  font-size: var(--font-size-18);
  line-height: 29px;
}
.packages-section--developer-partner .packages-section__features li span {
  color: var(--color-brand-primary);
  font-size: var(--font-size-19);
}
.packages-section--developer-partner .packages-section__action :deep(.app-button) {
  width: 100%;
  border-radius: var(--radius-md);
}
@media (max-width: 767px) {
  .packages-section--developer-partner { padding-block: var(--spacing-48); }
  .packages-section--developer-partner :deep(.landing-section__grid) { min-height: 0; }
  .packages-section--developer-partner .packages-section__card { min-height: 0; }
  .packages-section--developer-partner .packages-section__card :deep(.app-card__body) { padding: var(--spacing-24); }
}
</style>
