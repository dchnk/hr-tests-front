import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  transpileDependencies: true,
  server: {
    proxy: {
      '/api': {
        target: 'http://hr-tests.ru:5500',
         // target: 'http://localhost:5500',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
