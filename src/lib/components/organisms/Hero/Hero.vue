<script setup lang="ts">
	import { gsap } from 'gsap';
	import { computed } from 'vue';
	import { ref, toRefs, watchEffect } from 'vue';

	interface Props {
		title?: string;
		subtitle?: string;
		type?: Types;
		size?: Sizes;
		
	}

	const hero = ref<HTMLElement>();
	defineProps<Props>();

	watchEffect(() => {
		if (hero.value) {
			gsap.from(hero.value, { opacity: 0 });
		}
	});
</script>

<template>
	<section
		ref="hero"
		class="hero"
		:class="[size, type]"
	>
		<div class="hero-body">
			<p class="title">
				{{ title }}
				<slot name="title" />
			</p>
			<p class="subtitle">
				{{ subtitle }}
				<slot name="subtitle" />
			</p>
		</div>
	</section>
</template>

<style lang="scss">
	@import 'bulma/css/bulma.css';
</style>
