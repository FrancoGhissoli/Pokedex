const listapokemon = document.querySelector("#listapokemon");
const botonesTipos = document.querySelectorAll(".btn_header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i < 151; i++) {
    fetch(URL + i)
        .then(response => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(pokemon) {
    let tipos = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join("")

    let pokeId = pokemon.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
     <p class="pokemon-back">${pokeId}</p>
                    <div class="pokemon-imagen">
                        <img src=${pokemon.sprites.other["official-artwork"].front_default}
                            alt=${pokemon.name}>
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-nombre">${pokemon.name}</h2>
                            <div class="pokemon-tipos">
                                ${tipos}
                            </div>
                            <div class="stats">
                                <p class="stat">${pokemon.height}M</p>
                                <p class="stat">${pokemon.weight}KG</p>
                            </div>
                        </div>
                    </div>`;
    listapokemon.append(div);
}

botonesTipos.forEach((boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listapokemon.innerHTML = "";

    for (let i = 1; i < 151; i++) {
        fetch(URL + i)
            .then(response => response.json())
            .then(data => {

                if (botonId === "ver_todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            })
    }
})));
