<script setup lang="ts">
import AccountAvatar from './AccountAvatar.vue';
withDefaults(
  defineProps<{
    accountId?: string;
    initials?: string;
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
    :class="[
      `account-identity--${size}`,
      { 'account-identity--wrap': wrap },
    ]"
  >
    <AccountAvatar :account-id="accountId" :name="name" size="sm" />
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
