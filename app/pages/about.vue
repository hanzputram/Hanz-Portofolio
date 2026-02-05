<template>
  <div class="about-page">
    <div class="background-blob"></div>

    <main class="content">
      <section class="about-hero">
        <h1 class="reveal-text" data-aos="fade-up">
          The Architect <br />
          of <span class="gradient-text">Digital Realities</span>
        </h1>
        <p class="about-lead" data-aos="fade-up" data-aos-delay="200">
          Bridging the gap between imagination and implementation. I craft
          immersive experiences that live at the intersection of design and
          technology.
        </p>
      </section>

      <section class="about-grid">
        <div
          class="glass-card info-card"
          v-for="(item, index) in info"
          :key="index"
          data-aos="zoom-in"
          :data-aos-delay="index * 100"
        >
          <div class="card-glow"></div>
          <span class="index">{{ index + 1 }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </section>

      <section class="tech-section">
        <h2 class="section-title">
          Fueling the <span class="gradient-text">Engine</span>
        </h2>
        <div class="tech-container">
          <div
            class="tech-item"
            v-for="tech in techStack"
            :key="tech"
            @mousemove="onTechHover"
          >
            {{ tech }}
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-line"></div>
      <p>© 2026 Hanz. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

const info = [
  {
    title: "Vision",
    desc: "To bridge the gap between aesthetic web design and measurable business growth, ensuring every custom-built site serves as a high-performance engine for digital success.",
  },
  {
    title: "Mission",
    desc: "To empower brands with tailor-made web solutions that prioritize speed, clean code, and search engine dominance. I provide a scalable digital platform built with modern technologies and optimized for maximum visibility.",
  },
  {
    title: "Skills",
    desc: "I am a passionate Junior Web Developer with a strong foundation in modern web technologies. My expertise includes building responsive, user-centric websites using HTML, CSS, JavaScript, and frameworks like Vue.js and Nuxt.js, along with PHP.",
  },
];

const techStack = [
  "Nuxt",
  "Vue",
  "GSAP",
  "Three.js",
  "WebGL",
  "Tailwind",
  "Vite",
  "Node.js",
];

const onTechHover = (e) => {
  const el = e.target;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(el, {
    x: x * 0.5,
    y: y * 0.5,
    scale: 1.1,
    color: "#00f0ff",
    duration: 0.3,
    ease: "power2.out",
  });
};

onMounted(() => {
  // Reveal animation for lead text
  gsap.from(".about-lead", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.5,
    ease: "power3.out",
  });

  // Float animation for background blob
  gsap.to(".background-blob", {
    x: "30vw",
    y: "20vh",
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  // Tech items exit reset
  document.querySelectorAll(".tech-item").forEach((item) => {
    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        x: 0,
        y: 0,
        scale: 1,
        color: "white",
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });
});
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding-top: 100px;
  background: #030303;
  color: white;
  position: relative;
  overflow: hidden;
}

.background-blob {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(112, 0, 255, 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.about-hero {
  margin-bottom: 6rem;
  text-align: center;
}

.reveal-text {
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
}

.about-lead {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.8;
  line-height: 1.6;
  font-weight: 300;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 8rem;
}

.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 3rem;
  border-radius: 24px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.glass-card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: rgba(0, 240, 255, 0.3);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(112, 0, 255, 0.1),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.glass-card:hover .card-glow {
  opacity: 1;
}

.index {
  font-size: 0.8rem;
  opacity: 0.3;
  letter-spacing: 0.2rem;
  display: block;
  margin-bottom: 1rem;
}

.glass-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-secondary);
}

.tech-section {
  text-align: center;
  margin-bottom: 8rem;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.tech-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.tech-item {
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  cursor: default;
}

.footer {
  padding: 4rem 2rem;
  text-align: center;
  opacity: 0.5;
}

.footer-line {
  width: 50px;
  height: 1px;
  background: white;
  margin: 0 auto 1.5rem auto;
}

@media (max-width: 768px) {
  .reveal-text {
    font-size: 2.5rem;
  }
}
</style>
