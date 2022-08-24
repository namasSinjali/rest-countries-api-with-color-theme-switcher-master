<script lang="ts">
	export let country: any;
</script>

<div class="card">
	<img src={country.flags.png} alt="{country.name.common} flag" loading="lazy" />
	<div class="description">
		<h3>{country.name.common}</h3>
		<dl class="side-by-side">
			<div>
				<dt>Population:</dt>
				<dd>{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</dd>
			</div>
			<div>
				<dt>Region:</dt>
				<dd>{country.region}</dd>
			</div>
			<div>
				<dt>Capital:</dt>
				<dd>{country.capital}</dd>
			</div>
		</dl>
	</div>
</div>

<style>
	.card {
		display: grid;
		grid-template-rows: 45% 55%;
		justify-items: stretch;
		align-items: stretch;

		min-width: 15rem;
		width: 100%;
		max-width: 22rem;
		height: 24.5em;
		margin: 0 auto;
		background-color: var(--theme-secondary);
		border-radius: 0.375rem;
		overflow: hidden;
		box-shadow: 0 3px 13px -10px var(--color-shadow);
		transition: transform 5s cubic-bezier(0.05, 0.57, 0.04, 0.93);
	}
	.card:hover {
		transform: scale(1.1);
	}
	img {
		object-fit: cover;
		width: 100%;
	}
	.description {
		padding: 0 1.5em;
	}
	h3 {
		font-size: 1.29em;
		font-weight: 800;
	}

	@media (min-width: 42rem) {
		.card {
			font-size: 0.875rem;
		}
	}
	@keyframes hover {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.1);
		}
	}
</style>
