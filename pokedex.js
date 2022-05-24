const pokedex$$ = document.querySelector(".pokedex");
const urlPokemon = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;

const ApiPokemon = async () => {
	const response = await fetch(urlPokemon);
	const data = await response.json();
	console.log(data.results);
	printPokemon(data.results);
};

const printPokemon = async (pokemons) => {
	for (let pokemon of pokemons) {
		const res = await fetch(pokemon.url);
		const result = await res.json();
		console.log(result);
		const pokemonCard$$ = document.createElement("div");
		const pokemonID$$ = document.createElement("h3");
		const pokemonName$$ = document.createElement("h2");
		const pokemonPhoto$$ = document.createElement("img");
		const pokemonHeight$$ = document.createElement("p");
		const pokemonWeight$$ = document.createElement("p");
		const pokemonType$$ = document.createElement("p");

		pokemonCard$$.classList.add("card");
		pokemonID$$.classList.add("pokeID");
		pokemonID$$.textContent = result.id;
		pokemonName$$.classList.add("pokeName");
		pokemonName$$.textContent = pokemon.name;
		pokemonPhoto$$.classList.add("photo");

		pokemonPhoto$$.setAttribute(
			"src",
			result.sprites.other.dream_world.front_default
		);
		pokemonType$$.classList.add("pokeType");

		pokemonHeight$$.classList.add("pokeHeight");
		pokemonHeight$$.textContent = result.height;
		pokemonWeight$$.classList.add("pokeWeight");
		pokemonWeight$$.textContent = result.weight;

		pokedex$$.appendChild(pokemonCard$$);
		pokemonCard$$.appendChild(pokemonID$$);
		pokemonCard$$.appendChild(pokemonName$$);
		pokemonCard$$.appendChild(pokemonPhoto$$);
		pokemonCard$$.appendChild(pokemonType$$);

		pokemonCard$$.appendChild(pokemonHeight$$);
		pokemonCard$$.appendChild(pokemonWeight$$);
	}
};

ApiPokemon();
