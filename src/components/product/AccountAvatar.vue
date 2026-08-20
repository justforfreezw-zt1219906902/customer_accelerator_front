<script setup lang="ts">
import { accountInitials, accountIdentityTone } from '../../utils/accountIdentity';
const props = withDefaults(defineProps<{ accountId?: string; name: string; size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' });
</script>
<template>
  <span class="account-avatar" :class="[`account-avatar--${size}`, `account-avatar--${accountIdentityTone(accountId ?? name)}`]" aria-hidden="true">{{ accountInitials(props.name) }}</span>
</template>
<style scoped>
.account-avatar { display: grid; place-items: center; flex: 0 0 auto; border: 1px solid var(--color-border-brand); border-radius: var(--radius-10); background: var(--color-brand-tint-900); color: var(--color-brand-light); font-weight: var(--font-weight-semibold); font-family: var(--font-family-mono); }
.account-avatar--sm { width: 36px; height: 36px; font-size: var(--font-size-11); }
.account-avatar--md { width: 44px; height: 44px; font-size: var(--font-size-13); }
.account-avatar--lg { width: 52px; height: 52px; font-size: var(--font-size-14); }
.account-avatar--amber { border-color: var(--color-border-amber); background: var(--color-accent-amber-deep); color: var(--color-accent-amber-light); }
.account-avatar--success { border-color: var(--color-state-success); background: var(--color-state-success-subtle); color: var(--color-state-success); }
.account-avatar--deep { border-color: var(--color-brand-deep); background: var(--color-brand-deep); color: var(--color-brand-tint-200); }
</style>
