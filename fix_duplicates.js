const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. Fix heath_prime duplicates
const regexPrime = /\{\s*id:\s*[\"']heath_prime[\"'][\s\S]*?\},/g;
file = file.replace(regexPrime, '');

const correctPrimeCard = `{
        id: "heath_prime",
        name: "HEATH MOORE",
        version: "Real",
        rarity: "Especial",
        rating: 94,
        position: "CM",
        league: "Desconocida",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/Heath/HeathSusanPrime.png",
        background: "assets/Cartas/Real.png"
    },`;

// Add it to the top
file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n    ' + correctPrimeCard);

// 2. Change name of all other HEATH cards to HEATH MOORE
// We'll target ids that start with heath_
const ids = ["heath_oro", "heath_if", "heath_rosa", "heath_flash", "heath_future", "heath_tots", "heath_toty"];
for (const id of ids) {
    const r = new RegExp(`(id:\\s*[\"']${id}[\"'][\\s\\S]*?name:\\s*[\"'])HEATH([\"'])`, 'g');
    file = file.replace(r, '$1HEATH MOORE$2');
}

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log('Fixed duplicates and updated name to HEATH MOORE');
