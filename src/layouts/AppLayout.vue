<template>
  <main class="app-layout">
    <slot />
  </main>
</template>

<style scoped>
.app-layout {
  display: grid;
  min-height: 100vh;
  place-items: center;
}
</style>
