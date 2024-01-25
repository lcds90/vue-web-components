/// <reference types="histoire" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { defaultColors } from 'histoire'

export default defineConfig({
  plugins: [
    vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('wc-')
      }
    }
  })],

  histoire: {
    // Histoire config can also go here
    // LINK https://histoire.dev/reference/config.html
    theme: {
      title: 'Web Components',
      logo: {
        dark: './src/assets/logo.svg',
        light: './src/assets/logo.svg',
        square:  './src/assets/logo.svg'
      },
      defaultColorScheme: 'dark',
      colors: {
        primary: defaultColors.purple,

      }
    },

  },

  build: {
    lib: {
      entry: './src/main.ce.ts',
      name: 'web-component-sample',
      // the proper extensions will be added
      fileName: 'web-component-sample'
    }
  },
  define: {
    'process.env': process.env
  }
})
