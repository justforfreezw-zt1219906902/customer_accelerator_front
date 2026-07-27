<script setup lang="ts">
import { useRouter } from 'vue-router';

import { contactFooterEn } from '../content/footer/contact.en';
import type { FooterLink } from '../content/footer/defaultFooterContent';
import type { HeaderNavigationItem } from '../content/header/defaultHeaderContent';
import { contactNavigationEn } from '../content/navigation/contact.en';
import { AppFooter, AppNavbar } from '../design-system/components/composite';

const router = useRouter();

const navigateInternal = (href?: string) => {
  if (!href || href.startsWith('mailto:') || /^https?:\/\//.test(href)) return;
  void router.push(href);
};

const handleHeaderNavigation = (item: HeaderNavigationItem) => {
  navigateInternal(item.href);
};

const handleFooterNavigation = (link: FooterLink) => {
  navigateInternal(link.href);
};
</script>

<template>
  <div class="contact-layout">
    <a class="contact-layout__skip-link" href="#main-content">
      Skip to main content
    </a>
    <AppNavbar
      variant="contact"
      :content="contactNavigationEn"
      spa-navigation
      @navigate="handleHeaderNavigation"
    />
    <main id="main-content" class="contact-layout__main" tabindex="-1">
      <slot>
        <RouterView />
      </slot>
    </main>
    <AppFooter
      variant="contact"
      :content="contactFooterEn"
      spa-navigation
      @navigate="handleFooterNavigation"
    />
  </div>
</template>

<style scoped>
.contact-layout {
  min-height: 100vh;
}

.contact-layout__skip-link {
  position: fixed;
  z-index: 10;
  top: var(--spacing-8);
  left: var(--spacing-8);
  padding: var(--spacing-8) var(--spacing-16);
  border-radius: var(--radius-sm);
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  transform: translateY(-200%);
}

.contact-layout__skip-link:focus {
  transform: translateY(0);
}

.contact-layout__main {
  min-height: 50vh;
  outline: none;
}
</style>
