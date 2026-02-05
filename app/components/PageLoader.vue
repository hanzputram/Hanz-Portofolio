<template>
  <Transition name="loader-fade">
    <div
      v-if="!isLoaded"
      class="loader-overlay"
      :class="{ reveal: isRevealing }"
    >
      <div class="loader-container">
        <!-- The Luminal Thread -->
        <div class="thread-wrapper">
          <svg viewBox="0 0 1000 200" class="pulse-svg">
            <path
              ref="pulsePath"
              d="M0,100 L400,100 L420,60 L440,140 L460,100 L480,100 L500,20 L520,180 L540,100 L560,100 L580,120 L600,80 L620,100 L1000,100"
              class="thread-path"
              fill="none"
              stroke="var(--accent-secondary)"
              stroke-width="2"
            />
          </svg>
          <div ref="glowCircle" class="glow-circle"></div>
        </div>

        <!-- Center Spike / Portal -->
        <div ref="portal" class="portal"></div>

        <!-- Text Reveal -->
        <div class="loader-text-wrapper">
          <span ref="loaderText" class="loader-text">INITIALIZING CORE</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const isLoaded = ref(false);
const isRevealing = ref(false);
const pulsePath = ref(null);
const glowCircle = ref(null);
const portal = ref(null);
const loaderText = ref(null);

const emit = defineEmits(["loaded"]);

onMounted(async () => {
  const completeLoader = () => {
    if (isLoaded.value) return;
    isRevealing.value = true;
    setTimeout(() => {
      isLoaded.value = true;
      emit("loaded");
    }, 1000);
  };

  // Safety Timeout
  const safetyTimeout = setTimeout(() => {
    console.warn("Loader safety timeout triggered");
    completeLoader();
  }, 5000);

  // Dynamic import for plugin
  try {
    if (process.client) {
      const { MotionPathPlugin } = await import("gsap/MotionPathPlugin");
      gsap.registerPlugin(MotionPathPlugin);
    }
  } catch (e) {
    console.error("GSAP Plugin registration failed:", e);
    completeLoader();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      clearTimeout(safetyTimeout);
      completeLoader();
    },
  });

  // Set initial states
  if (pulsePath.value)
    gsap.set(pulsePath.value, {
      strokeDasharray: 2000,
      strokeDashoffset: 2000,
    });
  if (glowCircle.value) gsap.set(glowCircle.value, { opacity: 0, scale: 0 });
  if (portal.value)
    gsap.set(portal.value, { scaleY: 0, scaleX: 0.002, opacity: 0 });

  // 1. Thread Trace
  tl.to(pulsePath.value, {
    strokeDashoffset: 0,
    duration: 3,
    ease: "power2.inOut",
  }).to(
    glowCircle.value,
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
    },
    0.2,
  );

  // Move glow circle along path
  tl.to(
    glowCircle.value,
    {
      motionPath: {
        path: pulsePath.value,
        align: pulsePath.value,
        alignOrigin: [0.5, 0.5],
      },
      duration: 3,
      ease: "power2.inOut",
    },
    0,
  );

  // 2. Text updates
  tl.to(
    loaderText.value,
    {
      opacity: 0,
      y: -10,
      duration: 0.3,
    },
    "-=0.5",
  )
    .add(() => {
      if (loaderText.value) loaderText.value.innerText = "ACCESS GRANTED";
    })
    .to(loaderText.value, {
      opacity: 1,
      y: 0,
      duration: 0.3,
    });

  // 3. The Portal Shatter
  tl.to(
    portal.value,
    {
      opacity: 1,
      scaleY: 1.5,
      duration: 0.4,
      ease: "expo.out",
    },
    "+=0.2",
  )
    .to(portal.value, {
      scaleX: 1000,
      duration: 1.2,
      ease: "power4.inOut",
    })
    .to(
      pulsePath.value,
      {
        opacity: 0,
        duration: 0.2,
      },
      "-=1.0",
    )
    .to(
      glowCircle.value,
      {
        scale: 100,
        opacity: 0,
        duration: 0.8,
      },
      "-=1.0",
    );
});
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #030303;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.loader-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.thread-wrapper {
  position: relative;
  width: 80%;
  max-width: 800px;
}

.pulse-svg {
  width: 100%;
  overflow: visible;
}

.thread-path {
  filter: drop-shadow(0 0 8px var(--accent-secondary));
}

.glow-circle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--accent-secondary);
  border-radius: 50%;
  box-shadow: 0 0 20px 5px var(--accent-secondary);
  top: 0;
  left: 0;
}

.portal {
  position: absolute;
  width: 1vw;
  height: 100vh;
  background: white;
  box-shadow:
    0 0 50px white,
    0 0 100px var(--accent-secondary);
  z-index: 10;
  pointer-events: none;
}

.loader-text-wrapper {
  position: absolute;
  bottom: 10%;
  overflow: hidden;
}

.loader-text {
  font-family: "Outfit", sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  display: block;
}

.loader-fade-leave-active {
  transition: opacity 0.8s ease;
}

.loader-fade-leave-to {
  opacity: 0;
}
</style>
