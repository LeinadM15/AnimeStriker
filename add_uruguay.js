const fs = require('fs');

// 1. Update squad.js to include 'uy': 'Uruguay'
let squad = fs.readFileSync('squad.js', 'utf8');
if (!squad.includes("'uy': 'Uruguay'")) {
    squad = squad.replace(
        /'th': 'Tailandia'[\r\n]+};/,
        `'th': 'Tailandia',\n    'uy': 'Uruguay'\n};`
    );
    fs.writeFileSync('squad.js', squad);
}

// 2. Add uruguayCards to database/tsubasa_cards.js
let tsubasa = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const uruguayCards = `
// ==========================================
// URUGUAY
// ==========================================
const uruguayCards = [
    {
        id: "gardel_chicorid",
        name: "GARDEL",
        version: "Chicorid",
        rarity: "Especial",
        rating: 88,
        position: "GK",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/uy.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/Uruguay/Gardel.png",
        background: "assets/Cartas/Chicorid.png"
    },
    {
        id: "gardel_oro",
        name: "GARDEL",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "GK",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/uy.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/Uruguay/GardelOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "victorino_oro",
        name: "VICTORINO",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/uy.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Uruguay/VictorinoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "victorino_barcha",
        name: "VICTORINO",
        version: "Barcha",
        rarity: "Especial",
        rating: 88,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/uy.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Uruguay/VictorinoBarcha.png",
        background: "assets/Cartas/Barcha.png"
    },
    {
        id: "victorino_prime",
        name: "VICTORINO",
        version: "EEUU",
        rarity: "Especial",
        rating: 90,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/uy.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Uruguay/VictorinoPrime.png",
        background: "assets/Cartas/EEUU.png"
    },
    {
        id: "victorino_uru",
        name: "VICTORINO",
        version: "Mordiscos",
        rarity: "Especial",
        rating: 92,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/uy.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Uruguay/VictorinoUru.png",
        background: "assets/Cartas/Mordiscos.png"
    }
];
`;

if (!tsubasa.includes('const uruguayCards =')) {
    tsubasa += '\n' + uruguayCards;
    fs.writeFileSync('database/tsubasa_cards.js', tsubasa);
}

// 3. Update cards.js
let cardsjs = fs.readFileSync('cards.js', 'utf8');
if (!cardsjs.includes('...uruguayCards')) {
    cardsjs = cardsjs.replace('...tailandiaCards', '...tailandiaCards,\n    ...uruguayCards');
    fs.writeFileSync('cards.js', cardsjs);
}

console.log('Uruguay updates successful!');
