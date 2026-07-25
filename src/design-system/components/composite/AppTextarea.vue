<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import AppFormField from './AppFormField.vue';
import './control.css';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    id?: string;
    label: string;
    description?: string;
    error?: string;
    name?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
    maxLength?: number;
    showCounter?: boolean;
  }>(),
  {
    modelValue: '',
    id: undefined,
    description: undefined,
    error: undefined,
    name: undefined,
    placeholder: undefined,
    rows: 4,
    disabled: false,
    invalid: false,
    required: false,
    maxLength: undefined,
    showCounter: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const attrs = useAttrs();
const resolvedError = computed(() =>
  props.invalid ? (props.error ?? 'This field needs a valid value.') : props.error,
);
const countLabel = computed(() =>
  props.maxLength
    ? `${props.modelValue.length} / ${props.maxLength}`
    : String(props.modelValue.length),
);
</script>

<template>
  <AppFormField
    :id="id"
    v-slot="field"
    :label="label"
    :description="description"
    :error="resolvedError"
    :required="required"
    :disabled="disabled"
  >
    <textarea
      v-bind="attrs"
      :id="field.controlId"
      class="app-composite-control app-textarea__control"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :required="required"
      :maxlength="maxLength"
      :aria-invalid="field.invalid || undefined"
      :aria-describedby="field.describedBy"
      @input="
        emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <span
      v-if="showCounter"
      class="app-textarea__counter"
      aria-live="polite"
    >
      {{ countLabel }}
    </span>
  </AppFormField>
</template>

<style scoped>
.app-textarea__control {
  min-height: 116px;
  resize: none;
}

.app-textarea__counter {
  justify-self: end;
  color: var(--color-input-helper);
  font-size: var(--typography-body-sm-font-size);
}
</style>
