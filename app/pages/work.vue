<template>
  <div class="work-page">
    <section class="work-header">
      <h1 class="title">
        The Digital <span class="gradient-text">Forge.</span>
      </h1>
      <p class="subtitle">
        Selected works that challenge the boundaries of reality.
      </p>
    </section>

    <section class="projects-grid">
      <div
        v-for="(project, index) in projects"
        :key="project.name"
        class="project-card"
        :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
        @mouseenter="activeProject = project"
        @mouseleave="activeProject = null"
      >
        <div class="project-media">
          <img
            v-if="project.image"
            :src="
              project.image.startsWith('http')
                ? project.image
                : `${useRuntimeConfig().app.baseURL}${project.image.replace(/^\//, '')}`
            "
            :alt="project.name"
            class="project-img"
          />
          <div v-else class="media-placeholder">
            <div
              class="abstract-shape"
              :style="{ background: project.color }"
            ></div>
          </div>
          <div class="project-overlay">
            <div class="tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              class="view-btn-link"
            >
              <button class="view-btn">Explore</button>
            </a>
            <button v-else class="view-btn">Coming Soon</button>
          </div>
        </div>

        <div class="project-info">
          <div class="info-top">
            <h2 class="project-name">{{ project.name }}</h2>
            <p class="project-year">{{ project.year }}</p>
          </div>
          <p v-if="project.description" class="project-desc">
            {{ project.description }}
          </p>
        </div>
      </div>
    </section>

    <div class="project-bg" :class="{ active: activeProject }">
      <div
        v-if="activeProject"
        class="bg-layer"
        :style="{ background: activeProject.color, opacity: 0.1 }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import gsap from "gsap";

const config = useRuntimeConfig();

// Fetch content from Laravel API
const { data: remoteContent } = await useAsyncData("site-content", () =>
  $fetch(`${config.public.apiBase}/site-content`),
);

// Fallback to local data if API fails or is empty
import localData from "~/assets/data/site-content.json";

const siteContent = computed(() => {
  if (remoteContent.value && Object.keys(remoteContent.value).length > 0) {
    return remoteContent.value;
  }
  return localData;
});

const activeProject = ref(null);
const projects = computed(() => siteContent.value.projects);
</script>

<style scoped>
.work-page {
  min-height: 100vh;
  padding: 120px 5% 80px;
  background: #030303;
  color: white;
}

.work-header {
  margin-bottom: 6rem;
  text-align: center;
}

.title {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.6;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.project-card {
  cursor: pointer;
}

.project-media {
  aspect-ratio: 16/10;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.project-card:hover .project-img {
  transform: scale(1.05);
}

.view-btn-link {
  text-decoration: none;
}

.media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.abstract-shape {
  width: 15vw;
  height: 15vw;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  filter: blur(40px);
  transition: 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

.project-card:hover .abstract-shape {
  transform: scale(3) rotate(180deg);
  filter: blur(80px);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.4s;
  backdrop-filter: blur(0px);
}

.project-card:hover .project-overlay {
  opacity: 1;
  backdrop-filter: blur(10px);
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  transform: translateY(20px);
  transition: 0.4s 0.1s;
}

.project-card:hover .tags {
  transform: translateY(0);
}

.tag {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
}

.view-btn {
  padding: 0.8rem 2rem;
  background: white;
  color: black;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  transform: scale(0.8);
  transition: 0.4s 0.2s;
}

.project-card:hover .view-btn {
  transform: scale(1);
}

.project-info {
  margin-top: 1.5rem;
}

.info-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.5rem;
}

.project-name {
  font-size: 1.5rem;
  font-weight: 600;
}

.project-year {
  font-size: 0.9rem;
  opacity: 0.4;
}

.project-desc {
  font-size: 0.95rem;
  opacity: 0.6;
  line-height: 1.6;
  max-width: 90%;
}

.project-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  transition: 1s;
}

.bg-layer {
  width: 100%;
  height: 100%;
  transition: inherit;
}

@media (max-width: 992px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
