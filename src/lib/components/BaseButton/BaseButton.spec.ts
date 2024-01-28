import { mount } from '@vue/test-utils';
import BaseButton from './BaseButton.vue';

describe('mount component', async () => {
	expect(BaseButton).toBeTruthy();

	const wrapper = mount(BaseButton, {
		props: {
			count: 4,
		},
	});

	it('should contain test 4', () => {
		expect(wrapper.text()).toContain('test 4');
	});
});
