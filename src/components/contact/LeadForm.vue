<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue';

import type { contactContentEn } from '../../content/contact/en';
import { AppFormField } from '../../design-system/components/composite';
import { AppButton, AppInput } from '../../design-system/components/core';
import type {
  LeadFieldErrors,
  LeadFieldName,
  LeadFormValues,
} from '../../types/lead';
import { ApiRequestError, toApiRequestError } from '../../utils/apiErrors';
import { validateLead, validateLeadField } from '../../utils/leadValidation';

type FormContent = (typeof contactContentEn)['form'];
type SubmitAdapter = (values: LeadFormValues) => Promise<void>;

const props = withDefaults(
  defineProps<{
    content: FormContent;
    submitAdapter?: SubmitAdapter;
  }>(),
  {
    submitAdapter: undefined,
  },
);

const emit = defineEmits<{
  submit: [values: LeadFormValues];
  submissionState: [isSubmitting: boolean];
}>();

const fieldOrder: LeadFieldName[] = [
  'firstName',
  'familyName',
  'company',
  'workEmail',
];

const values = reactive<LeadFormValues>({
  firstName: '',
  familyName: '',
  company: '',
  workEmail: '',
});
const errors = reactive<LeadFieldErrors>({});
const isSubmitting = ref(false);
const showSummary = ref(false);
const errorSummary = ref<HTMLElement>();
const submissionError = ref<string>();

const errorEntries = computed(() =>
  fieldOrder
    .filter((field) => errors[field])
    .map((field) => ({ field, message: errors[field] as string })),
);

const setFieldError = (field: LeadFieldName) => {
  submissionError.value = undefined;
  const message = validateLeadField(field, values[field]);
  if (message) errors[field] = message;
  else delete errors[field];
};

const validateAll = () => {
  const nextErrors = validateLead(values);
  fieldOrder.forEach((field) => {
    const message = nextErrors[field];
    if (message) errors[field] = message;
    else delete errors[field];
  });
  return Object.keys(nextErrors).length === 0;
};

const focusValidation = async () => {
  await nextTick();
  errorSummary.value?.focus();
};

const handleSubmit = async () => {
  if (isSubmitting.value) return;

  if (!validateAll()) {
    showSummary.value = true;
    await focusValidation();
    return;
  }

  showSummary.value = false;
  submissionError.value = undefined;
  const submittedValues = { ...values };
  emit('submit', submittedValues);

  if (!props.submitAdapter) return;

  isSubmitting.value = true;
  emit('submissionState', true);
  try {
    await props.submitAdapter(submittedValues);
  } catch (error) {
    const requestError =
      error instanceof ApiRequestError ? error : toApiRequestError(error);
    if (requestError.category !== 'cancelled') {
      submissionError.value = requestError.message;
      await nextTick();
      errorSummary.value?.focus();
    }
  } finally {
    isSubmitting.value = false;
    emit('submissionState', false);
  }
};
</script>

<template>
  <form
    class="lead-form"
    novalidate
    :aria-busy="isSubmitting"
    @submit.prevent="handleSubmit"
  >
    <header class="lead-form__header">
      <h2>{{ content.title }}</h2>
      <p>{{ content.description }}</p>
    </header>

    <div
      v-if="(showSummary && errorEntries.length) || submissionError"
      ref="errorSummary"
      class="lead-form__error-summary"
      role="alert"
      tabindex="-1"
    >
      <strong>
        {{
          submissionError
            ? content.submissionErrorTitle
            : content.errorSummaryTitle
        }}
      </strong>
      <p v-if="submissionError">{{ submissionError }}</p>
      <ul v-if="errorEntries.length">
        <li v-for="entry in errorEntries" :key="entry.field">
          <a :href="`#lead-${entry.field}`">{{ entry.message }}</a>
        </li>
      </ul>
    </div>

    <div class="lead-form__fields">
      <AppFormField
        v-for="field in fieldOrder"
        :id="`lead-${field}`"
        :key="field"
        v-slot="{ controlId, describedBy, invalid }"
        :label="content.fields[field].label"
        :error="errors[field]"
        required
        :disabled="isSubmitting"
      >
        <AppInput
          :id="controlId"
          v-model="values[field]"
          :name="field"
          :type="field === 'workEmail' ? 'email' : 'text'"
          :placeholder="content.fields[field].placeholder"
          :autocomplete="
            field === 'firstName'
              ? 'given-name'
              : field === 'familyName'
                ? 'family-name'
                : field === 'company'
                  ? 'organization'
                  : 'email'
          "
          :aria-describedby="describedBy"
          :invalid="invalid"
          :disabled="isSubmitting"
          required
          @blur="setFieldError(field)"
        />
      </AppFormField>
    </div>

    <p class="lead-form__privacy-note">{{ content.privacyNote }}</p>

    <div class="lead-form__actions">
      <p>{{ content.responseNote }}</p>
      <AppButton type="submit" size="md" :disabled="isSubmitting">
        {{ isSubmitting ? content.submittingLabel : content.submitLabel }}
      </AppButton>
    </div>

    <p v-if="isSubmitting" class="lead-form__status" role="status">
      {{ content.submittingLabel }}
    </p>
  </form>
</template>

<style scoped>
.lead-form {
  display: grid;
  gap: 20px;
  width: 100%;
  padding: var(--spacing-32);
  border: var(--stroke-1) solid var(--color-border-default);
  border-radius: 14px;
  background: var(--color-card-default);
}

.lead-form__header {
  display: grid;
  gap: var(--spacing-8);
}

.lead-form__header h2,
.lead-form__header p,
.lead-form__privacy-note,
.lead-form__actions p,
.lead-form__status {
  margin: 0;
}

.lead-form__header h2 {
  font-size: var(--typography-heading-h3-font-size);
  line-height: var(--typography-heading-h3-line-height);
}

.lead-form__header p {
  color: var(--color-text-muted);
  font-size: var(--typography-body-sm-font-size);
  line-height: 1.45;
}

.lead-form__fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px var(--spacing-16);
}

.lead-form__privacy-note,
.lead-form__actions p,
.lead-form__status {
  color: var(--color-text-muted);
  font-size: 12px;
  line-height: 1.45;
}

.lead-form__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-24);
}

.lead-form__error-summary {
  padding: var(--spacing-16);
  border: var(--stroke-1) solid var(--color-state-error);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  background: var(--color-state-error-subtle);
}

.lead-form__error-summary:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.lead-form__error-summary ul {
  margin: var(--spacing-8) 0 0;
  padding-left: var(--spacing-24);
}

.lead-form__error-summary p {
  margin: var(--spacing-8) 0 0;
}

.lead-form__error-summary a {
  color: var(--color-state-error);
}

@media (max-width: 44rem) {
  .lead-form {
    padding: var(--spacing-24);
  }

  .lead-form__fields {
    grid-template-columns: 1fr;
  }

  .lead-form__actions {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
