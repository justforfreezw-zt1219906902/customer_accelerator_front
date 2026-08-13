<script setup lang="ts">
import { computed, ref } from 'vue';
import { AccountRow, AppMetricCard } from '../../components/product';
import { demoAccountProvider } from '../../demo/demoAccountProvider';
import type { DemoAccountTier } from '../../demo/types';

const accounts = demoAccountProvider.listDiscoveryAccounts();
const query = ref('');
const tier = ref<'all' | DemoAccountTier>('all');
const industry = ref('all');
const industries = [...new Set(accounts.map((account) => account.industry))];
const filteredAccounts = computed(() => {
  const needle = query.value.trim().toLocaleLowerCase();
  return accounts.filter((account) => {
    const searchable =
      `${account.name} ${account.industry} ${account.location}`.toLocaleLowerCase();
    return (
      (!needle || searchable.includes(needle)) &&
      (tier.value === 'all' || account.tier === tier.value) &&
      (industry.value === 'all' || account.industry === industry.value)
    );
  });
});
const clearFilters = () => {
  query.value = '';
  tier.value = 'all';
  industry.value = 'all';
};
</script>

<template>
  <section class="discovery-page" aria-labelledby="discovery-title">
    <header class="discovery-page__header">
      <div>
        <h1 id="discovery-title" data-page-heading>Account Discovery</h1>
        <p>Prioritized accounts based on ICP fit and buying signal strength</p>
      </div>
      <button type="button" disabled>Add Account</button>
    </header>
    <div class="discovery-page__metrics" aria-label="Account portfolio summary">
      <AppMetricCard label="Total Accounts" :value="6" />
      <AppMetricCard label="Focus Accounts" :value="3" tone="brand" />
      <AppMetricCard label="Tier 1 — Active" :value="2" />
      <AppMetricCard label="Tier 2 — Watchlist" :value="1" tone="warning" />
    </div>
    <form class="discovery-page__filters" role="search" @submit.prevent>
      <label class="discovery-page__search"
        ><span>Search accounts</span
        ><input
          v-model="query"
          type="search"
          placeholder="Search by name, industry, or location…"
      /></label>
      <label
        ><span>Tier</span
        ><select v-model="tier">
          <option value="all">All Tiers</option>
          <option value="Focus Accounts">Focus Accounts</option>
          <option value="Tier 1">Tier 1</option>
          <option value="Tier 2">Tier 2</option>
        </select></label
      >
      <label
        ><span>Industry</span
        ><select v-model="industry">
          <option value="all">All Industries</option>
          <option v-for="value in industries" :key="value" :value="value">
            {{ value }}
          </option>
        </select></label
      >
      <div class="discovery-page__filter-status">
        <strong aria-live="polite"
          >{{ filteredAccounts.length }} accounts</strong
        ><button type="button" @click="clearFilters">Clear filters</button>
      </div>
    </form>
    <div class="discovery-page__table" aria-label="Accounts">
      <div class="discovery-page__columns" aria-hidden="true">
        <span>Account</span><span>Tier</span><span>ICP Fit</span
        ><span>Signal Score</span><span>Resonance</span><span>Signals</span
        ><span class="discovery-page__column-spacer"></span
        ><span>Next Best Action</span>
      </div>
      <AccountRow
        v-for="account in filteredAccounts"
        :key="account.id"
        :account="account"
      />
      <p v-if="filteredAccounts.length === 0" class="discovery-page__empty">
        No accounts match the current search and filters.
      </p>
    </div>
  </section>
</template>

<style scoped>
.discovery-page {
  display: grid;
  width: 100%;
  box-sizing: border-box;
  gap: var(--spacing-16);
  padding: var(--spacing-24);
}
.discovery-page__header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: var(--spacing-24);
}
h1 {
  margin: 0 0 var(--spacing-6);
  font-size: var(--typography-app-page-title-font-size);
  line-height: var(--typography-app-page-title-line-height);
}
p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-13);
}
.discovery-page__header button {
  padding: var(--spacing-10) var(--spacing-16);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  color: var(--color-text-secondary);
  opacity: var(--opacity-disabled);
}
.discovery-page__metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-12);
}
.discovery-page__filters {
  display: grid;
  grid-template-columns:
    minmax(260px, 1.5fr) minmax(150px, 0.7fr) minmax(170px, 0.8fr)
    auto;
  align-items: end;
  gap: var(--spacing-12);
  height: 72px;
  padding: var(--spacing-16);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: var(--color-bg-surface);
}
label {
  display: grid;
  gap: var(--spacing-6);
  color: var(--color-text-secondary);
  font: var(--font-size-10)/1.4 var(--font-family-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
input,
select {
  width: 100%;
  min-height: 32px;
  padding: 0 var(--spacing-12);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  background: var(--color-bg-default);
  color: var(--color-text-primary);
  font: var(--font-size-12)/1 var(--font-family-inter);
  text-transform: none;
  letter-spacing: 0;
}
.discovery-page__filters select {
  height: 48px;
}
input:focus-visible,
select:focus-visible,
.discovery-page__filter-status button:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}
.discovery-page__filter-status {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-12);
  min-height: 40px;
  white-space: nowrap;
}
.discovery-page__filter-status strong {
  font-size: var(--font-size-11);
}
.discovery-page__filter-status button {
  border: 0;
  background: transparent;
  color: var(--color-brand-light);
  font-size: var(--font-size-11);
  cursor: pointer;
}
.discovery-page__table {
  --account-discovery-columns: 236px 111px 86px 106px 90px 70px 193px 130px;
  --account-discovery-column-gap: var(--spacing-14);

  width: 100%;
  max-width: 1152px;
  overflow: hidden;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
}
.discovery-page__columns {
  display: grid;
  grid-template-columns: var(--account-discovery-columns);
  gap: var(--account-discovery-column-gap);
  padding: var(--spacing-10) var(--spacing-16);
  border-bottom: 1px solid var(--color-border-default);
  background: var(--color-bg-surface);
  color: var(--color-text-secondary);
  font: var(--font-size-9)/1.4 var(--font-family-mono);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.discovery-page__column-spacer {
  pointer-events: none;
}
.discovery-page__empty {
  padding: var(--spacing-40);
  text-align: center;
}
@media (max-width: 1023px) {
  .discovery-page__metrics {
    grid-template-columns: repeat(2, 1fr);
  }
  .discovery-page__filters {
    grid-template-columns: 1fr 1fr;
    height: auto;
  }
  .discovery-page__search,
  .discovery-page__filter-status {
    grid-column: 1/-1;
  }
  .discovery-page__columns {
    display: none;
  }
}
@media (min-width: 1441px) {
  .discovery-page__table {
    --account-discovery-columns: minmax(236px, 236fr) minmax(111px, 111fr)
      minmax(86px, 86fr) minmax(106px, 106fr) minmax(90px, 90fr)
      minmax(70px, 70fr) minmax(193px, 193fr) minmax(130px, 130fr);

    max-width: none;
  }
}
@media (max-width: 767px) {
  .discovery-page {
    padding: var(--spacing-16);
  }
  .discovery-page__header {
    display: grid;
  }
  .discovery-page__header button {
    justify-self: start;
  }
  .discovery-page__metrics,
  .discovery-page__filters {
    grid-template-columns: 1fr;
  }
  .discovery-page__search,
  .discovery-page__filter-status {
    grid-column: auto;
  }
  .discovery-page__filter-status {
    justify-content: space-between;
  }
}
</style>
