const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "berrand_traora_oro",
        name: "BERRAND TRAORA",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "RW",
        secondaryPositions: ["ST"],
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/bf.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/BurkinaFaso/BerrandTraora.png",
        background: "assets/Cartas/Oro.png"
    },`;

if (!file.includes('id: "berrand_traora_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Burkina Faso card successfully.');
} else {
    console.log('Burkina Faso card already exists.');
}
