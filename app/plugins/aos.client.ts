import AOS from 'aos'
import 'aos/dist/aos.css'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: false,
      offset: 50,
    })
  })
})
