<div>
	<a href="../" class="element">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z"
				fill="currentColor"
			/>
		</svg>

		<span>Back</span>
	</a>
</div>
<slot />

<style>
	div {
		margin-bottom: 2rem;
	}
	a {
		padding: 0.5em 1em;
		display: inline-flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		font-weight: 300;
	}
	svg {
		height: 1.5em;
		width: auto;
	}
</style>
