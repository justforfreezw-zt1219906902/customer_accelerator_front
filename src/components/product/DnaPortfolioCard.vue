<script setup lang="ts">
import { computed } from 'vue';
import TierBadge from './TierBadge.vue';
export interface DnaPortfolioCardAccount {
  id: string;
  name: string;
  initials: string;
  industry: string | null;
  tier: string | null;
  activeSignals?: number;
  activeSignalCount?: number;
}
export interface DnaPortfolioCardProfile {
  tone: string | null;
  vocabulary: readonly string[];
}
const props = defineProps<{
  account: DnaPortfolioCardAccount;
  profile: DnaPortfolioCardProfile;
  selected: boolean;
}>();
defineEmits<{ toggle: []; view: [] }>();
const signalLabel = computed(
  () =>
    `${props.account.activeSignalCount ?? props.account.activeSignals ?? 0} signal${(props.account.activeSignalCount ?? props.account.activeSignals ?? 0) === 1 ? '' : 's'}`,
);
</script>

<template>
  <article
    class="dna-portfolio-card"
    :class="{ 'is-selected': selected }"
    :aria-label="`${account.name} DNA profile${selected ? ', selected' : ''}`"
  >
    <header>
      <button
        type="button"
        class="dna-portfolio-card__select"
        role="checkbox"
        :aria-checked="selected"
        :aria-label="`${selected ? 'Deselect' : 'Select'} ${account.name}`"
        @click="$emit('toggle')"
      >
        <span aria-hidden="true">{{ selected ? '✓' : '' }}</span>
      </button>
      <span class="dna-portfolio-card__avatar" aria-hidden="true">{{
        account.initials
      }}</span>
      <div class="dna-portfolio-card__identity">
        <h2>{{ account.name }}</h2>
        <p>{{ account.industry ?? 'Not available' }}</p>
      </div>
      <TierBadge :tier="account.tier" />
    </header>
    <div>
      <span class="dna-portfolio-card__eyebrow">TONE</span
      ><strong>{{ profile.tone ?? 'Not available' }}</strong>
    </div>
    <ul aria-label="Top vocabulary">
      <li v-for="term in profile.vocabulary.slice(0, 3)" :key="term">
        {{ term }}
      </li>
    </ul>
    <footer>
      <span>{{ signalLabel }}</span
      ><button type="button" @click="$emit('view')">View Full DNA →</button>
    </footer>
  </article>
</template>

<style scoped>
.dna-portfolio-card {
  display: flex;
  width: 100%;
  min-height: 230px;
  flex-direction: column;
  gap: var(--spacing-10);
  padding: var(--spacing-18) var(--spacing-18) var(--spacing-16);
  box-sizing: border-box;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-card-default);
}
.dna-portfolio-card.is-selected {
  border-color: var(--color-border-brand);
  box-shadow: inset 0 0 0 1px var(--color-brand-light);
}
.dna-portfolio-card header {
  display: grid;
  grid-template-columns: 18px 44px minmax(0, 1fr) auto;
  align-items: start;
  gap: var(--spacing-10);
}
.dna-portfolio-card__select {
  display: grid;
  width: 18px;
  height: 18px;
  place-items: center;
  padding: 0;
  border: 1px solid var(--color-border-default);
  border-radius: 9px;
  background: var(--color-card-default);
  color: white;
  font-size: var(--font-size-10);
}
.is-selected .dna-portfolio-card__select {
  border-color: var(--color-brand-core);
  background: var(--color-brand-core);
}
.dna-portfolio-card__avatar {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: var(--radius-10);
  background: var(--color-brand-tint-900);
  color: var(--color-brand-light);
  font-weight: 700;
}
.dna-portfolio-card__identity {
  min-width: 0;
}
.dna-portfolio-card h2,
.dna-portfolio-card p {
  margin: 0;
}
.dna-portfolio-card h2 {
  font-size: var(--font-size-14);
  overflow-wrap: anywhere;
}
.dna-portfolio-card p {
  margin-top: 3px;
  color: var(--color-text-muted);
  font-size: var(--font-size-11);
  overflow-wrap: anywhere;
}
.dna-portfolio-card > div {
  display: grid;
  gap: var(--spacing-5);
}
.dna-portfolio-card__eyebrow {
  color: var(--color-text-tertiary);
  font: var(--font-size-9)/1.3 var(--font-family-mono);
}
.dna-portfolio-card > div strong {
  font-size: var(--font-size-12);
}
.dna-portfolio-card ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-6);
  margin: 0;
  padding: 0;
  list-style: none;
}
.dna-portfolio-card li {
  padding: var(--spacing-4) var(--spacing-8);
  border: 1px solid var(--color-border-brand);
  border-radius: var(--radius-full);
  color: var(--color-brand-light);
  font-size: var(--font-size-10);
  overflow-wrap: anywhere;
}
.dna-portfolio-card footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  color: var(--color-text-muted);
  font-size: var(--font-size-11);
}
.dna-portfolio-card footer button {
  border: 0;
  background: transparent;
  color: var(--color-brand-light);
  font-weight: var(--font-weight-semibold);
}
</style>
