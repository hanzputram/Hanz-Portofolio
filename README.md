# Hanz-Portofolio 🚀

A high-performance, interactive portfolio experience built with **Nuxt 3**, **GSAP**, **Three.js**, and **Lenis**.

## ✨ Features

- **3D Interactive Background**: Immersive visuals powered by Three.js.
- **Smooth Content Flow**: Lenis smooth scrolling for a premium feel.
- **Micro-Animations**: Scroll-triggered animations using AOS and GSAP.
- **Dynamic Projects**: Integration with Formspree for direct contact and showcase of professional work.
- **Deploy Ready**: Automated GitHub Pages deployment via GitHub Actions.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Animation**: [GSAP](https://greensock.com/gsap/) & [AOS](https://michalsnik.github.io/aos/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **Styling**: Vanilla CSS (Custom Glassmorphism)
- **Forms**: [Formspree](https://formspree.io/)

## 🚀 Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 💻 Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 📦 Production & Deployment

The project is configured for **GitHub Pages**.

### Static Generation

Build the application for static hosting:

```bash
npm run generate
```

### GitHub Pages Deployment

Every push to the `main` branch will automatically trigger the GitHub Action in `.github/workflows/deploy.yml` to build and deploy your site.

Live Site: [https://hanzputram.github.io/Hanz-Portofolio/](https://hanzputram.github.io/Hanz-Portofolio/)

---

Crafted with ❤️ by Hanz.
