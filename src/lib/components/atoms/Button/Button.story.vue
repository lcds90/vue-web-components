<script setup lang="ts">
	import { ref } from 'vue';
	import { logEvent } from 'histoire/client';
	import { t } from '@locales';
	const text = ref('Botão');
</script>

<template>
	<Story
		:title="t('button.title')"
		:layout="{ type: 'grid', width: 200 }"
	>
		<Variant title="default">
			<wc-button @click="logEvent('click', $event)">
				{{ text }}
			</wc-button>
		</Variant>

		<Variant title="green">
			<wc-button
				color="green"
				@click="logEvent('click', $event)"
			>
				{{ text }}
			</wc-button>
		</Variant>

		<Variant title="red">
			<wc-button
				color="red"
				@click="logEvent('click', $event)"
			>
				{{ text }}
			</wc-button>
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
