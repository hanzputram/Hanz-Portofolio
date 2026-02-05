<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <NuxtLink to="/" class="logo">Hanz<span class="dot">.</span></NuxtLink>
    <nav class="desktop-nav">
      <NuxtLink to="/about" class="nav-link">About</NuxtLink>
      <NuxtLink to="/work" class="nav-link">Work</NuxtLink>
      <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
    </nav>
    <div class="mobile-toggle" @click="toggleMenu">
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    
    <div class="mobile-menu" :class="{ 'active': isMenuOpen }">
       <NuxtLink to="/about" class="mobile-link" @click="toggleMenu">About</NuxtLink>
       <NuxtLink to="/work" class="mobile-link" @click="toggleMenu">Work</NuxtLink>
       <NuxtLink to="/contact" class="mobile-link" @click="toggleMenu">Contact</NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 2rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    box-sizing: border-box;
    mix-blend-mode: difference;
    color: white;
    transition: all 0.4s ease;
}

.header.scrolled {
    padding: 1rem 5%;
    mix-blend-mode: normal; 
    background: rgba(3, 3, 3, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo { 
    text-decoration: none;
    color: white;
    font-family: 'Outfit', sans-serif; 
    font-weight: 700; 
    font-size: 1.5rem; 
    letter-spacing: 1px; 
}

.dot { color: var(--accent-secondary); }

.nav-link { 
    color: white; 
    text-decoration: none; 
    margin-left: 3rem; 
    font-weight: 500; 
    position: relative; 
    padding: 0.5rem 0; 
    opacity: 0.7; 
    transition: opacity 0.3s; 
}

.nav-link:hover, .router-link-active { opacity: 1; }

.nav-link::after { 
    content: ''; 
    position: absolute; 
    bottom: 0; 
    left: 0; 
    width: 0; 
    height: 2px; 
    background: linear-gradient(90deg, var(--accent-color), var(--accent-secondary)); 
    transition: width 0.3s cubic-bezier(0.19, 1, 0.22, 1); 
    box-shadow: 0 0 10px var(--accent-secondary); 
}

.nav-link:hover::after, .router-link-active::after { width: 100%; }

.mobile-toggle {
    display: none;
    cursor: pointer;
    z-index: 1001;
}

.bar {
    width: 25px;
    height: 2px;
    background: white;
    margin: 6px 0;
    transition: 0.4s;
}

.mobile-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background: var(--bg-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.5s cubic-bezier(0.7, 0, 0.3, 1);
}

.mobile-menu.active {
    right: 0;
}

.mobile-link {
    font-size: 2rem;
    color: white;
    text-decoration: none;
    margin: 1.5rem 0;
    font-weight: 700;
}

@media (max-width: 768px) {
    .desktop-nav { display: none; }
    .mobile-toggle { display: block; }
    .header.scrolled { mix-blend-mode: normal; }
}
</style>
