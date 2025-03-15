class PokemonCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    getColorByType(type) {
        switch (type) {
            case "fire": return "#FF6F61"; // 🔥 Rojo
            case "water": return "#6390F0"; // 💧 Azul
            case "grass": return "#7AC74C"; // 🌱 Verde
            case "electric": return "#FFD700"; // ⚡ Amarillo
            case "psychic": return "#F95587"; // 🔮 Rosa
            case "ice": return "#96D9D6"; // ❄️ Celeste
            case "dragon": return "#6F35FC"; // 🐉 Morado
            case "dark": return "#705746"; // 🌑 Marrón oscuro
            case "fairy": return "#D685AD"; // ✨ Rosa pastel
            case "ground": return "#E2BF65"; // 🏜️ Beige
            case "rock": return "#B6A136"; // 🪨 Gris oscuro
            case "poison": return "#A33EA1"; // ☠️ Púrpura
            case "bug": return "#A6B91A"; // 🐛 Verde musgo
            case "fighting": return "#C22E28"; // 🥊 Rojo oscuro
            case "ghost": return "#735797"; // 👻 Lila
            case "steel": return "#B7B7CE"; // ⚙️ Gris metal
            case "normal": return "#A8A77A"; // ⚪ Beige claro
            default: return "#A8A8A8"; // Gris genérico para otros casos
        }
    }

    getBackgroundByType(type) {
        // Devuelve una imagen de fondo diferente según el tipo
        switch (type) {
            case "fire": return "url('https://i.imgur.com/CrN4WJ3.jpg')"; // 🔥 Fuego
            case "water": return "url('https://i.imgur.com/fxuJVud.jpg')"; // 💧 Agua
            case "grass": return "url('https://i.imgur.com/7Y9Kc3j.jpg')"; // 🌱 Planta
            case "electric": return "url('https://i.imgur.com/nfuXhmi.jpg')"; // ⚡ Eléctrico
            case "psychic": return "url('https://i.imgur.com/qIKM2sY.jpg')"; // 🔮 Psíquico
            case "ice": return "url('https://i.imgur.com/1s2Af8F.jpg')"; // ❄️ Hielo
            case "dragon": return "url('https://i.imgur.com/5EY9jwQ.jpg')"; // 🐉 Dragón
            case "dark": return "url('https://i.imgur.com/Z5HQKyH.jpg')"; // 🌑 Siniestro
            case "fairy": return "url('https://i.imgur.com/y3Ylhuq.jpg')"; // ✨ Hada
            case "ground": return "url('https://i.imgur.com/qTPbAbm.jpg')"; // 🏜️ Tierra
            case "rock": return "url('https://i.imgur.com/81AqR9v.jpg')"; // 🪨 Roca
            case "poison": return "url('https://i.imgur.com/gXJoxZI.jpg')"; // ☠️ Veneno
            case "bug": return "url('https://i.imgur.com/MpSrezi.jpg')"; // 🐛 Bicho
            case "fighting": return "url('https://i.imgur.com/Un4Pg3c.jpg')"; // 🥊 Lucha
            case "ghost": return "url('https://i.imgur.com/ArEd6tp.jpg')"; // 👻 Fantasma
            case "steel": return "url('https://i.imgur.com/NpWsbRG.jpg')"; // ⚙️ Acero
            case "normal": return "url('https://i.imgur.com/tnfh20T.jpg')"; // ⚪ Normal
            default: return "url('https://i.imgur.com/A8A8A8.jpg')"; // Fondo genérico
        }
    }

    async connectedCallback() {
        const pokemonId = this.getAttribute("pokemon-id");
        if (!pokemonId) {
            this.shadowRoot.innerHTML = `<p>No se proporcionó un ID de Pokémon.</p>`;
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const data = await response.json();
            this.render(data);
        } catch (error) {
            console.error("Error al obtener datos del Pokémon:", error);
            this.shadowRoot.innerHTML = `<p>Error al cargar el Pokémon.</p>`;
        }
    }

    render(pokemon) {
        const primaryType = pokemon.types[0].type.name;
        const backgroundColor = this.getColorByType(primaryType);
        const backgroundImage = this.getBackgroundByType(primaryType);
        this.shadowRoot.innerHTML = `
            <div class="card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name.toUpperCase()}</h3>
                <p>Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
            </div>
        `;
    }
}




customElements.define("pokemon-card", PokemonCard);
