<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    label?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;
    autocomplete?: string;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
  }>(),
  {
    modelValue: '',
    id: undefined,
    label: undefined,
    type: 'text',
    name: undefined,
    placeholder: undefined,
    helperText: undefined,
    errorMessage: undefined,
    autocomplete: undefined,
    disabled: false,
    invalid: false,
    required: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const isInvalid = computed(() => props.invalid || Boolean(props.errorMessage));
const message = computed(() =>
  isInvalid.value ? props.errorMessage : props.helperText,
);
const messageId = computed(() =>
  message.value ? `${inputId.value}-message` : undefined,
);
</script>

<template>
  <div
    class="app-input"
    :class="{
      'app-input--invalid': isInvalid,
      'app-input--disabled': disabled,
    }"
  >
    <label v-if="label" class="app-input__label" :for="inputId">
      {{ label }}
    </label>
    <input
      v-bind="attrs"
      :id="inputId"
      class="app-input__control"
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :required="required"
      :aria-invalid="isInvalid || undefined"
      :aria-describedby="messageId"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <p
      v-if="message"
      :id="messageId"
      class="app-input__message"
      :class="{ 'app-input__message--error': isInvalid }"
    >
      {{ message }}
    </p>
  </div>
</template>

<style scoped>
.app-input {
  display: grid;
  gap: var(--spacing-8);
  width: 100%;
}

.app-input__label {
  color: var(--color-text-primary);
  font-size: var(--typography-label-ui-font-size);
  line-height: var(--typography-label-ui-line-height);
  letter-spacing: var(--typography-label-ui-letter-spacing);
}

.app-input__control {
  width: 100%;
  min-width: 0;
  padding: var(--spacing-12) var(--spacing-16);
  border: var(--stroke-1) solid var(--color-input-border);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  background: var(--color-input-background);
  font-size: var(--typography-body-base-font-size);
  line-height: var(--typography-body-base-line-height);
  transition:
    border-color var(--motion-duration-fast),
    box-shadow var(--motion-duration-fast);
}

.app-input__control::placeholder {
  color: var(--color-input-placeholder);
}

.app-input__control:hover:not(:disabled) {
  border-color: var(--color-input-border-hover);
}

.app-input__control:focus-visible {
  border-color: var(--color-input-border-focus);
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.app-input--invalid .app-input__control {
  border-color: var(--color-input-border-error);
  background: var(--color-state-error-subtle);
  box-shadow: none;
}

.app-input--disabled {
  opacity: var(--opacity-disabled);
}

.app-input__control:disabled {
  background: var(--color-input-background-disabled);
  cursor: not-allowed;
}

.app-input__message {
  margin: 0;
  color: var(--color-input-helper);
  font-size: var(--typography-body-sm-font-size);
  line-height: var(--typography-body-sm-line-height);
}

.app-input__message--error {
  color: var(--color-input-error-text);
}
</style>
