const fs = require('fs');

const valentinCardsCode = `
// ==========================================
// VALENTIN EISNER
// ==========================================
const valentinEisnerCards = [
    {
        id: "valentin_oro",
        name: "VALENTIN EISNER",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CM",
        secondaryPositions: ["CAM", "CDM"],
        league: "J-League",
        nation: "Japón",
        image: "assets/characters/Valentin/ValentinEisnerOro.png"
    },
    {
        id: "valentin_azul",
        name: "VALENTIN EISNER",
        version: "Azul",
        rarity: "Especial",
        rating: 87,
        position: "CM",
        secondaryPositions: ["CAM", "CDM"],
        league: "J-League",
        nation: "Japón",
        image: "assets/characters/Valentin/ValentinEisner1.png"
    },
    {
        id: "valentin_tots",
        name: "VALENTIN EISNER",
        version: "TOTS",
        rarity: "TOTS",
        rating: 89,
        position: "CM",
        secondaryPositions: ["CAM", "CDM"],
        league: "J-League",
        nation: "Japón",
        image: "assets/characters/Valentin/ValentinEisner2.png"
    },
    {
        id: "valentin_hielo",
        name: "VALENTIN EISNER",
        version: "Hielo",
        rarity: "Hielo",
        rating: 90,
        position: "CM",
        secondaryPositions: ["CAM", "CDM"],
        league: "Bundesliga",
        nation: "Japón",
        image: "assets/characters/Valentin/ValentinEisnerPrime.png"
    }
];
`;

let db = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
if (!db.includes('valentinEisnerCards')) {
    db += '\n' + valentinCardsCode;
    fs.writeFileSync('database/tsubasa_cards.js', db);
}

let cards = fs.readFileSync('cards.js', 'utf8');
if (!cards.includes('...valentinEisnerCards')) {
    cards = cards.replace('...xavierCards\n]', '...xavierCards,\n    ...valentinEisnerCards\n]');
    cards = cards.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + Date.now() + "';");
    fs.writeFileSync('cards.js', cards);
}

console.log('Cards added successfully.');
