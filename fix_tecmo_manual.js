const fs = require('fs');

let tecmo = fs.readFileSync('database/tecmo_cards.js', 'utf8');

// Find the corrupted part:
//         league: "Primeira Liga",
//         name: "DIRCEU",
let badContent = `        league: "Primeira Liga",
        name: "DIRCEU",`;

let fixedContent = `        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/br.png",
        teamIcon: "teams/Sporting.png",
        image: "assets/characters/Tecmo/Nascimento.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "oliveira_tecmo_oro",
        name: "OLIVEIRA",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CAM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/br.png",
        teamIcon: "teams/Sevilla.png",
        image: "assets/characters/Tecmo/Oliveira.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "dirceu_oro",
        name: "DIRCEU",`;

tecmo = tecmo.replace(badContent, fixedContent);
fs.writeFileSync('database/tecmo_cards.js', tecmo);
console.log('Restored missing lines in tecmo_cards.js');
