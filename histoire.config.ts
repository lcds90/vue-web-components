import { defaultColors, defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: 'histoire.setup.ts',
  // LINK https://histoire.dev/reference/config.html
  theme: {
    title: 'Web Components',
    logo: {
      dark: './src/assets/logo.svg',
      light: './src/assets/logo.svg',
      square: './src/assets/logo.svg'
    },
    defaultColorScheme: 'dark',
    colors: {
      primary: defaultColors.purple,

    }
  },
})
