/// <reference types="histoire" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { histoire } from './src/lib/histoire.config'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('wc-')
        }
      },
      customElement: true,
    })],
  build: {
    lib: {
      entry: './src/lib/main.ts',
      name: 'main',
      // the proper extensions will be added
      fileName: 'main'
    }
  },
  histoire,
/*   css: {
    preprocessorOptions: {
      scss: {
        // adicionar css
        additionalData: `
          @import 'bulma/css/bulma.css';
        `,
      }
    }
  }, */
  define: {
    'process.env': process.env
  },
  resolve:
  {
    alias: {
      '@': path.resolve(__dirname, './src/lib'),
      "@locales": path.resolve(__dirname, './src/lib/locales')
    }
  }
})
