<script setup lang="ts">
import {
  FAQSection,
  FeatureGridSection,
  FinalCtaSection,
  HeroSection,
  HowItWorksSection,
  PackagesSection,
  ProblemSection,
  ProductPreviewSection,
  SolutionOverviewSection,
  TeamSection,
  TrustMetricsSection,
} from '../components/sections';
import { landingContentEn as content } from '../content/landing/en';
</script>

<template>
  <div class="landing-page">
    <HeroSection
      :intro="content.hero.intro"
      :primary-action="content.hero.primaryAction"
      :secondary-action="content.hero.secondaryAction"
      variant="evidence-perspective"
    >
      <template #validation>
        <dl
          class="landing-page__hero-metrics"
          aria-label="Evidence metrics"
          data-testid="hero-validation-data-list"
        >
          <div v-for="metric in content.hero.metrics" :key="metric.label">
            <dt>{{ metric.value }}</dt>
            <dd>{{ metric.label }}</dd>
          </div>
        </dl>
      </template>
      <template #preview>
        <article
          class="landing-page__intelligence-preview"
          data-testid="account-intelligence-card"
        >
          <header>
            <strong>{{ content.hero.preview.account }}</strong>
            <span>{{ content.hero.preview.badge }}</span>
          </header>
          <div
            v-for="insight in content.hero.preview.insights"
            :key="insight.label"
            class="landing-page__insight"
            :data-testid="
              insight.text === 'INSUFFICIENT_DATA'
                ? 'hero-insufficient-data-card'
                : undefined
            "
          >
            <strong>{{ insight.label }}</strong>
            <p>{{ insight.text }}</p>
            <small v-if="insight.source">{{ insight.source }}</small>
          </div>
        </article>
      </template>
    </HeroSection>

    <ProblemSection
      :intro="content.problem.intro"
      :items="content.problem.items"
      :quote="content.problem.quote"
      :quote-attribution="content.problem.quoteAttribution"
      variant="split-with-quote"
    />
    <SolutionOverviewSection
      :intro="content.solution.intro"
      :items="content.solution.items"
      section-id="solution"
    />
    <HowItWorksSection
      :intro="content.method.intro"
      :steps="content.method.steps"
      section-id="method"
      variant="five-step-method"
    />
    <ProductPreviewSection
      :intro="content.principle.intro"
      :insights="content.previewInsights"
      section-id="principle"
      variant="principle-panel"
    />
    <TrustMetricsSection
      :intro="content.proof.intro"
      :metrics="content.proof.metrics"
    />
    <FeatureGridSection
      :intro="content.benefits.intro"
      :items="content.benefits.items"
      section-id="benefits"
      variant="two-column-grid"
    />
    <PackagesSection
      :intro="content.packages.intro"
      :packages="content.packages.packages"
      variant="featured-center"
    />
    <TeamSection
      :intro="content.team.intro"
      :members="content.team.members"
      section-id="team"
    />
    <FAQSection
      :intro="content.faq.intro"
      :items="content.faq.items"
      section-id="faq"
    />
    <FinalCtaSection
      :intro="content.finalCta.intro"
      :action="content.finalCta.action"
    />
  </div>
</template>

<style scoped>
.landing-page {
  overflow: hidden;
  background: var(--color-bg-default);
}

.landing-page > :deep(:nth-child(3)),
.landing-page > :deep(:nth-child(5)),
.landing-page > :deep(:nth-child(8)),
.landing-page > :deep(:nth-child(10)) {
  background: var(--color-bg-surface);
}

.landing-page :deep(section[id]) {
  scroll-margin-top: calc(var(--spacing-64) + var(--spacing-16));
}

.landing-page__intelligence-preview {
  display: flex;
  min-height: 0;
  flex-direction: column;
  overflow: hidden;
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background: var(--color-card-default);
}

.landing-page__intelligence-preview header,
.landing-page__insight {
  display: grid;
  gap: var(--spacing-8);
  padding: var(--spacing-16);
  border-bottom: var(--stroke-1) solid var(--color-border-default);
}

.landing-page__insight:last-child {
  border-bottom: 0;
}

.landing-page__intelligence-preview header {
  grid-template-columns: 1fr auto;
}

.landing-page__intelligence-preview header span,
.landing-page__insight strong,
.landing-page__principle-label {
  color: var(--color-accent-amber);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
}

.landing-page__insight p,
.landing-page__insight small {
  margin: 0;
}

.landing-page__insight small {
  color: var(--color-text-muted);
}

.landing-page__hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  width: 100%;
  margin: 0;
}

.landing-page__hero-metrics div {
  min-width: 0;
}

.landing-page__hero-metrics dt {
  color: var(--color-text-primary);
  font-size: var(--typography-heading-h4-font-size);
  font-weight: var(--font-weight-semibold);
}

.landing-page__hero-metrics dd {
  margin: var(--spacing-4) 0 0;
  color: var(--color-text-muted);
}

@media (max-width: 40rem) {
  .landing-page__hero-metrics {
    grid-template-columns: 1fr;
    gap: var(--spacing-16);
  }
}
</style>
