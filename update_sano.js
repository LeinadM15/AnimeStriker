const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newSano = `const sanoCards = [
    {
        id: "sano_oro",
        name: "SANO",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "ST",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Sano/SanoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "sano_especial",
        name: "SANO",
        version: "Especial",
        rarity: "Especial",
        rating: 85,
        position: "ST",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Sano/Sano.png",
        background: "assets/Cartas/Azul.png"
    }
];`;

s = s.replace(/const sanoCards = \[\s*\{\s*id: "sano_kunimi"[\s\S]*?id: "sano_especial"[\s\S]*?\}\s*\];/, newSano);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Sano updated successfully');
