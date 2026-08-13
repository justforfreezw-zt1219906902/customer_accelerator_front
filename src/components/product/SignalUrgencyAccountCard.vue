<script setup lang="ts">
import type { DemoPulseAccount } from '../../demo/types';
import TierBadge from './TierBadge.vue';
defineProps<{ account: DemoPulseAccount; outreach?: boolean }>();
</script>

<template>
  <component
    :is="account.accountId ? 'a' : 'article'"
    class="signal-urgency-card"
    :class="`signal-urgency-card--${account.tier.toLowerCase().replaceAll(' ', '-')}`"
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
        <span>{{ account.initials }}</span>
        <div>
          <h3>{{ account.name }}</h3>
          <p>{{ account.industry }}</p>
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
      <strong>{{ account.nextBestAction }}</strong>
      <p v-if="outreach" class="signal-urgency-card__outreach">
        Outreach insight uses this existing signal evidence only.
      </p>
    </div>
    <div class="signal-urgency-card__meta">
      <strong>{{
        account.signals.length === 8 ? 14 : account.signals.length
      }}</strong
      ><small>SIGNALS</small
      ><span>{{
        account.signals.length ? 'This week' : 'No signals yet'
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
