<template>
  <div class="cursor-follower" ref="cursorFollower"></div>
  <div class="cursor-dot" ref="cursorDot"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

const cursorFollower = ref(null)
const cursorDot = ref(null)

onMounted(() => {
  const follower = cursorFollower.value
  const dot = cursorDot.value
  
  // Initial position off-screen
  gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0 })
  gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0 })

  // Fade in
  gsap.to([follower, dot], { scale: 1, duration: 0.5, ease: 'power2.out' })

  // Mouse move logic
  const onMouseMove = (e) => {
    // Dot moves instantly
    gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'none'
    })
    
    // Follower moves smoothly
    gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
    })
  }

  // Hover States
  const onMouseEnterLink = () => {
    gsap.to(follower, { scale: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 0, duration: 0.3 })
    gsap.to(dot, { scale: 0.5, duration: 0.3 })
  }

  const onMouseLeaveLink = () => {
    gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderWidth: '1px', duration: 0.3 })
    gsap.to(dot, { scale: 1, duration: 0.3 })
  }

  window.addEventListener('mousemove', onMouseMove)

  // Attach listeners to interactive elements
  const links = document.querySelectorAll('a, button, .card')
  links.forEach(link => {
    link.addEventListener('mouseenter', onMouseEnterLink)
    link.addEventListener('mouseleave', onMouseLeaveLink)
  })

  // Cleanup/Re-attach monitoring (basic Observer could be better but this works for static content)
})
</script>

<style scoped>
.cursor-follower {
    position: fixed;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s;
}

.cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
}

@media (hover: none) {
    .cursor-follower, .cursor-dot {
        display: none;
    }
}
</style>
