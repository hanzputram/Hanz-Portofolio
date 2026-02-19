<template>
  <div class="admin-page">
    <div v-if="!isAuthenticated" class="login-wrapper">
      <div class="glass-panel login-card">
        <h1>Admin Control</h1>
        <p>Protected Access</p>
        <div class="input-group">
          <input
            v-model="githubToken"
            type="password"
            placeholder="GitHub Personal Access Token"
            @keyup.enter="login"
          />
          <p class="help-text">
            Don't have a token?
            <a
              href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio%20CMS"
              target="_blank"
              >Create one here</a
            >
            (require 'repo' scope).
          </p>
        </div>
        <button class="cta-button primary" @click="login">
          Login & Sync Repo
        </button>
        <p v-if="loginError" class="error">{{ loginError }}</p>
      </div>
    </div>

    <div v-else class="dashboard-wrapper">
      <header class="admin-header">
        <div class="logo">Admin<span>.</span>Panel</div>
        <div class="header-actions">
          <button class="save-btn" :class="{ saving }" @click="saveChanges">
            {{ saving ? "Syncing..." : "Publish Changes" }}
          </button>
          <button class="logout-btn" @click="logout">Logout</button>
        </div>
      </header>

      <main class="dashboard-content">
        <aside class="sidebar" data-lenis-prevent>
          <nav>
            <button
              v-for="section in sections"
              :key="section.id"
              :class="{ active: activeSection === section.id }"
              @click="activeSection = section.id"
            >
              {{ section.label }}
            </button>
          </nav>
        </aside>

        <section class="editor-area" data-lenis-prevent>
          <transition name="fade" mode="out-in">
            <!-- Hero Editor -->
            <div v-if="activeSection === 'hero'" class="editor-section">
              <h2>Hero Section</h2>
              <div class="form-grid">
                <div class="field">
                  <label>Title Line 1</label>
                  <input v-model="content.hero.line1" type="text" />
                </div>
                <div class="field">
                  <label>Title Line 2</label>
                  <input v-model="content.hero.line2" type="text" />
                </div>
                <div class="field full">
                  <label>Subtitle</label>
                  <textarea v-model="content.hero.subtitle"></textarea>
                </div>
              </div>
            </div>

            <!-- Features Editor -->
            <div
              v-else-if="activeSection === 'features'"
              class="editor-section"
            >
              <h2>Features / Vision</h2>
              <div
                v-for="(feature, index) in content.features"
                :key="index"
                class="feature-card glass-panel"
              >
                <div class="field">
                  <label>Title</label>
                  <input v-model="feature.title" type="text" />
                </div>
                <div class="field">
                  <label>Description</label>
                  <textarea v-model="feature.description"></textarea>
                </div>
              </div>
            </div>

            <!-- Projects Editor -->
            <div
              v-else-if="activeSection === 'projects'"
              class="editor-section"
            >
              <div class="section-header">
                <h2>Projects</h2>
                <button class="add-btn" @click="addProject">
                  + Add Project
                </button>
              </div>
              <div class="projects-list">
                <div
                  v-for="(project, index) in content.projects"
                  :key="index"
                  class="project-item glass-panel"
                >
                  <div class="project-header">
                    <h3>Project #{{ index + 1 }}</h3>
                    <button class="remove-btn" @click="removeProject(index)">
                      ×
                    </button>
                  </div>
                  <div class="form-grid">
                    <div class="field">
                      <label>Name</label>
                      <input v-model="project.name" type="text" />
                    </div>
                    <div class="field">
                      <label>Year</label>
                      <input v-model="project.year" type="text" />
                    </div>
                    <div class="field">
                      <label>Link</label>
                      <input v-model="project.link" type="text" />
                    </div>
                    <div class="field">
                      <label>Color (Hex)</label>
                      <input v-model="project.color" type="text" />
                    </div>
                    <div class="field full">
                      <label>Description</label>
                      <textarea
                        v-model="project.description"
                        placeholder="Project description..."
                      ></textarea>
                    </div>
                    <div class="field full">
                      <label>Thumbnail / Image</label>
                      <div class="image-upload-wrapper">
                        <img
                          v-if="project.image"
                          :src="project.image"
                          class="preview-img"
                        />
                        <div v-else class="preview-placeholder">No Image</div>
                        <input
                          type="file"
                          @change="(e) => handleFileUpload(e, index)"
                          accept="image/*"
                        />
                        <span
                          v-if="uploadingIndex === index"
                          class="upload-status"
                          >Uploading...</span
                        >
                      </div>
                    </div>
                    <div class="field full">
                      <label>Tags (Comma separated)</label>
                      <input
                        :value="project.tags.join(', ')"
                        @input="
                          (e) =>
                            (project.tags = e.target.value
                              .split(',')
                              .map((s) => s.trim()))
                        "
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Global Editor -->
            <div v-else-if="activeSection === 'global'" class="editor-section">
              <h2>Global Settings</h2>
              <div class="field mb-2">
                <label>Marquee Text</label>
                <input v-model="content.marqueeText" type="text" />
              </div>
              <div class="field mb-2">
                <label>Footer Copyright</label>
                <input v-model="content.footer.text" type="text" />
              </div>

              <h2 class="mt-4">Tech Stack</h2>
              <div class="tech-stack-editor">
                <div
                  v-for="(tech, index) in content.techStack"
                  :key="index"
                  class="tech-tag-edit"
                >
                  <input v-model="content.techStack[index]" type="text" />
                  <button @click="content.techStack.splice(index, 1)">×</button>
                </div>
                <button
                  class="add-btn mt-2"
                  @click="content.techStack.push('New Tech')"
                >
                  + Add Tech
                </button>
              </div>
            </div>
          </transition>
        </section>
      </main>
    </div>

    <!-- Notification Toast -->
    <client-only>
      <div v-if="showToast" class="toast" :class="toastType">
        {{ toastMessage }}
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

// Auth State
const isAuthenticated = ref(false);
const githubToken = ref("");
const loginError = ref("");

// Repo Config
const REPO_OWNER = "hanzputram";
const REPO_NAME = "Hanz-Portofolio";
const CONTENT_PATH = "app/assets/data/site-content.json";

const login = () => {
  if (githubToken.value.startsWith("ghp_")) {
    isAuthenticated.value = true;
    localStorage.setItem("github_token", githubToken.value);
    fetchContent();
  } else {
    loginError.value = "Please enter a valid GitHub Personal Access Token";
  }
};

const logout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem("github_token");
  githubToken.value = "";
};

// Content State
const content = reactive({
  hero: { line1: "", line2: "", subtitle: "" },
  features: [],
  projects: [],
  techStack: [],
  marqueeText: "",
  footer: { text: "" },
});

const fileSha = ref(""); // Required for GitHub API updates

const fetchContent = async () => {
  const token = localStorage.getItem("github_token");
  if (!token) return;

  try {
    const response = await $fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}`,
      {
        headers: { Authorization: `token ${token}` },
      },
    );

    // Decode base64 content
    const decoded = JSON.parse(atob(response.content));
    Object.assign(content, decoded);
    fileSha.value = response.sha;
  } catch (err) {
    console.error("Failed to fetch from GitHub:", err);
    // Fallback if API fails (maybe repo is private or token invalid)
    loginError.value = "Failed to fetch content. Check your token permissions.";
    logout();
  }
};

const uploadingIndex = ref(null);

const handleFileUpload = async (event, index) => {
  const file = event.target.files[0];
  if (!file) return;

  const token = localStorage.getItem("github_token");
  const reader = new FileReader();

  uploadingIndex.value = index;

  reader.onload = async () => {
    try {
      const base64Content = reader.result.split(",")[1];
      const fileName = `upload-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const uploadPath = `public/uploads/${fileName}`;

      const response = await $fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${uploadPath}`,
        {
          method: "PUT",
          headers: { Authorization: `token ${token}` },
          body: {
            message: `upload: ${fileName} for project ${index}`,
            content: base64Content,
          },
        },
      );

      // GitHub Pages serves public/ directly at root
      const publicUrl = `https://${REPO_OWNER}.github.io/${REPO_NAME}/uploads/${fileName}`;
      content.projects[index].image = publicUrl;

      toastMessage.value = "Image uploaded to GitHub!";
      toastType.value = "success";
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 3000);
    } catch (err) {
      console.error("GitHub Upload failed:", err);
      toastMessage.value = "Upload failed: " + err.message;
      toastType.value = "error";
      showToast.value = true;
    } finally {
      uploadingIndex.value = null;
    }
  };
  reader.readAsDataURL(file);
};

const activeSection = ref("hero");
const saving = ref(false);

const sections = [
  { id: "hero", label: "Hero" },
  { id: "features", label: "Features" },
  { id: "projects", label: "Projects" },
  { id: "global", label: "Global" },
];

// Project Management
const addProject = () => {
  content.projects.push({
    name: "New Project",
    year: "2026",
    tags: ["Vue", "Nuxt"],
    color: "#00f0ff",
    image: "",
    link: "",
    description: "",
  });
};

const removeProject = (index) => {
  content.projects.splice(index, 1);
};

// Save Logic
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success");

const saveChanges = async () => {
  const token = localStorage.getItem("github_token");
  if (!token) return;

  saving.value = true;
  try {
    const updatedJson = JSON.stringify(content, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(updatedJson)));

    await $fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}`,
      {
        method: "PUT",
        headers: { Authorization: `token ${token}` },
        body: {
          message: "cms: update site content via admin panel",
          content: base64Content,
          sha: fileSha.value,
        },
      },
    );

    toastMessage.value =
      "Changes pushed to GitHub! Site will rebuild in 1-2 mins.";
    toastType.value = "success";
    showToast.value = true;

    // Refresh SHA for next save
    await fetchContent();

    setTimeout(() => (showToast.value = false), 5000);
  } catch (err) {
    console.error("Push error:", err);
    toastMessage.value = "Failed to push to GitHub: " + err.message;
    toastType.value = "error";
    showToast.value = true;
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  const savedToken = localStorage.getItem("github_token");
  if (savedToken) {
    githubToken.value = savedToken;
    isAuthenticated.value = true;
    fetchContent();
  }
});
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: white;
  font-family: "Outfit", sans-serif;
}

/* Login Styles */
.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 3rem;
  text-align: center;
}

.login-card h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.login-card p {
  opacity: 0.6;
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group input {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  outline: none;
  transition: all 0.3s;
}

.input-group input:focus {
  border-color: var(--accent-secondary);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.error {
  color: #ff4d4d;
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Dashboard Styles */
.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.admin-header {
  padding: 1.5rem 5%;
  background: rgba(3, 3, 3, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 1px;
}

.logo span {
  color: var(--accent-secondary);
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.save-btn {
  padding: 0.8rem 1.5rem;
  background: var(--accent-secondary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.3);
}

.save-btn.saving {
  opacity: 0.7;
  cursor: not-allowed;
}

.help-text {
  font-size: 0.8rem;
  opacity: 0.6;
  margin-top: 0.5rem;
  line-height: 1.4;
}

.help-text a {
  color: var(--accent-secondary);
  text-decoration: underline;
}

.logout-btn {
  padding: 0.8rem 1.5rem;
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
}

.dashboard-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background: rgba(255, 255, 255, 0.02);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 1rem;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar button {
  padding: 1rem;
  text-align: left;
  background: transparent;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s;
}

.sidebar button:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}

.sidebar button.active {
  opacity: 1;
  background: var(--accent-secondary);
  color: white;
}

.editor-area {
  flex: 1;
  padding: 3rem;
  overflow-y: auto;
  background: #050505;
}

.editor-section {
  max-width: 800px;
  margin: 0 auto;
}

.editor-section h2 {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.add-btn {
  padding: 0.5rem 1rem;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid var(--accent-secondary);
  color: var(--accent-secondary);
  border-radius: 5px;
  cursor: pointer;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field.full {
  grid-column: span 2;
}

.field label {
  font-size: 0.9rem;
  opacity: 0.5;
}

.field input,
.field textarea {
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  outline: none;
}

.field textarea {
  min-height: 100px;
  resize: vertical;
}

.feature-card,
.project-item {
  margin-bottom: 2rem;
  padding: 2rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remove-btn {
  background: #ff4d4d;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.image-upload-wrapper {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  padding: 1rem;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
}

.preview-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid var(--accent-secondary);
}

.preview-placeholder {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  opacity: 0.5;
}

.upload-status {
  font-size: 0.8rem;
  color: var(--accent-secondary);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.tech-stack-editor {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tech-tag-edit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
  border-radius: 8px;
}

.tech-tag-edit input {
  background: transparent;
  border: none;
  color: white;
  width: 100px;
}

.tech-tag-edit button {
  background: rgba(255, 77, 77, 0.2);
  color: #ff4d4d;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.mb-2 {
  margin-bottom: 1rem;
}
.mt-2 {
  margin-top: 1rem;
}
.mt-4 {
  margin-top: 2rem;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  border-radius: 10px;
  z-index: 1000;
  animation: slideUp 0.3s ease-out;
}

.toast.success {
  background: #00c853;
}

.toast.error {
  background: #ff3d00;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
