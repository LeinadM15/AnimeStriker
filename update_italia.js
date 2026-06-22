const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Replace the entire italiaCards array
const italiaReplacement = `const italiaCards = [
    {
        id: "romano_dortmund",
        name: "ROMANO",
        version: "Dortmund",
        rarity: "Especial",
        rating: 88,
        position: "ST",
        secondaryPositions: ["CAM"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Dortmund.png",
        image: "assets/characters/Italia/Romano.png",
        background: "assets/Cartas/Amarilla.png"
    },
    {
        id: "romano_oro",
        name: "ROMANO",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "ST",
        secondaryPositions: ["CAM"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Dortmund.png",
        image: "assets/characters/Italia/RomanoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "rossi_chicorid",
        name: "ROSSI",
        version: "Chicorid",
        rarity: "Especial",
        rating: 87,
        position: "CDM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/Italia/Rossi.png",
        background: "assets/Cartas/Oscura.png"
    },
    {
        id: "rossi_oro",
        name: "ROSSI",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CDM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/Italia/RossiOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "gozza_oro",
        name: "GOZZA",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Reggiana.png",
        image: "assets/characters/Italia/GozzaOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "matteo_oro",
        name: "MATTEO",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/Italia/MatteoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "inzars_oro",
        name: "INZARS",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Italia/InzarsOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "delpi_oro",
        name: "DELPI",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Italia/DelpiOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "chiellini_oro",
        name: "CHIELLINI",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Italia/ChielliniOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "cannavaru_oro",
        name: "CANNAVARU",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Parma.png",
        image: "assets/characters/Italia/CannavaruOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

s = s.replace(/const italiaCards = \[[\s\S]*?\];/m, italiaReplacement);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Italian players updated!');
