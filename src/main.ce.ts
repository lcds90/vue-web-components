import { defineCustomElement } from 'vue'
import BaseButtonComponent from './BaseButton.ce.vue'

const BaseButton = defineCustomElement(BaseButtonComponent)

customElements.define('wc-base-button', BaseButton)