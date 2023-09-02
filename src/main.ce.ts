import { defineCustomElement } from 'vue'
import BaseButtonComponent from './BaseButton/BaseButton.ce.vue'
import 'bulma/css/bulma.css'

const BaseButton = defineCustomElement(BaseButtonComponent)

customElements.define('wc-base-button', BaseButton)