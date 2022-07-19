/**
 * URL de la API de Pokémon desde el offset hasta el limit.
 */
const offset = 0;
const limit = 151;
const urlPokemon = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

/**
 * Array con todos los Pokémon que nos devuelve la Api.
 * Variable global para recurrir a ella y no constantemente a la Api. Así ganamos rendimiento.
 */
const allPokemonResults = [];

document.addEventListener("DOMContentLoaded", function(e) {
  document.querySelectorAll(".types_selector").forEach((button) => {
    button.addEventListener("click", (event) => {
      filterPokemonsByType(event.target.classList[1]);
    });
  });

  apiPokemon();
});

/**
 * Primer fetch para acceder a la API.
 */
const apiPokemon = async () => {
  const response = await fetch(urlPokemon);
  const data = await response.json();
  getPokemon(data.results);
};

/**
 * Segundo fetch para acceder al array de objetos. 
 * Se usará para el buscador y obtener los datos de Pokémon de forma más eficiente.
 * @param {Array} pokemons Contiene los Pokémon obtenidos de la API.
 */
const getPokemon = async (pokemons) => {
  for (let pokemon of pokemons) {
    const res = await fetch(pokemon.url);
    const result = await res.json();
    
		// Incluyo un push para añadir el Pokémon al array global.
    allPokemonResults.push(result);
  }

  printPokemon(allPokemonResults);
};

/**
 * Construye las carta Pokémon para adjuntarlas al DOM. 
 * @param {Array} pokemonToPrint Carga las cargas de todos los Pokémon obtenidos por la API.
 */
const printPokemon = (pokemonToPrint) => {
  // Vacia los hijos del elemento con la clase pokedex para evitar duplicados.
  const pokedex$$ = document.querySelector(".pokedex");
  pokedex$$.innerHTML = "";

  // Para cada Pokémon del array, se crea una carta (div) con id, img, nombre, altura y peso.
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

    //Invoco a la función que saca los tipos de Pokémon
    getPokemonType(pokemon.types, pokemonTypeContainer$$);

    pokemonCard$$.appendChild(pokemonSize$$);
    pokemonSize$$.appendChild(pokemonHeight$$);
    pokemonSize$$.appendChild(pokemonWeight$$);
  });
};

/**
 * Obtiene los tipos del Pokémon. Pueden ser uno o dos.
 * @param {Array} arrayType Contiene los tipos del Pokémon.
 * @param {HTMLDivElement} pokemonCard Carta a la que se le adjuntan los tipos.
 */
const getPokemonType = async (arrayType, pokemonCard) => {
  const pokemonType1$$ = document.createElement("p");
  pokemonType1$$.textContent = arrayType[0].type.name;
  pokemonCard.appendChild(pokemonType1$$);

  if (arrayType.length > 1) {
    const pokemonType2$$ = document.createElement("p");
    pokemonType2$$.textContent = arrayType[1].type.name;
    pokemonCard.appendChild(pokemonType2$$);
  }
};

/**
 * Busca Pokémon por nombre.
 */
const search$$ = document
  .getElementById("search-input")
  .addEventListener("input", (event) => {
    // Ponemos el input del usuario en minúsculas y le quitamos posibles espacios delante y detrás.
    const userInput = event.target.value.toLowerCase().trim();

    // Filtramos el array de todos los Pokémon para extraer los que incluyen el texto del input (includes).
    const filtered = allPokemonResults.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(userInput);
    });

    // Los Pokémon que cumplen con el input son enviados a la función de imprimir Pokémon para generar su carta.
    printPokemon(filtered);
  });

/**
 * Busca cada tipo de Pokémon a través de los botones de la selección de tipos.
 * @param {string} type Tipo por el que filtrar
 */
const filterPokemonsByType = (type) => {
  const filteredPokemonByType = allPokemonResults.filter((pokemon) => {
    let matchFirstType = false;
    let matchSecondType = false;

		if (pokemon.types[0]) {
			matchFirstType = pokemon.types[0].type.name === type;
		}

    if (pokemon.types[1]) {
      matchSecondType = pokemon.types[1].type.name === type;
    }

    return matchFirstType || matchSecondType;
  });

  console.log(filteredPokemonByType);
  printPokemon(filteredPokemonByType);
};
