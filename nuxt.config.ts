export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: true,
  srcDir: "app",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  nitro: {
    static: true,
  },
  app: {
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
