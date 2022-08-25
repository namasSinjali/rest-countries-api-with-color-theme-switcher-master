<script lang="ts">
	import { browser } from '$app/env';

	let prefersDarkTheme: boolean = false;
	let themeTransitioning: boolean = false;

	let timeout: NodeJS.Timeout;

	if (browser) {
		prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	$: {
		if (browser) {
			clearTimeout(timeout);
			themeTransitioning = true;
			document.documentElement.dataset.theme = prefersDarkTheme ? 'dark' : 'light';
			timeout = setTimeout(() => {
				themeTransitioning = false;
			}, 2000);
		}
	}
	function customFly(
		node: Element,
		params: { delay?: number; duration?: number; degree?: number }
	) {
		const degree = params.degree || -90;
		return {
			delay: params.delay || 0,
			duration: params.duration || 300,
			easing: (t: number) => t,
			css: (t: number, u: number) => {
				return `transform-origin: 200% 200%; transform: rotate(${u * degree}deg); opacity: ${t}`;
			}
		};
	}
</script>

<svelte:head>
	{#if themeTransitioning}
		<style>
			* {
				transition: background-color 300ms 300ms linear, color 10ms 100ms linear !important;
			}
		</style>
	{/if}
</svelte:head>

<div class="layout">
	<div class="top-bar">
		<h1>Where in the world?</h1>
		<button class="theme-switcher" on:click={() => (prefersDarkTheme = !prefersDarkTheme)}>
			<i>
				{#if prefersDarkTheme}
					<svg
						in:customFly={{ degree: -50 }}
						out:customFly={{ degree: 50 }}
						class="dark"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M18.248 16.9972C18.1656 16.9991 18.0829 17 18 17C11.9249 17 7 12.0751 7 5.99999C7 5.91709 7.00092 5.8344 7.00275 5.75192C5.17211 7.21851 4 9.47339 4 12C4 16.4182 7.58172 20 12 20C14.5266 20 16.7814 18.8279 18.248 16.9972ZM19.4661 14.8812C18.989 14.9593 18.4992 15 18 15C13.0294 15 9 10.9706 9 5.99999C9 5.50074 9.04065 5.01099 9.11882 4.53386C9.25094 3.72745 9.49024 2.9571 9.82162 2.23792C8.96026 2.42928 8.14073 2.73173 7.37882 3.12946C4.18215 4.79821 2 8.14425 2 12C2 17.5228 6.47715 22 12 22C15.8557 22 19.2017 19.8178 20.8705 16.6212C21.2682 15.8593 21.5707 15.0397 21.762 14.1784C21.0429 14.5098 20.2725 14.7491 19.4661 14.8812Z"
							fill="currentColor"
						/>
					</svg>
				{:else}
					<svg
						in:customFly={{ degree: -50 }}
						out:customFly={{ degree: 50 }}
						class="light"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.998 22H10.998V19H12.998V22ZM18.362 19.778L16.241 17.657L17.655 16.243L19.777 18.365L18.364 19.778H18.362ZM5.63405 19.778L4.21905 18.364L6.33905 16.242L7.75405 17.656L5.63405 19.777V19.778ZM11.998 17.007C9.23302 17.0059 6.99231 14.7637 6.99305 11.9987C6.99378 9.23364 9.23568 6.99263 12.0007 6.993C14.7657 6.99337 17.007 9.23497 17.007 12C17.0043 14.7649 14.763 17.0053 11.998 17.007ZM11.998 8.993C10.3376 8.9941 8.99231 10.3409 8.99305 12.0013C8.99378 13.6618 10.3403 15.0074 12.0007 15.007C13.6612 15.0066 15.007 13.6605 15.007 12C15.0054 10.3392 13.6589 8.99355 11.998 8.993ZM21.998 13H18.998V11H21.998V13ZM4.99805 13H1.99805V11H4.99805V13ZM17.654 7.758L16.241 6.343L18.362 4.221L19.777 5.636L17.655 7.757L17.654 7.758ZM6.34105 7.758L4.22105 5.637L5.63605 4.223L7.75605 6.345L6.34205 7.757L6.34105 7.758ZM12.998 5H10.998V2H12.998V5Z"
							fill="currentColor"
						/>
					</svg>
				{/if}
			</i>

			<span>{prefersDarkTheme ? 'Dark' : 'Light'} Mode</span></button
		>
	</div>
	<main>
		<slot />
	</main>
	<div class="attribution">
		Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"
			>Frontend Mentor</a
		>. Coded by <a href="https://github.com/namasSinjali">Namas</a>.
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');
	:global(:root) {
		--blue-700: hsl(209, 23%, 22%);
		--blue-800: hsl(207, 26%, 17%);
		--blue-900: hsl(200, 15%, 8%);
		--white: hsl(0, 0%, 100%);
		--gray-200: hsl(0, 0%, 98%);
		--gray-300: hsl(0, 0%, 52%);

		--theme-primary: var(--gray-200);
		--theme-secondary: var(--white);
		--theme-text-color: var(--blue-900);
		--theme-text-color-2: var(var(--gray-300));
		--theme-font: 'Nunito Sans';

		--color-shadow: var(--gray-300);
		--shadow: 0 0 10px -5px var(--color-shadow);

		--font-size: 0.875rem;

		--gutter: 1.25rem;

		--breakpoint: 50rem;
	}
	:global(html[data-theme='dark']) {
		--theme-primary: var(--blue-800);
		--theme-secondary: var(--blue-700);
		--theme-text-color: var(--white);
		--theme-text-color-2: var(--white);

		--color-shadow: var(--blue-900);
	}
	:global(body) {
		font-family: var(--theme-font), sans-serif;
		font-size: var(--font-size);
		margin: 0;
		padding: 0;
		background-color: var(--theme-primary);
		color: var(--theme-text-color);
	}

	:global(.element) {
		box-shadow: 0 0 10px -5px var(--color-shadow);
		background-color: var(--theme-secondary);
		border-radius: 0.375rem;
		overflow: hidden;
	}
	:global(.element:focus-within) {
		outline: 1px solid currentColor;
	}
	:global(button) {
		border: 0;
		outline: 0;
		background: unset;
		font: inherit;
		color: inherit;
		font-weight: 600;
		cursor: pointer;
	}
	:global(a) {
		font: inherit;
		color: inherit;
	}
	:global(a.reset) {
		text-decoration: none;
	}
	/* :global(*) {
		transition: background-color 300ms 300ms linear, color 10ms 0ms linear;
	} */

	:global(dl.side-by-side, dl.side-by-side *) {
		margin: 0;
		padding: 0;
	}
	:global(dl.side-by-side > div) {
		margin-top: 0.6em;
	}
	:global(dl.side-by-side dt) {
		display: inline;
		font-weight: 600;
	}
	:global(dl.side-by-side dd) {
		display: inline;
	}

	.layout {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr min-content;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: var(--gutter);
		background: var(--theme-secondary);
		box-shadow: 0 0 10px -5px var(--color-shadow);
	}
	h1 {
		font-size: 1em;
		font-weight: 800;
		margin: 1em 0;
	}
	.theme-switcher {
		display: flex;
		gap: 0.5em;
		align-items: center;
		transition: color 0ms 350ms linear;
	}
	.theme-switcher i {
		position: relative;
		display: inline-block;
		width: 1em;
		height: 1em;
	}
	.theme-switcher svg {
		position: absolute;
		width: 100%;
		height: 100%;
		inset: 0;
	}

	main {
		padding: 2rem var(--gutter);
	}

	.attribution {
		text-align: center;
		margin-bottom: 1em;
	}

	@media (min-width: 42rem) {
		:root {
			--gutter: 5rem;
		}
		h1 {
			font-size: 1.6428571428571428em;
		}
		.theme-switcher {
			font-size: 1rem;
		}
	}
</style>
