const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const docName = document.getElementById("pokemon-name");
const docId = document.getElementById("pokemon-id");
const docWeight = document.getElementById("weight");
const docHeight = document.getElementById("height");
const docImg = document.getElementById("img-container");
const docTypes = document.getElementById("types");

let isInputID = true;
let link = ``;
let pokemonData = [];

const formatName = (input) => {
    return input.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
};

const formatGeneralInfo = () => {
    const { name, id, weight, height, sprites, types } = pokemonData;
    // Display Name and ID
    docName.innerText = name.toUpperCase();
    docId.innerText = `#${id}`;
    // Display Weight and Height
    docWeight.innerText = `Weight: ${weight}`;
    docHeight.innerText = `Height: ${height}`;
    // Display IMG
    docImg.innerHTML = `<img src="${sprites.front_default}" alt="${name} sprite" />`
    // Displaying Types
    types.map(el => {
        let typeName = el.type.name;
        docTypes.innerHTML += `<span class="${typeName}">${typeName.toUpperCase()}</span>`
    })
};

const fetchData = async () => {
    try {
        const resolve = await fetch(link);
        const data = await resolve.json();
        pokemonData = data;
        console.log(pokemonData);
        formatGeneralInfo();
    } catch (err) {
        console.log(err);
        alert("Pokémon not found");
    }
};

searchBtn.addEventListener("click", () => {
    if (!isNaN(searchInput.value)) {
        isInputID = true;
        link = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value}`;
    } else {
        isInputID = false;
        let inputName = formatName(searchInput.value);
        link = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputName}`;
    }
    console.log(link);
    fetchData();
});