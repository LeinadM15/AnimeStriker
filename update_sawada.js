const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newSawada = `const sawadaCards = [
    {
        id: "sawada_oro",
        name: "SAWADA",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CAM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Sawada/SawadaOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

s = s.replace(/const sawadaCards = \[\s*\{\s*id: "sawada_toho"[\s\S]*?id: "sawada_especial"[\s\S]*?\}\s*\];/, newSawada);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Sawada updated successfully');
