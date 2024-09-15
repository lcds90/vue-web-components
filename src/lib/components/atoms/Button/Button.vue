<script setup lang="ts">
	import { gsap } from 'gsap';
	import { onMounted, ref, watchEffect } from 'vue';

	interface Props {
		tag?: string;
	}

	withDefaults(defineProps<Props>(), {
		tag: 'button',
	});
	const button = ref<HTMLElement>();

	watchEffect(() => {
		if (button.value) {
			gsap.from(button.value, { y: 150, opacity: 0 });
		}
	});
</script>

<template>
	<component
		:is="tag"
		ref="button"
		class="button"
	>
		<slot />
	</component>
</template>

<style lang="scss">
	@import 'bulma/css/bulma.css';
</style>
