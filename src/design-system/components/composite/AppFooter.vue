<script setup lang="ts">
import {
  defaultFooterContent,
  type FooterContent,
  type FooterLink,
} from '../../../content/footer/defaultFooterContent';
import logoLockup from '../../../assets/brand/mi-goto-lockup-light.png';
import { AppSectionContainer } from '../core';

type FooterVariant = 'simple' | 'full';
type FooterContext = 'enterprise-dark' | 'impact-light';

const props = withDefaults(
  defineProps<{
    content?: FooterContent;
    variant?: FooterVariant;
    context?: FooterContext;
    spaNavigation?: boolean;
  }>(),
  {
    content: () => defaultFooterContent,
    variant: 'full',
    context: 'enterprise-dark',
    spaNavigation: false,
  },
);

const emit = defineEmits<{
  navigate: [link: FooterLink];
}>();

const handleNavigation = (event: MouseEvent, link: FooterLink) => {
  if (props.spaNavigation && link.href && !link.external) {
    event.preventDefault();
  }
  emit('navigate', link);
};
</script>

<template>
  <footer
    class="app-footer"
    :class="[`app-footer--${variant}`, `app-footer--${context}`]"
    :data-theme="
      context === 'impact-light' ? 'light-impact' : 'dark-enterprise'
    "
  >
    <AppSectionContainer
      as="div"
      class="app-footer__container"
      content-width="landing"
      divider="without-top-divider"
    >
      <div class="app-footer__top">
        <div class="app-footer__identity">
          <strong class="app-footer__brand">
            <img
              class="app-footer__logo"
              :src="logoLockup"
              alt=""
              width="132"
              height="38"
            />
            <span class="app-footer__brand-text">{{ content.brand }}</span>
          </strong>
          <p class="app-footer__description">{{ content.description }}</p>
        </div>

        <div v-if="variant === 'full'" class="app-footer__groups">
          <section
            v-for="group in content.groups"
            :key="group.id"
            class="app-footer__group"
          >
            <h2 class="app-footer__heading">{{ group.heading }}</h2>
            <ul class="app-footer__links">
              <li v-for="link in group.links" :key="link.id">
                <component
                  :is="link.href ? 'a' : 'button'"
                  class="app-footer__link"
                  :href="link.href"
                  :type="link.href ? undefined : 'button'"
                  :target="link.external && link.href ? '_blank' : undefined"
                  :rel="
                    link.external && link.href
                      ? 'noopener noreferrer'
                      : undefined
                  "
                  @click="handleNavigation($event, link)"
                >
                  {{ link.label }}
                </component>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div class="app-footer__divider" />

      <div class="app-footer__bottom">
        <span>{{ content.copyright }}</span>
        <span class="app-footer__bottom-statement">
          {{ content.bottomStatement }}
        </span>
      </div>
    </AppSectionContainer>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: var(--stroke-1) solid var(--color-border-subtle);
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
}

.app-footer__container {
  gap: 38px;
  padding: 76px clamp(var(--spacing-24), 9vw, 130px) 34px;
  background: var(--color-bg-surface);
}

.app-footer__container :deep(.app-section-container__content) {
  display: grid;
  gap: 38px;
}

.app-footer__top {
  display: grid;
  grid-template-columns: 370px repeat(3, 180px);
  justify-content: space-between;
  align-items: start;
}

.app-footer__identity {
  display: grid;
  gap: 18px;
  max-width: 370px;
}

.app-footer__brand {
  display: inline-flex;
  width: 132px;
}

.app-footer__logo {
  display: block;
  width: 132px;
  height: 38px;
  object-fit: contain;
}

.app-footer__brand-text {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.app-footer__description {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--typography-body-lg-font-size);
  line-height: 28px;
}

.app-footer__groups {
  display: contents;
}

.app-footer__group {
  width: 180px;
}

.app-footer__heading {
  margin: 0 0 var(--spacing-16);
  color: var(--color-brand-light);
  font-family: var(--font-family-inter), sans-serif;
  font-size: 12px;
  font-weight: var(--font-weight-bold);
  line-height: 16px;
  letter-spacing: 0.1em;
}

.app-footer__links {
  display: grid;
  gap: var(--spacing-16);
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-footer__link {
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  font-family: var(--font-family-inter), sans-serif;
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.app-footer__link:hover {
  color: var(--color-brand-primary);
}

.app-footer__group:last-child .app-footer__link {
  color: var(--color-brand-light);
  text-decoration: underline;
  text-underline-position: from-font;
}

.app-footer__link:focus-visible {
  border-radius: var(--radius-sm);
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.app-footer__divider {
  width: 100%;
  height: var(--stroke-1);
  background: var(--color-border-subtle);
  opacity: 0.55;
}

.app-footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 18px;
  color: var(--color-text-muted);
  font-size: 13px;
  line-height: 18px;
}

.app-footer__bottom > :first-child {
  width: 420px;
  font-weight: var(--font-weight-regular);
}

.app-footer__bottom-statement {
  width: 380px;
  font-weight: var(--font-weight-medium);
}

@media (max-width: 64rem) {
  .app-footer__container {
    padding: var(--spacing-48) var(--spacing-24) var(--spacing-32);
  }

  .app-footer__top {
    grid-template-columns: 1fr;
    gap: var(--spacing-48);
  }

  .app-footer__groups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
    gap: var(--spacing-32);
  }

  .app-footer__group {
    width: auto;
  }

  .app-footer__bottom {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--spacing-16);
  }

  .app-footer__bottom > :first-child,
  .app-footer__bottom-statement {
    width: auto;
  }
}

@media (max-width: 30rem) {
  .app-footer__groups {
    grid-template-columns: 1fr;
  }
}
</style>
