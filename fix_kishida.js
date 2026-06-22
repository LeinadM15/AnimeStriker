const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const kishidaFix = `const kishidaCards = [
    {
        id: "kishida_shimizu",
        name: "KISHIDA",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CB",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Kishida/KishidaShimizu.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

s = s.replace(/const kishidaCards = \[\s*\{\s*id: "kishida_shimizu",/, kishidaFix);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Fixed Kishida');
