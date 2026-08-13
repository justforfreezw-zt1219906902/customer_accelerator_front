<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';

import { DemoNavigation, DemoTopbar } from '../components/product';
import { demoAccountProvider } from '../demo/demoAccountProvider';
import { AppBrandLogo } from '../design-system/components/core';

const route = useRoute();
const router = useRouter();
const drawerOpen = ref(false);
const drawer = ref<HTMLElement>();
const pageTitle = computed(() =>
  route.params.accountId
    ? (demoAccountProvider.findAccountById(String(route.params.accountId))
        ?.name ?? String(route.meta.productTitle ?? 'Account Overview'))
    : String(route.meta.productTitle ?? 'Account Discovery'),
);
const parentTitle = computed(() =>
  route.params.accountId ? 'Account Discovery' : undefined,
);
const leafTitle = computed(() =>
  route.name === 'DemoAccountDna' ? 'Communication DNA' : undefined,
);
const rootTitleOnly = computed(
  () => route.name === 'DemoDna' || route.name === 'DemoContentStudio',
);
const discoveryAccountCount =
  demoAccountProvider.listDiscoveryAccounts().length;

const openDrawer = async () => {
  drawerOpen.value = true;
  await nextTick();
  drawer.value?.querySelector<HTMLElement>('button, a')?.focus();
};
const closeDrawer = async (restore = true) => {
  drawerOpen.value = false;
  await nextTick();
  if (restore)
    document.querySelector<HTMLButtonElement>('.demo-topbar__menu')?.focus();
};
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && drawerOpen.value) void closeDrawer();
};
watch(drawerOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});
window.addEventListener('keydown', onKeydown);
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <div class="demo-layout" data-theme="dark-enterprise">
    <a class="demo-layout__skip" href="#demo-main">Skip to main content</a>
    <button
      v-if="drawerOpen"
      class="demo-layout__backdrop"
      type="button"
      aria-label="Close product navigation"
      @click="closeDrawer()"
    />
    <aside
      ref="drawer"
      class="demo-layout__sidebar"
      :class="{ 'is-open': drawerOpen }"
      :role="drawerOpen ? 'dialog' : undefined"
      :aria-modal="drawerOpen || undefined"
    >
      <div class="demo-layout__brand-row">
        <AppBrandLogo
          destination="/demo"
          spa-navigation
          @home-navigate="router.push('/demo')"
        />
        <button
          class="demo-layout__close"
          type="button"
          aria-label="Close product navigation"
          @click="closeDrawer()"
        >
          ×
        </button>
      </div>
      <DemoNavigation
        :account-count="discoveryAccountCount"
        @navigate="closeDrawer(false)"
      />
      <div class="demo-layout__user">
        <span>MS</span>
        <div><strong>Miroslav S.</strong><small>Admin</small></div>
      </div>
    </aside>
    <section class="demo-layout__workspace" :inert="drawerOpen || undefined">
      <DemoTopbar
        :page-title="pageTitle"
        :parent-title="parentTitle"
        :leaf-title="leafTitle"
        :root-title-only="rootTitleOnly"
        @menu="openDrawer"
      />
      <main id="demo-main" class="demo-layout__main" tabindex="-1">
        <RouterView />
      </main>
    </section>
  </div>
</template>

<style scoped>
.demo-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(
    to right,
    var(--color-bg-surface) 0 240px,
    var(--color-bg-default) 240px
  );
  color: var(--color-text-primary);
}
.demo-layout__sidebar {
  position: sticky;
  top: 0;
  display: flex;
  width: 240px;
  height: 100vh;
  flex: 0 0 240px;
  flex-direction: column;
  gap: var(--spacing-12);
  padding: var(--spacing-24) var(--spacing-16);
  overflow-y: auto;
  border-right: 1px solid var(--color-border-subtle);
  background: var(--color-bg-surface);
}
.demo-layout__brand-row {
  display: flex;
  min-height: 58px;
  align-items: start;
  justify-content: space-between;
}
.demo-layout__workspace {
  min-width: 0;
  flex: 1;
}
.demo-layout__main {
  min-height: calc(100vh - 56px);
  outline: none;
}
.demo-layout__user {
  display: flex;
  align-items: center;
  gap: var(--spacing-10);
  margin-top: auto;
  padding: var(--spacing-10);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  font-size: var(--font-size-11);
}
.demo-layout__user > span {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 50%;
  background: var(--color-brand-deep);
  color: var(--color-brand-light);
}
.demo-layout__user div {
  display: grid;
  gap: var(--spacing-2);
}
.demo-layout__user small {
  color: var(--color-text-muted);
}
.demo-layout__close {
  display: none;
}
.demo-layout__skip {
  position: fixed;
  z-index: 100;
  left: var(--spacing-8);
  top: var(--spacing-8);
  transform: translateY(-200%);
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  padding: var(--spacing-8);
}
.demo-layout__skip:focus {
  transform: none;
}
@media (max-width: 767px) {
  .demo-layout__sidebar {
    position: fixed;
    z-index: 30;
    left: 0;
    transform: translateX(-100%);
    transition: transform var(--motion-duration-base);
  }
  .demo-layout__sidebar.is-open {
    transform: translateX(0);
  }
  .demo-layout__close {
    display: block;
    border: 0;
    background: transparent;
    color: var(--color-text-primary);
    font-size: var(--font-size-28);
  }
  .demo-layout__backdrop {
    position: fixed;
    z-index: 20;
    inset: 0;
    border: 0;
    background: #0009;
  }
}
</style>
