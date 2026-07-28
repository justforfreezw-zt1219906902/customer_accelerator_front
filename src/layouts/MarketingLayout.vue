<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import type { FooterLink } from '../content/footer/defaultFooterContent';
import { footerEn } from '../content/footer/en';
import type { HeaderNavigationItem } from '../content/header/defaultHeaderContent';
import { navigationEn } from '../content/navigation/en';
import { AppFooter, AppNavbar } from '../design-system/components/composite';

const route = useRoute();
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
  <div class="marketing-layout">
    <a class="marketing-layout__skip-link" href="#main-content">
      Skip to main content
    </a>
    <AppNavbar
      :key="`navbar-${route.fullPath}`"
      variant="solid"
      active-language="en"
      :content="navigationEn"
      spa-navigation
      @home-navigate="navigateInternal('/')"
      @navigate="handleHeaderNavigation"
      @strategy-discussion="navigateInternal('/contact')"
    />
    <main id="main-content" class="marketing-layout__main" tabindex="-1">
      <slot>
        <RouterView />
      </slot>
    </main>
    <AppFooter
      :content="footerEn"
      spa-navigation
      @home-navigate="navigateInternal('/')"
      @navigate="handleFooterNavigation"
    />
  </div>
</template>

<style scoped>
.marketing-layout {
  min-height: 100vh;
}

.marketing-layout__skip-link {
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

.marketing-layout__skip-link:focus {
  transform: translateY(0);
}

.marketing-layout__main {
  min-height: 50vh;
  outline: none;
}
</style>
