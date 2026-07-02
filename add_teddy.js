const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "teddy_oro",
        name: "TEDDY KNIGHT",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "LW",
        secondaryPositions: ["RW", "LM", "RM"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Chelsea.png",
        image: "assets/characters/Teddy/TeddyOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "teddy_tots",
        name: "TEDDY KNIGHT",
        version: "TOTS",
        rarity: "Especial",
        rating: 93,
        position: "LW",
        secondaryPositions: ["RW", "LM", "RM"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Chelsea.png",
        image: "assets/characters/Teddy/Teddy.png",
        background: "assets/Cartas/Tots.png"
    },`;

if (!file.includes('id: "teddy_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Teddy Knight cards successfully.');
} else {
    console.log('Teddy Knight cards already exist.');
}
