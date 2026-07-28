<script setup lang="ts">
import {
  WhyFinalCtaSection,
  WhyHeroSection,
  WhyImpactSection,
  WhyMissionSection,
  WhyPillarsSection,
  WhyPrincipleSection,
  WhyStorySection,
} from '../components/why';
import { whyContentEn } from '../content/why/en';
</script>

<template>
  <article class="why-page" :data-figma-frame="whyContentEn.source.desktopFrame">
    <div class="why-page__band">
      <WhyHeroSection :content="whyContentEn.hero" />
    </div>
    <div class="why-page__band">
      <WhyStorySection :content="whyContentEn.story" />
    </div>
    <div class="why-page__band">
      <WhyPrincipleSection :content="whyContentEn.principle" />
    </div>
    <div class="why-page__band why-page__band--surface">
      <WhyMissionSection :content="whyContentEn.mission" />
    </div>
    <div class="why-page__band">
      <WhyPillarsSection :content="whyContentEn.pillars" />
    </div>
    <div class="why-page__band why-page__band--surface">
      <WhyImpactSection :content="whyContentEn.impact" />
    </div>
    <div class="why-page__band">
      <WhyFinalCtaSection :content="whyContentEn.finalCta" />
    </div>
  </article>
</template>

<style scoped>
.why-page {
  background: var(--color-bg-default);
}

.why-page__band {
  display: grid;
  justify-content: center;
  background: var(--color-bg-default);
}

.why-page__band--surface {
  background: var(--color-bg-surface);
}

.why-page__band > :deep(*) {
  width: min(1180px, 100vw);
}
</style>
