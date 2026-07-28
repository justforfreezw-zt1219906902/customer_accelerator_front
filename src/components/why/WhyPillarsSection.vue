<script setup lang="ts">
import type { whyContentEn } from '../../content/why/en';

defineProps<{ content: typeof whyContentEn.pillars }>();
</script>

<template>
  <section id="pillars" class="why-pillar-section" aria-labelledby="why-pillars-title">
    <p class="why-label">{{ content.eyebrow }}</p>
    <h2 id="why-pillars-title">{{ content.title }}</h2>
    <p class="why-description">{{ content.description }}</p>
    <div class="why-pillar-grid">
      <article v-for="item in content.items" :key="item.title" class="why-pillar">
        <span class="why-pillar__icon" :class="`why-pillar__icon--${item.tone}`">
          <img :src="item.icon" alt="" width="20" height="20" />
        </span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.why-pillar-section {
  display: grid;
  gap: 32px;
  padding: 76px 58px;
  scroll-margin-top: 24px;
}

.why-label,
h2,
h3,
p {
  margin: 0;
}

.why-label {
  color: var(--color-brand-light);
  font-size: 11px;
  font-weight: var(--font-weight-semibold);
}

h2 {
  color: var(--color-text-primary);
  font-size: 34px;
}

.why-description,
.why-pillar p {
  color: var(--color-text-muted);
  font-size: 13px;
  line-height: 21px;
}

.why-pillar-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
}

.why-pillar {
  display: grid;
  align-content: start;
  gap: 12px;
  min-height: 340px;
  padding: 24px;
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: 12px;
  background: var(--color-card-default);
}

.why-pillar__icon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: var(--stroke-1) solid var(--color-border-brand);
  border-radius: 10px;
}

.why-pillar__icon--amber {
  border-color: var(--color-border-amber);
}

.why-pillar__icon img {
  width: 20px;
  height: 20px;
}

h3 {
  color: var(--color-text-primary);
  font-size: 18px;
  line-height: 24px;
}

@media (max-width: 64rem) {
  .why-pillar-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 40rem) {
  .why-pillar-section {
    padding: var(--spacing-64) var(--spacing-24);
  }

  .why-pillar-grid {
    grid-template-columns: 1fr;
  }

  .why-pillar {
    min-height: auto;
  }
}
</style>
