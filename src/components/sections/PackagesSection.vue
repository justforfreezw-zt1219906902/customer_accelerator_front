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
          <template v-if="variant === 'developer-partner'">
            <div class="packages-section__partner-body">
              <div class="packages-section__preview" aria-label="Account Discovery prototype preview">
                <div class="packages-section__preview-image">
                  <img v-if="option.previewImage" :src="option.previewImage" alt="" />
                </div>
                <AppButton
                  v-if="option.action"
                  :href="option.action.href"
                  :variant="option.highlighted ? 'primary' : 'secondary'"
                  @click="emit('packageAction', option.name, $event)"
                >
                  {{ option.action.label }}
                </AppButton>
              </div>
              <div class="packages-section__partner-copy">
                <p class="packages-section__description">{{ option.description }}</p>
                <ul class="packages-section__features">
                  <li v-for="feature in option.features" :key="feature"><span aria-hidden="true">—</span>{{ feature }}</li>
                </ul>
              </div>
            </div>
          </template>
          <template v-else>
            <p class="packages-section__description">{{ option.description }}</p>
            <ul class="packages-section__features">
              <li v-for="feature in option.features" :key="feature">{{ feature }}</li>
            </ul>
          </template>
          <div class="packages-section__action">
            <div
              v-if="variant === 'developer-partner' && option.supportingNote"
              class="packages-section__supporting-message"
            >
              <p class="packages-section__supporting-note">{{ option.supportingNote }}</p>
            </div>
            <AppButton
              v-if="option.action && variant !== 'developer-partner'"
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
  align-items: center;
  justify-content: center;
  justify-items: center;
}
.packages-section--developer-partner .packages-section__card {
  width: min(980px, 100%);
  max-width: 980px;
  box-sizing: border-box;
  padding: 0;
  text-align: start;
  border: var(--stroke-2) solid var(--color-border-brand);
  border-radius: var(--radius-xl);
}
.packages-section--developer-partner .packages-section__card :deep(.app-card__body) {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: var(--spacing-24);
  height: auto;
  padding: var(--spacing-40);
  text-align: start;
}
.packages-section--developer-partner .packages-section__partner-body {
  display: grid;
  grid-template-columns: minmax(280px, 420px) minmax(0, 1fr);
  gap: var(--spacing-24);
  min-height: 315px;
  align-items: start;
}
.packages-section--developer-partner .packages-section__preview {
  display: grid;
  gap: var(--spacing-20);
  align-content: start;
  overflow: hidden;
}
.packages-section--developer-partner .packages-section__preview-image {
  display: grid;
  width: 420px;
  height: 220px;
  place-items: center;
  overflow: hidden;
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: var(--radius-sm, 8px);
  background: var(--color-bg-default);
}
.packages-section--developer-partner .packages-section__preview-image img {
  display: block;
  width: 400px;
  height: 190px;
  object-fit: contain;
}
.packages-section--developer-partner .packages-section__preview :deep(.app-button) {
  width: 284px;
  justify-self: center;
}
.packages-section--developer-partner .packages-section__partner-copy { display: grid; gap: var(--spacing-16); }
.packages-section--developer-partner .packages-section__features { gap: var(--spacing-8); }
.packages-section--developer-partner .packages-section__action {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
}
.packages-section--developer-partner .packages-section__action .packages-section__supporting-message { grid-column: 1; }
.packages-section--developer-partner .packages-section__supporting-note { margin: 0; color: var(--color-text-muted); font-size: var(--font-size-20); font-weight: var(--font-weight-semibold); line-height: 28px; }
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
  font-size: var(--font-size-16);
  line-height: 24px;
}
.packages-section--developer-partner .packages-section__features {
  display: grid;
  gap: var(--spacing-8);
  padding: 0;
  list-style: none;
}
.packages-section--developer-partner .packages-section__features li {
  display: flex;
  gap: var(--spacing-12);
  font-size: var(--font-size-16);
  line-height: 24px;
}
.packages-section--developer-partner .packages-section__features li span {
  color: var(--color-brand-primary);
  font-size: var(--font-size-19);
}
.packages-section--developer-partner .packages-section__action :deep(.app-button) {
  width: 100%;
  border-radius: var(--radius-md);
}
.packages-section--developer-partner .packages-section__supporting-note {
  color: var(--color-text-muted);
}
.packages-section--developer-partner .packages-section__supporting-message {
  display: flex;
  align-items: center;
  gap: var(--spacing-12);
  justify-content: center;
  width: 100%;
}
@media (max-width: 767px) {
  .packages-section--developer-partner { padding-block: var(--spacing-48); }
  .packages-section--developer-partner :deep(.landing-section__grid) { min-height: 0; }
  .packages-section--developer-partner .packages-section__card { min-height: 0; }
  .packages-section--developer-partner .packages-section__partner-body { grid-template-columns: 1fr; }
  .packages-section--developer-partner .packages-section__action { grid-column: auto; grid-row: auto; }
  .packages-section--developer-partner .packages-section__card :deep(.app-card__body) { padding: var(--spacing-24); }
}
</style>
