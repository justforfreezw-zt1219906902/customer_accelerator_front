<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { DnaPortfolioCard } from '../../components/product';
import { demoAccountProvider } from '../../demo/demoAccountProvider';
import { getRuntimeConfig } from '../../app/configuration/environment';
import {
  compareDnaPortfolio,
  getDnaPortfolio,
} from '../../services/accountApi';
import type { DnaCompareDto, DnaPortfolioDto } from '../../types/accountApi';

const router = useRouter();
const apiMode = getRuntimeConfig().demoDataSource === 'api';
const apiPortfolio = ref<DnaPortfolioDto>();
const apiLoading = ref(apiMode);
const apiError = ref('');
const apiCompare = ref<DnaCompareDto>();
const apiCompareError = ref('');
const apiTier = ref('All');
const apiIndustry = ref('All');
const portfolio = demoAccountProvider.getDnaPortfolio();
const accounts = demoAccountProvider.listDiscoveryAccounts();
const tier = ref('All');
const industry = ref('All');
const selected = ref(new Set<string>(apiMode ? [] : ['demo-acc-006']));
const apiVisibleItems = computed(() =>
  (apiPortfolio.value?.items ?? []).filter(
    (item) =>
      (apiTier.value === 'All' || item.tier === apiTier.value) &&
      (apiIndustry.value === 'All' || item.industry === apiIndustry.value),
  ),
);
const apiAllVisibleSelected = computed(
  () =>
    apiVisibleItems.value.length > 0 &&
    apiVisibleItems.value.every((item) => selected.value.has(item.accountId)),
);
const toggleApiAllVisible = () => {
  const next = new Set(selected.value);
  for (const item of apiVisibleItems.value) {
    if (apiAllVisibleSelected.value) next.delete(item.accountId);
    else next.add(item.accountId);
  }
  selected.value = next;
  void apiCompareSelection();
};
const apiToggle = (id: string) => {
  const next = new Set(selected.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selected.value = next;
  void apiCompareSelection();
};
let compareGeneration = 0;
const apiCompareSelection = async () => {
  const generation = ++compareGeneration;
  const ids = [...selected.value];
  apiCompare.value = undefined;
  apiCompareError.value = '';
  if (ids.length < 2) return;
  try {
    const result = await compareDnaPortfolio(ids);
    if (generation === compareGeneration) apiCompare.value = result;
  } catch {
    if (generation === compareGeneration)
      apiCompareError.value = 'Comparison is unavailable right now.';
  }
};
const loadApi = async () => {
  apiLoading.value = true;
  apiError.value = '';
  try {
    apiPortfolio.value = await getDnaPortfolio();
  } catch {
    apiError.value = 'Communication DNA portfolio is unavailable right now.';
  } finally {
    apiLoading.value = false;
  }
};
onMounted(() => {
  if (apiMode) void loadApi();
});
const visibleProfiles = computed(() =>
  portfolio.profiles.filter((profile) => {
    const account = accounts.find(({ id }) => id === profile.accountId);
    return (
      account &&
      (tier.value === 'All' || account.tier === tier.value) &&
      (industry.value === 'All' || account.industry === industry.value)
    );
  }),
);
const visibleCards = computed(() =>
  visibleProfiles.value.map((profile) => ({
    profile,
    account: accounts.find(({ id }) => id === profile.accountId)!,
  })),
);
const allVisibleSelected = computed(
  () =>
    visibleProfiles.value.length > 0 &&
    visibleProfiles.value.every(({ accountId }) =>
      selected.value.has(accountId),
    ),
);
const chooseTier = (value: string) => {
  tier.value = value;
  industry.value = 'All';
};
const toggle = (id: string) => {
  const next = new Set(selected.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selected.value = next;
};
const toggleAllVisible = () => {
  const next = new Set(selected.value);
  for (const { accountId } of visibleProfiles.value) {
    if (allVisibleSelected.value) next.delete(accountId);
    else next.add(accountId);
  }
  selected.value = next;
};
const selectedProfiles = computed(() =>
  portfolio.profiles.filter(({ accountId }) => selected.value.has(accountId)),
);
const count = (values: readonly string[]) =>
  [
    ...values.reduce(
      (map, value) => map.set(value, (map.get(value) ?? 0) + 1),
      new Map<string, number>(),
    ),
  ].sort((a, b) => b[1] - a[1]);
const analysis = computed(() => {
  if (selectedProfiles.value.length < 2) return null;
  const vocabulary = count(
    selectedProfiles.value.flatMap(({ vocabulary }) => vocabulary),
  );
  return {
    tone: count(selectedProfiles.value.map(({ tone }) => tone)),
    sharedVocabulary: vocabulary.filter(([, total]) => total >= 2),
    uniqueVocabulary: vocabulary.filter(([, total]) => total === 1),
    proofStyle: count(
      selectedProfiles.value.map(({ proofStyle }) => proofStyle),
    ),
    ctaStyle: count(selectedProfiles.value.map(({ ctaStyle }) => ctaStyle)),
    doRules: count(selectedProfiles.value.flatMap(({ doRules }) => doRules)),
    dontRules: count(
      selectedProfiles.value.flatMap(({ dontRules }) => dontRules),
    ),
    signalTypes: count(
      selectedProfiles.value.flatMap(({ signalTypes }) => signalTypes),
    ),
    problemFraming: selectedProfiles.value.map(
      ({ accountId, problemFraming }) => ({
        account: accounts.find(({ id }) => id === accountId)?.name ?? accountId,
        problemFraming,
      }),
    ),
  };
});
const viewDna = (id: string) => router.push(`/demo/accounts/${id}/dna`);
</script>

<template>
  <section
    v-if="apiMode && apiLoading"
    class="portfolio-page"
    aria-live="polite"
  >
    <h1 data-page-heading>Loading Communication DNA…</h1>
  </section>
  <section v-else-if="apiMode && apiError" class="portfolio-page" role="alert">
    <h1 data-page-heading>Communication DNA unavailable</h1>
    <p>{{ apiError }}</p>
    <button type="button" @click="loadApi">Retry</button>
  </section>
  <section
    v-else-if="apiMode"
    class="portfolio-page"
    aria-labelledby="portfolio-api-title"
  >
    <header>
      <h1 id="portfolio-api-title" data-page-heading>Communication DNA</h1>
      <p>
        Compare how your target accounts communicate — select accounts to find
        shared patterns
      </p>
    </header>
    <div class="portfolio-page__filters">
      <span>Tier:</span
      ><button
        type="button"
        :aria-pressed="apiTier === 'All'"
        @click="apiTier = 'All'"
      >
        All ({{ apiPortfolio?.summary.totalProfiles ?? 0 }})</button
      ><button
        v-for="[value, total] in Object.entries(
          apiPortfolio?.summary.byTier ?? {},
        )"
        :key="value"
        type="button"
        :aria-pressed="apiTier === value"
        @click="apiTier = value"
      >
        {{ value }} ({{ total }})
      </button>
    </div>
    <div class="portfolio-page__filters">
      <span>Industry:</span
      ><button
        type="button"
        :aria-pressed="apiIndustry === 'All'"
        @click="apiIndustry = 'All'"
      >
        All</button
      ><button
        v-for="[value, total] in Object.entries(
          apiPortfolio?.summary.byIndustry ?? {},
        )"
        :key="value"
        type="button"
        :aria-pressed="apiIndustry === value"
        @click="apiIndustry = value"
      >
        {{ value }} ({{ total }})
      </button>
    </div>
    <div class="portfolio-page__selection">
      <button type="button" @click="toggleApiAllVisible">
        {{
          apiAllVisibleSelected ? 'Deselect All Visible' : 'Select All Visible'
        }}
      </button>
    </div>
    <div v-if="apiVisibleItems.length" class="portfolio-page__grid">
      <DnaPortfolioCard
        v-for="item in apiVisibleItems"
        :key="item.accountId"
        :account="{
          id: item.accountId,
          name: item.name,
          initials: item.name.slice(0, 2).toUpperCase(),
          industry: item.industry,
          tier: item.tier,
          activeSignalCount: item.activeSignalCount,
        }"
        :profile="{ tone: item.tone, vocabulary: item.vocabulary }"
        :selected="selected.has(item.accountId)"
        @toggle="apiToggle(item.accountId)"
        @view="viewDna(item.accountId)"
      />
    </div>
    <p v-else class="portfolio-page__empty" role="status">
      No portfolio profiles are available.
    </p>
    <section
      v-if="apiCompare"
      class="portfolio-page__analysis"
      aria-labelledby="analysis-api-title"
    >
      <h2 id="analysis-api-title">Cross-account analysis</h2>
      <p>{{ apiCompare.selectedCount }} selected accounts</p>
      <article
        v-for="[title, values] in [
          ['Dominant tone', apiCompare.dominantTone],
          ['Shared vocabulary', apiCompare.sharedVocabulary],
          ['Unique vocabulary', apiCompare.uniqueVocabulary],
          ['Proof styles', apiCompare.proofStyles],
          ['CTA styles', apiCompare.ctaStyles],
          ['Do rules', apiCompare.doRules],
          ['Do not rules', apiCompare.dontRules],
          ['Signal types', apiCompare.signalTypes],
        ]"
        :key="title"
      >
        <h3>{{ title }}</h3>
        <p v-if="!values.length">Not available</p>
        <p v-for="item in values" :key="item.value">
          {{ item.value }} — {{ item.count }}
        </p>
      </article>
      <article>
        <h3>Problem framing</h3>
        <p v-if="!apiCompare.problemFraming.length">Not available</p>
        <p v-for="item in apiCompare.problemFraming" :key="item.accountId">
          <strong>{{ item.accountName }}:</strong>
          {{ item.value ?? 'Not available' }}
        </p>
      </article>
    </section>
    <p v-else-if="apiCompareError" role="alert">
      {{ apiCompareError }}
      <button type="button" @click="apiCompareSelection">Retry Compare</button>
    </p>
    <p v-else-if="selected.size < 2" class="portfolio-page__empty">
      Select at least two accounts to compare.
    </p>
  </section>
  <section v-else class="portfolio-page" aria-labelledby="portfolio-title">
    <header>
      <h1 id="portfolio-title" data-page-heading>Communication DNA</h1>
      <p>
        Compare how your target accounts communicate — select accounts to find
        shared patterns
      </p>
    </header>
    <div class="portfolio-page__filters">
      <span>Tier:</span
      ><button
        v-for="item in portfolio.representativeTierCounts"
        :key="item.value"
        type="button"
        :aria-pressed="tier === item.value"
        @click="chooseTier(item.value)"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="portfolio-page__filters">
      <span>Industry:</span
      ><button
        v-for="item in portfolio.representativeIndustryCounts"
        :key="item.value"
        type="button"
        :aria-pressed="industry === item.value"
        @click="industry = item.value"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="portfolio-page__selection">
      <button type="button" @click="toggleAllVisible">
        {{ allVisibleSelected ? 'Deselect All Visible' : 'Select All Visible' }}
      </button>
    </div>
    <div v-if="visibleCards.length" class="portfolio-page__grid">
      <DnaPortfolioCard
        v-for="{ account, profile } in visibleCards"
        :key="account.id"
        :account="account"
        :profile="profile"
        :selected="selected.has(account.id)"
        @toggle="toggle(account.id)"
        @view="viewDna(account.id)"
      />
    </div>
    <p v-else class="portfolio-page__empty" role="status">
      No curated demo accounts match these representative portfolio filters.
    </p>

    <section
      v-if="analysis"
      class="portfolio-page__analysis"
      aria-labelledby="analysis-title"
    >
      <header>
        <div>
          <h2 id="analysis-title">Cross-account analysis</h2>
          <p>
            Deterministic comparison of {{ selectedProfiles.length }} selected
            local profiles
          </p>
        </div>
        <div>
          <button type="button" disabled>Export Campaign Brief</button
          ><button type="button" disabled>
            Generate Content for Selection
          </button>
        </div>
      </header>
      <div class="portfolio-page__analysis-grid">
        <article>
          <h3>Dominant tone</h3>
          <p v-for="[label, total] in analysis.tone" :key="label">
            {{ label }} — {{ total }}
          </p>
        </article>
        <article>
          <h3>Shared vocabulary</h3>
          <p>
            {{
              analysis.sharedVocabulary.map(([label]) => label).join(', ') ||
              'No terms shared by 2+ selected accounts'
            }}
          </p>
          <h3>Unique vocabulary</h3>
          <p>
            {{ analysis.uniqueVocabulary.map(([label]) => label).join(', ') }}
          </p>
        </article>
        <article>
          <h3>Proof style</h3>
          <p v-for="[label, total] in analysis.proofStyle" :key="label">
            {{ label }} — {{ total }}
          </p>
          <h3>CTA style</h3>
          <p v-for="[label, total] in analysis.ctaStyle" :key="label">
            {{ label }} — {{ total }}
          </p>
        </article>
        <article>
          <h3>Problem framing</h3>
          <p v-for="item in analysis.problemFraming" :key="item.account">
            <strong>{{ item.account }}:</strong> {{ item.problemFraming }}
          </p>
        </article>
        <article>
          <h3>Do patterns</h3>
          <p>{{ analysis.doRules.map(([label]) => label).join(', ') }}</p>
          <h3>Don’t patterns</h3>
          <p>{{ analysis.dontRules.map(([label]) => label).join(', ') }}</p>
          <h3>Signal types</h3>
          <p>{{ analysis.signalTypes.map(([label]) => label).join(', ') }}</p>
        </article>
      </div>
    </section>
  </section>
</template>

<style scoped>
.portfolio-page {
  display: grid;
  width: 100%;
  gap: var(--spacing-16);
  padding: var(--spacing-24);
  box-sizing: border-box;
}
.portfolio-page > header h1,
.portfolio-page > header p {
  margin: 0;
}
.portfolio-page > header h1 {
  font-size: var(--font-size-30);
}
.portfolio-page > header p {
  margin-top: var(--spacing-10);
  color: var(--color-text-secondary);
  font-size: var(--font-size-13);
}
.portfolio-page__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-8);
}
.portfolio-page__filters > span {
  color: var(--color-text-secondary);
  font-size: var(--font-size-12);
}
.portfolio-page__filters button {
  padding: var(--spacing-7) var(--spacing-12);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-full);
  background: var(--color-card-default);
  color: var(--color-text-secondary);
  font-size: var(--font-size-11);
}
.portfolio-page__filters button[aria-pressed='true'] {
  border-color: var(--color-border-brand);
  background: var(--color-brand-deep);
  color: var(--color-brand-light);
}
.portfolio-page__selection {
  display: flex;
  justify-content: flex-end;
}
.portfolio-page__selection button {
  padding: var(--spacing-7) var(--spacing-12);
  border: 1px dashed var(--color-border-brand);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-brand-light);
  font-weight: var(--font-weight-semibold);
}
.portfolio-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-16);
}
.portfolio-page__grid :deep(.dna-portfolio-card) {
  width: 100%;
}
.portfolio-page__empty {
  margin: 0;
  padding: var(--spacing-20);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.portfolio-page__analysis {
  display: grid;
  gap: var(--spacing-16);
  padding: var(--spacing-20);
  border: 1px solid var(--color-border-brand);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.portfolio-page__analysis > header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: var(--spacing-16);
}
.portfolio-page__analysis h2,
.portfolio-page__analysis p {
  margin: 0;
}
.portfolio-page__analysis > header p {
  margin-top: var(--spacing-5);
  color: var(--color-text-secondary);
}
.portfolio-page__analysis > header div:last-child {
  display: flex;
  gap: var(--spacing-8);
}
.portfolio-page__analysis button {
  padding: var(--spacing-8) var(--spacing-12);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  color: var(--color-text-muted);
  opacity: 0.55;
}
.portfolio-page__analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-12);
}
.portfolio-page__analysis article {
  padding: var(--spacing-14);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
}
.portfolio-page__analysis h3 {
  margin: 0 0 var(--spacing-8);
  color: var(--color-brand-light);
  font-size: var(--font-size-13);
}
.portfolio-page__analysis article p + h3 {
  margin-top: var(--spacing-14);
}
.portfolio-page__analysis article p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-12);
  line-height: 1.5;
  overflow-wrap: anywhere;
}
@media (max-width: 1100px) {
  .portfolio-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .portfolio-page__grid :deep(.dna-portfolio-card) {
    width: 100%;
  }
}
@media (max-width: 767px) {
  .portfolio-page {
    padding: var(--spacing-16);
  }
  .portfolio-page__grid,
  .portfolio-page__analysis-grid {
    grid-template-columns: 1fr;
  }
  .portfolio-page__analysis > header {
    flex-direction: column;
  }
  .portfolio-page__analysis > header div:last-child {
    flex-direction: column;
  }
}
</style>
