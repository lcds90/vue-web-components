import { defaultColors, defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';
import { t } from './locales'

export const histoire = defineConfig({
	plugins: [HstVue()],
	setupFile: '/src/lib/histoire.setup.ts',
	// LINK https://histoire.dev/reference/config.html
	theme: {
		title: 'Web Components',
		logo: {
			dark: '@/assets/logo.svg',
			light: '@/assets/logo.svg',
			square: '@/assets/logo.svg',
		},
		defaultColorScheme: 'dark',
		colors: {
			primary: defaultColors.purple,
		},
	},
	tree: {
		groups: [
			{
				id: 'top',
				title: '', // No toggle
			},
			{
				title: t('groups.atoms'),
				include: (file) => file.path.includes('atoms'),
			},
			{
				title: t('groups.organisms'),
				include: (file) => file.path.includes('organisms'),
			},
		],
	},
});
