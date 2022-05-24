const pokedex$$ = document.querySelector(".pokedex");
const urlPokemon = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;

//Primer fetch para acceder a la API

const apiPokemon = async () => {
	const response = await fetch(urlPokemon);
	const data = await response.json();
	//console.log(data.results);
	getPokemon(data.results);
};

//Segundo fetch para acceder al array de objetos

const getPokemon = async (pokemons) => {
	for (let pokemon of pokemons) {
		const res = await fetch(pokemon.url);
		const result = await res.json();
		console.log(result);
		printPokemon(result);
	}
};

//Función para crear cada pokemon. Se añade: div, id, img, nombre, altura y peso.

const printPokemon = (result) => {
	const pokemonCard$$ = document.createElement("div");
	const pokemonID$$ = document.createElement("h3");
	pokemonID$$.classList.add("pokeID");
	pokemonID$$.textContent = result.id;
	const pokemonPhoto$$ = document.createElement("img");
	pokemonPhoto$$.classList.add("photo");
	pokemonPhoto$$.setAttribute(
		"src",
		result.sprites.other.dream_world.front_default
	);
	const pokemonName$$ = document.createElement("h2");
	pokemonName$$.classList.add("pokeName");
	pokemonName$$.textContent = result.name;
	const pokemonHeight$$ = document.createElement("p");
	pokemonHeight$$.classList.add("pokeHeight");
	pokemonHeight$$.textContent = result.height;
	const pokemonWeight$$ = document.createElement("p");
	pokemonWeight$$.classList.add("pokeWeight");
	pokemonWeight$$.textContent = result.weight;

	pokedex$$.appendChild(pokemonCard$$);
	pokemonCard$$.appendChild(pokemonID$$);
	pokemonCard$$.appendChild(pokemonPhoto$$);
	pokemonCard$$.appendChild(pokemonName$$);

	//Invoco a la función que saca los tipos de pokemon
	getPokemonType(result.types, pokemonCard$$);

	pokemonCard$$.appendChild(pokemonHeight$$);
	pokemonCard$$.appendChild(pokemonWeight$$);
};

//Función para imprimir uno o dos tipos de pokemon, según tenga.

const getPokemonType = async (arrayType, pokemonCard) => {
	if (arrayType.length === 1) {
		const pokemonType1$$ = document.createElement("p");
		pokemonType1$$.textContent = arrayType[0].type.name;
		pokemonCard.appendChild(pokemonType1$$);
	} else if (arrayType.length > 1) {
		const pokemonType1$$ = document.createElement("p");
		pokemonType1$$.textContent = arrayType[0].type.name;
		pokemonCard.appendChild(pokemonType1$$);
		const pokemonType2$$ = document.createElement("p");
		pokemonType2$$.textContent = arrayType[1].type.name;
		pokemonCard.appendChild(pokemonType2$$);
	}
};

apiPokemon();
