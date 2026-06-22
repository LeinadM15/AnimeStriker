const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. Rebuild genzoCards
const newGenzoCards = `const genzoCards = [
    {
        id: "gen_hamburgo",
        name: "GENZO",
        version: "Hamburgo",
        rarity: "Normal",
        rating: 89,
        position: "GK",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Hamburgo.png",
        image: "assets/characters/Genzo/GenzoHamburgo.png",
        background: "assets/Cartas/Flashback.png"
    },
    {
        id: "gen_bastard",
        name: "GENZO",
        version: "Bastard Munchen",
        rarity: "Especial",
        rating: 90,
        position: "GK",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Genzo/GenzoBastard.png"
    },
    {
        id: "gen_risingsun",
        name: "GENZO",
        version: "Rising Sun",
        rarity: "Especial",
        rating: 94,
        position: "GK",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Genzo/GenzoRisingSun.png",
        background: "assets/backgrounds/Fondo_GenzoRisingSun.png"
    },
    {
        id: "genzo_normal",
        name: "GENZO",
        version: "Especial",
        rarity: "Especial",
        rating: 92,
        position: "GK",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Genzo/Genzo.png",
        background: "assets/Cartas/Radioactiva.png"
    },
    {
        id: "genzo_oro",
        name: "GENZO",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "GK",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Genzo/GenzoOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

let startGenzo = code.indexOf('const genzoCards = [');
let endGenzo = code.indexOf('];', startGenzo) + 2;
code = code.substring(0, startGenzo) + newGenzoCards + code.substring(endGenzo);

// 2. Rebuild gentileCards
const newGentileCards = `const gentileCards = [
    {
        id: "gen_normal",
        name: "GENTILE",
        version: "Especial",
        rarity: "Especial",
        rating: 91,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Gentile/Gentile.png",
        background: "assets/backgrounds/Fondo_Especial.png"
    },
    {
        id: "gen_ubers",
        name: "GENTILE",
        version: "Ubers",
        rarity: "Especial",
        rating: 89,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Gentile/GentileUbers.png"
    }
];`;

let startGentile = code.indexOf('const gentileCards = [');
let endGentile = code.indexOf('];', startGentile) + 2;
code = code.substring(0, startGentile) + newGentileCards + code.substring(endGentile);

// 3. Remove the misplaced genzo_oro block that is currently inside ginoCards.
// In the current file, after gentileCards we have:
// const ginoCards = [
//     {
//         id: "genzo_oro",
//         ...
//     }
// Wait! In the view_file I didn't see ginoCards, I just saw `id: "genzo_oro"` right after `id: "gino_inter"`? No, let's just find `id: "genzo_oro"` and delete its block.

let oroStart = code.indexOf('    {\n        id: "genzo_oro",', endGentile);
if (oroStart !== -1) {
    let oroEnd = code.indexOf('    }', oroStart) + 5;
    // We should also remove any trailing comma.
    if (code[oroEnd] === ',') oroEnd++;
    code = code.substring(0, oroStart) + code.substring(oroEnd);
}

fs.writeFileSync('database/tsubasa_cards.js', code);

// Cache Buster v55
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=55');
    fs.writeFileSync(file, content);
});
