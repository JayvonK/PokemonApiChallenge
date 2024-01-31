import { idFormat, nameFormat } from "./dataFormat.js";

let pokeImg = document.getElementById("pokeImg");

const GetPokemonData = async (pokemon) => {
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon + '?limit=649&offset=0');
    const data = await promise.json();
    if()
}

const GetPokeImg = (pokemonData) => {
    return pokemonData.sprites.other["official-artwork"].front_default;
}

const GetShinyPokeImg = (pokemonData) => {
    return pokemonData.sprites.other["official-artwork"].front_shiny;
}

const GetPokeEvolveImg = (pokemonData) => {
    return pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default;;
}

const GetPokeTypes = (pokemonData) => {
    let pokeTypes = [];
    pokemonData.types.map(t => pokeTypes.push(t.type.name));
    return pokeTypes;
}

const GetPokeName = (pokemonData) => {
    return nameFormat(pokemonData.species.name.toString());
}


const GetPokeNum = (pokemonData) => {
    return idFormat(pokemonData.id.toString());
}

const GetPokeFlavorText = async (pokemonData) => {
    let id = pokemonData.id;
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + id)
    const data = await promise.json();
    let arr = data.flavor_text_entries;
    let index = arr.findIndex(text => text.language.name === "en");
    return arr[index].flavor_text;
}

const GetPokeMoves = (pokemonData) => {
    let moveArr = [];
    pokemonData.moves.map(m => moveArr.push(m.move.name));
    return moveArr.join(", ");

}

const GetPokeAbilities = (pokemonData) => {
    let abilityArr = [];
    pokemonData.abilities.map(a => abilityArr.push(a.ability.name));
    return abilityArr.join(", ");
}

const GetPokeLocation = async (pokemonData) => {
    let id = pokemonData.id;
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
    const data = await promise.json();

    if(data.toString() === ""){
        console.log("no data found");
    }else {
        const promise2 = await fetch(data[0].location_area.url);
        const data2 = await promise2.json();
        if(data2.names.toString() === ""){
            console.log("noe");
            return "none";
        }
        // return data2.names[0].name;
    }
}

await GetPokeLocation(await GetPokemonData("pidgeot"));