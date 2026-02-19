<template>
  <div class="app-root">
    <div class="scroll-progress"></div>
    <Hero3D v-if="!isAdmin" />
    <Navbar v-if="!isAdmin" />
    <NuxtPage />
    <CustomCursor />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const route = useRoute();
const isAdmin = computed(() => route.path.startsWith("/admin"));
const isLoaded = useState("isLoaded", () => true);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".scroll-progress", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      scrub: 0.3,
    },
  });
});

const onLoaded = () => {
  isLoaded.value = true;
};
</script>

<style>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--accent-secondary, #00f0ff);
  z-index: 9999;
  transform-origin: left;
  transform: scaleX(0);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
}

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
