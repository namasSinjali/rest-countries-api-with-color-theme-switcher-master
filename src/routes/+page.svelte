<script lang="ts">
	import CountryCard from '$lib/CountryCard.svelte';
	import { page } from '$app/stores';

	type region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

	const REGIONS: region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
	let filterRegion: region | 'all' = 'all';
	let countryData: any[] = [];

	const searchedCountry = $page.url.searchParams.get('country');
	const getUrl =
		'https://restcountries.com/v3.1/' +
		(searchedCountry ? `name/${searchedCountry}` : 'all') +
		'?fields=name,flags,population,region,capital';
	const countryDataPromise = fetch(getUrl)
		.then((response) => {
			if (response.status === 200) {
				return response.json();
			}
			return [];
		})
		.then((data) => {
			countryData = shuffle(data);
		});

	let filteredData: any[];
	$: filteredData =
		filterRegion === 'all'
			? countryData
			: countryData.filter((data: any) => data.region === filterRegion);
	$: {
		filteredData =
			filterRegion === 'all'
				? countryData
				: countryData.filter((data: any) => data.region === filterRegion);
		nOfDisplaying = 8;
	}

	let nOfDisplaying: number = 8;

	function shuffle<T>(array: T[]): T[] {
		var l = array.length,
			buffer,
			rnd;

		// While there remain elements to shuffle…
		while (l) {
			// Pick a remaining element…
			rnd = Math.floor(Math.random() * l--);

			// And swap it with the current element.
			buffer = array[l];
			array[l] = array[rnd];
			array[rnd] = buffer;
		}

		return array;
	}
</script>

<svelte:head>
	{#if searchedCountry}
		<title>{searchedCountry} - Search results</title>
	{:else}
		<title>Where in the World?</title>
	{/if}
</svelte:head>

<div class="controls">
	<form autocomplete="off">
		<label class="search-bar element">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M18.677 19.607L12.962 13.891C10.4196 15.6985 6.91642 15.2564 4.90285 12.8739C2.88929 10.4915 3.03714 6.96361 5.24298 4.75802C7.44824 2.55147 10.9765 2.40298 13.3594 4.41644C15.7422 6.42989 16.1846 9.93347 14.377 12.476L20.092 18.192L18.678 19.606L18.677 19.607ZM9.48498 5.00001C7.58868 4.99958 5.95267 6.3307 5.56745 8.18745C5.18224 10.0442 6.15369 11.9163 7.89366 12.6703C9.63362 13.4242 11.6639 12.8529 12.7552 11.3021C13.8466 9.75129 13.699 7.64734 12.402 6.26402L13.007 6.86402L12.325 6.18402L12.313 6.17202C11.5648 5.4192 10.5464 4.99715 9.48498 5.00001Z"
					fill="currentColor"
				/>
			</svg>

			<input
				type="search"
				name="country"
				placeholder="Search for a country"
				value={searchedCountry}
				maxlength="50"
			/>
		</label>
	</form>
	<select class="element" name="region" id="region-selector" bind:value={filterRegion}>
		<option value="all">Filter by Region</option>
		{#each REGIONS as region}
			<option value={region}>{region}</option>
		{/each}
	</select>
</div>

<div class="card-container">
	{#await countryDataPromise}
		Loading data...
	{:then data}
		{#if filteredData.length === 0}
			No result found
		{:else}
			{#each filteredData as country, i}
				{#if i < nOfDisplaying}
					<a class="reset" href="./{country.name.common.toLowerCase()}">
						<CountryCard {country} />
					</a>
				{/if}
			{/each}
		{/if}
	{:catch}
		error
	{/await}
</div>
{#if nOfDisplaying <= filteredData.length}
	<button class="see-more-button element" on:click={() => (nOfDisplaying += 8)}>See More</button>
{/if}

<style>
	.controls {
		width: 100%;
		display: grid;
		grid-template:
			1fr
			1fr
			/ 100%;
		gap: 2em;
		justify-content: space-between;

		font-size: 0.75rem;
		letter-spacing: 0.02em;

		margin-bottom: 2rem;
	}
	.search-bar {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 0 1rem;
		color: var(--theme-text-color-2);
	}
	svg {
		fill: currentColor;
	}
	input {
		padding: 1em 0;
		flex-grow: 1;
		background: transparent;
		border: none;
		outline: none;
		font: inherit;
		color: currentColor;
	}
	input::placeholder {
		color: currentColor;
	}
	select {
		padding: 1em;
		width: 13em;
		font: inherit;
		border: none;
		text-transform: capitalize;
		color: inherit;
	}

	.card-container {
		display: grid;
		grid-auto-rows: auto;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		justify-content: space-between;
		gap: 4rem;
	}

	.see-more-button {
		display: block;
		font: inherit;
		padding: 1em 2em;
		margin: 2em auto;
		border: none;
		font-weight: 600;
	}

	@media (min-width: 30rem) {
		.controls {
			grid-template: auto / minmax(14em, 30em) min-content;
		}
	}
	@media (min-width: 50rem) {
	}
</style>
