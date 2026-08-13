<script setup lang="ts">
defineProps<{
  pageTitle: string;
  parentTitle?: string;
  leafTitle?: string;
  rootTitleOnly?: boolean;
}>();
defineEmits<{ menu: [] }>();
</script>

<template>
  <header class="demo-topbar">
    <button
      class="demo-topbar__menu"
      type="button"
      aria-label="Open product navigation"
      @click="$emit('menu')"
    >
      ☰
    </button>
    <div class="demo-topbar__context">
      <template v-if="!rootTitleOnly"
        ><span>mi-goTo Intelligence</span><span>/</span></template
      ><template v-if="parentTitle && !rootTitleOnly"
        ><span>{{ parentTitle }}</span
        ><span>/</span></template
      ><template v-if="leafTitle && !rootTitleOnly"
        ><span>{{ pageTitle }}</span
        ><span>/</span></template
      ><strong>{{ leafTitle ?? pageTitle }}</strong>
    </div>
    <div class="demo-topbar__actions">
      <span class="demo-topbar__status"><i />Workspace synced</span
      ><span class="demo-topbar__avatar" aria-label="Current user">MS</span>
    </div>
  </header>
</template>

<style scoped>
.demo-topbar {
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-16);
  padding: 0 var(--spacing-24);
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-bg-default);
  font-size: var(--font-size-13);
}
.demo-topbar__context,
.demo-topbar__actions,
.demo-topbar__status {
  display: flex;
  align-items: center;
  gap: var(--spacing-8);
}
.demo-topbar__context {
  color: var(--color-text-muted);
}
.demo-topbar__context strong {
  color: var(--color-text-primary);
  font-size: var(--font-size-14);
}
.demo-topbar__status {
  padding: var(--spacing-6) var(--spacing-10);
  border-radius: var(--radius-md);
  background: var(--color-bg-surface);
  color: var(--color-text-secondary);
  font-size: var(--font-size-11);
}
.demo-topbar__status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-state-success);
}
.demo-topbar__avatar {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: var(--radius-14);
  background: var(--color-brand-deep);
  font-size: var(--font-size-10);
}
.demo-topbar__menu {
  display: none;
  border: 0;
  background: transparent;
  color: var(--color-text-primary);
  font-size: var(--font-size-24);
}
@media (max-width: 767px) {
  .demo-topbar {
    padding: 0 var(--spacing-16);
  }
  .demo-topbar__menu {
    display: block;
  }
  .demo-topbar__status {
    display: none;
  }
  .demo-topbar__context > span {
    display: none;
  }
}
</style>
