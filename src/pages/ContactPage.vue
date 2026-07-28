<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

import { LeadForm } from '../components/contact';
import { contactContentEn as content } from '../content/contact/en';
import { AppBadge } from '../design-system/components/core';
import { submitLead } from '../services/leadApi';
import type { LeadFormValues } from '../types/lead';

const router = useRouter();
const isSubmitting = ref(false);
let activeController: AbortController | undefined;
let allowConfirmedSuccessNavigation = false;

const submitContact = async (values: LeadFormValues) => {
  activeController = new AbortController();
  try {
    await submitLead(values, { signal: activeController.signal });
    allowConfirmedSuccessNavigation = true;
    await router.replace({ name: 'thank-you' });
  } finally {
    activeController = undefined;
    allowConfirmedSuccessNavigation = false;
  }
};

const setSubmissionState = (value: boolean) => {
  isSubmitting.value = value;
};

onBeforeRouteLeave(() => {
  if (allowConfirmedSuccessNavigation) return true;
  if (!isSubmitting.value) return true;

  const shouldLeave = window.confirm(
    'Your request is still being submitted. Leaving now may make the result unclear. Leave this page?',
  );
  if (shouldLeave) activeController?.abort();
  return shouldLeave;
});

onBeforeUnmount(() => {
  activeController?.abort();
});
</script>

<template>
  <section class="contact-page" aria-labelledby="contact-page-title">
    <div class="contact-page__content">
      <div class="contact-page__trust-column">
        <p class="contact-page__eyebrow">{{ content.eyebrow }}</p>
        <h1 id="contact-page-title" data-page-heading>{{ content.title }}</h1>
        <p class="contact-page__description">{{ content.description }}</p>

        <div class="contact-page__badges" aria-label="Contact principles">
          <AppBadge type="sourced">{{ content.badges[0] }}</AppBadge>
          <AppBadge type="neutral" :show-icon="false">
            {{ content.badges[1] }}
          </AppBadge>
        </div>

        <section
          class="contact-page__expectations"
          :aria-labelledby="'contact-expectations-title'"
        >
          <h2 id="contact-expectations-title">
            {{ content.expectationsTitle }}
          </h2>
          <ol>
            <li
              v-for="(expectation, index) in content.expectations"
              :key="expectation"
            >
              <span aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <p>{{ expectation }}</p>
            </li>
          </ol>
        </section>

        <div class="contact-page__direct-contact">
          <p>{{ content.directContactLabel }}</p>
          <a :href="`mailto:${content.directContactEmail}`">
            {{ content.directContactEmail }}
          </a>
        </div>
      </div>

      <LeadForm
        :content="content.form"
        :submit-adapter="submitContact"
        @submission-state="setSubmissionState"
      />
    </div>
  </section>
</template>

<style scoped>
.contact-page {
  min-height: 680px;
  padding: clamp(var(--spacing-64), 7vw, var(--spacing-96))
    clamp(var(--spacing-24), 8vw, 188px);
  color: var(--color-text-primary);
  background: var(--color-bg-default);
}

.contact-page__content {
  display: grid;
  grid-template-columns: minmax(0, 380px) minmax(0, 624px);
  gap: 60px;
  align-items: center;
  max-width: 1064px;
  margin-inline: auto;
}

.contact-page__trust-column {
  display: grid;
  gap: 22px;
  min-width: 0;
}

.contact-page__eyebrow,
.contact-page__description,
.contact-page__expectations h2,
.contact-page__expectations ol,
.contact-page__expectations p,
.contact-page__direct-contact p {
  margin: 0;
}

.contact-page__eyebrow {
  color: var(--color-brand-light);
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
}

.contact-page h1 {
  max-width: 380px;
  margin: 0;
  font-size: clamp(var(--typography-heading-h1-font-size), 4vw, 48px);
  line-height: 1.12;
}

.contact-page__description {
  font-size: 17px;
  line-height: 1.55;
}

.contact-page__badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-8);
}

.contact-page__expectations {
  display: grid;
  gap: 14px;
}

.contact-page__expectations h2 {
  font-size: var(--typography-body-lg-font-size);
}

.contact-page__expectations ol {
  display: grid;
  gap: 14px;
  padding: 0;
  list-style: none;
}

.contact-page__expectations li {
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 14px;
}

.contact-page__expectations li > span,
.contact-page__direct-contact p {
  color: var(--color-brand-light);
  font-size: var(--typography-label-mono-kicker-font-size);
  font-weight: var(--font-weight-semibold);
}

.contact-page__expectations p {
  color: var(--color-text-muted);
  font-size: var(--typography-body-sm-font-size);
  line-height: 1.45;
}

.contact-page__direct-contact {
  display: grid;
  gap: 7px;
  padding-top: 22px;
  border-top: var(--stroke-1) solid var(--color-border-default);
}

.contact-page__direct-contact a {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
}

.contact-page__direct-contact a:hover {
  color: var(--color-brand-light);
}

@media (max-width: 64rem) {
  .contact-page__content {
    grid-template-columns: 1fr;
    max-width: 624px;
  }
}

@media (max-width: 40rem) {
  .contact-page {
    padding-block: var(--spacing-48);
  }

  .contact-page__content {
    gap: var(--spacing-48);
  }
}
</style>
