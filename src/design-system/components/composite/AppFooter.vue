<script setup lang="ts">
import {
  defaultFooterContent,
  type FooterContent,
  type FooterLink,
} from '../../../content/footer/defaultFooterContent';
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
    <AppSectionContainer class="app-footer__container">
      <div class="app-footer__top">
        <div class="app-footer__identity">
          <strong class="app-footer__brand">{{ content.brand }}</strong>
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

      <div class="app-footer__bottom">
        <span>{{ content.copyright }}</span>
      </div>
    </AppSectionContainer>
  </footer>
</template>

<style scoped>
.app-footer {
  color: var(--color-text-primary);
  background: var(--color-bg-surface);
}

.app-footer__container {
  display: grid;
  gap: var(--spacing-24);
  padding-block: var(--spacing-32);
}

.app-footer__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--spacing-48);
}

.app-footer__identity {
  max-width: 320px;
}

.app-footer__brand {
  font-size: var(--typography-wordmark-font-size);
  line-height: var(--typography-wordmark-line-height);
}

.app-footer__description {
  margin: var(--spacing-16) 0 0;
  color: var(--color-text-muted);
}

.app-footer__groups {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-48);
}

.app-footer__heading {
  margin: 0 0 var(--spacing-16);
  font-size: var(--typography-label-mono-kicker-font-size);
  letter-spacing: var(--typography-label-mono-kicker-letter-spacing);
}

.app-footer__links {
  display: grid;
  gap: var(--spacing-8);
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-footer__link {
  padding: 0;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

.app-footer__link:hover {
  color: var(--color-brand-primary);
}

.app-footer__link:focus-visible {
  border-radius: var(--radius-sm);
  outline: none;
  box-shadow: var(--shadow-focus-ring);
}

.app-footer__bottom {
  padding-top: var(--spacing-24);
  border-top: var(--stroke-1) solid var(--color-border-default);
  color: var(--color-text-muted);
  font-size: var(--typography-body-sm-font-size);
}
</style>
