const pokemonTypes = [
  { name: "bug", color: "var(--type-bug)" },
  { name: "dark", color: "var(--type-dark)" },
  { name: "dragon", color: "var(--type-dragon)" },
  { name: "electric", color: "var(--type-electric)" },
  { name: "fairy", color: "var(--type-fairy)" },
  { name: "fighting", color: "var(--type-fighting)" },
  { name: "fire", color: "var(--type-fire)" },
  { name: "flying", color: "var(--type-flying)" },
  { name: "ghost", color: "var(--type-ghost)" },
  { name: "grass", color: "var(--type-grass)" },
  { name: "ground", color: "var(--type-ground)" },
  { name: "ice", color: "var(--type-ice)" },
  { name: "normal", color: "var(--type-normal)" },
  { name: "poison", color: "var(--type-poison)" },
  { name: "psychic", color: "var(--type-psychic)" },
  { name: "rock", color: "var(--type-rock)" },
  { name: "steel", color: "var(--type-steel)" },
  { name: "water", color: "var(--type-water)" }
];

// Variable global para almacenar la lista completa (151 Pokémon)
let allPokemonList = [];

/**
 * Crea la interfaz de usuario para los filtros.
 * Se utiliza debounce en el resize para optimizar el rendimiento.
 */
function createFilterUI() {
  const container = document.getElementById("filterbox");
  if (!container) {
    console.error("No se encontró el contenedor para los filtros.");
    return;
  }
  
  container.innerHTML = "";
  
  if (window.innerWidth < 768) {
    // Usamos un <select> para pantallas pequeñas
    const select = document.createElement("select");
    select.className = "p-2 border border-gray-300 rounded-md";
    
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Filtrar por tipo";
    select.appendChild(defaultOption);
    
    pokemonTypes.forEach(type => {
      const option = document.createElement("option");
      option.value = type.name;
      option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
      option.style.backgroundColor = type.color;
      select.appendChild(option);
    });
    
    select.addEventListener("change", (e) => {
      const selectedType = e.target.value;
      console.log("Filtrar por tipo:", selectedType);
      filterPokemonByType(selectedType);
    });
    
    container.appendChild(select);
    
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Limpiar Filtro";
    clearBtn.className =
      "p-2 m-1 rounded-md bg-gray-500 text-white hover:scale-105 active:scale-95 transition-transform duration-200";
    clearBtn.addEventListener("click", () => {
      select.value = "";
      console.log("Filtro limpiado");
      // Al limpiar el filtro, cargamos 10 Pokémon aleatorios
      renderPokemonCards(getRandomSubset(allPokemonList, 10));
    });
    container.appendChild(clearBtn);
    
  } else {
    // Para pantallas grandes, se crean botones para cada tipo
    pokemonTypes.forEach(type => {
      const btn = document.createElement("button");
      btn.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
      btn.style.backgroundColor = type.color;
      btn.className =
        "p-2 m-1 rounded-md text-white hover:scale-105 active:scale-95 transition-transform duration-200";
      btn.addEventListener("click", () => {
        console.log("Filtrar por tipo:", type.name);
        filterPokemonByType(type.name);
      });
      container.appendChild(btn);
    });
    
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Limpiar Filtro";
    clearBtn.className =
      "p-2 m-1 rounded-md bg-gray-500 text-white hover:scale-105 active:scale-95 transition-transform duration-200";
    clearBtn.addEventListener("click", () => {
      console.log("Filtro limpiado");
      renderPokemonCards(getRandomSubset(allPokemonList, 10));
    });
    container.appendChild(clearBtn);
  }
}

function renderPokemonCards(pokemonList) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";
  
  pokemonList.forEach(pokemon => {
    const card = document.createElement("pokemon-card");
    card.setAttribute("pokemon-id", pokemon.id);
    container.appendChild(card);
  });
}
function fetchAllPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(res => res.json())
    .then(data => {
      allPokemonList = data.results.map(pokemon => {
        const parts = pokemon.url.split("/");
        const id = parts[parts.length - 2];
        return { id, name: pokemon.name };
      });
      // Renderiza 10 Pokémon aleatorios al inicio
      renderPokemonCards(getRandomSubset(allPokemonList, 10));
    })
    .catch(error => {
      console.error("Error al obtener todos los Pokémon:", error);
    });
}

/**
 * Filtra los Pokémon por tipo.
 * Si no se pasa un tipo, se renderiza una selección aleatoria de 10 Pokémon.
 */
function filterPokemonByType(type) {
  if (!type) {
    renderPokemonCards(getRandomSubset(allPokemonList, 10));
  } else {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.pokemon.map(entry => {
          const pokemon = entry.pokemon;
          const parts = pokemon.url.split("/");
          const id = parts[parts.length - 2];
          return { id, name: pokemon.name };
        });
        renderPokemonCards(filtered);
      })
      .catch(error => {
        console.error("Error al obtener Pokémon por tipo:", error);
      });
  }
}

/**
 * Devuelve un subconjunto aleatorio de N elementos de un arreglo.
 */
function getRandomSubset(arr, n) {
  if (!arr || arr.length === 0) return [];
  let shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

/**
 * Función debounce para optimizar la ejecución de eventos frecuentes.
 */
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Inicializa la UI y carga la lista de Pokémon cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  createFilterUI();
  fetchAllPokemon();
});

// Optimiza el redimensionamiento con debounce
window.addEventListener("resize", debounce(createFilterUI, 300));
