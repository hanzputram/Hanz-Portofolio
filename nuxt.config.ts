export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: true,
  srcDir: "app",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  nitro: {
    static: true,
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000/api",
    },
  },
  app: {
    baseURL: "/Hanz-Portofolio/",
    buildAssetsDir: "assets",
    head: {
      title: "Interactive Experience - Next Gen Web",
      meta: [
        {
          name: "description",
          content:
            "A super interactive web experience using Nuxt, GSAP, Three.js, and Lenis.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
