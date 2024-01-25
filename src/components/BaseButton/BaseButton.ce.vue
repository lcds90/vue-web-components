<script setup lang="ts">
import { gsap } from 'gsap';
import { onMounted, ref, watchEffect } from 'vue';

defineProps({
  color: {
    type: String,
  },
  count: {
    type: Number,
  },
  cursor: {
    type: Boolean,
    default: true
  }
})

const button = ref<HTMLElement>();

watchEffect(() => {

  if (button.value) {

    gsap.from(button.value, { y: 150, opacity: 0 })
  }
})
</script>

<template>
  <button
    ref="button"
    class="button px-4 py-3"
    :class="{
      'is-light': color == null,
      'is-success': color === 'green',
      'is-danger': color === 'red',
      'is-clickable': cursor
    }"
  >
    <slot />
    <span
      v-if="count != null"
      class="has-text-small mx-1 px-1 has-text-black"
    >
      {{ count }}
    </span>
  </button>
</template>

<style lang="scss">
// @import 'bulma/css/bulma.css'
</style>