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
            case "fire": return "url('./imgs/backgroundCard/bgFire.webp')"; 
            case "water": return "url('./imgs/backgroundCard/bgWater.png')"; 
            case "grass": return "url('./imgs/backgroundCard/bgGrass.webp')"; 
            case "electric": return "url('./imgs/backgroundCard/bgElectricity.webp')"; 
            case "psychic": return "url('./imgs/backgroundCard/bgPsychic.webp')"; 
            case "ice": return "url('./imgs/backgroundCard/bgIce.webp')"; 
            case "dragon": return "url('./imgs/backgroundCard/bgDragon.webp')"; 
            case "dark": return "url('./imgs/backgroundCard/bgDark.webp')"; 
            case "fairy": return "url('./imgs/backgroundCard/bgFairy.webp')"; 
            case "ground": return "url('./imgs/backgroundCard/bgGround.jpg')"; 
            case "rock": return "url('./imgs/backgroundCard/bgRock.webp')"; 
            case "poison": return "url('./imgs/backgroundCard/bgPoison.webp')"; 
            case "bug": return "url('./imgs/backgroundCard/bgBug.png')"; 
            case "fighting": return "url('./imgs/backgroundCard/bgFighting.webp')"; 
            case "ghost": return "url('./imgs/backgroundCard/bgGhost.png')"; 
            case "steel": return "url('./imgs/backgroundCard/bgSteel.webp')"; 
            case "normal": return "url('./imgs/backgroundCard/bgNormal.webp')"; 
            default: return "url('https://i.imgur.com/A8A8A8.jpg')";
        }
    }

    getLogoByType(type) {
        switch (type) {
            case "fire": return "./imgs/typesLogo/fireLogo.png"; 
            case "water": return "./imgs/typesLogo/waterLogo.png"; 
            case "grass": return "./imgs/typesLogo/grassLogo.png"; 
            case "electric": return "./imgs/typesLogo/electricLogo.png"; 
            case "psychic": return "./imgs/typesLogo/PsychicLogo.png"; 
            case "ice": return "./imgs/typesLogo/iceLogo.png"; 
            case "dragon": return "./imgs/typesLogo/dragonLogo.png"; 
            case "dark": return "./imgs/typesLogo/darkLogo.png"; 
            case "fairy": return "./imgs/typesLogo/fairyLogo.png"; 
            case "ground": return "./imgs/typesLogo/groundLogo.png"; 
            case "rock": return "./imgs/typesLogo/rockLogo.png"; 
            case "poison": return "./imgs/typesLogo/poisonLogo.png"; 
            case "bug": return "./imgs/typesLogo/bugLogo.png"; 
            case "fighting": return "./imgs/typesLogo/fightingLogo.png"; 
            case "ghost": return "./imgs/typesLogo/ghostLogo.png"; 
            case "steel": return "./imgs/typesLogo/steelLogo.png"; 
            case "normal": return "./imgs/typesLogo/normalLogo.png"; 
            default: return "https://i.imgur.com/A8A8A8.jpg";
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

    render(pokemon, randomMove1, randomMove2) {
        const primaryType = pokemon.types[0].type.name;
        const backgroundColor = this.getColorByType(primaryType);
        const backgroundImage = this.getBackgroundByType(primaryType);
        const logoImage = this.getLogoByType(primaryType) ; 
        this.shadowRoot.innerHTML = `
            <style>
                .card{
                    background-color: var(${backgroundColor});
                    height: 320px;
                    width: 210px;
                    border-radius: 6px;
                    border: solid 5.4px var(--card-border);
                    display: flex;
                    flex-direction: column;
                    padding: 6px;
                    gap: 0px;
                }

                h3{
                    font-size: 18px;
                }
                
                p{
                    font-size: 9px;
                }

                .nameType h3, .nameType p {
                    margin: 0;
                    padding: 0;
                    line-height: 1.2;
                }

                .pokemonImg{
                    height: 9rem;
                    width: auto;
                    padding: 0;
                }

                .nameType{
                    display: flex;
                    flex-direction: column;
                    gap: 0px;
                    height: 20%;
                }

                .cardHeader{
                    display: flex;
                    justify-content: space-between; 
                    flex-direction: row;
                }

                .typeLogo {
                    width: 24px;  
                    height: 24px; 
                }

                .idLogo{
                    display: flex;
                    flex-direction: row;
                    gap: 12px;
                    justify-content: center;
                    align-items: center;
                }

                .idLogo p {
                    font-size: 12px;
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
                    height: 7%;
                    width: 102%;
                    border-radius: 3.9px;
                    gap: 12px;
                    margin-left: -1.8px;
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
                    border: solid 1.5px #e9edf5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 12px;
                }

                .cardFooter{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top:4px;
                    padding: 0;
                    background-color: rgba(255, 255, 255, 0.3);
                    border-radius: 3.9px;
                }

                .cardFooter h6 {
                    font-size: 15px;
                    margin: 0;
                    padding: 0;
                }

                .moves{
                    font-size: 12px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    margin: 0;
                    padding: 0;
                    gap: 9px;
                    margin-top: -12px;
                }

                .movesTitle img{
                    width: 15px;
                    height: auto;
                    margin-bottom: 4.5px;
                    padding: 0;
                }

                .movesTitle {
                    display: flex;
                    flex-direction: row;
                    gap: 6px;
                    justify-content: center;
                    align-items: center;
                }

                .stats{
                    font-size: 12px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: 15px 15px;
                    margin-top: -12px;
                }

                .movesSection{
                    display: flex;
                    flex-direction: column;
                }

                .movesSection2{
                    display: flex;
                    height: 100%;
                    gap: 12px;
                }

                .card:hover {
                    transform: scale(1.05);
                    transition: transform 0.3s ease;
                }
                .card:hover .pokemonImg{
                    transform: scale(1.1);
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
                        <p>Height: ${(pokemon.height) / 10}m</p>
                        <p>Weight: ${(pokemon.weight) / 10}kg</p>
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
                            </div>
                        </section>
                    </section>

                    <section class="movesSection">
                        <div class="movesTitle">
                            <h6>Stats</h6>
                            <image src="./imgs/extra/stats.svg" />
                        </div>
                        <div class="stats">
                            <p><strong>${pokemon.stats[0].stat.name}</strong>: ${pokemon.stats[0].base_stat}</p>
                            <p><strong>${pokemon.stats[1].stat.name}</strong>: ${pokemon.stats[1].base_stat}</p>
                            <p><strong>${pokemon.stats[2].stat.name}</strong>: ${pokemon.stats[2].base_stat}</p>
                            <p><strong>${pokemon.stats[3].stat.name}</strong>: ${pokemon.stats[3].base_stat}</p>
                            <p><strong>${pokemon.stats[4].stat.name}</strong>: ${pokemon.stats[4].base_stat}</p>
                        </div>
                    </section>
                </section>
            </section>
        `;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cardsContainer");
    for (let i = 1; i <= 20; i++) {
      const card = document.createElement("pokemon-card");
      card.setAttribute("pokemon-id", i);
      container.appendChild(card);
    }
  });

customElements.define("pokemon-card", PokemonCard);
