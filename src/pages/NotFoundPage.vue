<script setup lang="ts">
import { AppButton } from '../design-system/components/core';
</script>

<template>
  <article class="not-found-page">
    <div class="not-found-page__content">
      <p class="not-found-page__eyebrow">404</p>
      <h1 data-page-heading>Page not found</h1>
      <p class="not-found-page__description">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <AppButton href="/">BACK TO HOME</AppButton>
    </div>
  </article>
</template>

<style scoped>
.not-found-page {
  display: grid;
  min-height: clamp(28rem, 64vh, 48rem);
  place-items: center;
  padding: var(--spacing-64) var(--spacing-24);
  background:
    radial-gradient(
      circle at 50% 35%,
      color-mix(in srgb, var(--color-brand-primary) 14%, transparent),
      transparent 42%
    ),
    var(--color-bg-default);
}

.not-found-page__content {
  display: grid;
  justify-items: start;
  gap: var(--spacing-24);
  width: min(100%, 42rem);
}

.not-found-page__eyebrow,
.not-found-page h1,
.not-found-page__description {
  margin: 0;
}

.not-found-page__eyebrow {
  color: var(--color-brand-light);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
  letter-spacing: var(--typography-label-mono-kicker-letter-spacing);
}

.not-found-page h1 {
  font-size: clamp(
    var(--typography-heading-h2-font-size),
    7vw,
    var(--typography-display-hero-font-size)
  );
  line-height: 1.05;
}

.not-found-page__description {
  max-width: 34rem;
  color: var(--color-text-muted);
  font-size: var(--typography-body-lg-font-size);
  line-height: var(--typography-body-lg-line-height);
}

@media (max-width: 40rem) {
  .not-found-page {
    min-height: 60vh;
    padding-inline: var(--spacing-16);
  }
}
</style>
