import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('mount component', async () => {
	expect(Button).toBeTruthy();

	const wrapper = mount(Button, {
		props: {
			count: 4,
		},
	});

	it('should contain test 4', () => {
		expect(wrapper.text()).toContain('test 4');
    });
    
});
