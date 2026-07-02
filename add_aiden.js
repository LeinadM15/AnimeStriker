const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "aiden_oro",
        name: "AIDEN",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "ST",
        altPositions: ["LM", "RM", "LW", "RW"],
        league: "Desconocida",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Aiden/AidenOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "aiden_if",
        name: "AIDEN",
        version: "IF",
        rarity: "Especial",
        rating: 88,
        position: "ST",
        altPositions: ["LM", "RM", "LW", "RW"],
        league: "Desconocida",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Aiden/AidenIf.png",
        background: "assets/Cartas/If.png"
    },
    {
        id: "aiden_rosa",
        name: "AIDEN",
        version: "Rosa",
        rarity: "Especial",
        rating: 89,
        position: "ST",
        altPositions: ["LM", "RM", "LW", "RW"],
        league: "Desconocida",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Aiden/AidenRosa.png",
        background: "assets/Cartas/Rosa.png"
    },
    {
        id: "aiden_roja",
        name: "AIDEN",
        version: "Roja",
        rarity: "Especial",
        rating: 90,
        position: "ST",
        altPositions: ["LM", "RM", "LW", "RW"],
        league: "Desconocida",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Athletic.png",
        image: "assets/characters/Aiden/AidenRojo.png",
        background: "assets/Cartas/Roja.png"
    },
    {
        id: "aiden_hielo",
        name: "AIDEN",
        version: "Hielo",
        rarity: "Especial",
        rating: 91,
        position: "ST",
        altPositions: ["LM", "RM", "LW", "RW"],
        league: "Desconocida",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Aiden/AidenVentis.png",
        background: "assets/Cartas/Hielo.png"
    },
    {
        id: "aiden_tots",
        name: "AIDEN",
        version: "TOTS",
        rarity: "Especial",
        rating: 92,
        position: "ST",
        altPositions: ["LM", "RM", "LW", "RW"],
        league: "Desconocida",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Aiden/AidenTots.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "aiden_prime",
        name: "AIDEN",
        version: "Trophy",
        rarity: "Especial",
        rating: 93,
        position: "ST",
        altPositions: ["LM", "RM", "LW", "RW"],
        league: "Desconocida",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Athletic.png",
        image: "assets/characters/Aiden/AidenPrime.png",
        background: "assets/Cartas/Trophy.png"
    },`;

// Add it to the top
if (!file.includes('id: "aiden_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Aiden cards successfully.');
} else {
    console.log('Aiden cards already exist.');
}
