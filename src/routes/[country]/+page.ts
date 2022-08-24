import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const getUrl = `https://restcountries.com/v3.1/name/${params.country}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`;
	const response = await fetch(getUrl);
	if (response.status === 200) {
		const array = await response.json();
		const country = array.find(
			(country: any) => country.name.common.toLowerCase() === params.country.toLowerCase()
		);
		if (country) {
			const promises = country.borders.map((code: string) =>
				fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name`)
			);
			const responses = await Promise.all(promises);
			const countries = await Promise.all(responses.map((res) => res.json()));
			const borders = countries.map((country) => country.name.common);
			return { country, borders };
		}
	}
	throw error(404, 'Not found');
};
