<template>
  <div class="main-wrapper">
    <main>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            <div class="line">
              <span
                v-for="(char, i) in 'Hello'.split('')"
                :key="'h1-' + i"
                class="hover-char"
                >{{ char }}</span
              >
              <span class="space">&nbsp;</span>
              <span
                v-for="(char, i) in 'I\'am'.split('')"
                :key="'h2-' + i"
                class="hover-char"
                >{{ char }}</span
              >
            </div>
            <div class="line">
              <span
                v-for="(char, i) in 'Hanz'.split('')"
                :key="'h3-' + i"
                class="hover-char gradient-text glitched-char"
                >{{ char }}</span
              >
            </div>
          </h1>
          <p class="hero-subtitle">Junior Web Developer</p>
          <div class="hero-actions">
            <button class="cta-button primary">Start Journey</button>
            <button class="cta-button secondary">Learn More</button>
          </div>
        </div>
        <div class="scroll-indicator">
          <div class="mouse">
            <div class="wheel"></div>
          </div>
        </div>
      </section>

      <!-- Content Grid -->
      <section class="content-section" id="features">
        <div class="grid-container">
          <div class="card-wrapper" data-aos="fade-right" data-aos-offset="100">
            <div class="card glass-panel">
              <div class="glare"></div>
              <div class="card-icon">01</div>
              <h3>Vision</h3>
              <p>
                To bridge the gap between aesthetic web design and measurable
                business growth, ensuring every custom-built site serves as a
                high-performance engine for digital success.
              </p>
            </div>
          </div>

          <div
            class="card-wrapper"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-offset="100"
          >
            <div class="card glass-panel">
              <div class="glare"></div>
              <div class="card-icon">02</div>
              <h3>Mission</h3>
              <p>
                To empower brands with tailor-made web solutions that prioritize
                speed, clean code, and search engine dominance. I aim to deliver
                more than just a URL. I provide a scalable digital platform
                built with modern technologies and optimized for maximum
                visibility
              </p>
            </div>
          </div>

          <div
            class="card-wrapper"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-offset="100"
          >
            <div class="card glass-panel">
              <div class="glare"></div>
              <div class="card-icon">03</div>
              <h3>Skills</h3>
              <p>
                I am a passionate Junior Web Developer with a strong foundation
                in modern web technologies. My expertise includes building
                responsive, user-centric websites using HTML, CSS, JavaScript,
                and frameworks like Vue.js and Nuxt.js also PHP. I am dedicated
                to writing clean, efficient code and continuously expanding my
                skill set to deliver high-quality digital solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Horizontal Scroll Text -->
      <section class="marquee-section">
        <div class="marquee-content outline-text">
          INTERACTIVE • CREATIVE • INNOVATIVE • NEXTGEN • EXPERIENCE •
        </div>
      </section>

      <!-- Showcase & Portal Transition -->
      <section class="showcase-section">
        <!-- The Trigger Item -->
        <div class="showcase-item">
          <div class="glass-panel showcase-content">
            <h2>Step Forward to realize your own website</h2>
            <p>Bring your dream website comethru</p>
          </div>
        </div>

        <!-- Hidden Dimension / Portal Content Overlaid -->
        <div class="hidden-dimension">
          <div class="dimension-content">
            <h1 class="glow-text">
              My <span class="gradient-text">Portofolio</span>
            </h1>
            <div class="portals-grid">
              <a href="https://vinsa.fr" target="_blank" class="portal-link">
                <div
                  class="portal-card glass-panel vinsa-project"
                  data-aos="fade-up"
                >
                  <div class="project-image-wrapper">
                    <img
                      src="/vinsa-thumbnail.png"
                      alt="Vinsa.fr"
                      class="project-thumbnail"
                    />
                    <div class="project-overlay">
                      <span class="view-project">View Site</span>
                    </div>
                  </div>
                  <div class="project-info">
                    <h3>Vinsa.fr</h3>
                    <p>Industrial Electrical Solutions</p>
                  </div>
                </div>
              </a>

              <div
                class="portal-card glass-panel coming-soon"
                v-for="n in 5"
                :key="n"
              >
                <div class="coming-soon-content">
                  <div class="placeholder-icon">?</div>
                  <h3>Coming Soon</h3>
                  <p>Exciting project in progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="footer-content">
          <div class="logo">Hanz<span class="dot">.</span></div>
          <p>© 2026 Interactive Experience. Crafted with Nuxt.</p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isLoaded = useState("isLoaded");

const startAnimations = () => {
  // Marquee Animation
  gsap.to(".marquee-content", {
    xPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".marquee-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });

  // Header Entrance Animation
  gsap.from(".header > *", {
    y: -20,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
  });

  // Hero Content Entrance
  gsap.from(".hover-char", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.05,
    ease: "expo.out",
    delay: 0.2,
  });

  gsap.from(".hero-subtitle, .hero-actions", {
    y: 30,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "expo.out",
    delay: 1,
  });

  // Title Characters Interaction
  const chars = document.querySelectorAll(".hover-char");
  chars.forEach((char) => {
    char.addEventListener("mouseenter", () => {
      gsap.to(char, {
        y: -15,
        scale: 1.2,
        color: "#00f0ff",
        duration: 0.3,
        ease: "power2.out",
      });
      // If it's Hanz, add a little extra punch
      if (char.classList.contains("glitched-char")) {
        gsap.to(char, {
          textShadow: "0 0 20px #00f0ff, 0 0 40px #7000ff",
          duration: 0.1,
        });
      }
    });
    char.addEventListener("mouseleave", () => {
      gsap.to(char, {
        y: 0,
        scale: 1,
        color: char.classList.contains("gradient-text") ? "" : "white",
        textShadow: "none",
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });
};

onMounted(() => {
  if (isLoaded.value) {
    startAnimations();
  } else {
    watch(isLoaded, (newVal) => {
      if (newVal) startAnimations();
    });
  }

  // Header Scroll Interaction (keep this always active or after load)
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Magnetic Buttons & Tilt (Existing Logic)
  const buttons = document.querySelectorAll(".cta-button");
  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    });
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.1,
        ease: "power1.out",
      });
      const glare = card.querySelector(".glare");
      if (glare) gsap.to(glare, { x: x, y: y, opacity: 1, duration: 0.1 });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      const glare = card.querySelector(".glare");
      if (glare) gsap.to(glare, { opacity: 0, duration: 0.3 });
    });
  });

  // Portal Transition Animation
  const showcaseSection = document.querySelector(".showcase-section");
  const showcaseContent = document.querySelector(".showcase-content");
  const hiddenDimension = document.querySelector(".hidden-dimension");
  const dimensionContent = document.querySelector(".dimension-content");
  const portalsGrid = document.querySelector(".portals-grid");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: showcaseSection,
      start: "top top",
      end: "+=600%", // Longer scroll distance for both zoom and horizontal scroll
      pin: true,
      scrub: 1,
    },
  });

  // Phase 1: Zoom into the card
  tl.to(showcaseContent, {
    scale: 80,
    opacity: 0,
    duration: 5,
    ease: "power2.in",
  })
    // Phase 2: Fade in the Matrix content
    .to(
      hiddenDimension,
      {
        opacity: 1,
        pointerEvents: "all",
        duration: 2,
        ease: "power1.inOut",
      },
      "-=1",
    )
    .from(
      dimensionContent,
      {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      },
      "<",
    )
    // Phase 3: Horizontal scroll the cards
    .to(portalsGrid, {
      x: () =>
        -(
          portalsGrid.scrollWidth -
          window.innerWidth +
          window.innerWidth * 0.1
        ),
      ease: "none",
      duration: 10,
    });
});
</script>

<style scoped>
/* Page Specific Styles */
.main-wrapper {
  position: relative;
  z-index: 1;
}

/* Include all previous CSS plus new styles for hidden dimension */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
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
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 1px;
}
.dot {
  color: var(--accent-secondary);
}
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
.nav-link:hover {
  opacity: 1;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--accent-color),
    var(--accent-secondary)
  );
  transition: width 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0 0 10px var(--accent-secondary);
}
.nav-link:hover::after {
  width: 100%;
}

.hero-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 5%;
  position: relative;
}
.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  letter-spacing: -2px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.line {
  display: flex;
  justify-content: center;
}
.hover-char {
  display: inline-block;
  cursor: default;
  transition: color 0.3s;
  user-select: none;
  white-space: pre; /* Keep spaces if needed, although we use .space */
}
.space {
  display: inline-block;
  width: 0.3em;
}
.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto 3rem auto;
  font-weight: 300;
  line-height: 1.6;
}
.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}
.cta-button {
  padding: 1.2rem 2.8rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  border: none;
  letter-spacing: 0.1rem;
  position: relative;
  z-index: 10;
  text-transform: uppercase;
}
.cta-button.primary {
  background-color: #ffffff !important;
  color: #000000 !important;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
}
.cta-button.primary:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 240, 255, 0.5);
}
.cta-button.secondary {
  background-color: #000000 !important;
  border: 2px solid #ffffff !important;
  color: #ffffff !important;
}
.cta-button.secondary:hover {
  background-color: #ffffff !important;
  color: #000000 !important;
  transform: translateY(-8px) scale(1.05);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.7;
}
.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid white;
  border-radius: 20px;
  position: relative;
}
.wheel {
  width: 4px;
  height: 8px;
  background: white;
  border-radius: 2px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 1.5s infinite;
}
@keyframes scroll {
  0% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 15px);
    opacity: 0;
  }
}

.content-section {
  padding: 8rem 5%;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.card {
  padding: 3rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.1s;
  transform-style: preserve-3d;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.01)
  );
}
.glare {
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.card:hover {
  border-color: var(--accent-secondary);
}
.card-icon {
  font-size: 4rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.05);
  position: absolute;
  top: 1rem;
  right: 2rem;
}
.card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-secondary);
}
.card p {
  line-height: 1.6;
  opacity: 0.8;
}

.marquee-section {
  padding: 6rem 0;
  overflow: hidden;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.02),
    transparent
  );
}
.marquee-content {
  white-space: nowrap;
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 800;
  color: transparent;
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.1);
  will-change: transform;
}

.showcase-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
  position: relative;
  overflow: hidden;
}
.showcase-content {
  padding: 4rem;
  text-align: center;
  border: 1px solid var(--accent-color);
  box-shadow: 0 0 50px rgba(112, 0, 255, 0.2);
}

/* Hidden Dimension Overlay */
.hidden-dimension {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10%;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
}

@media (max-height: 800px) {
  .hidden-dimension {
    padding-top: 5vh;
  }
  .glow-text {
    font-size: 3rem;
  }
}

.dimension-content {
  text-align: left;
  width: 100%;
}

.portal-link {
  text-decoration: none;
  display: block;
  flex-shrink: 0;
}

.portals-grid {
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
  padding-right: 15%;
  flex-wrap: nowrap;
}

@media (max-height: 800px) {
  .portals-grid {
    margin-top: 1.5rem;
    gap: 2rem;
  }
}

.portal-card {
  min-width: 320px;
  height: 450px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 0;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  flex-shrink: 0;
  overflow: hidden;
  cursor: pointer;
}

@media (max-height: 800px) {
  .portal-card {
    height: 400px;
    min-width: 280px;
  }
}

.portal-card:hover {
  border-color: var(--accent-secondary);
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 240, 255, 0.2);
}

.project-image-wrapper {
  width: 100%;
  height: 60%;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
  display: flex;
  justify-content: center;
  align-items: center;
}

.project-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.portal-card:hover .project-thumbnail {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portal-card:hover .project-overlay {
  opacity: 1;
}

.view-project {
  padding: 0.6rem 1.2rem;
  background: var(--accent-secondary);
  color: white;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
}

.project-info p {
  font-size: 0.9rem;
  opacity: 0.6;
  color: var(--accent-color);
}

/* Coming Soon Styles */
.coming-soon {
  justify-content: center;
  align-items: center;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.01),
    rgba(255, 255, 255, 0.01) 10px,
    rgba(255, 255, 255, 0.02) 10px,
    rgba(255, 255, 255, 0.02) 20px
  );
}

.coming-soon-content {
  text-align: center;
}

.placeholder-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.3;
  font-family: "Outfit", sans-serif;
  color: var(--accent-secondary);
}

.coming-soon h3 {
  opacity: 0.5;
  font-size: 1.2rem;
}

.coming-soon p {
  opacity: 0.3;
  font-size: 0.8rem;
}

.footer {
  padding: 4rem 5%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .footer-content {
    flex-direction: column;
    gap: 1rem;
  }
  .portals-grid {
    flex-direction: column;
  }
}
</style>
