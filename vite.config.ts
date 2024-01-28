/// <reference types="histoire" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

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
  define: {
    'process.env': process.env
  },
  css: {
    preprocessorOptions: {
      scss: {
        // adicionar css
        additionalData: `@import "bulma/css/bulma.css";`,
        includePaths: ['node_modules']
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/lib'),
      "@locales": path.resolve(__dirname, './src/lib/locales')
    }
  }
})
