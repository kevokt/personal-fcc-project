const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

// General Info Decleration
const docName = document.getElementById("pokemon-name");
const docId = document.getElementById("pokemon-id");
const docWeight = document.getElementById("weight");
const docHeight = document.getElementById("height");
const docImg = document.getElementById("img-container");
const docTypes = document.getElementById("types");

// Stats Info Decleration
const docHpStat = document.getElementById("hp");
const docAttackStat = document.getElementById("attack");
const docDefeseStat = document.getElementById("defense");
const docSAStat = document.getElementById("special-attack");
const docSDStat = document.getElementById("special-defense");
const docSpeedStat = document.getElementById("speed");

let link = ``;
let pokemonData = [];

const formatName = (input) => {
    return input.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
};

const formatGeneralInfo = () => {
    docTypes.innerHTML = ``; // For clearing types between search

    const { name, id, weight, height, sprites, types } = pokemonData;

    // Display Name and ID
    docName.innerText = name.toUpperCase();
    docId.innerText = `#${id}`;

    // Display Weight and Height
    docWeight.innerText = `Weight: ${weight}`;
    docHeight.innerText = `Height: ${height}`;

    // Display IMG
    docImg.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name} sprite" />`

    // Displaying Types
    types.map(el => {
        let typeName = el.type.name;
        docTypes.innerHTML += `<span class="${typeName}">${typeName.toUpperCase()}</span>`
    })
};

const formatStats = () => {
    const { stats } = pokemonData;
    let statData = []

    stats.map((el) => {
       statData.push(el.base_stat); 
    });

    docHpStat.innerText = statData[0];
    docAttackStat.innerText = statData[1];
    docDefeseStat.innerText = statData[2];
    docSAStat.innerText = statData[3];
    docSDStat.innerText = statData[4];
    docSpeedStat.innerText = statData[5];
}

const fetchData = async () => {
    try {
        const resolve = await fetch(link);
        const data = await resolve.json();
        pokemonData = data;
        
        formatGeneralInfo();
        formatStats();
    } catch (err) {
        console.log(err);
        alert("Pokémon not found");
    }
};

searchBtn.addEventListener("click", () => {
    if (!isNaN(searchInput.value)) {
        link = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value}`;
    } else {
        let inputName = formatName(searchInput.value);
        link = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputName}`;
    }
    fetchData();
});