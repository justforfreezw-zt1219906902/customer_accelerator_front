<script setup lang="ts">
import { computed, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    id?: string;
    label: string;
    description?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    status?: 'default' | 'success';
  }>(),
  {
    id: undefined,
    description: undefined,
    error: undefined,
    required: false,
    disabled: false,
    status: 'default',
  },
);

const generatedId = useId();
const controlId = computed(() => props.id ?? generatedId);
const descriptionId = computed(() =>
  props.description ? `${controlId.value}-description` : undefined,
);
const errorId = computed(() =>
  props.error ? `${controlId.value}-error` : undefined,
);
const describedBy = computed(() =>
  [descriptionId.value, errorId.value].filter(Boolean).join(' ') || undefined,
);
</script>

<template>
  <div
    class="app-form-field"
    :class="{
      'app-form-field--disabled': disabled,
      'app-form-field--invalid': Boolean(error),
      'app-form-field--success': status === 'success',
    }"
  >
    <div class="app-form-field__label-row">
      <slot name="leading" />
      <label class="app-form-field__label" :for="controlId">{{ label }}</label>
      <span v-if="required" class="app-form-field__required">Required</span>
    </div>

    <slot
      :control-id="controlId"
      :description-id="descriptionId"
      :error-id="errorId"
      :described-by="describedBy"
      :invalid="Boolean(error)"
      :disabled="disabled"
      :required="required"
    />

    <p
      v-if="description"
      :id="descriptionId"
      class="app-form-field__message"
    >
      {{ description }}
    </p>
    <p
      v-if="error"
      :id="errorId"
      class="app-form-field__message app-form-field__message--error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.app-form-field {
  display: grid;
  gap: var(--spacing-8);
  width: 100%;
}

.app-form-field__label-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}

.app-form-field__label {
  color: var(--color-text-primary);
  font-size: var(--typography-label-ui-font-size);
  line-height: var(--typography-label-ui-line-height);
}

.app-form-field__required {
  color: var(--color-text-muted);
  font-size: var(--typography-label-ui-font-size);
  line-height: var(--typography-label-ui-line-height);
}

.app-form-field__message {
  margin: 0;
  color: var(--color-input-helper);
  font-size: var(--typography-body-sm-font-size);
  line-height: var(--typography-body-sm-line-height);
}

.app-form-field__message--error {
  color: var(--color-input-error-text);
}

.app-form-field--disabled {
  opacity: var(--opacity-disabled);
}

.app-form-field--success .app-form-field__message {
  color: var(--color-state-success);
}
</style>
