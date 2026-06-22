const fs = require('fs');

// 1. Update squad.js to include 'th': 'Tailandia'
let squad = fs.readFileSync('squad.js', 'utf8');
if (!squad.includes("'th': 'Tailandia'")) {
    squad = squad.replace(
        /'mx': 'México'[\r\n]+};/,
        `'mx': 'México',\n    'th': 'Tailandia'\n};`
    );
    fs.writeFileSync('squad.js', squad);
}

// 2. Add tailandiaCards to database/tsubasa_cards.js
let tsubasa = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const tailandiaCards = `
// ==========================================
// TAILANDIA
// ==========================================
const tailandiaCards = [
    {
        id: "bunnaak_oro",
        name: "BUNNAAK",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "CB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/Tailandia/BunnaakOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "bunnaak_chicorid",
        name: "BUNNAAK",
        version: "Chicorid",
        rarity: "Especial",
        rating: 88,
        position: "CB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/Tailandia/Bunnaak.png",
        background: "assets/Cartas/Chicorid.png"
    },
    {
        id: "chanakonsawatt_oro",
        name: "CHANAKONSAWATT",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "LW",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/ManchesterUnited.png",
        image: "assets/characters/Tailandia/ChanaKonsawattOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "chanakonsawatt_trailblaze",
        name: "CHANAKONSAWATT",
        version: "Trailblaze",
        rarity: "Especial",
        rating: 86,
        position: "LW",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/ManchesterUnited.png",
        image: "assets/characters/Tailandia/ChanaKonsawatt.png",
        background: "assets/Cartas/Trailblaze.png"
    },
    {
        id: "farankonsawatt_oro",
        name: "FARANKONSAWATT",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CAM",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/ManchesterUnited.png",
        image: "assets/characters/Tailandia/FaranKonsawattOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "farankonsawatt_trailblaze",
        name: "FARANKONSAWATT",
        version: "Trailblaze",
        rarity: "Especial",
        rating: 87,
        position: "CAM",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/ManchesterUnited.png",
        image: "assets/characters/Tailandia/FaranKonsawatt.png",
        background: "assets/Cartas/Trailblaze.png"
    },
    {
        id: "sakhonkonsawatt_oro",
        name: "SAKHONKONSAWATT",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "RW",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/ManchesterUnited.png",
        image: "assets/characters/Tailandia/SakhonKonsawattOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "sakhonkonsawatt_trailblaze",
        name: "SAKHONKONSAWATT",
        version: "Trailblaze",
        rarity: "Especial",
        rating: 86,
        position: "RW",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/ManchesterUnited.png",
        image: "assets/characters/Tailandia/SakhonKonsawatt.png",
        background: "assets/Cartas/Trailblaze.png"
    }
];
`;

if (!tsubasa.includes('const tailandiaCards =')) {
    tsubasa += '\n' + tailandiaCards;
    fs.writeFileSync('database/tsubasa_cards.js', tsubasa);
}

// 3. Update cards.js
let cardsjs = fs.readFileSync('cards.js', 'utf8');
if (!cardsjs.includes('...tailandiaCards')) {
    cardsjs = cardsjs.replace('...mexicoCards', '...mexicoCards,\n    ...tailandiaCards');
    fs.writeFileSync('cards.js', cardsjs);
}

console.log('Tailandia updates successful!');
