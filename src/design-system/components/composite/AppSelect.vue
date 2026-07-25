<script setup lang="ts" generic="T extends string | number">
import { computed, useAttrs } from 'vue';
import AppFormField from './AppFormField.vue';
import type { AppSelectOption } from './AppSelect.types';
import './control.css';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: T | null;
    options: readonly AppSelectOption<T>[];
    id?: string;
    label: string;
    description?: string;
    error?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;
  }>(),
  {
    modelValue: null,
    id: undefined,
    description: undefined,
    error: undefined,
    name: undefined,
    placeholder: undefined,
    disabled: false,
    invalid: false,
    required: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: T | null];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const attrs = useAttrs();
const resolvedError = computed(() =>
  props.invalid ? (props.error ?? 'Choose a valid option.') : props.error,
);

const handleChange = (event: Event) => {
  const rawValue = (event.target as HTMLSelectElement).value;
  const option = props.options.find((item) => String(item.value) === rawValue);
  emit('update:modelValue', option?.value ?? null);
};
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
    <select
      v-bind="attrs"
      :id="field.controlId"
      class="app-composite-control app-select__control"
      :value="modelValue ?? ''"
      :name="name"
      :disabled="disabled"
      :required="required"
      :aria-invalid="field.invalid || undefined"
      :aria-describedby="field.describedBy"
      @change="handleChange"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="String(option.value)"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  </AppFormField>
</template>

<style scoped>
.app-select__control {
  appearance: auto;
}
</style>
