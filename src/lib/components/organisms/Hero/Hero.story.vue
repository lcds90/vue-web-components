<script setup lang="ts">
	import { ref } from 'vue';
	import { logEvent } from 'histoire/client';
	import { t } from '@locales';
	const text = ref('Botão');
</script>

<template>
	<Story
		:title="t('hero.title')"
		:layout="{ type: 'grid', width: 400 }"
	>
		<Variant title="default">
			<wc-hero @click="logEvent('click', $event)">
				<p slot="title">titulo</p>
				<p slot="subtitle">subtitulo</p>
			</wc-hero>
		</Variant>

        <Variant title="props">
			<wc-hero @click="logEvent('click', $event)" title="titulo" subtitle="subtitulo" />
		</Variant>
		
		<template #controls>
			<HstText
				title="Texto para o botão"
				v-model="text"
			/>
		</template>
	</Story>
</template>

<docs lang="md">
# My documentation

Checkout this [cool video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)!
</docs>
