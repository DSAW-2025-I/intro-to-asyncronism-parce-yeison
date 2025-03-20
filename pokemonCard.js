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
            case "water": return "url('./imgs/backgroundCard/bgWater.png')"; // 💧 Agua
            case "grass": return "url('./imgs/backgroundCard/bgGrass.webp')"; // 🌱 Planta
            case "electric": return "url('./imgs/backgroundCard/bgElectricity.webp')"; // ⚡ Eléctrico
            case "psychic": return "url('./imgs/backgroundCard/bgPsychic.webp')"; // 🔮 Psíquico
            case "ice": return "url('./imgs/backgroundCard/bgIce.webp')"; // ❄️ Hielo
            case "dragon": return "url('./imgs/backgroundCard/bgDragon.webp')"; // 🐉 Dragón
            case "dark": return "url('./imgs/backgroundCard/bgDark.webp')"; // 🌑 Siniestro
            case "fairy": return "url('./imgs/backgroundCard/bgFairy.webp')"; // ✨ Hada
            case "ground": return "url('./imgs/backgroundCard/bgGround.jpg')"; // 🏜️ Tierra
            case "rock": return "url('./imgs/backgroundCard/bgRock.webp')"; // 🪨 Roca
            case "poison": return "url('./imgs/backgroundCard/bgPoison.webp')"; // ☠️ Veneno
            case "bug": return "url('./imgs/backgroundCard/bgBug.png')"; // 🐛 Bicho
            case "fighting": return "url('./imgs/backgroundCard/bgFighting.webp')"; // 🥊 Lucha
            case "ghost": return "url('./imgs/backgroundCard/bgGhost.png')"; // 👻 Fantasma
            case "steel": return "url('./imgs/backgroundCard/bgSteel.webp')"; // ⚙️ Acero
            case "normal": return "url('./imgs/backgroundCard/bgNormal.webp')"; // ⚪ Normal
            default: return "url('https://i.imgur.com/A8A8A8.jpg')"; // Fondo genérico
        }
    }


    getLogoByType(type) {
        switch (type) {
            case "fire": return "./imgs/typesLogo/fireLogo.png"; // 🔥 Fuego
            case "water": return "./imgs/typesLogo/waterLogo.png"; // 💧 Agua
            case "grass": return "./imgs/typesLogo/grassLogo.png"; // 🌱 Planta
            case "electric": return "./imgs/typesLogo/electricLogo.png"; // ⚡ Eléctrico
            case "psychic": return "./imgs/typesLogo/PsychicLogo.png"; // 🔮 Psíquico
            case "ice": return "./imgs/typesLogo/iceLogo.png"; // ❄️ Hielo
            case "dragon": return "./imgs/typesLogo/dragonLogo.png"; // 🐉 Dragón
            case "dark": return "./imgs/typesLogo/darkLogo.png"; // 🌑 Siniestro
            case "fairy": return "./imgs/typesLogo/fairyLogo.png"; // ✨ Hada
            case "ground": return "./imgs/typesLogo/groundLogo.png"; // 🏜️ Tierra
            case "rock": return "./imgs/typesLogo/rockLogo.png"; // 🪨 Roca
            case "poison": return "./imgs/typesLogo/poisonLogo.png"; // ☠️ Veneno
            case "bug": return "./imgs/typesLogo/bugLogo.png"; // 🐛 Bicho
            case "fighting": return "./imgs/typesLogo/fightingLogo.png"; // 🥊 Lucha
            case "ghost": return "./imgs/typesLogo/ghostLogo.png"; // 👻 Fantasma
            case "steel": return "./imgs/typesLogo/steelLogo.png"; // ⚙️ Acero
            case "normal": return "./imgs/typesLogo/normalLogo.png"; // ⚪ Normal
            default: return "https://i.imgur.com/A8A8A8.jpg"; // Fondo genérico
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
            const [randomMove1, randomMove2] = this.getRandomMoves(data);
            this.render(data, randomMove1, randomMove2);
        } catch (error) {
            console.error("Error al obtener datos del Pokémon:", error);
            this.shadowRoot.innerHTML = `<p>Error al cargar el Pokémon.</p>`;
        }
    }

    getRandomMoves(pokemon){
        const moves = pokemon.moves.length;
        const randomIndex1 = Math.floor(Math.random() * moves);
        const randomMove1 = pokemon.moves[randomIndex1].move.name;
        
        let randomMove2;

        do {
            const randomIndex2 = Math.floor(Math.random() * moves);
            randomMove2 = pokemon.moves[randomIndex2].move.name;
        } while (randomMove1 === randomMove2);

        return [randomMove1, randomMove2];
    }

    render(pokemon,randomMove1,randomMove2) {
        const primaryType = pokemon.types[0].type.name;
        const backgroundColor = this.getColorByType(primaryType);
        const backgroundImage = this.getBackgroundByType(primaryType);
        const logoImage = this.getLogoByType(primaryType);

        this.shadowRoot.innerHTML = `
            <style>
                .card{
                    background-color: var(${backgroundColor});
                    height:100px;
                    width: 70px;
                    border-radius: 2px;
                    border: solid 1.8px var(--card-border);
                    display: flex;
                    flex-direction: column;
                    padding:2px;
                    gap: 0px;

                }

                h3{
                    font-size: 6px
                }
                
                p{
                    font-size: 3px;
                }

                .nameType h3, .nameType p {
                    margin: 0;
                    padding: 0;
                    line-height: 1.2;
                }

                .pokemonImg{
                    height: 3rem;
                    width: auto;
                    padding: 0;
                }

                .nameType{
                    display: flex;
                    flex-direction: column;
                    gap: 0px;
                    height:20%;
                }

                .cardHeader{
                    display: flex;
                    justify-content: space-between; 
                    flex-direction: row;
                }

                .typeLogo {
                    width: 8px;  
                    height: 8px; 
                }

                .idLogo{
                    display: flex;
                    flex-direction: row;
                    gap:4px;
                    justify-content: center;
                    align-items: center;
                }

                .idLogo p {
                    font-size: 4px;
                    font-weight: bold;
                    margin: 0;
                    padding: 0;
                }

                .imageFooter{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    background-color: #D9D9D9;
                    height: 6.5%;
                    width: 102%;
                    border-radius: 1.3px;
                    gap: 4px;
                    margin-left: -0.6px;
                    flex-grow: 0;
                }

                .cardHero{
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    align-items: center;
                    height: 49%;
                }

                .cardImage{
                    background-image: ${backgroundImage};
                    background-size: cover;
                    width: 99%;
                    height: 80%;
                    border: solid 0.5px #e9edf5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top:4px;
                }

                .cardFooter{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 0;
                    padding: 0;
                    background-color: rgba(255, 255, 255, 0.3);
                    border-radius: 1.3px;
                }

                .cardFooter h6 {
                    font-size: 5px;
                    margin: 0;
                    padding: 0;
                    
                }

                .moves{
                    font-size: 4px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    margin: 0;
                    padding: 0;
                    gap: 3px;
                    margin-top: -4px;
                }

                .movesTitle img{
                    width: 5px;
                    height: auto;
                    margin-bottom: 1.5px;
                    padding: 0;
                }

                .movesTitle {
                    display: flex;
                    flex-direction: row;
                    gap: 2px;
                    justify-content: center;
                    align-items: center;
                }

                .stats{
                    font-size: 4px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: 5px 5px;
                    margin-top: -4px;
                    
                }

                .movesSection{
                display: flex;
                flex-direction: column;

                
                }

                .movesSection2{
                    display: flex;
                    height: 100%;
                    gap: 4px;
                }

                .card:hover {
                    transform: scale(1.05); /* Agranda la carta un 5% */
                    transition: transform 0.3s ease;
                }
                .card:hover .pokemonImg{
                    transform: scale(1.1); /* Agranda la imagen un 10% */
                    transition: transform 0.3s ease;
                }

            </style>


            <section class="card">
                <section class="cardHeader">

                    <div class="nameType">
                        <h3>${pokemon.name.toUpperCase()}</h3>
                        <p>${pokemon.types.map(t => t.type.name).join(" & ")}</p>
                    </div>

                    <div class="idLogo">
                    <p>#${pokemon.id}</p>
                    <img src="${logoImage}" alt="${primaryType}" class="typeLogo"/>
                    </div>
                </section>

                <section class="cardHero">
                    <section class="cardImage">
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemonImg"/>
                    </section>

                    <section class="imageFooter">
                        <p>Height: ${(pokemon.height)/10}m</p>
                        <p>Weight: ${(pokemon.weight)/10}kg</p>
                    </section>
                </section>

                <section class="cardFooter">
                    <section class="movesSection2">
                        <section class="movesSection">
                            <div class="movesTitle">
                                <h6>Moves</h6>
                                <image src="./imgs/extra/moves.svg" />
                            </div>
                            <div class="moves">
                                <p>${randomMove1}</p>
                                <p>${randomMove2}</p>
                            </div>
                        </section>

                        <section class="movesSection">
                            <div class="movesTitle">
                                <h6>Abilities</h6>
                                <image src="./imgs/extra/hability.svg" />
                            </div>
                            <div class="moves">
                                <p>${pokemon.abilities[0].ability.name}</p>
                                <p>${pokemon.abilities[1].ability.name}</p>
                            </div>
                        </section>
                    </section>

                    <section class="movesSection">
                        <div class="movesTitle">
                            <h6>Stats</h6>
                            <image src="./imgs/extra/stats.svg" />
                        </div>
                        <div class="stats">
                            <p> <strong>${pokemon.stats[0].stat.name}</strong>:   ${pokemon.stats[0].base_stat}</p>
                            <p> <strong>${pokemon.stats[1].stat.name}</strong>:   ${pokemon.stats[1].base_stat}</p>
                            <p> <strong>${pokemon.stats[2].stat.name}</strong>:   ${pokemon.stats[2].base_stat}</p>
                            <p> <strong>${pokemon.stats[3].stat.name}</strong>:   ${pokemon.stats[3].base_stat}</p>
                            <p> <strong>${pokemon.stats[4].stat.name}</strong>:   ${pokemon.stats[4].base_stat}</p>
                        </div>
                    </section>
                </section>

            </section>
        `;
    }
}




customElements.define("pokemon-card", PokemonCard);
