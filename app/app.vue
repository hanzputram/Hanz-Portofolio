<template>
  <div class="app-root">
    <PageLoader @loaded="onLoaded" />
    <div :class="{ 'content-hidden': !isLoaded }">
      <Hero3D />
      <Navbar />
      <NuxtPage />
      <CustomCursor />
    </div>
  </div>
</template>

<script setup>
const isLoaded = useState('isLoaded', () => false)

const onLoaded = () => {
  isLoaded.value = true
}
</script>

<style>
.content-hidden {
  visibility: hidden;
  height: 100vh;
  overflow: hidden;
}

/* Global Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
