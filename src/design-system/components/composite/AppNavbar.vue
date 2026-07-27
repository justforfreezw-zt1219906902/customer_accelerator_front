<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import logoLockup from '../../../assets/brand/mi-goto-lockup-light.png';
import {
  defaultHeaderContent,
  type HeaderContent,
  type HeaderNavigationItem,
  type SupportedLanguage,
} from '../../../content/header/defaultHeaderContent';
import { AppButton, AppSectionContainer } from '../core';

export type NavbarVariant =
  'landing' | 'contact' | 'desktop' | 'mobile' | 'transparent' | 'solid';

const props = withDefaults(
  defineProps<{
    content?: HeaderContent;
    variant?: NavbarVariant;
    activeItem?: HeaderNavigationItem['id'];
    activeLanguage?: SupportedLanguage;
    spaNavigation?: boolean;
  }>(),
  {
    content: () => defaultHeaderContent,
    variant: 'landing',
    activeItem: undefined,
    activeLanguage: 'en',
    spaNavigation: false,
  },
);

const emit = defineEmits<{
  navigate: [item: HeaderNavigationItem];
  languageChange: [language: SupportedLanguage];
  strategyDiscussion: [];
}>();

const menuOpen = ref(false);
const headerElement = ref<HTMLElement>();
const menuButton = ref<HTMLButtonElement>();

const closeMenu = () => {
  menuOpen.value = false;
};

const handleNavigation = (event: MouseEvent, item: HeaderNavigationItem) => {
  if (props.spaNavigation && item.href) event.preventDefault();
  emit('navigate', item);
  closeMenu();
};

const handleStrategyDiscussion = (event: MouseEvent) => {
  if (props.spaNavigation && props.content.strategyDiscussionHref) {
    event.preventDefault();
  }
  emit('strategyDiscussion');
  closeMenu();
};

const handleLanguageChange = (language: HeaderContent['languages'][number]) => {
  if (!language.available) return;
  emit('languageChange', language.code);
};

const handleKeydown = async (event: KeyboardEvent) => {
  if (event.key !== 'Escape' || !menuOpen.value) return;
  closeMenu();
  await nextTick();
  menuButton.value?.focus();
};

const handleOutsidePointer = (event: PointerEvent) => {
  if (
    menuOpen.value &&
    event.target instanceof Node &&
    !headerElement.value?.contains(event.target)
  ) {
    closeMenu();
  }
};

onMounted(() => document.addEventListener('pointerdown', handleOutsidePointer));
onBeforeUnmount(() =>
  document.removeEventListener('pointerdown', handleOutsidePointer),
);
</script>

<template>
  <header
    ref="headerElement"
    class="app-navbar"
    :class="[`app-navbar--${variant}`, { 'app-navbar--open': menuOpen }]"
    @keydown="handleKeydown"
  >
    <AppSectionContainer
      as="div"
      class="app-navbar__container"
      content-width="landing"
      divider="without-top-divider"
    >
      <span class="app-navbar__brand">
        <img
          class="app-navbar__logo"
          :src="logoLockup"
          alt=""
          width="124"
          height="36"
        />
        <span class="app-navbar__brand-text">{{ content.brand }}</span>
      </span>

      <button
        v-if="variant !== 'contact'"
        ref="menuButton"
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
        id="app-navbar-menu"
        class="app-navbar__menu"
        :class="{ 'app-navbar__menu--contact': variant === 'contact' }"
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
            @click="handleNavigation($event, item)"
          >
            {{ item.label }}
          </component>
        </nav>

        <div v-if="variant !== 'contact'" class="app-navbar__actions">
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
              :aria-disabled="!language.available"
              :disabled="!language.available"
              :title="language.unavailableLabel"
              @click="handleLanguageChange(language)"
            >
              {{ language.label }}
            </button>
          </div>

          <AppButton
            size="sm"
            :href="content.strategyDiscussionHref"
            @click="handleStrategyDiscussion"
          >
            {{ content.strategyDiscussionLabel }}
          </AppButton>
        </div>
      </div>
    </AppSectionContainer>
  </header>
</template>

<style scoped>
.app-navbar {
  color: var(--color-text-primary);
  border-bottom: var(--stroke-1) solid var(--color-border-subtle);
  background: var(--color-bg-default);
}

.app-navbar--transparent {
  background: transparent;
}

.app-navbar--desktop,
.app-navbar--landing,
.app-navbar--solid {
  border-radius: 0;
}

.app-navbar__container {
  padding: 22px clamp(var(--spacing-24), 9vw, 130px);
  background: transparent;
}

.app-navbar--contact .app-navbar__container {
  padding: 22px var(--content-padding-contact-desktop);
}

.app-navbar--contact
  .app-navbar__container
  :deep(.app-section-container__content) {
  justify-content: flex-start;
  gap: var(--spacing-32);
}

.app-navbar__menu--contact {
  display: flex;
}

.app-navbar__container :deep(.app-section-container__content) {
  display: flex;
  min-height: 36px;
  align-items: center;
  justify-content: space-between;
  gap: 34px;
}

.app-navbar__brand {
  display: inline-flex;
  flex: 0 0 124px;
}

.app-navbar__logo {
  display: block;
  width: 124px;
  height: 36px;
  object-fit: contain;
}

.app-navbar__brand-text {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.app-navbar__menu {
  display: contents;
}

.app-navbar--mobile .app-navbar__menu {
  width: 100%;
  align-items: stretch;
  flex-direction: column;
  padding-bottom: var(--spacing-16);
}

.app-navbar__navigation,
.app-navbar__languages,
.app-navbar__actions {
  display: flex;
  align-items: center;
}

.app-navbar__navigation {
  gap: 34px;
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
  font-size: 12px;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  white-space: nowrap;
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
  gap: 10px;
}

.app-navbar__actions {
  flex: 0 0 auto;
  gap: 22px;
}

.app-navbar__language {
  padding: 0;
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: var(--font-weight-medium);
  line-height: normal;
}

.app-navbar__language:disabled {
  color: var(--color-text-muted);
  cursor: not-allowed;
  opacity: 1;
}

.app-navbar__language--active {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}

.app-navbar__menu-button {
  display: none;
  padding: var(--spacing-8);
  font-size: var(--typography-heading-h4-font-size);
}

@media (max-width: 64rem) {
  .app-navbar__container {
    padding: var(--spacing-16) var(--spacing-24);
  }

  .app-navbar--contact .app-navbar__container {
    padding: var(--spacing-16) var(--spacing-24);
  }

  .app-navbar__container :deep(.app-section-container__content) {
    flex-wrap: wrap;
    gap: var(--spacing-16);
  }

  .app-navbar__menu-button {
    display: inline-flex;
  }

  .app-navbar__menu {
    display: none;
    width: 100%;
    flex: 0 0 100%;
    align-items: stretch;
    flex-direction: column;
    padding-bottom: var(--spacing-16);
  }

  .app-navbar__menu--contact {
    display: flex;
    width: auto;
    flex: 0 0 auto;
    padding: 0;
  }

  .app-navbar__menu--contact .app-navbar__navigation {
    flex-direction: row;
    gap: var(--spacing-32);
  }

  .app-navbar--open .app-navbar__menu {
    display: flex;
  }

  .app-navbar__navigation {
    align-items: stretch;
    flex-direction: column;
    gap: var(--spacing-8);
  }

  .app-navbar__languages {
    justify-content: flex-start;
  }

  .app-navbar__actions {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
