/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [
        Vue(),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src/lib'),
          "@locales": path.resolve(__dirname, './src/lib/locales')
        }
      }
})