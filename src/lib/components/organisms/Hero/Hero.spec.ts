import { mount } from '@vue/test-utils';
import Hero from './Hero.vue';

describe('mount component', async () => {
	expect(Hero).toBeTruthy();

	const wrapper = mount(Hero, {
		props: {
			count: 4,
		},
	});

	it('should contain test 4', () => {
		expect(Hero).toBeTruthy();
	});
});
