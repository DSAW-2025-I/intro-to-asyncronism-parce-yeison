class PokemonCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    getColorByType(type) {
        switch (type) {
            case "fire": return "--type-fire"; 
            case "water": return "--type-water"; 
            case "grass": return "--type-grass"; 
            case "electric": return "--type-electric"; 
            case "psychic": return "--type-psychic";
            case "ice": return "--type-ice"; 
            case "dragon": return "--type-dragon";
            case "dark": return "--type-dark";
            case "fairy": return "--type-fairy";
            case "ground": return "--type-ground"; 
            case "rock": return "--type-rock";
            case "poison": return "--type-poison"; 
            case "bug": return "--type-bug";
            case "fighting": return "--type-fighting"; 
            case "ghost": return "--type-ghost";
            case "steel": return "--type-steel"; 
            case "normal": return "--type-normal"; 
            default: return "#A8A8A8";
        }
    }

    getBackgroundByType(type) {
        switch (type) {
            case "fire": return "url('./imgs/backgroundCard/bgFire.webp')"; // 🔥 Fuego
            case "water": return "url('./imgs/backgroundCard/bgWater.webp')"; // 💧 Agua
            case "grass": return "url('./imgs/backgroundCard/bgGrass.webp')"; // 🌱 Planta
            case "electric": return "url('./imgs/backgroundCard/bgElectricity.webp')"; // ⚡ Eléctrico
            case "psychic": return "url('./imgs/backgroundCard/bgPsychic.webp')"; // 🔮 Psíquico
            case "ice": return "url('./imgs/backgroundCard/bgIce.webp')"; // ❄️ Hielo
            case "dragon": return "url('./imgs/backgroundCard/bgDragon.webp')"; // 🐉 Dragón
            case "dark": return "url('./imgs/backgroundCard/bgDark.webp')"; // 🌑 Siniestro
            case "fairy": return "url('./imgs/backgroundCard/bgFairy.webp')"; // ✨ Hada
            case "ground": return "url('./imgs/backgroundCard/bgGround.webp')"; // 🏜️ Tierra
            case "rock": return "url('./imgs/backgroundCard/bgRock.webp')"; // 🪨 Roca
            case "poison": return "url('./imgs/backgroundCard/bgPoison.webp')"; // ☠️ Veneno
            case "bug": return "url('./imgs/backgroundCard/bgBug.webp')"; // 🐛 Bicho
            case "fighting": return "url('./imgs/backgroundCard/bgFighting.webp')"; // 🥊 Lucha
            case "ghost": return "url('./imgs/backgroundCard/bgGhost.webp')"; // 👻 Fantasma
            case "steel": return "url('./imgs/backgroundCard/bgSteel.webp')"; // ⚙️ Acero
            case "normal": return "url('./imgs/backgroundCard/bgNormal.webp')"; // ⚪ Normal
            default: return "url('https://i.imgur.com/A8A8A8.jpg')"; // Fondo genérico
        }
    }


    getLogoByType(type) {
        switch (type) {
            case "fire": return "url('./imgs/typesLogo/fireLogo.png')"; // 🔥 Fuego
            case "water": return "url('./imgs/typesLogo/waterLogo.png')"; // 💧 Agua
            case "grass": return "url('./imgs/typesLogo/grassLogo.png')"; // 🌱 Planta
            case "electric": return "url('./imgs/typesLogo/electricLogo.png')"; // ⚡ Eléctrico
            case "psychic": return "url('./imgs/typesLogo/PsychicLogo.png')"; // 🔮 Psíquico
            case "ice": return "url('./imgs/typesLogo/iceLogo.png')"; // ❄️ Hielo
            case "dragon": return "url('./imgs/typesLogo/dragonLogo.png')"; // 🐉 Dragón
            case "dark": return "url('./imgs/typesLogo/darkLogo.png')"; // 🌑 Siniestro
            case "fairy": return "url('./imgs/typesLogo/fairyLogo.png')"; // ✨ Hada
            case "ground": return "url('./imgs/typesLogo/groundLogo.png')"; // 🏜️ Tierra
            case "rock": return "url('./imgs/typesLogo/rockLogo.png')"; // 🪨 Roca
            case "poison": return "url('./imgs/typesLogo/poisonLogo.png')"; // ☠️ Veneno
            case "bug": return "url('./imgs/typesLogo/bugLogo.png')"; // 🐛 Bicho
            case "fighting": return "url('./imgs/typesLogo/fightingLogo.png')"; // 🥊 Lucha
            case "ghost": return "url('./imgs/typesLogo/ghostLogo.png')"; // 👻 Fantasma
            case "steel": return "url('./imgs/typesLogo/steelLogo.png')"; // ⚙️ Acero
            case "normal": return "url('./imgs/typesLogo/normalLogo.png')"; // ⚪ Normal
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
            <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
            <style>
                .cardImage{
                background-image: ${backgroundImage};
                background-size: cover;
                height: 40%;
                width: 80%;
                border: solid 0.5px #e9edf5;

                }

                .card{
                background-color: var(${backgroundColor});
                height: 100px;
                width: 70px;
                border-radius: 2px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                }

                .pokemonImg{
                height: 2rem;
                width: auto;
                }

            </style>
            <section class="card">
                <section class="cardImage">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemonImg">
                </section>
                <h3>${pokemon.name.toUpperCase()}</h3>
                <p>Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
            </section>
        `;
    }
}




customElements.define("pokemon-card", PokemonCard);
