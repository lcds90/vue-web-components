import { defineCustomElement } from 'vue';
import { components } from './components';
import 'bulma/css/bulma.css';

export function registerWebComponent(prefix: string = 'wc') {
	const component = Object.entries(components).find(
		([key]) => key === prefix
	);

	const wc = defineCustomElement(component[1], { shadowRoot: false });
	customElements.define(`${prefix}-${component[0]}`, wc);
}

export function registerWebAllComponents(prefix: string = '') {
	Object.entries(components).forEach(([key, component]) => {
		const wc = defineCustomElement(component, { shadowRoot: false });
		customElements.define(`${prefix}-${key}`, wc);
	});
}

