<script setup lang="ts"></script>

<template>
	<div class="section">
		<div class="columns is-multiline">
			<wc-hero
				class="column is-12"
				size="is-small"
			>
				<div slot="title">
					<span class="title is-size-4">
            Botões
          </span>
					<span class="tag is-rounded is-dark is-size-7">Organismos</span>
				</div>
				<div slot="subtitle">
					<p>Entenda como fazer a utilização de botões</p>
					<a
						class="button is-link is-small mt-2"
						href="https://bulma.io/documentation/layout/hero/"
						target="_blank"
						rel="noopener noreferrer"
						>Acessar documentação do bulma</a
					>
				</div>
			</wc-hero>
			<div class="column is-6">
				<wc-button color="red">oie</wc-button>
			</div>
			<div class="column is-6">
				<wc-button color="red">oie</wc-button>
			</div>
		</div>
	</div>
</template>
