<script setup lang="ts">
import { thankYouContentEn } from '../content/thank-you/en';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppSectionContainer,
} from '../design-system/components/core';
</script>

<template>
  <section class="thank-you-page" aria-labelledby="thank-you-page-title">
    <AppSectionContainer
      as="div"
      content-width="landing"
      divider="without-top-divider"
      class="thank-you-page__container"
    >
      <div class="thank-you-page__confirmation">
        <p class="thank-you-page__eyebrow">{{ thankYouContentEn.eyebrow }}</p>
        <h1
          id="thank-you-page-title"
          class="thank-you-page__title"
          data-page-heading
        >
          {{ thankYouContentEn.title }}
        </h1>
        <p class="thank-you-page__description">
          {{ thankYouContentEn.description }}
        </p>

        <div class="thank-you-page__badges" aria-label="Privacy assurances">
          <AppBadge type="sourced">
            {{ thankYouContentEn.badges[0] }}
          </AppBadge>
          <AppBadge type="neutral" :show-icon="false">
            {{ thankYouContentEn.badges[1] }}
          </AppBadge>
        </div>

        <p class="thank-you-page__privacy">
          {{ thankYouContentEn.privacyNote }}
        </p>

        <AppButton class="thank-you-page__home" href="/">
          {{ thankYouContentEn.backHomeLabel }}
        </AppButton>

        <div class="thank-you-page__contact">
          <p class="thank-you-page__contact-label">
            {{ thankYouContentEn.directContactLabel }}
          </p>
          <a :href="`mailto:${thankYouContentEn.directContactEmail}`">
            {{ thankYouContentEn.directContactEmail }}
          </a>
        </div>
      </div>

      <AppCard class="thank-you-page__next-steps">
        <h2>{{ thankYouContentEn.nextStepsTitle }}</h2>
        <p class="thank-you-page__next-steps-intro">
          {{ thankYouContentEn.nextStepsDescription }}
        </p>
        <ol class="thank-you-page__steps">
          <li
            v-for="step in thankYouContentEn.nextSteps"
            :key="step.number"
            class="thank-you-page__step"
          >
            <span class="thank-you-page__step-number" aria-hidden="true">
              {{ step.number }}
            </span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </li>
        </ol>
        <p class="thank-you-page__closing-note">
          {{ thankYouContentEn.closingNote }}
        </p>
      </AppCard>
    </AppSectionContainer>
  </section>
</template>

<style scoped>
.thank-you-page {
  min-height: 700px;
  background: var(--color-bg-default);
}

.thank-you-page__container {
  padding: 72px var(--content-padding-contact-desktop);
}

.thank-you-page__container :deep(.app-section-container__content) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 500px));
  gap: 64px;
  align-items: center;
  justify-content: start;
}

.thank-you-page__confirmation {
  display: grid;
  gap: 20px;
}

.thank-you-page__eyebrow,
.thank-you-page__contact-label,
.thank-you-page__step-number {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 1.2px;
}

.thank-you-page__title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 48px;
  line-height: 1.12;
  outline: none;
}

.thank-you-page__description {
  margin: 0;
  color: var(--color-text-primary);
  font-size: 17px;
  line-height: 1.55;
}

.thank-you-page__badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-8);
}

.thank-you-page__privacy,
.thank-you-page__next-steps-intro,
.thank-you-page__step p,
.thank-you-page__closing-note {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1.45;
}

.thank-you-page__home {
  width: 180px;
}

.thank-you-page__contact {
  display: grid;
  gap: 7px;
  padding-top: 22px;
  border-top: var(--stroke-1) solid var(--color-border-default);
}

.thank-you-page__contact-label {
  font-size: 11px;
  letter-spacing: normal;
}

.thank-you-page__contact a {
  width: fit-content;
  color: var(--color-text-primary);
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  text-decoration: none;
}

.thank-you-page__contact a:focus-visible {
  border-radius: var(--radius-sm);
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.thank-you-page__next-steps {
  display: grid;
  gap: 28px;
  padding: 36px;
  border-radius: 14px;
}

.thank-you-page__next-steps h2,
.thank-you-page__step h3 {
  margin: 0;
  color: var(--color-text-primary);
}

.thank-you-page__next-steps h2 {
  font-size: 24px;
}

.thank-you-page__steps {
  display: grid;
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.thank-you-page__step {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 16px;
}

.thank-you-page__step div {
  display: grid;
  gap: var(--spacing-8);
}

.thank-you-page__step h3 {
  font-size: 18px;
}

.thank-you-page__closing-note {
  font-size: 12px;
}

@media (max-width: 900px) {
  .thank-you-page {
    min-height: auto;
  }

  .thank-you-page__container {
    padding: var(--spacing-48) var(--content-padding-mobile);
  }

  .thank-you-page__container :deep(.app-section-container__content) {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--spacing-48);
  }

  .thank-you-page__title {
    font-size: clamp(36px, 10vw, 48px);
  }
}

@media (max-width: 480px) {
  .thank-you-page__container {
    padding-block: var(--spacing-32);
  }

  .thank-you-page__next-steps {
    padding: var(--spacing-24);
  }
}
</style>
