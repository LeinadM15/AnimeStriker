const fs = require('fs');
let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newTaki = `const takiCards = [
    {
        id: "taki_oro",
        name: "TAKI",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Taki/TakiOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

s = s.replace(/const takiCards = \[\s*\{\s*id: "taki_nankatsu"[\s\S]*?id: "taki_especial"[\s\S]*?\}\s*\];/, newTaki);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Taki updated successfully');
