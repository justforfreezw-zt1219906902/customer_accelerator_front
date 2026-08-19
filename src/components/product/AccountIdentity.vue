<script setup lang="ts">
withDefaults(
  defineProps<{
    initials: string;
    name: string;
    detail: string;
    size?: 'sm' | 'lg';
    wrap?: boolean;
  }>(),
  { size: 'sm', wrap: false },
);
</script>
<template>
  <div
    class="account-identity"
    :class="[`account-identity--${size}`, { 'account-identity--wrap': wrap }]"
  >
    <span class="account-identity__avatar" aria-hidden="true">{{
      initials
    }}</span>
    <span class="account-identity__copy"
      ><strong :title="name">{{ name }}</strong
      ><small :title="detail">{{ detail }}</small></span
    >
  </div>
</template>
<style scoped>
.account-identity {
  display: flex;
  align-items: center;
  gap: var(--spacing-12);
  min-width: 0;
}
.account-identity__avatar {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--color-border-brand);
  border-radius: var(--radius-sm);
  background: var(--color-brand-tint-900);
  color: var(--color-brand-light);
  font: var(--font-weight-semibold) var(--font-size-11)/1
    var(--font-family-mono);
}
.account-identity__copy {
  display: grid;
  min-width: 0;
  gap: var(--spacing-3);
}
.account-identity strong {
  overflow: hidden;
  color: var(--color-text-primary);
  font-size: var(--font-size-13);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.account-identity small {
  overflow: hidden;
  color: var(--color-text-secondary);
  font-size: var(--font-size-11);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.account-identity--lg .account-identity__avatar {
  width: 52px;
  height: 52px;
  font-size: var(--font-size-14);
}
.account-identity--lg strong {
  font-size: var(--font-size-24);
}
.account-identity--lg small {
  font-size: var(--font-size-12);
  white-space: normal;
}
.account-identity--wrap strong,
.account-identity--wrap small {
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
  overflow-wrap: anywhere;
}
.account-identity--wrap small {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
