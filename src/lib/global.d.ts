export type Types = 'is-primary' | 'is-link' | 'is-info' | 'is-success' | 'is-warning' | 'is-danger'
export type Sizes = 'is-small' | 'is-medium' | 'is-large'

import { components } from './components';

// export {}

// Add the new element type to Vue's GlobalComponents type.
declare module 'vue' {
  interface GlobalComponents {
    // Be sure to pass in the Vue component type here 
    // (SomeComponent, *not* SomeElement).
    // Custom Elements require a hyphen in their name, 
    // so use the hyphenated element name here.
    'wc-button': typeof components.button;
    'wc-hero': typeof components.hero;
    'wc-navbar': typeof components.navbar;
  }
}