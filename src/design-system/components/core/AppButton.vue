<script setup lang="ts">
import { computed } from 'vue';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    target?: string;
    rel?: string;
    type?: ButtonType;
    disabled?: boolean;
  }>(),
  {
    variant: 'primary',
    size: 'md',
    href: undefined,
    target: undefined,
    rel: undefined,
    type: 'button',
    disabled: false,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const element = computed(() => (props.href ? 'a' : 'button'));

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }

  emit('click', event);
};
</script>

<template>
  <component
    :is="element"
    class="app-button"
    :class="[
      `app-button--${variant}`,
      `app-button--${size}`,
      { 'app-button--disabled': disabled },
    ]"
    :href="href"
    :target="href ? target : undefined"
    :rel="href ? rel : undefined"
    :type="href ? undefined : type"
    :disabled="href ? undefined : disabled"
    :aria-disabled="disabled || undefined"
    :tabindex="href && disabled ? -1 : undefined"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-8);
  border: var(--stroke-1) solid transparent;
  border-radius: var(--radius-md);
  color: var(--color-text-on-brand);
  font-family: var(--font-family-inter), sans-serif;
  font-weight: var(--font-weight-medium);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color var(--motion-duration-fast),
    border-color var(--motion-duration-fast),
    box-shadow var(--motion-duration-fast);
}

.app-button:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.app-button--sm {
  padding: var(--spacing-8) var(--spacing-16);
  font-size: var(--typography-label-ui-font-size);
  line-height: 19px;
}

.app-button--md {
  padding: var(--spacing-12) var(--spacing-24);
  font-size: var(--typography-label-button-font-size);
  line-height: var(--typography-label-button-line-height);
  letter-spacing: var(--typography-label-button-letter-spacing);
}

.app-button--lg {
  padding: var(--spacing-16) var(--spacing-32);
  font-size: var(--typography-body-base-font-size);
  line-height: 23px;
}

.app-button--primary {
  border-color: var(--color-border-brand);
  background: var(--color-brand-light);
}

.app-button--primary:hover:not(.app-button--disabled) {
  background: var(--color-brand-core);
  box-shadow: var(--shadow-glow-violet);
}

.app-button--secondary {
  border-color: var(--color-border-brand);
  background: var(--color-card-default);
  color: var(--color-text-primary);
}

.app-button--secondary:hover:not(.app-button--disabled) {
  background: var(--color-brand-tint-900);
}

.app-button--ghost {
  border-color: var(--color-border-subtle);
  background: var(--color-card-default);
  color: var(--color-text-primary);
}

.app-button--ghost:hover:not(.app-button--disabled) {
  border-color: var(--color-border-brand);
}

.app-button--disabled {
  border-color: var(--color-state-disabled);
  background: var(--color-state-disabled);
  color: var(--color-text-muted);
  cursor: not-allowed;
  opacity: var(--opacity-disabled);
}
</style>
