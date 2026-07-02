const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "estrada_oro",
        name: "ESTRADA",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CDM",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/mx.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/characters/Mexico/EstradaOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "estrada_rulebreaker",
        name: "ESTRADA",
        version: "Rulebreaker",
        rarity: "Especial",
        rating: 87,
        position: "CDM",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/mx.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/characters/Mexico/Estrada.png",
        background: "assets/Cartas/Rulebraker.png"
    },`;

if (!file.includes('id: "estrada_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Estrada cards successfully.');
} else {
    console.log('Estrada cards already exist.');
}
