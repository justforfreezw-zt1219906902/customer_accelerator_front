<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  DataStatusBadge,
  DnaEvidenceCard,
  FrequencyBadge,
} from '../../components/product';
import { AppButton } from '../../design-system/components/core';
import { demoAccountProvider } from '../../demo/demoAccountProvider';
import type { DemoDnaSource } from '../../demo/types';
import { useDemoAccount } from '../../demo/useDemoAccount';

const router = useRouter();
const { account, accountId } = useDemoAccount();
const dna = computed(() =>
  demoAccountProvider.findCommunicationDna(accountId.value),
);
const isCompleteUrl = (url?: string) => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
};
const generate = () =>
  router.push({
    path: '/demo/content-studio',
    query: { account: accountId.value },
  });
const back = () => router.push(`/demo/accounts/${accountId.value}`);
const sourceLabel = (source: DemoDnaSource) => `Open ${source.label} source`;
</script>

<template>
  <section
    v-if="!account"
    class="account-not-found"
    aria-labelledby="dna-not-found-title"
  >
    <h1 id="dna-not-found-title" data-page-heading>Account not found</h1>
    <p>The requested demo account is unavailable.</p>
    <RouterLink to="/demo">Return to Account Discovery</RouterLink>
  </section>
  <section v-else class="dna-page" aria-labelledby="dna-title">
    <article class="dna-page__hero">
      <div class="dna-page__identity">
        <span aria-hidden="true">{{ account.name.charAt(0) }}</span>
        <div>
          <p>ACCOUNT INTELLIGENCE / COMMUNICATION DNA</p>
          <h1 id="dna-title" data-page-heading>
            Communication DNA — {{ account.name }}
          </h1>
          <p>
            How {{ account.name }} thinks, speaks, argues, proves, and calls to
            action.
          </p>
        </div>
      </div>
      <div class="dna-page__actions">
        <AppButton @click="generate">Generate Mirrored Content</AppButton
        ><AppButton variant="secondary" disabled>Export DNA Report</AppButton
        ><AppButton variant="ghost" @click="back">← Back</AppButton>
      </div>
    </article>

    <template v-if="dna">
      <div class="dna-page__grid">
        <DnaEvidenceCard title="Tone" :status="dna.tone.status"
          ><dl class="dna-page__facts">
            <div>
              <dt>PRIMARY</dt>
              <dd>{{ dna.tone.primary }}</dd>
            </div>
            <div>
              <dt>SECONDARY</dt>
              <dd>{{ dna.tone.secondary }}</dd>
            </div>
          </dl>
          <p>{{ dna.tone.description }}</p>
          <a
            :href="dna.tone.sources[0].url"
            target="_blank"
            rel="noopener noreferrer"
            >Sources: {{ dna.tone.sources[0].label }}</a
          ></DnaEvidenceCard
        >
        <DnaEvidenceCard title="Vocabulary" status="DERIVED"
          ><ul class="dna-page__vocabulary">
            <li v-for="item in dna.vocabulary" :key="item.term">
              <div>
                <strong>{{ item.term }}</strong
                ><small>{{ item.context }}</small
                ><FrequencyBadge :level="item.frequency" />
              </div>
              <a
                :href="item.source.url"
                target="_blank"
                rel="noopener noreferrer"
                >↗ {{ item.source.label }}</a
              >
            </li>
          </ul></DnaEvidenceCard
        >
        <DnaEvidenceCard
          title="Value Propositions"
          :status="dna.valueProposition.status"
          ><blockquote>{{ dna.valueProposition.quote }}</blockquote>
          <a
            :href="dna.valueProposition.sources[0].url"
            target="_blank"
            rel="noopener noreferrer"
            >↗ {{ dna.valueProposition.sources[0].label }}</a
          ></DnaEvidenceCard
        >
        <DnaEvidenceCard
          title="Problem Framing"
          :status="dna.problemFraming.status"
          ><p>{{ dna.problemFraming.description }}</p>
          <blockquote>{{ dna.problemFraming.quote }}</blockquote>
          <a
            :href="dna.problemFraming.sources[0].url"
            target="_blank"
            rel="noopener noreferrer"
            >{{ dna.problemFraming.sources[0].label }}</a
          ></DnaEvidenceCard
        >
        <DnaEvidenceCard title="Proof Style" :status="dna.proofStyle.status"
          ><dl class="dna-page__facts">
            <div>
              <dt>PRIMARY</dt>
              <dd>{{ dna.proofStyle.primary }}</dd>
            </div>
            <div>
              <dt>SECONDARY</dt>
              <dd>{{ dna.proofStyle.secondary }}</dd>
            </div>
          </dl>
          <p>{{ dna.proofStyle.description }}</p>
          <a
            :href="dna.proofStyle.sources[0].url"
            target="_blank"
            rel="noopener noreferrer"
            >{{ dna.proofStyle.sources[0].label }}</a
          ></DnaEvidenceCard
        >
        <DnaEvidenceCard title="CTA Patterns" :status="dna.ctaPatterns.status"
          ><dl class="dna-page__facts">
            <div>
              <dt>Style</dt>
              <dd>{{ dna.ctaPatterns.style }}</dd>
            </div>
          </dl>
          <p>{{ dna.ctaPatterns.description }}</p>
          <div class="dna-page__tags">
            <span v-for="example in dna.ctaPatterns.examples" :key="example">{{
              example
            }}</span>
          </div>
          <a
            :href="dna.ctaPatterns.sources[0].url"
            target="_blank"
            rel="noopener noreferrer"
            >↗ {{ dna.ctaPatterns.sources[0].label }}</a
          ></DnaEvidenceCard
        >
        <DnaEvidenceCard
          title="Recurring Phrases"
          :status="dna.recurringPhrases.status"
          ><p>{{ dna.recurringPhrases.description }}</p>
          <blockquote>{{ dna.recurringPhrases.quote }}</blockquote>
          <a
            :href="dna.recurringPhrases.sources[0].url"
            target="_blank"
            rel="noopener noreferrer"
            >{{ dna.recurringPhrases.sources[0].label }}</a
          ></DnaEvidenceCard
        >
      </div>

      <article class="dna-page__mirroring">
        <header>
          <h2>Mirroring Guidelines</h2>
          <DataStatusBadge status="DERIVED" />
        </header>
        <div>
          <section>
            <h3>DO</h3>
            <ul>
              <li v-for="item in dna.mirroring.do" :key="item">{{ item }}</li>
            </ul>
          </section>
          <section>
            <h3>DON’T</h3>
            <ul>
              <li v-for="item in dna.mirroring.dont" :key="item">{{ item }}</li>
            </ul>
          </section>
        </div>
      </article>

      <section class="dna-page__sources" aria-labelledby="all-sources-title">
        <header>
          <h2 id="all-sources-title">All Sources</h2>
          <small>Verify any claim by checking the original source</small>
        </header>
        <div class="dna-page__source-summary">
          <article
            v-for="item in [
              dna.tone,
              dna.valueProposition,
              dna.problemFraming,
              dna.proofStyle,
              dna.ctaPatterns,
            ]"
            :key="item.sources[0].label + item.status"
          >
            <div>
              <strong>{{
                item === dna.tone
                  ? 'Tone & Vocabulary'
                  : item === dna.valueProposition
                    ? 'Value Propositions'
                    : item === dna.problemFraming
                      ? 'Problem Framing'
                      : item === dna.proofStyle
                        ? 'Proof Style'
                        : 'CTA Patterns'
              }}</strong
              ><DataStatusBadge :status="item.status" />
            </div>
            <a
              :href="item.sources[0].url"
              target="_blank"
              rel="noopener noreferrer"
              >↗ {{ item.sources[0].label }}</a
            >
          </article>
        </div>
        <article class="dna-page__buying-sources">
          <header>
            <div>
              <h3>Buying Signals</h3>
              <p>14 verified sources used in the account signal analysis</p>
            </div>
            <DataStatusBadge status="SOURCE_BACKED" />
          </header>
          <ul>
            <li v-for="source in dna.buyingSignalSources" :key="source.url">
              <a
                v-if="isCompleteUrl(source.url)"
                :href="source.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="sourceLabel(source)"
                >↗ {{ source.label }}</a
              ><span v-else>{{ source.label }}</span
              ><small>{{ source.kind }}</small>
            </li>
          </ul>
        </article>
      </section>
    </template>
    <article v-else class="dna-page__insufficient">
      <DataStatusBadge status="INSUFFICIENT_DATA" />
      <h2>Communication DNA is not available</h2>
      <p>
        This demo account does not have enough approved source evidence for a
        complete profile.
      </p>
    </article>
  </section>
</template>

<style scoped>
.dna-page {
  display: grid;
  width: 100%;
  gap: var(--spacing-20);
  padding: var(--spacing-24);
  box-sizing: border-box;
}
.dna-page__hero {
  display: grid;
  min-height: 220px;
  align-content: center;
  gap: var(--spacing-22);
  padding: var(--spacing-28);
  border: 1px solid var(--color-border-brand);
  border-radius: var(--radius-lg);
  background: var(--color-card-highlighted);
  box-shadow: 0 0 24px var(--color-shadow-glow-violet-soft);
}
.dna-page__identity {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
}
.dna-page__identity > span {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  flex: 0 0 44px;
  border: 1px solid var(--color-border-brand);
  border-radius: var(--radius-10);
  background: var(--color-brand-tint-50);
  color: var(--color-brand-light);
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-semibold);
}
.dna-page__identity p,
.dna-page__identity h1 {
  margin: 0;
}
.dna-page__identity div {
  display: grid;
  gap: 5px;
}
.dna-page__identity div > p:first-child {
  color: var(--color-brand-light);
  font: var(--font-size-11)/1.3 var(--font-family-mono);
}
.dna-page__identity h1 {
  font-size: var(--font-size-28);
}
.dna-page__identity div > p:last-child {
  color: var(--color-text-secondary);
  font-size: var(--font-size-15);
}
.dna-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-12);
}
.dna-page__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-20);
}
.dna-page__grid > * {
  min-height: 236px;
}
.dna-page__grid > :nth-child(7) {
  grid-column: 1;
}
.dna-page__facts {
  display: grid;
  gap: var(--spacing-10);
  margin: 0;
}
.dna-page__facts dt {
  color: var(--color-brand-light);
  font: var(--font-size-10)/1.4 var(--font-family-mono);
}
.dna-page__facts dd {
  margin: var(--spacing-3) 0 0;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
}
.dna-page p,
.dna-page blockquote {
  margin: 0;
}
.dna-page blockquote {
  padding-left: var(--spacing-10);
  border-left: 2px solid var(--color-brand-light);
  color: var(--color-text-primary);
}
.dna-page a {
  color: var(--color-brand-light);
  font-size: var(--font-size-11);
}
.dna-page__vocabulary {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}
.dna-page__vocabulary li {
  display: grid;
  gap: var(--spacing-7);
  padding: var(--spacing-10) 0;
  border-bottom: 1px solid var(--color-border-subtle);
}
.dna-page__vocabulary li > div {
  display: flex;
  align-items: center;
  gap: var(--spacing-7);
}
.dna-page__vocabulary strong {
  min-width: 150px;
  color: var(--color-brand-light);
}
.dna-page__vocabulary small {
  flex: 1;
}
.dna-page__tags {
  display: flex;
  gap: var(--spacing-8);
}
.dna-page__tags span {
  padding: var(--spacing-5) var(--spacing-8);
  border: 1px solid var(--color-border-brand);
  color: var(--color-brand-light);
  font-size: var(--font-size-11);
}
.dna-page__mirroring {
  padding: var(--spacing-20);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.dna-page__mirroring > header,
.dna-page__sources > header,
.dna-page__buying-sources > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-12);
}
.dna-page__mirroring h2,
.dna-page__sources h2,
.dna-page__buying-sources h3 {
  margin: 0;
}
.dna-page__mirroring > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-20);
  margin-top: var(--spacing-14);
}
.dna-page__mirroring section {
  padding: var(--spacing-14);
  border-radius: var(--radius-sm);
}
.dna-page__mirroring section:first-child {
  background: var(--color-state-success-subtle);
}
.dna-page__mirroring section:last-child {
  background: var(--color-state-error-subtle);
}
.dna-page__mirroring h3 {
  margin: 0 0 var(--spacing-8);
  font: var(--font-size-10)/1.2 var(--font-family-mono);
}
.dna-page__mirroring ul {
  margin: 0;
  padding-left: var(--spacing-18);
  font-size: var(--font-size-12);
  line-height: 1.8;
}
.dna-page__sources {
  display: grid;
  gap: var(--spacing-14);
  padding: var(--spacing-20);
  border: 1px dashed var(--color-border-brand);
  border-radius: var(--radius-md);
}
.dna-page__sources > header small {
  color: var(--color-text-muted);
}
.dna-page__source-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-12);
}
.dna-page__source-summary article,
.dna-page__buying-sources {
  padding: var(--spacing-14);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-surface);
}
.dna-page__source-summary article > div {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-8);
  margin-bottom: var(--spacing-10);
}
.dna-page__source-summary strong {
  color: var(--color-text-secondary);
  font-size: var(--font-size-12);
}
.dna-page__buying-sources header p {
  margin-top: var(--spacing-8);
  color: var(--color-text-muted);
  font-size: var(--font-size-11);
}
.dna-page__buying-sources ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 var(--spacing-20);
  margin: var(--spacing-10) 0 0;
  padding: 0;
  list-style: none;
}
.dna-page__buying-sources li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px;
  gap: var(--spacing-12);
  padding: var(--spacing-8) 0;
  border-bottom: 1px solid var(--color-border-subtle);
}
.dna-page__buying-sources small {
  color: var(--color-text-muted);
}
.dna-page__insufficient,
.account-not-found {
  margin: var(--spacing-24);
  padding: var(--spacing-24);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.account-not-found a {
  color: var(--color-brand-light);
}
@media (max-width: 900px) {
  .dna-page__grid,
  .dna-page__mirroring > div,
  .dna-page__source-summary,
  .dna-page__buying-sources ul {
    grid-template-columns: 1fr;
  }
  .dna-page__grid > :nth-child(7) {
    grid-column: auto;
  }
}
@media (max-width: 767px) {
  .dna-page {
    padding: var(--spacing-16);
  }
  .dna-page__hero {
    padding: var(--spacing-20);
  }
  .dna-page__identity {
    align-items: flex-start;
  }
  .dna-page__identity h1 {
    font-size: var(--font-size-24);
  }
  .dna-page__buying-sources li {
    grid-template-columns: 1fr;
  }
  .dna-page__actions :deep(.app-button) {
    width: 100%;
  }
}
</style>
