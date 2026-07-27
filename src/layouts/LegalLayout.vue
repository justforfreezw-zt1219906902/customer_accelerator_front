<script setup lang="ts">
import MarketingLayout from './MarketingLayout.vue';
</script>

<template>
  <MarketingLayout>
    <div class="legal-layout">
      <RouterView />
    </div>
  </MarketingLayout>
</template>

<style scoped>
.legal-layout {
  width: min(calc(100% - var(--spacing-32)), 72rem);
  margin-inline: auto;
}
</style>
