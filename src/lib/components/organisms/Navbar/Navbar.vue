<script setup lang="ts">
	defineProps<{
		businessName: string;
		description: string;
		img: string;
		links?: { name: string; onClick?: () => void; to: string }[];
		rightLinks?: {
			label: string;
			links: { name: string; to: string; hasDivider?: boolean }[];
		};
		isFixed?: 'top' | 'bottom';
	}>();
</script>

<template>
	<nav
		class="navbar"
		:class="{
			'is-fixed-top': isFixed === 'top',
			'is-fixed-bottom': isFixed === 'bottom',
		}"
		role="navigation"
		aria-label="main navigation"
	>
		<div class="navbar-brand">
			<a class="navbar-item">
				<img
					alt="Vue logo"
					class="logo"
					:src="img"
				/>
			</a>

			<a
				role="button"
				class="navbar-burger"
				aria-label="menu"
				aria-expanded="false"
				data-target="navbarBasicExample"
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div
			id="navbarBasicExample"
			class="navbar-menu"
		>
			<div class="navbar-start">
				<slot name="navbar-start">
					<a
						class="navbar-item"
						v-for="link in links"
						:key="link.name"
						@click="link.onClick"
						:href="link.onClick ? undefined : link.to"
					>
						{{ link.name }}
					</a>
				</slot>
			</div>

			<div class="navbar-end">
				<slot name="navbar-end">
					<div
						v-if="rightLinks"
						class="navbar-item has-dropdown is-hoverable px-4"
					>
						<a class="navbar-link">{{ rightLinks.label }}</a>

						<div class="navbar-dropdown is-right px-2">
							<template
								v-for="link in rightLinks.links"
								:key="link.name"
							>
								<hr
									v-if="link.hasDivider"
									class="navbar-divider"
								/>
								<a
									class="navbar-item"
									:href="link.to"
								>
									{{ link.name }}
								</a>
							</template>
						</div>
					</div>
				</slot>
			</div>
		</div>
	</nav>
</template>
