document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");
    const searchForm = document.querySelector(".search-container form");
    const cardsContainer = document.getElementById("cardsContainer");
    const clearBtn = document.getElementById("clearSearch");

    clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        searchInput.value = "";
        renderAllCards();
      });


    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            buscarPokemon();
        });
    }


    if (searchBtn) {
        searchBtn.addEventListener("click", (event) => {
            event.preventDefault();
            buscarPokemon();
        });
    }


    if (searchInput) {
        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                buscarPokemon();
            }
        });
    }

    function isValidQuery(query) {
        const regex = /^[a-z0-9\-]+$/;
        return regex.test(query);
    }

    function buscarPokemon() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            alert("Por favor, ingresa un nombre o ID válido.");
            return;
        }
        if (!isValidQuery(query)) {
            alert("Entrada inválida. Usa solo letras y números.");
            return;
        }

        fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Pokémon no encontrado");
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos recibidos:", data);
                const pokemonId = data.id;


                cardsContainer.innerHTML = "";

                const newCard = document.createElement("pokemon-card");
                newCard.setAttribute("pokemon-id", pokemonId);
                cardsContainer.appendChild(newCard);
            })
            .catch(error => {
                console.error(error);
                alert("No se encontró el Pokémon. Intenta con otro nombre o ID.");
            });
    }
});


