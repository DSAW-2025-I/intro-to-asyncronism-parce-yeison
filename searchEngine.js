const searchButton = document.getElementById('pokemonSearchButton');
const searchInput = document.getElementById('pokemonSearchInput');

searchButton.addEventListener('click', buscarPokemon);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarPokemon();
    }
});

function buscarPokemon() {
    const terminoBusqueda = searchInput.value.trim().toLowerCase();
    if (!terminoBusqueda) {
        alert('Por favor, ingresa un nombre o ID válido.');
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${terminoBusqueda}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return response.json();
        })
        .then(data => {
            const pokemonId = data.id;
            const pokemonCard = document.querySelector('pokemon-card');
            pokemonCard.setAttribute('pokemon-id', pokemonId);
        })
        .catch(error => {
            console.error(error);
            alert('No se encontró el Pokémon. Intenta con otro nombre o ID.');
        });
}