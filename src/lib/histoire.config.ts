import { defaultColors, defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export const histoire = defineConfig({
  plugins: [HstVue()],
  setupFile: '/src/lib/histoire.setup.ts',
  // LINK https://histoire.dev/reference/config.html
  theme: {
    title: 'Web Components',
    logo: {
      dark: '@/assets/logo.svg',
      light: '@/assets/logo.svg',
      square: '@/assets/logo.svg'
    },
    defaultColorScheme: 'dark',
    colors: {
      primary: defaultColors.purple,

    }
  },
})
