import { defineCustomElement } from 'vue'

import Components from './components'

Object.entries(Components).forEach(([key, component]) => {
    const wc = defineCustomElement(component)

    customElements.define(`wc-${key}`, wc)
})
