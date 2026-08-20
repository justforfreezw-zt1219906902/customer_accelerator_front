<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  MarketPatternCard,
  SignalUrgencyAccountCard,
} from '../../components/product';
import { demoAccountProvider } from '../../demo/demoAccountProvider';
import type { DemoPulseAccount, DemoPulsePersona } from '../../demo/types';
import { getRuntimeConfig } from '../../app/configuration/environment';
import { getSignalPulse } from '../../services/accountApi';
import type { SignalPulseAccountDto, SignalPulseDto } from '../../types/accountApi';
import type { SignalUrgencyAccountViewModel } from '../../components/product/SignalUrgencyAccountCard.vue';

type PulseFilter = 'all' | 'new' | 'hot' | 'cold';
const router = useRouter();
const pulse = demoAccountProvider.getSignalPulse();
const apiMode = getRuntimeConfig().demoDataSource === 'api';
const apiPulse = ref<SignalPulseDto>();
const apiLoading = ref(apiMode);
const apiError = ref('');
const personas: readonly DemoPulsePersona[] = [
  'Overview',
  'Prioritize',
  'Outreach',
  'Content',
  'Strategy',
];
const persona = ref<DemoPulsePersona>('Overview');
const filter = ref<PulseFilter>('all');
const newestFixtureDate = Math.max(
  ...pulse.accounts.flatMap((account) =>
    account.signals.map((signal) => Date.parse(signal.date)),
  ),
);
const daysFromNewest = (date: string) =>
  (newestFixtureDate - Date.parse(date)) / 86_400_000;
const highCount = (account: DemoPulseAccount) =>
  account.signals.filter(
    ({ strength }) => strength === 'high' || strength === 'urgent',
  ).length;
const newestAccountSignal = (account: DemoPulseAccount) =>
  Math.max(...account.signals.map(({ date }) => Date.parse(date)));

const fixtureAccounts = computed(() => {
  let accounts = [...pulse.accounts];
  if (filter.value === 'new')
    accounts = accounts.filter((account) =>
      account.signals.some(({ date }) => daysFromNewest(date) <= 7),
    );
  if (filter.value === 'hot')
    accounts = accounts.filter((account) => highCount(account) >= 2);
  if (filter.value === 'cold')
    accounts = accounts.filter(
      (account) =>
        !account.signals.length ||
        (newestFixtureDate - newestAccountSignal(account)) / 86_400_000 > 56,
    );
  if (persona.value === 'Prioritize' || persona.value === 'Outreach')
    accounts.sort(
      (a, b) =>
        highCount(b) - highCount(a) || b.signals.length - a.signals.length,
    );
  return accounts;
});
const apiAccounts = computed<SignalUrgencyAccountViewModel[]>(() => (apiPulse.value?.accounts ?? []).map((account: SignalPulseAccountDto) => ({
  accountId: account.accountId,
  name: account.name,
  industry: account.industry,
  tier: account.tier,
  activeSignalCount: account.activeSignalCount,
  latestActiveSignalDate: account.latestActiveSignalDate,
  nextBestAction: account.nextBestAction,
  urgency: account.urgency,
  signals: account.signals.map((signal) => ({ ...signal, signalDate: signal.signalDate })),
})));
const filteredAccounts = computed<SignalUrgencyAccountViewModel[]>(() => {
  if (apiMode) {
    if (!apiPulse.value) return [];
    if (filter.value === 'hot') return apiAccounts.value.filter((account) => apiPulse.value?.accounts.find((item) => item.accountId === account.accountId)?.urgency === 'hot');
    if (filter.value === 'cold') return apiAccounts.value.filter((account) => apiPulse.value?.accounts.find((item) => item.accountId === account.accountId)?.urgency === 'cold');
    return [...apiAccounts.value];
  }
  return fixtureAccounts.value.map((account) => ({ ...account, industry: account.industry ?? null, tier: account.tier ?? null, activeSignalCount: account.signals.length === 8 ? 14 : account.signals.length, latestActiveSignalDate: account.signals.at(-1)?.date ?? null, nextBestAction: account.nextBestAction ?? null, signals: account.signals.map((signal) => ({ ...signal, signalDate: signal.date })) }));
});
const loadApi = async () => {
  if (!apiMode) return;
  apiLoading.value = true; apiError.value = '';
  try { apiPulse.value = await getSignalPulse(); } catch { apiError.value = 'Signal Pulse is unavailable right now.'; } finally { apiLoading.value = false; }
};
if (apiMode) loadApi();
const choosePersona = (value: DemoPulsePersona) => {
  persona.value = value;
  filter.value = 'all';
};
const chooseMetric = (value: PulseFilter | 'strategy') => {
  if (value === 'strategy') choosePersona('Strategy');
  else {
    persona.value = 'Overview';
    filter.value = value;
  }
};
const draftContent = () => router.push('/demo/content-studio');
const displayMetrics = computed(() => apiMode ? (apiPulse.value?.metrics ?? { activeSignals: 0, newThisWeek: 0, hotAccounts: 0, goingCold: 0 }) : { activeSignals: 42, newThisWeek: 2, hotAccounts: 3, goingCold: 129 });
</script>

<template>
  <section v-if="apiMode && apiLoading" class="pulse-page" aria-live="polite"><h1 data-page-heading>Loading Signal Pulse…</h1></section>
  <section v-else-if="apiMode && apiError" class="pulse-page" role="alert"><h1 data-page-heading>Signal Pulse unavailable</h1><p>{{ apiError }}</p><button type="button" @click="loadApi">Retry</button></section>
  <section v-else class="pulse-page" aria-labelledby="pulse-title">
    <header class="pulse-page__header">
      <div>
        <h1 id="pulse-title" data-page-heading>Signal Pulse</h1>
        <p>
          What's happening across your portfolio right now — and what to do
          about it
        </p>
      </div>
      <RouterLink to="/demo">▣&nbsp; View Account List</RouterLink>
    </header>

    <div class="pulse-page__metrics" aria-label="Portfolio metric filters">
      <button
        type="button"
        :aria-pressed="filter === 'all' && persona === 'Overview'"
        @click="chooseMetric('all')"
      >
        <span>Active Signals <small>+0%</small></span
        ><strong>{{ displayMetrics.activeSignals }}</strong>
      </button>
      <button
        type="button"
        class="is-amber"
        :aria-pressed="filter === 'new'"
        @click="chooseMetric('new')"
      >
        <span>New This Week <small>new</small></span
        ><strong>{{ displayMetrics.newThisWeek }}</strong>
      </button>
      <button
        type="button"
        :aria-pressed="filter === 'hot'"
        @click="chooseMetric('hot')"
      >
        <span>Hot Accounts <small>priority</small></span
        ><strong>{{ displayMetrics.hotAccounts }}</strong>
      </button>
      <button
        type="button"
        class="is-error"
        :aria-pressed="filter === 'cold'"
        @click="chooseMetric('cold')"
      >
        <span>Going Cold <small>risk</small></span
        ><strong>{{ displayMetrics.goingCold }}</strong>
      </button>
      <button v-if="!apiMode"
        type="button"
        class="is-success"
        :aria-pressed="persona === 'Strategy'"
        @click="chooseMetric('strategy')"
      >
        <span>Market Patterns <small>found</small></span
        ><strong>3</strong>
      </button>
    </div>

    <div
      class="pulse-page__tabs"
      role="tablist"
      aria-label="Signal Pulse persona"
    >
      <button
        v-for="item in personas"
        :id="`pulse-tab-${item}`"
        :key="item"
        type="button"
        role="tab"
        :aria-selected="persona === item"
        :tabindex="persona === item ? 0 : -1"
        @click="choosePersona(item)"
      >
        {{ item }}
      </button>
    </div>

    <template v-if="persona === 'Strategy'">
      <section
        class="pulse-page__strategy"
        role="tabpanel"
        aria-labelledby="pulse-tab-Strategy"
      >
        <h2>Portfolio Health</h2>
        <div>
          <article><strong>{{ displayMetrics.hotAccounts }}</strong><span>Hot accounts</span></article>
          <article><strong>{{ apiMode ? (apiPulse?.accounts.filter((account) => account.urgency === 'warm').length ?? 0) : 2 }}</strong><span>Warm accounts</span></article>
          <article><strong>{{ displayMetrics.goingCold }}</strong><span>Cold / watchlist</span></article>
        </div>
        <h2>Market Patterns</h2>
        <p v-if="apiMode">Market pattern analysis is not available from the current backend.</p>
        <div class="pulse-page__patterns">
          <template v-if="!apiMode"><MarketPatternCard v-for="pattern in pulse.patterns" :key="pattern.id" :pattern="pattern" /></template>
        </div>
      </section>
    </template>
    <template v-else>
      <section
        v-if="persona === 'Overview' || persona === 'Content'"
        class="pulse-page__pattern-section"
        :aria-labelledby="`pulse-tab-${persona}`"
      >
        <h2>MARKET PATTERNS ACROSS YOUR PORTFOLIO</h2>
        <p v-if="apiMode">Market pattern analysis is not available from the current backend.</p>
        <div class="pulse-page__patterns">
          <template v-if="!apiMode"><MarketPatternCard v-for="pattern in pulse.patterns" :key="pattern.id" :pattern="pattern" :show-actions="persona === 'Content'" @draft="draftContent" /></template>
        </div>
      </section>
      <section
        class="pulse-page__accounts"
        :aria-labelledby="`pulse-tab-${persona}`"
      >
        <h2>ACCOUNTS RANKED BY SIGNAL URGENCY</h2>
        <div v-if="filteredAccounts.length">
          <SignalUrgencyAccountCard
            v-for="account in filteredAccounts"
            :key="account.accountId ?? account.name"
            :account="account"
            :outreach="persona === 'Outreach'"
          />
        </div>
        <p v-else role="status">
          {{ apiMode ? 'No accounts are available for this view.' : 'No curated demo accounts match this temporary filter.' }}
        </p>
      </section>
    </template>
  </section>
</template>

<style scoped>
.pulse-page {
  display: grid;
  width: 100%;
  gap: var(--spacing-20);
  padding: var(--spacing-24);
  box-sizing: border-box;
}
.pulse-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-16);
}
.pulse-page__header h1,
.pulse-page__header p {
  margin: 0;
}
.pulse-page__header h1 {
  font-size: var(--font-size-30);
}
.pulse-page__header p {
  margin-top: var(--spacing-6);
  color: var(--color-text-secondary);
  font-size: var(--font-size-13);
}
.pulse-page__header a {
  padding: var(--spacing-8) var(--spacing-14);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-full);
  color: var(--color-text-primary);
  font-size: var(--font-size-12);
  text-decoration: none;
}
.pulse-page__metrics {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-12);
}
.pulse-page__metrics button {
  display: grid;
  height: 112px;
  align-content: space-between;
  padding: var(--spacing-18);
  border: 1px solid var(--color-border-brand);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
  color: var(--color-text-primary);
  text-align: left;
}
.pulse-page__metrics button[aria-pressed='true'] {
  background: var(--color-card-highlighted);
  box-shadow: 0 0 0 1px var(--color-brand-light);
}
.pulse-page__metrics span {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-8);
  font-size: var(--font-size-12);
}
.pulse-page__metrics small {
  font-family: var(--font-family-mono);
}
.pulse-page__metrics strong {
  color: var(--color-brand-light);
  font: var(--font-weight-bold) var(--font-size-30)/1 var(--font-family-mono);
}
.pulse-page__metrics .is-amber {
  border-color: var(--color-border-amber);
}
.pulse-page__metrics .is-amber strong {
  color: var(--color-accent-amber-light);
}
.pulse-page__metrics .is-error {
  border-color: var(--color-state-error);
}
.pulse-page__metrics .is-error strong {
  color: var(--color-state-error);
}
.pulse-page__metrics .is-success {
  border-color: var(--color-state-success);
}
.pulse-page__metrics .is-success strong {
  color: var(--color-state-success);
}
.pulse-page__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-8);
}
.pulse-page__tabs button {
  padding: var(--spacing-8) var(--spacing-14);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-full);
  background: var(--color-card-default);
  color: var(--color-text-secondary);
}
.pulse-page__tabs button[aria-selected='true'] {
  border-color: var(--color-border-brand);
  background: var(--color-brand-deep);
  color: var(--color-brand-light);
}
.pulse-page__pattern-section,
.pulse-page__accounts,
.pulse-page__strategy {
  display: grid;
  gap: var(--spacing-14);
}
.pulse-page__pattern-section > h2,
.pulse-page__accounts > h2 {
  margin: 0;
  color: var(--color-text-secondary);
  font: var(--font-weight-medium) var(--font-size-10)/1.4
    var(--font-family-mono);
}
.pulse-page__patterns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-16);
}
.pulse-page__accounts > div {
  display: grid;
  gap: var(--spacing-20);
}
.pulse-page__strategy h2 {
  margin: 0;
}
.pulse-page__strategy > div:first-of-type {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-16);
}
.pulse-page__strategy > div:first-of-type article {
  display: grid;
  gap: var(--spacing-8);
  padding: var(--spacing-20);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.pulse-page__strategy article strong {
  color: var(--color-brand-light);
  font-size: var(--font-size-30);
}
@media (max-width: 1000px) {
  .pulse-page__metrics {
    grid-template-columns: repeat(2, 1fr);
  }
  .pulse-page__patterns {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 767px) {
  .pulse-page {
    padding: var(--spacing-16);
  }
  .pulse-page__header {
    align-items: flex-start;
    flex-direction: column;
  }
  .pulse-page__metrics {
    grid-template-columns: 1fr;
  }
  .pulse-page__strategy > div:first-of-type {
    grid-template-columns: 1fr;
  }
}
</style>
