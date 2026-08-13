<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AppMetricCard, TierBadge } from '../../components/product';
import {
  AppButton,
  AppSourceAttributionChip,
} from '../../design-system/components/core';
import { useDemoAccount } from '../../demo/useDemoAccount';
import type { DemoSignalCategory } from '../../demo/types';
import { getRuntimeConfig } from '../../app/configuration/environment';
import { getAccount, getAccountSignals } from '../../services/accountApi';
import type { AccountDetailDto, AccountSignalDto } from '../../types/accountApi';
import { ApiRequestError } from '../../utils/apiErrors';

const router = useRouter();
const { account, accountId } = useDemoAccount();
const apiMode = getRuntimeConfig().demoDataSource === 'api';
const apiAccount = ref<AccountDetailDto>();
const apiSignals = ref<AccountSignalDto[]>([]);
const apiLoading = ref(apiMode);
const apiError = ref('');
const apiNotFound = ref(false);
const apiSignalsError = ref('');
const loadApi = async () => {
  if (!apiMode) return;
  const controller = new AbortController();
  try {
    const detail = await getAccount(accountId.value, controller.signal);
    apiAccount.value = {
      ...detail,
      activeSignalCount: 0,
    };
    try { apiSignals.value = (await getAccountSignals(accountId.value, controller.signal)).items; }
    catch { apiSignalsError.value = 'Buying Signals are unavailable right now.'; }
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 404) apiNotFound.value = true;
    else apiError.value = 'Account data is unavailable right now.';
  } finally {
    apiLoading.value = false;
  }
};
onMounted(loadApi);
const retrySignals = async () => {
  apiSignalsError.value = '';
  try { apiSignals.value = (await getAccountSignals(accountId.value)).items; }
  catch { apiSignalsError.value = 'Buying Signals are unavailable right now.'; }
};
const signalFilter = ref<'all' | DemoSignalCategory>('all');
const signals = computed(() => account.value?.overview?.buyingSignals ?? []);
const visibleSignals = computed(() =>
  signalFilter.value === 'all'
    ? signals.value
    : signals.value.filter((signal) => signal.category === signalFilter.value),
);
const categoryCount = (category: DemoSignalCategory) =>
  signals.value.filter((signal) => signal.category === category).length;
const isCompleteUrl = (url?: string) => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
};
</script>

<template>
  <section
    v-if="apiMode && apiLoading"
    class="account-not-found"
    aria-live="polite"
  >
    <h1 data-page-heading>Loading account intelligence…</h1>
  </section>
  <section v-else-if="apiMode && apiNotFound" class="account-not-found" role="alert">
    <h1 data-page-heading>Account not found</h1><p>The requested account is unavailable.</p>
    <RouterLink to="/demo">Return to Account Discovery</RouterLink>
  </section>
  <section
    v-else-if="apiMode && apiError"
    class="account-not-found"
    role="alert"
  >
    <h1 data-page-heading>Account data unavailable</h1>
    <p>{{ apiError }}</p><button type="button" @click="loadApi">Retry</button>
    <RouterLink to="/demo">Return to Account Discovery</RouterLink>
  </section>
  <section v-else-if="apiMode && apiAccount" class="overview-page api-overview" aria-labelledby="api-overview-title">
    <header class="overview-page__header"><div class="overview-page__company">
      <strong>{{ apiAccount.name }}</strong>
      <span>{{ [apiAccount.industry, apiAccount.hq, apiAccount.employees === null ? null : `${apiAccount.employees} employees`, apiAccount.revenue?.amountM == null ? null : `${apiAccount.revenue.currency ?? ''} ${apiAccount.revenue.amountM}M`, apiAccount.analysis?.tier].filter(Boolean).join(' · ') }}</span>
      <h1 id="api-overview-title" data-page-heading>{{ apiAccount.name }} Account Overview</h1>
    </div><div class="overview-page__actions"><AppButton variant="secondary" size="sm" @click="router.push(`/demo/accounts/${accountId}/dna`)">View Communication DNA</AppButton><AppButton size="sm" disabled title="Content Studio is fixture-only">Generate Content</AppButton></div></header>
    <p v-if="apiAccount.description" class="overview-page__summary">{{ apiAccount.description }}</p>
    <div class="overview-page__metrics"><AppMetricCard label="ICP Fit" :value="apiAccount.analysis?.icpScore ?? 'INSUFFICIENT DATA'" tone="brand"/><AppMetricCard label="Signal Score" :value="apiAccount.analysis?.signalScore ?? 'INSUFFICIENT DATA'"/><AppMetricCard label="Resonance" :value="apiAccount.analysis?.resonanceScore ?? 'INSUFFICIENT DATA'"/></div>
    <div v-if="apiAccount.analysis" class="overview-page__reasons"><article><span>WHY THIS ACCOUNT</span><p>{{ apiAccount.analysis.whyThisAccount ?? 'INSUFFICIENT DATA' }}</p></article><article><span>WHY NOW</span><p>{{ apiAccount.analysis.whyNow ?? 'INSUFFICIENT DATA' }}</p></article></div>
    <article v-if="apiAccount.analysis?.nextBestAction" class="overview-page__next"><span>NEXT BEST ACTION</span><h2>{{ apiAccount.analysis.nextBestAction.action }}</h2><p>{{ apiAccount.analysis.nextBestAction.rationale ?? 'INSUFFICIENT DATA' }}</p><dl><div><dt>Window</dt><dd>{{ apiAccount.analysis.nextBestAction.timeWindow ?? 'INSUFFICIENT DATA' }}</dd></div><div><dt>Priority</dt><dd>{{ apiAccount.analysis.nextBestAction.priority ?? 'INSUFFICIENT DATA' }}</dd></div></dl></article>
    <section class="overview-page__signals" aria-labelledby="api-signals-title"><header><div><h2 id="api-signals-title">Buying Signals</h2><p>{{ apiSignals.length }} signals returned by the API</p></div><TierBadge :tier="apiAccount.analysis?.tier ?? null"/></header><p v-if="apiSignalsError" role="alert">{{ apiSignalsError }} <button type="button" @click="retrySignals">Retry Signals</button></p><div v-else-if="apiSignals.length" class="overview-page__signal-list"><article v-for="signal in apiSignals" :key="signal.id" class="overview-page__signal"><header><div><span>{{ signal.type }}</span><h3>{{ signal.title }}</h3></div><time>{{ signal.freshnessLabel ?? signal.signalDate ?? 'Not available' }}</time></header><strong>{{ signal.evidenceStatus }} · {{ signal.verified ? 'Verified' : 'Not verified' }} · {{ signal.isActive ? 'Active' : 'Inactive' }}</strong><p>{{ signal.body ?? 'Not available' }}</p><a v-if="isCompleteUrl(signal.source?.url)" :href="signal.source!.url" target="_blank" rel="noopener noreferrer">{{ signal.source?.name ?? 'Open source' }}</a><AppSourceAttributionChip v-else :source="signal.source?.name ?? 'Source unavailable'"/></article></div><p v-else>No buying signals are available for this account.</p></section>
  </section>
  <section
    v-else-if="!account"
    class="account-not-found"
    aria-labelledby="account-not-found-title"
  >
    <h1 id="account-not-found-title" data-page-heading>Account not found</h1>
    <p>The requested demo account is unavailable.</p>
    <RouterLink to="/demo">Return to Account Discovery</RouterLink>
  </section>
  <section v-else class="overview-page" aria-labelledby="overview-title">
    <header class="overview-page__header">
      <div class="overview-page__company">
        <strong>{{ account.name }}</strong>
        <span>{{
          [
            account.industry,
            account.location,
            account.overview?.employeeCount,
            account.overview?.revenue,
            account.tier,
          ]
            .filter(Boolean)
            .join(' · ')
        }}</span>
        <h1 id="overview-title" class="sr-only" data-page-heading>
          {{ account.name }} Account Overview
        </h1>
      </div>
      <div class="overview-page__actions">
        <AppButton
          variant="secondary"
          size="sm"
          @click="router.push(`/demo/accounts/${accountId}/dna`)"
          >View Communication DNA</AppButton
        ><AppButton
          size="sm"
          @click="
            router.push({
              path: '/demo/content-studio',
              query: { account: accountId },
            })
          "
          >Generate Content</AppButton
        >
      </div>
    </header>
    <p v-if="account.overview?.summary" class="overview-page__summary">
      {{ account.overview.summary }}
    </p>
    <div class="overview-page__metrics">
      <AppMetricCard
        label="ICP Fit · High"
        :value="account.icpFit"
        tone="brand"
      /><AppMetricCard
        :label="`Signal Score · ${account.activeSignals} active`"
        :value="account.signalScore"
      /><AppMetricCard
        :label="`Resonance · ${account.tier}`"
        :value="account.resonance"
      />
    </div>
    <template v-if="account.overview">
      <div class="overview-page__reasons">
        <article>
          <span>WHY THIS ACCOUNT</span>
          <p>{{ account.overview.whyThisAccount }}</p>
        </article>
        <article>
          <span>WHY NOW</span>
          <p>{{ account.overview.whyNow }}</p>
        </article>
      </div>
      <article class="overview-page__next">
        <span>NEXT BEST ACTION</span>
        <h2>{{ account.overview.nextBestAction.action }}</h2>
        <p>{{ account.overview.nextBestAction.rationale }}</p>
        <dl>
          <div>
            <dt>Window</dt>
            <dd>{{ account.overview.nextBestAction.window }}</dd>
          </div>
          <div>
            <dt>Priority</dt>
            <dd>{{ account.overview.nextBestAction.priority }}</dd>
          </div>
        </dl>
        <div class="overview-page__next-actions">
          <AppButton size="sm" disabled>Create Outreach Sequence</AppButton
          ><AppButton variant="secondary" size="sm" disabled
            >Schedule for Later</AppButton
          >
        </div>
      </article>
      <section
        class="overview-page__signals"
        aria-labelledby="buying-signals-title"
      >
        <header>
          <div>
            <h2 id="buying-signals-title">Buying Signals</h2>
            <p>
              {{ account.overview.buyingSignalTotal }} signals in the current
              account profile
            </p>
          </div>
          <TierBadge :tier="account.tier" />
        </header>
        <div
          class="overview-page__tabs"
          role="group"
          aria-label="Filter buying signals"
        >
          <button
            type="button"
            :aria-pressed="signalFilter === 'all'"
            @click="signalFilter = 'all'"
          >
            All ({{ account.overview.buyingSignalTotal }})</button
          ><button
            v-for="category in [
              'Job Posting',
              'News & Events',
              'Company Data',
            ] as const"
            :key="category"
            type="button"
            :aria-pressed="signalFilter === category"
            @click="signalFilter = category"
          >
            {{ category }} ({{ categoryCount(category) }})
          </button>
        </div>
        <div class="overview-page__signal-list">
          <article
            v-for="signal in visibleSignals"
            :key="signal.id"
            class="overview-page__signal"
          >
            <header>
              <div>
                <span>{{ signal.category }}</span>
                <h3>{{ signal.title }}</h3>
              </div>
              <time>{{ signal.timing }}</time>
            </header>
            <strong
              :class="{
                'is-insufficient': signal.confidence === 'INSUFFICIENT DATA',
              }"
              >{{ signal.confidence }}</strong
            >
            <p>{{ signal.description }}</p>
            <a
              v-if="isCompleteUrl(signal.source.url)"
              :href="signal.source.url"
              target="_blank"
              rel="noopener noreferrer"
              ><AppSourceAttributionChip
                :source="`${signal.source.label} · Verified`" /></a
            ><AppSourceAttributionChip
              v-else
              :source="`${signal.source.label} · Verified`"
            />
          </article>
        </div>
      </section>
    </template>
    <p v-else class="overview-page__limited">
      This fixture includes the Discovery account summary only.
    </p>
  </section>
</template>

<style scoped>
.overview-page {
  display: grid;
  width: 100%;
  box-sizing: border-box;
  gap: var(--spacing-16);
  padding: var(--spacing-24);
}
.overview-page__company {
  display: grid;
  gap: 5px;
}
.overview-page__company > strong {
  font-size: var(--font-size-28);
  line-height: 1.2;
}
.overview-page__company > span {
  color: var(--color-text-secondary);
  font-size: var(--font-size-12);
}
.overview-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-24);
}
.overview-page__actions {
  display: flex;
  gap: var(--spacing-10);
}
.overview-page__summary {
  width: 820px;
  max-width: 100%;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-13);
  line-height: 1.55;
}
.overview-page__metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-12);
}
.overview-page__metrics :deep(.app-metric-card) {
  height: 100px;
}
.overview-page__reasons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-12);
}
.overview-page__reasons article,
.overview-page__next,
.overview-page__signals {
  padding: var(--spacing-20);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-bg-surface);
}
.overview-page__reasons article {
  height: 170px;
  box-sizing: border-box;
}
.overview-page__reasons article:first-child {
  border-color: var(--color-border-brand);
}
.overview-page__reasons article:last-child {
  border-color: var(--color-border-amber);
}
.overview-page__reasons span,
.overview-page__next > span {
  color: var(--color-brand-light);
  font: var(--font-size-10)/1.4 var(--font-family-mono);
  letter-spacing: 0.08em;
}
.overview-page__reasons p,
.overview-page__next p {
  margin: var(--spacing-10) 0 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-13);
  line-height: 1.6;
}
.overview-page__next {
  min-height: 240px;
  box-sizing: border-box;
  border-color: var(--color-border-brand);
  box-shadow: inset 3px 0 var(--color-brand-light);
}
.overview-page__next h2 {
  margin: var(--spacing-10) 0 0;
  font-size: var(--font-size-16);
  line-height: 1.55;
}
.overview-page__next dl {
  display: flex;
  gap: var(--spacing-32);
  margin: var(--spacing-18) 0;
}
.overview-page__next dl div {
  display: grid;
  gap: var(--spacing-4);
}
dt {
  color: var(--color-text-secondary);
  font-size: var(--font-size-10);
  text-transform: uppercase;
}
dd {
  margin: 0;
  font-weight: var(--font-weight-semibold);
}
.overview-page__next-actions {
  display: flex;
  gap: var(--spacing-10);
}
.overview-page__signals > header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-16);
}
.overview-page__signals {
  min-height: 740px;
  box-sizing: border-box;
}
.overview-page__signals h2 {
  margin: 0;
  font-size: var(--font-size-18);
}
.overview-page__signals header p {
  margin: var(--spacing-4) 0 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-11);
}
.overview-page__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-6);
  margin: var(--spacing-18) 0;
}
.overview-page__tabs button {
  padding: var(--spacing-6) var(--spacing-10);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-10);
  cursor: pointer;
}
.overview-page__tabs button[aria-pressed='true'] {
  border-color: var(--color-border-brand);
  background: var(--color-brand-tint-900);
  color: var(--color-brand-light);
}
.overview-page__tabs button:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}
.overview-page__signal-list {
  display: grid;
  gap: var(--spacing-10);
}
.overview-page__signal {
  display: grid;
  gap: var(--spacing-10);
  min-height: 144px;
  padding: var(--spacing-16) 0 var(--spacing-16) var(--spacing-16);
  border-bottom: 1px solid var(--color-border-subtle);
  border-left: 4px solid var(--color-accent-amber-light);
  background: transparent;
}
.overview-page__signal header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: var(--spacing-16);
}
.overview-page__signal header span {
  color: var(--color-brand-light);
  font: var(--font-size-9)/1.4 var(--font-family-mono);
  text-transform: uppercase;
}
.overview-page__signal h3 {
  margin: var(--spacing-4) 0 0;
  font-size: var(--font-size-14);
  line-height: 1.4;
}
.overview-page__signal time {
  color: var(--color-text-secondary);
  font-size: var(--font-size-10);
  white-space: nowrap;
}
.overview-page__signal > strong {
  justify-self: start;
  color: var(--color-state-success);
  font: var(--font-size-9)/1.4 var(--font-family-mono);
}
.overview-page__signal > strong.is-insufficient {
  color: var(--color-accent-amber-light);
}
.overview-page__signal > p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-12);
  line-height: 1.55;
}
.overview-page__signal > a {
  justify-self: start;
  text-decoration: none;
}
.overview-page__limited {
  padding: var(--spacing-24);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
}
.account-not-found {
  max-width: 560px;
  padding: var(--spacing-48) var(--spacing-24);
}
.account-not-found a {
  color: var(--color-brand-light);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
@media (max-width: 767px) {
  .overview-page {
    padding: var(--spacing-16);
  }
  .overview-page__header {
    align-items: start;
    flex-direction: column;
  }
  .overview-page__actions {
    width: 100%;
    flex-direction: column;
  }
  .overview-page__metrics,
  .overview-page__reasons {
    grid-template-columns: 1fr;
  }
  .overview-page__reasons article,
  .overview-page__signals {
    height: auto;
    min-height: 0;
  }
  .overview-page__next-actions {
    align-items: stretch;
    flex-direction: column;
  }
  .overview-page__signal header {
    flex-direction: column;
  }
  .overview-page__signal time {
    white-space: normal;
  }
}
</style>
