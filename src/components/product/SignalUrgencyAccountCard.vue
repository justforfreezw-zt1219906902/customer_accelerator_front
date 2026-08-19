<script setup lang="ts">
import TierBadge from './TierBadge.vue';
import { accountIdentityTone } from '../../utils/accountIdentityTone';
export interface SignalUrgencyAccountViewModel {
  accountId?: string;
  name: string;
  initials: string;
  industry: string | null;
  tier: string | null;
  activeSignalCount: number;
  latestActiveSignalDate: string | null;
  nextBestAction: string | null;
  signals: Array<{ id: string; title: string; strength: string; signalDate: string | null }>;
  routability?: string;
  urgency?: 'hot' | 'warm' | 'cold';
}
defineProps<{ account: SignalUrgencyAccountViewModel; outreach?: boolean }>();
</script>

<template>
  <component
    :is="account.accountId ? 'a' : 'article'"
    class="signal-urgency-card"
    :class="account.tier ? `signal-urgency-card--${account.tier.toLowerCase().replaceAll(' ', '-')}` : undefined"
    :href="
      account.accountId ? `/demo/accounts/${account.accountId}` : undefined
    "
    :aria-label="
      account.accountId ? `Open ${account.name} account overview` : undefined
    "
    :data-routability="account.routability"
  >
    <i class="signal-urgency-card__accent" aria-hidden="true" />
    <div class="signal-urgency-card__identity">
      <div class="signal-urgency-card__name">
        <span :class="`signal-urgency-card__avatar--${accountIdentityTone(account.accountId ?? account.name)}`">{{ account.initials }}</span>
        <div>
          <h3>{{ account.name }}</h3>
          <p>{{ account.industry ?? 'Not available' }}</p>
        </div>
      </div>
      <TierBadge :tier="account.tier" />
    </div>
    <div class="signal-urgency-card__signals">
      <span class="signal-urgency-card__eyebrow">ACTIVE SIGNALS</span>
      <ul v-if="account.signals.length">
        <li
          v-for="signal in account.signals"
          :key="signal.id"
          :class="`is-${signal.strength}`"
        >
          <i aria-hidden="true">●</i>{{ signal.title }}
        </li>
      </ul>
      <p v-else>No signals yet</p>
      <span class="signal-urgency-card__eyebrow">→ NEXT BEST ACTION</span>
      <strong>{{ account.nextBestAction ?? 'Not available' }}</strong>
      <p v-if="outreach" class="signal-urgency-card__outreach">
        Outreach insight uses this existing signal evidence only.
      </p>
    </div>
    <div class="signal-urgency-card__meta">
      <strong>{{
        account.activeSignalCount
      }}</strong
      ><small>SIGNALS</small
      ><span>{{
        account.activeSignalCount > 0 ? (account.latestActiveSignalDate ?? 'Date unavailable') : 'No active signals'
      }}</span>
    </div>
  </component>
</template>

<style scoped>
.signal-urgency-card {
  display: grid;
  grid-template-columns: 5px 250px minmax(0, 1fr) 176px;
  gap: var(--spacing-18);
  min-height: 190px;
  padding: var(--spacing-20);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
  color: inherit;
  text-decoration: none;
}
.signal-urgency-card--focus-accounts {
  min-height: 300px;
}
.signal-urgency-card__accent {
  width: 5px;
  height: 100%;
  border-radius: 3px;
  background: var(--color-text-tertiary);
}
.signal-urgency-card--focus-accounts .signal-urgency-card__accent {
  background: var(--color-accent-amber-light);
}
.signal-urgency-card--tier-1 .signal-urgency-card__accent {
  background: var(--color-brand-light);
}
.signal-urgency-card__identity {
  display: grid;
  align-content: start;
  gap: var(--spacing-8);
}
.signal-urgency-card__name {
  display: flex;
  gap: var(--spacing-12);
}
.signal-urgency-card__name > span {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  flex: 0 0 44px;
  border-radius: var(--radius-10);
  background: var(--color-brand-tint-900);
  color: var(--color-brand-light);
  font-weight: 700;
}
.signal-urgency-card__name > span.signal-urgency-card__avatar--amber { border: 1px solid var(--color-border-amber); background: var(--color-accent-amber-deep); color: var(--color-accent-amber-light); }
.signal-urgency-card__name > span.signal-urgency-card__avatar--success { border: 1px solid var(--color-state-success); background: var(--color-state-success-subtle); color: var(--color-state-success); }
.signal-urgency-card__name > span.signal-urgency-card__avatar--deep { border: 1px solid var(--color-brand-deep); background: var(--color-brand-deep); color: var(--color-brand-tint-200); }
.signal-urgency-card__name h3,
.signal-urgency-card__name p {
  margin: 0;
}
.signal-urgency-card__name h3 {
  font-size: var(--font-size-16);
}
.signal-urgency-card__name p {
  margin-top: 3px;
  color: var(--color-text-muted);
  font-size: var(--font-size-12);
}
.signal-urgency-card__signals {
  display: grid;
  align-content: start;
  gap: var(--spacing-8);
  min-width: 0;
}
.signal-urgency-card__eyebrow {
  color: var(--color-text-tertiary);
  font: var(--font-size-10)/1.3 var(--font-family-mono);
}
.signal-urgency-card__signals ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-8) var(--spacing-16);
  margin: 0;
  padding: 0;
  list-style: none;
}
.signal-urgency-card__signals li {
  color: var(--color-text-secondary);
  font-size: var(--font-size-11);
}
.signal-urgency-card__signals li i {
  margin-right: var(--spacing-5);
  color: var(--color-text-tertiary);
}
.signal-urgency-card__signals li.is-high i,
.signal-urgency-card__signals li.is-urgent i {
  color: var(--color-accent-amber-light);
}
.signal-urgency-card__signals > strong {
  color: var(--color-brand-light);
  font-size: var(--font-size-13);
}
.signal-urgency-card__signals > p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-12);
}
.signal-urgency-card__outreach {
  padding: var(--spacing-8);
  border-left: 2px solid var(--color-brand-light);
}
.signal-urgency-card__meta {
  display: grid;
  align-content: start;
  justify-items: end;
  gap: var(--spacing-5);
  text-align: right;
}
.signal-urgency-card__meta strong {
  color: var(--color-accent-amber-light);
  font-size: var(--font-size-25);
}
.signal-urgency-card__meta small {
  color: var(--color-text-tertiary);
  font-family: var(--font-family-mono);
}
.signal-urgency-card__meta span {
  color: var(--color-text-muted);
  font-size: var(--font-size-11);
}
@media (max-width: 900px) {
  .signal-urgency-card {
    grid-template-columns: 5px minmax(160px, 220px) 1fr;
  }
  .signal-urgency-card__meta {
    grid-column: 2/-1;
    grid-row: 2;
    justify-items: start;
    text-align: left;
  }
}
@media (max-width: 767px) {
  .signal-urgency-card {
    grid-template-columns: 5px 1fr;
    min-height: 0;
  }
  .signal-urgency-card__signals,
  .signal-urgency-card__meta {
    grid-column: 2;
  }
  .signal-urgency-card__meta {
    grid-row: auto;
  }
}
</style>
