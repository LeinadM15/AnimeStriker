const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newKisugi = `const kisugiCards = [
    {
        id: "kisugi_oro",
        name: "KISUGI",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Napoli.png",
        image: "assets/characters/Kisugi/KisugiOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

s = s.replace(/const kisugiCards = \[\s*\{\s*id: "kisugi_nankatsu"[\s\S]*?id: "kisugi_especial"[\s\S]*?\}\s*\];/, newKisugi);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Kisugi updated successfully');
