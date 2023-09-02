import { defineCustomElement } from 'vue'
import Components from './components'
import 'bulma/css/bulma.css'
import { gsap } from 'gsap';

Object.entries(Components).forEach(([key, component]) => {
    customElements.define(`wc-${key}`, defineCustomElement(component))
})
