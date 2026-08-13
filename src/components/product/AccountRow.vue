<script setup lang="ts">
import { RouterLink } from 'vue-router';
import AccountIdentity from './AccountIdentity.vue';
import ScoreIndicator from './ScoreIndicator.vue';
import SignalSummary from './SignalSummary.vue';
import TierBadge from './TierBadge.vue';
export interface AccountRowViewModel {
  id: string; initials: string; name: string; industry: string; location: string;
  tier: string | null; icpFit: number | null; signalScore: number | null;
  resonance: number | null; activeSignals: number; nextBestAction: string | null;
  signalPattern?: readonly ('active' | 'inactive')[];
}
defineProps<{ account: AccountRowViewModel }>();
</script>
<template>
  <article class="account-row">
    <RouterLink
      class="account-row__link"
      :to="`/demo/accounts/${account.id}`"
      :aria-label="`Open ${account.name} account overview`"
      ><AccountIdentity
        :initials="account.initials"
        :name="account.name"
        :detail="`${account.industry} · ${account.location}`"
      /><TierBadge :tier="account.tier" /><ScoreIndicator
        label="ICP fit"
        :value="account.icpFit"
      /><ScoreIndicator
        label="Signal"
        :value="account.signalScore"
      /><ScoreIndicator
        label="Resonance"
        :value="account.resonance"
        display="ring"
      /><SignalSummary
        :count="account.activeSignals"
        :pattern="account.signalPattern"
      /><span class="account-row__spacer" aria-hidden="true"></span
      ><span class="account-row__action"
        ><span>{{ account.nextBestAction }}</span
        ><b aria-hidden="true">→</b></span
      ></RouterLink
    >
  </article>
</template>
<style scoped>
.account-row {
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-card-default);
}
.account-row__link {
  display: grid;
  grid-template-columns: var(--account-discovery-columns);
  align-items: center;
  gap: var(--account-discovery-column-gap);
  height: 72px;
  padding: var(--spacing-12) var(--spacing-16);
  color: inherit;
  text-decoration: none;
  transition: background var(--motion-duration-fast);
}
.account-row__link:hover {
  background: var(--color-bg-elevated);
}
.account-row__link:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px var(--color-focus-ring);
}
.account-row__action {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-8);
  max-width: 130px;
  color: var(--color-text-secondary);
  font-size: var(--font-size-11);
  line-height: 1.45;
}
.account-row__spacer {
  pointer-events: none;
}
.account-row__action b {
  flex: 0 0 auto;
  color: var(--color-brand-light);
  font-size: var(--font-size-18);
}
@media (max-width: 1199px) {
  .account-row__spacer {
    display: none;
  }
  .account-row__link {
    grid-template-columns:
      minmax(220px, 1.5fr) minmax(110px, 0.7fr) repeat(3, minmax(86px, 0.7fr))
      minmax(90px, 0.7fr);
    height: auto;
    min-height: 88px;
  }
  .account-row__action {
    grid-column: 1/-1;
    padding-top: var(--spacing-8);
    border-top: 1px solid var(--color-border-subtle);
  }
}
@media (max-width: 767px) {
  .account-row__link {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-16);
    padding: var(--spacing-16);
  }
  .account-row__link > :first-child,
  .account-row__action {
    grid-column: 1/-1;
  }
  .account-row__link > :nth-child(2) {
    justify-self: start;
  }
  .account-row__link > :nth-child(3),
  .account-row__link > :nth-child(4),
  .account-row__link > :nth-child(5) {
    justify-self: start;
  }
  .account-row__link > :nth-child(6) {
    justify-self: end;
    grid-column: 2;
    grid-row: 2;
  }
  .account-row__action {
    grid-row: auto;
  }
}
</style>
