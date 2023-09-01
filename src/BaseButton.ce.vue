<script setup lang="ts">
defineProps({
  color: {
    type: String,
  },
  count: {
    type: Number,
  },
  cursor: {
    type: Boolean
  }
})
</script>

<template>
  <button
    class="px-6 py-3 rounded-md"
    :class="{
      'bg-gray-200': color == null,
      'bg-green-200': color === 'green',
      'bg-red-200': color === 'red',
      'is-click': cursor
    }"
  >
    <slot />
    <span
      v-if="count != null"
      class="text-xs ml-2 bg-white rounded-full px-1.5"
    >
      {{ count }}
    </span>
  </button>
</template>

<style>
.bg-green-200 {
  background: green;
}

.is-click {
  cursor: pointer;
}
</style>
