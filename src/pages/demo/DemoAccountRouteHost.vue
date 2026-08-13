<script setup lang="ts">
import { useDemoAccount } from '../../demo/useDemoAccount';
const { account, accountId } = useDemoAccount();
</script>
<template>
  <section
    v-if="!account"
    class="account-not-found"
    aria-labelledby="account-not-found-title"
  >
    <h1 id="account-not-found-title" data-page-heading>Account not found</h1>
    <p>The requested demo account is unavailable.</p>
    <RouterLink to="/demo">Return to Account Discovery</RouterLink>
  </section>
  <div v-else class="demo-account-route-host" :data-account-id="accountId" />
</template>
<style scoped>
.account-not-found {
  max-width: 560px;
  padding: var(--spacing-48) var(--spacing-24);
}
.account-not-found a {
  color: var(--color-brand-light);
}
.demo-account-route-host {
  min-height: calc(100vh - 56px);
}
</style>
