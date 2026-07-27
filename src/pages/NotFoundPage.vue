<script setup lang="ts">
import { RouterLink } from 'vue-router';

import PageShell from './PageShell.vue';
</script>

<template>
  <PageShell
    eyebrow="404"
    title="Page Not Found"
    description="The requested page could not be found."
  >
    <RouterLink to="/">Return to the Landing Page</RouterLink>
  </PageShell>
</template>
