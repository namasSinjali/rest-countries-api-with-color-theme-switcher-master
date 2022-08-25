<script lang="ts">
	export let data: { [index: string]: any };

	let { country, borders } = data;
	$: {
		country = data.country;
		borders = data.borders;
	}

	$: nativeNames = (() => {
		const obj = country.name.nativeName;
		const arr: { name: string; lang: string }[] = [];
		for (let prop in obj) {
			if (!obj.hasOwnProperty(prop)) continue;

			arr.push({ name: obj[prop].common, lang: prop });
		}
		return arr;
	})();

	$: currencies = Object.values(country.currencies).map((obj: any) => obj.name);

	$: languages = Object.values(country.languages);
</script>

<svelte:head>
	<title>{country.name.common}</title>
</svelte:head>

<div class="layout-container">
	<img src={country.flags.png} alt="{country.name.common}'s flag" />
	<h1>{country.name.common}</h1>
	<dl class="description1 side-by-side">
		<div>
			<dt>Native Name:</dt>
			<dd>
				{#each nativeNames as obj, i}
					{#if i > 0}
						,
					{/if}
					<span lang={obj.lang}>{obj.name}</span>
				{/each}
			</dd>
		</div>
		<div>
			<dt>Population:</dt>
			<dd>{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
		</div>
		<div>
			<dt>Region:</dt>
			<dd>{country.region}</dd>
		</div>
		<div>
			<dt>Sub Region:</dt>
			<dd>{country.subregion}</dd>
		</div>
		<div>
			<dt>Capital:</dt>
			<dd>{country.capital}</dd>
		</div>
	</dl>
	<dl class="description2 side-by-side">
		<div>
			<dt>Top Level Domain:</dt>
			<dd>{country.tld.join(', ')}</dd>
		</div>
		<div>
			<dt>Currencies:</dt>
			<dd>{currencies.join('. ')}</dd>
		</div>
		<div>
			<dt>Languages:</dt>
			<dd>{languages.join('. ')}</dd>
		</div>
	</dl>

	<div class="border-countries">
		<h2>Border Countries:</h2>
		<ul class="links">
			{#each borders as countryName}
				<li>
					<a class="element" href="../{countryName.toLowerCase()}">{countryName}</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.layout-container {
		display: grid;
		grid-template:
			'flag' auto
			'heading' auto
			'description1' auto
			'description2' auto
			'border' auto
			/ auto;
		gap: 1rem;
		justify-items: stretch;
	}
	img {
		grid-area: flag;
		margin: 1rem 0;
		max-width: 30rem;
		width: 100%;
	}
	h1 {
		grid-area: heading;
		font-size: 1.5714285714285714em;
		margin: 0;
	}
	.description1 {
		grid-area: description1;
	}
	.description2 {
		grid-area: description2;
		margin: 1rem 0;
	}
	.border-countries {
		grid-area: border;
	}
	h2 {
		font-size: 1rem;
		margin: 0.1rem 0 0 0;
	}
	ul.links {
		list-style: none;
		display: flex;
		row-gap: 0.5em;
		column-gap: 1em;
		margin: 0;
		padding: 0;
		flex-flow: row wrap;
		align-content: flex-start;
		font-size: 0.8571428571428571em;
	}
	a {
		display: inline-block;
		padding: 0.5em 1em;
		min-width: 5em;
		text-align: center;
	}

	@media (min-width: 48rem) {
		.layout-container {
			font-size: 1rem;
			grid-template:
				'flag heading heading' auto
				'flag description1 description2' auto
				'flag border border' auto
				/ minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
			column-gap: 4rem;
		}
		h1 {
			align-self: flex-end;
			font-size: 2rem;
		}
		img {
			max-width: none;
		}
		.border-countries {
			display: grid;
			grid-template-columns: auto 1fr;
			gap: 1rem;
		}
	}
</style>
