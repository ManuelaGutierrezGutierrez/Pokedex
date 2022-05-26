//url de la Api de Pokemon. Con offset indico que quiero que complete esa url del pokemon 0 al 151.

const urlPokemon = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`;

//Array con todos los pokemon que nos devuelve la Api.
//Variable global para recurrir a ella y no constatemente a la Api. Así ganamos rendimiento.

const allPokemonResults = [];

//Primer fetch para acceder a la API

const apiPokemon = async () => {
	const response = await fetch(urlPokemon);
	const data = await response.json();
	getPokemon(data.results);
};

//Segundo fetch para acceder al array de objetos.
//Incluyo un push para tener un array que sea variable global.
//Se usará para el buscador y obtener los datos de pokemon de forma más eficiente.

const getPokemon = async (pokemons) => {
	for (let pokemon of pokemons) {
		const res = await fetch(pokemon.url);
		const result = await res.json();
		allPokemonResults.push(result);
	}

	printPokemon(allPokemonResults);
};

//Función para crear cada carta pokemon. Se le pasará el array global de pokemon.

const printPokemon = (pokemonToPrint) => {
	//Primero que borre cualquier pokemon anterior que pudiera haber. Mediante innerHTML que borra todo lo que hay antes.

	const pokedex$$ = document.querySelector(".pokedex");
	pokedex$$.innerHTML = "";

	//Para cada pokemon del array crea una carta (div) con: id, img, nombre, altura y peso.

	pokemonToPrint.forEach((pokemon) => {
		const pokemonCard$$ = document.createElement("div");
		pokemonCard$$.classList.add("pokemonCard");

		const pokemonID$$ = document.createElement("h3");
		pokemonID$$.classList.add("pokeID");
		pokemonID$$.textContent = pokemon.id;

		const pokemonPhotoContainer$$ = document.createElement("div");
		pokemonPhotoContainer$$.classList.add("pokemonPhotoContainer");

		const pokemonPhoto$$ = document.createElement("img");
		pokemonPhoto$$.classList.add("photo");
		pokemonPhoto$$.setAttribute(
			"src",
			pokemon.sprites.other.dream_world.front_default
		);

		const pokemonName$$ = document.createElement("h2");
		pokemonName$$.classList.add("pokeName");
		pokemonName$$.textContent = pokemon.name;

		const pokemonSize$$ = document.createElement("div");
		pokemonSize$$.classList.add("pokeSize");

		const pokemonHeight$$ = document.createElement("p");
		pokemonHeight$$.classList.add("pokeHeight");
		pokemonHeight$$.textContent = pokemon.height;

		const pokemonWeight$$ = document.createElement("p");
		pokemonWeight$$.classList.add("pokeWeight");
		pokemonWeight$$.textContent = pokemon.weight;

		const pokemonTypeContainer$$ = document.createElement("div");
		pokemonTypeContainer$$.classList.add("pokeTypeContainer");

		pokedex$$.appendChild(pokemonCard$$);
		pokemonCard$$.appendChild(pokemonID$$);
		pokemonCard$$.appendChild(pokemonPhotoContainer$$);
		pokemonPhotoContainer$$.appendChild(pokemonPhoto$$);
		pokemonCard$$.appendChild(pokemonName$$);
		pokemonCard$$.appendChild(pokemonTypeContainer$$);

		//Invoco a la función que saca los tipos de pokemon
		getPokemonType(pokemon.types, pokemonTypeContainer$$);

		pokemonCard$$.appendChild(pokemonSize$$);
		pokemonSize$$.appendChild(pokemonHeight$$);
		pokemonSize$$.appendChild(pokemonWeight$$);
	});
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

//Función para buscar pokemon.
//El usuario rellena el input y ese resultado lo ponemos en minúsculas y le quitamos posibles espacios delante y detrás.
//Filtramos el array de todos los pokemon para extraer los que incluyen el texto del input (includes).
//Los pokemon que cumplen con el input son enviados a la función de imprimir pokemon para generar su carta.

const search$$ = document
	.getElementById("search-input")
	.addEventListener("input", (event) => {
		const userInput = event.target.value.toLowerCase().trim();

		const filtered = allPokemonResults.filter((pokemon) => {
			return pokemon.name.toLowerCase().includes(userInput);
		});

		printPokemon(filtered);
	});

//Función para buscar cada tipo de pokemon a través de unos botones

const filterPokemonsByType = (type) => {
	const filteredPokemonByType = allPokemonResults.filter((pokemon) => {
		let matchFirstType = false;
		let matchSecondType = false;

		if (pokemon.types[1]) {
			matchSecondType = pokemon.types[1].type.name === type;
		}

		if (pokemon.types[0]) {
			matchFirstType = pokemon.types[0].type.name === type;
		}

		return matchFirstType || matchSecondType;
	});
	console.log(filteredPokemonByType);
	printPokemon(filteredPokemonByType);
};

document.querySelectorAll(".types_selector").forEach((button) => {
	button.addEventListener("click", (event) => {
		filterPokemonsByType(event.target.classList[1]);
	});
});

apiPokemon();
