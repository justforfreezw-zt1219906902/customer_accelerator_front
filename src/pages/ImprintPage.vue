<script setup lang="ts">
import { imprintContent } from '../content/legal/imprint.en';
</script>

<template>
  <article
    class="imprint-page"
    :data-source-revision="imprintContent.manifest.revision"
  >
    <header class="imprint-page__hero">
      <span class="imprint-page__eyebrow">{{ imprintContent.eyebrow }}</span>
      <h1 id="imprint-title" data-page-heading tabindex="-1">
        {{ imprintContent.title }}
      </h1>
      <p class="imprint-page__revision">{{ imprintContent.revisionLabel }}</p>
      <p class="imprint-page__introduction">
        {{ imprintContent.introduction }}
      </p>
    </header>

    <div class="imprint-page__grid">
      <div class="imprint-page__sections">
        <section
          v-for="legalSection in imprintContent.sections"
          :id="legalSection.id"
          :key="legalSection.id"
          class="imprint-page__section"
          :data-section-number="legalSection.number"
        >
          <span class="imprint-page__section-label">
            {{ legalSection.heading.toUpperCase() }}
          </span>
          <h2>{{ legalSection.heading }}</h2>

          <template
            v-for="(block, blockIndex) in legalSection.blocks"
            :key="`${legalSection.id}-${blockIndex}`"
          >
            <p v-if="block.type === 'paragraph'">{{ block.text }}</p>
            <ul v-else-if="block.type === 'list'">
              <li v-for="item in block.items" :key="item">{{ item }}</li>
            </ul>
            <address v-else-if="block.type === 'contact'">
              <span v-for="line in block.lines" :key="line">{{ line }}</span>
            </address>
            <a
              v-else-if="block.type === 'link'"
              class="imprint-page__link"
              :href="block.href"
              :target="block.href.startsWith('https://') ? '_blank' : undefined"
              :rel="
                block.href.startsWith('https://')
                  ? 'noopener noreferrer'
                  : undefined
              "
            >
              {{ block.label }}
            </a>
            <div v-else class="imprint-page__table-scroll" tabindex="0">
              <table>
                <caption>
                  {{
                    block.caption
                  }}
                </caption>
                <thead>
                  <tr>
                    <th
                      v-for="header in block.headers"
                      :key="header"
                      scope="col"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                      {{ cell }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </section>
      </div>

      <aside class="imprint-page__sidebar" aria-label="Imprint information">
        <section class="imprint-page__quick-info">
          <span class="imprint-page__section-label">QUICK INFO</span>
          <h2>Imprint</h2>
          <p>
            Provider and legal disclosure details for mi-goTo / MILOTO
            GoToMarket.
          </p>
          <dl>
            <div>
              <dt>Operator</dt>
              <dd>Miroslav Stanojevic</dd>
            </div>
            <div>
              <dt>Business</dt>
              <dd>MILOTO GoToMarket</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Berlin, Germany</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>hello@mi-goto.com</dd>
            </div>
          </dl>
        </section>

        <nav class="imprint-page__index" aria-label="Imprint sections">
          <span class="imprint-page__section-label">SECTIONS</span>
          <ol>
            <li
              v-for="legalSection in imprintContent.sections"
              :key="legalSection.id"
            >
              <a :href="`#${legalSection.id}`">{{ legalSection.heading }}</a>
            </li>
          </ol>
        </nav>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.imprint-page {
  padding-block: 92px var(--spacing-96);
  color: var(--color-text-primary);
}

.imprint-page__hero {
  max-width: 56rem;
  margin-bottom: 112px;
}

.imprint-page__eyebrow {
  display: inline-flex;
  padding: 7px 13px;
  border: var(--stroke-1) solid var(--color-border-brand);
  border-radius: var(--radius-full);
  background: var(--color-brand-primary);
  color: var(--color-text-on-brand);
  font-size: var(--typography-label-mono-kicker-font-size);
  font-weight: var(--font-weight-bold);
}

h1 {
  margin: 28px 0;
  font-size: clamp(var(--typography-heading-h1-font-size), 5vw, 72px);
  line-height: 1.14;
}

h1:focus {
  outline: none;
}

.imprint-page__revision,
.imprint-page__introduction {
  max-width: 47.5rem;
  color: var(--color-text-muted);
  font-size: var(--typography-body-lg-font-size);
  line-height: 30px;
}

.imprint-page__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 324px;
  gap: 36px;
  align-items: start;
}

.imprint-page__sections,
.imprint-page__sidebar {
  display: grid;
  gap: var(--spacing-24);
}

.imprint-page__section,
.imprint-page__quick-info,
.imprint-page__index {
  padding: 30px;
  border: var(--stroke-1) solid var(--color-border-subtle);
  border-radius: 22px;
  background: var(--color-card-default);
  box-shadow: 0 18px 17px rgb(0 0 0 / 20%);
}

.imprint-page__section:first-child,
.imprint-page__quick-info {
  border-color: var(--color-border-brand);
  background: var(--color-card-highlighted);
}

.imprint-page__section {
  scroll-margin-top: var(--spacing-32);
}

.imprint-page__section-label {
  color: var(--color-brand-light);
  font-size: var(--typography-label-mono-kicker-font-size);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.1em;
}

.imprint-page__section h2 {
  margin: 18px 0;
  padding-bottom: 18px;
  border-bottom: var(--stroke-1) solid var(--color-border-subtle);
  font-size: var(--typography-heading-h3-font-size);
  line-height: 32px;
}

.imprint-page__quick-info h2 {
  margin: 18px 0;
  font-size: 28px;
  line-height: 36px;
}

.imprint-page__section p,
.imprint-page__section li,
.imprint-page__quick-info p,
.imprint-page__quick-info dd {
  font-size: 15px;
  line-height: 25px;
}

.imprint-page__section p + p {
  margin-top: var(--spacing-12);
}

address {
  display: grid;
  gap: 6px;
  font-style: normal;
  font-size: 15px;
  line-height: 25px;
}

.imprint-page__link {
  display: block;
  width: fit-content;
  color: var(--color-brand-light);
  font-size: 15px;
  line-height: 24px;
}

.imprint-page__link:focus-visible,
.imprint-page__index a:focus-visible,
.imprint-page__table-scroll:focus-visible {
  border-radius: var(--radius-sm);
  outline: var(--stroke-2) solid var(--color-focus-ring);
  outline-offset: var(--spacing-4);
}

.imprint-page__sidebar {
  position: sticky;
  top: var(--spacing-24);
}

.imprint-page__quick-info dl div {
  display: grid;
  gap: 6px;
  padding-block: var(--spacing-8);
  border-top: var(--stroke-1) solid var(--color-border-subtle);
}

.imprint-page__quick-info dt {
  color: var(--color-brand-light);
  font-size: 12px;
  font-weight: var(--font-weight-bold);
}

.imprint-page__quick-info dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.imprint-page__index {
  padding: var(--spacing-24);
}

.imprint-page__index ol {
  display: grid;
  gap: 14px;
  margin: var(--spacing-16) 0 0;
  padding: 0;
  list-style: none;
}

.imprint-page__index a {
  color: var(--color-text-muted);
  font-size: var(--typography-body-sm-font-size);
  line-height: 22px;
}

.imprint-page__table-scroll {
  overflow-x: auto;
}

@media (max-width: 64rem) {
  .imprint-page {
    padding-block: var(--spacing-64);
  }

  .imprint-page__hero {
    margin-bottom: var(--spacing-64);
  }

  .imprint-page__grid {
    grid-template-columns: 1fr;
  }

  .imprint-page__sidebar {
    position: static;
    grid-row: 1;
  }
}

@media (max-width: 30rem) {
  .imprint-page__section,
  .imprint-page__quick-info,
  .imprint-page__index {
    padding: var(--spacing-24);
  }
}
</style>
