<script setup lang="ts">
import { dataProtectionContent } from '../content/legal/dataProtection.en';
</script>

<template>
  <article
    class="data-protection"
    :data-source-revision="dataProtectionContent.manifest.revision"
  >
    <header class="data-protection__hero">
      <span class="data-protection__eyebrow">
        {{ dataProtectionContent.eyebrow }}
      </span>
      <h1 id="data-protection-title" data-page-heading tabindex="-1">
        {{ dataProtectionContent.title }}
      </h1>
      <p>{{ dataProtectionContent.revisionLabel }}</p>
      <p class="data-protection__introduction">
        {{ dataProtectionContent.introduction }}
      </p>
    </header>

    <div class="data-protection__grid">
      <div class="data-protection__sections">
        <section
          v-for="legalSection in dataProtectionContent.sections"
          :id="legalSection.id"
          :key="legalSection.id"
          class="data-protection__section"
          :data-section-number="legalSection.number"
        >
          <span class="data-protection__section-index">
            SECTION {{ legalSection.number }}
          </span>
          <h2>{{ legalSection.number }}. {{ legalSection.heading }}</h2>

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
            <div v-else class="data-protection__table-scroll" tabindex="0">
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

      <aside
        class="data-protection__sidebar"
        aria-label="Data protection index"
      >
        <div class="data-protection__quick-info">
          <span class="data-protection__section-index">QUICK INFO</span>
          <h2>Data protection</h2>
          <p>Privacy notice for mi-goTo / MILOTO GoToMarket.</p>
          <dl>
            <div>
              <dt>Last updated</dt>
              <dd>May 2026</dd>
            </div>
            <div>
              <dt>Sections</dt>
              <dd>35</dd>
            </div>
            <div>
              <dt>Provider</dt>
              <dd>Miroslav Stanojevic</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>hello@mi-goto.com</dd>
            </div>
          </dl>
        </div>
        <nav aria-label="Data protection sections">
          <span class="data-protection__section-index">SECTIONS</span>
          <ol>
            <li
              v-for="legalSection in dataProtectionContent.sections"
              :key="legalSection.id"
            >
              <a :href="`#${legalSection.id}`">
                {{ legalSection.number }} {{ legalSection.heading }}
              </a>
            </li>
          </ol>
        </nav>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.data-protection {
  padding-block: var(--spacing-96);
  color: var(--color-text-primary);
}

.data-protection__hero {
  max-width: 52rem;
  margin-bottom: var(--spacing-96);
}

.data-protection__eyebrow,
.data-protection__section-index {
  color: var(--color-accent-amber-light);
  font-family: var(--font-family-mono), monospace;
  font-size: var(--typography-label-mono-kicker-font-size);
  line-height: var(--typography-label-mono-kicker-line-height);
  letter-spacing: var(--typography-label-mono-kicker-letter-spacing);
}

h1 {
  margin: var(--spacing-24) 0;
  font-size: var(--typography-display-hero-font-size);
  line-height: var(--typography-display-hero-line-height);
}

h1:focus {
  outline: none;
}

.data-protection__introduction {
  max-width: 45rem;
  color: var(--color-text-muted);
  font-size: var(--typography-body-lg-font-size);
  line-height: var(--typography-body-lg-line-height);
}

.data-protection__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20rem;
  gap: var(--spacing-48);
  align-items: start;
}

.data-protection__sections {
  display: grid;
  gap: var(--spacing-32);
}

.data-protection__section,
.data-protection__quick-info,
.data-protection__sidebar nav {
  padding: var(--spacing-32);
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
}

.data-protection__section {
  scroll-margin-top: var(--spacing-32);
}

.data-protection__section h2,
.data-protection__quick-info h2 {
  margin: var(--spacing-16) 0 var(--spacing-24);
  font-size: var(--typography-heading-h3-font-size);
  line-height: var(--typography-heading-h3-line-height);
}

.data-protection__section p,
.data-protection__section li,
.data-protection__quick-info p,
.data-protection__quick-info dd {
  font-size: var(--typography-body-base-font-size);
  line-height: var(--typography-body-base-line-height);
}

.data-protection__section li + li {
  margin-top: var(--spacing-8);
}

address {
  display: grid;
  gap: var(--spacing-4);
  font-style: normal;
}

.data-protection__sidebar {
  position: sticky;
  top: var(--spacing-24);
  display: grid;
  gap: var(--spacing-24);
}

.data-protection__quick-info dl div {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: var(--spacing-8);
  padding-block: var(--spacing-8);
  border-top: var(--stroke-1) solid var(--color-border-subtle);
}

.data-protection__quick-info dt {
  color: var(--color-text-muted);
}

.data-protection__quick-info dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.data-protection__sidebar ol {
  max-height: 42rem;
  margin: var(--spacing-16) 0 0;
  padding-left: var(--spacing-24);
  overflow-y: auto;
}

.data-protection__sidebar li + li {
  margin-top: var(--spacing-8);
}

.data-protection__sidebar a {
  color: var(--color-text-primary);
  font-size: var(--typography-body-sm-font-size);
  line-height: var(--typography-body-sm-line-height);
}

.data-protection__sidebar a:focus-visible,
.data-protection__table-scroll:focus-visible {
  border-radius: var(--radius-sm);
  outline: var(--stroke-2) solid var(--color-focus-ring);
  outline-offset: var(--spacing-4);
}

.data-protection__table-scroll {
  max-width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 42rem;
  border-collapse: collapse;
  font-size: var(--typography-body-sm-font-size);
}

caption {
  padding-bottom: var(--spacing-12);
  font-weight: var(--font-weight-semibold);
  text-align: left;
}

th,
td {
  padding: var(--spacing-12);
  border: var(--stroke-1) solid var(--color-border-default);
  text-align: left;
  vertical-align: top;
}

@media (max-width: 64rem) {
  .data-protection {
    padding-block: var(--spacing-64);
  }

  .data-protection__grid {
    grid-template-columns: 1fr;
  }

  .data-protection__sidebar {
    position: static;
    grid-row: 1;
  }

  .data-protection__sidebar ol {
    max-height: 20rem;
  }
}

@media (max-width: 30rem) {
  h1 {
    font-size: var(--typography-heading-h1-font-size);
    line-height: var(--typography-heading-h1-line-height);
  }

  .data-protection__section,
  .data-protection__quick-info,
  .data-protection__sidebar nav {
    padding: var(--spacing-24);
  }
}
</style>
