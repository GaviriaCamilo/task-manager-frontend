import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue()
  ],
  resolve: {
    alias: {
      '@': '/src',
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
})
