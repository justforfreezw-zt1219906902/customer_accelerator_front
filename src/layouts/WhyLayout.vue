<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import type { FooterLink } from '../content/footer/defaultFooterContent';
import { whyFooterEn } from '../content/footer/why.en';
import type { HeaderNavigationItem } from '../content/header/defaultHeaderContent';
import { whyNavigationEn } from '../content/navigation/why.en';
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
  <div class="why-layout">
    <a class="why-layout__skip-link" href="#main-content">
      Skip to main content
    </a>
    <AppNavbar
      :key="`why-navbar-${route.fullPath}`"
      variant="why"
      :content="whyNavigationEn"
      spa-navigation
      @navigate="handleHeaderNavigation"
      @strategy-discussion="navigateInternal('/contact')"
    />
    <main id="main-content" class="why-layout__main" tabindex="-1">
      <slot>
        <RouterView />
      </slot>
    </main>
    <AppFooter
      variant="why"
      :content="whyFooterEn"
      spa-navigation
      @navigate="handleFooterNavigation"
    />
  </div>
</template>

<style scoped>
.why-layout {
  min-height: 100vh;
  background: var(--color-bg-default);
}

.why-layout__skip-link {
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

.why-layout__skip-link:focus {
  transform: translateY(0);
}

.why-layout__main {
  min-height: 50vh;
  outline: none;
}
</style>
