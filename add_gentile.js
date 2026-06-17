const fs = require('fs');
const path = require('path');

const tsubasaFile = 'C:/Users/Admin/Desktop/WebFutbol/database/tsubasa_cards.js';
let tsubasa = fs.readFileSync(tsubasaFile, 'utf8');

// Modifiers:
// Tsubasa Barcha to 88
tsubasa = tsubasa.replace(/(id:\s*"tsu_barcha"[\s\S]*?rating:\s*)(\d+)/, '$188');
// Tsubasa Rising_New to 88
tsubasa = tsubasa.replace(/(id:\s*"tsu_rising_new"[\s\S]*?rating:\s*)(\d+)/, '$188');
// Kojiro Ubers + 1
tsubasa = tsubasa.replace(/(id:\s*"koj_ubers"[\s\S]*?rating:\s*)(\d+)/, (m, p1, p2) => p1 + (parseInt(p2) + 1));

// Add Gentile
const newCards = `
// ==========================================
// GENTILE (SALVATORE)
// ==========================================
const gentileCards = [
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
        background: "assets/backgrounds/Fondo_Gentile.png"
    },
    {
        id: "gen_ubers",
        name: "GENTILE",
        version: "Ubers",
        rarity: "Normal",
        rating: 89,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Gentile/GentileUbers.png",
        background: "assets/FondoTsubasa.jpeg"
    }
];
`;

// Only append if not already there
if (!tsubasa.includes('gentileCards')) {
    tsubasa += "\n" + newCards;
}

fs.writeFileSync(tsubasaFile, tsubasa);
console.log('Tsubasa cards updated and Gentile added.');

const cardsFile = 'C:/Users/Admin/Desktop/WebFutbol/cards.js';
let cards = fs.readFileSync(cardsFile, 'utf8');

if (!cards.includes('...gentileCards')) {
    cards = cards.replace(/(...levinCards,)/, '$1\n    ...gentileCards,');
    fs.writeFileSync(cardsFile, cards);
    console.log('cards.js updated.');
}
