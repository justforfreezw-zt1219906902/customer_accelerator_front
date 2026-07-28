<script setup lang="ts">
import logoLockup from '../../../assets/brand/mi-goto-lockup-light-hidpi.png';

type BrandLogoSize = 'header' | 'footer';

const props = withDefaults(
  defineProps<{
    label?: string;
    destination?: string;
    size?: BrandLogoSize;
    spaNavigation?: boolean;
  }>(),
  {
    label: 'mi-goTo',
    destination: '/',
    size: 'header',
    spaNavigation: false,
  },
);

const emit = defineEmits<{
  homeNavigate: [];
}>();

const handleNavigation = (event: MouseEvent) => {
  if (props.spaNavigation) event.preventDefault();
  emit('homeNavigate');
};
</script>

<template>
  <a
    class="app-brand-logo"
    :class="`app-brand-logo--${size}`"
    :href="destination"
    aria-label="mi-goTo home"
    @click="handleNavigation"
  >
    <img
      class="app-brand-logo__image"
      :src="logoLockup"
      alt=""
      :width="size === 'footer' ? 132 : 124"
      :height="size === 'footer' ? 38 : 36"
    />
    <span class="app-brand-logo__text">{{ label }}</span>
  </a>
</template>

<style scoped>
.app-brand-logo {
  display: inline-flex;
  flex: 0 0 auto;
  overflow: visible;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  box-shadow: none;
  opacity: 1;
  text-decoration: none;
}

.app-brand-logo--header {
  width: 124px;
  height: 36px;
}

.app-brand-logo--footer {
  width: 132px;
  height: 38px;
}

.app-brand-logo:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.app-brand-logo__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 1;
  filter: none;
  transform: none;
}

.app-brand-logo__text {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
