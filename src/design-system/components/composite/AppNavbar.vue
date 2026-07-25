<script setup lang="ts">
import { ref } from 'vue';
import {
  defaultHeaderContent,
  type HeaderContent,
  type HeaderNavigationItem,
  type SupportedLanguage,
} from '../../../content/header/defaultHeaderContent';
import { AppButton, AppSectionContainer } from '../core';

type NavbarVariant = 'desktop' | 'mobile' | 'transparent' | 'solid';

withDefaults(
  defineProps<{
    content?: HeaderContent;
    variant?: NavbarVariant;
    activeItem?: HeaderNavigationItem['id'];
    activeLanguage?: SupportedLanguage;
  }>(),
  {
    content: () => defaultHeaderContent,
    variant: 'desktop',
    activeItem: undefined,
    activeLanguage: 'en',
  },
);

const emit = defineEmits<{
  navigate: [item: HeaderNavigationItem];
  languageChange: [language: SupportedLanguage];
  strategyDiscussion: [];
}>();

const menuOpen = ref(false);

const closeMenu = () => {
  menuOpen.value = false;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu();
};
</script>

<template>
  <header
    class="app-navbar"
    :class="[`app-navbar--${variant}`, { 'app-navbar--open': menuOpen }]"
    @keydown="handleKeydown"
  >
    <AppSectionContainer class="app-navbar__container">
      <span class="app-navbar__brand">{{ content.brand }}</span>

      <button
        v-if="variant === 'mobile'"
        class="app-navbar__menu-button"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="app-navbar-menu"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <span aria-hidden="true">☰</span>
      </button>

      <div
        v-show="variant !== 'mobile' || menuOpen"
        id="app-navbar-menu"
        class="app-navbar__menu"
      >
        <nav class="app-navbar__navigation" aria-label="Primary navigation">
          <component
            :is="item.href ? 'a' : 'button'"
            v-for="item in content.navigation"
            :key="item.id"
            class="app-navbar__link"
            :class="{ 'app-navbar__link--active': activeItem === item.id }"
            :href="item.href"
            :type="item.href ? undefined : 'button'"
            :aria-current="activeItem === item.id ? 'page' : undefined"
            @click="
              () => {
                emit('navigate', item);
                closeMenu();
              }
            "
          >
            {{ item.label }}
          </component>
        </nav>

        <div class="app-navbar__languages" aria-label="Language selection">
          <button
            v-for="language in content.languages"
            :key="language.code"
            type="button"
            class="app-navbar__language"
            :class="{
              'app-navbar__language--active':
                activeLanguage === language.code,
            }"
            :aria-pressed="activeLanguage === language.code"
            @click="emit('languageChange', language.code)"
          >
            {{ language.label }}
          </button>
        </div>

        <AppButton
          size="sm"
          :href="content.strategyDiscussionHref"
          @click="emit('strategyDiscussion')"
        >
          {{ content.strategyDiscussionLabel }}
        </AppButton>
      </div>
    </AppSectionContainer>
  </header>
</template>

<style scoped>
.app-navbar {
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
}

.app-navbar--transparent {
  background: transparent;
}

.app-navbar--desktop,
.app-navbar--solid {
  border-radius: var(--radius-lg);
}

.app-navbar__container {
  display: flex;
  min-height: 72px;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-16);
}

.app-navbar--mobile .app-navbar__container {
  min-height: 64px;
  flex-wrap: wrap;
}

.app-navbar__brand {
  font-size: var(--typography-wordmark-font-size);
  font-weight: var(--font-weight-semibold);
  line-height: var(--typography-wordmark-line-height);
}

.app-navbar__menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-24);
}

.app-navbar--mobile .app-navbar__menu {
  width: 100%;
  align-items: stretch;
  flex-direction: column;
  padding-bottom: var(--spacing-16);
}

.app-navbar__navigation,
.app-navbar__languages {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);
}

.app-navbar--mobile .app-navbar__navigation {
  align-items: stretch;
  flex-direction: column;
}

.app-navbar__link,
.app-navbar__language,
.app-navbar__menu-button {
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

.app-navbar__link {
  padding: var(--spacing-8) 0;
  font-size: var(--typography-label-ui-font-size);
}

.app-navbar__link--active,
.app-navbar__language--active {
  color: var(--color-brand-primary);
}

.app-navbar__link:focus-visible,
.app-navbar__language:focus-visible,
.app-navbar__menu-button:focus-visible {
  border-radius: var(--radius-sm);
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.app-navbar__languages {
  gap: var(--spacing-8);
}

.app-navbar__language {
  padding: var(--spacing-4);
}

.app-navbar__menu-button {
  padding: var(--spacing-8);
  font-size: var(--typography-heading-h4-font-size);
}
</style>
