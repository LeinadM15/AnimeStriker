const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "patara_sunalai_oro",
        name: "PATARA SUNALAI",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Tailandia/PataraSunalaiOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "patara_sunalai_milan",
        name: "PATARA SUNALAI",
        version: "Especial",
        rarity: "Especial",
        rating: 87,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/th.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Tailandia/PataraSunalai.png",
        background: "assets/Cartas/Milan.png"
    },`;

if (!file.includes('id: "patara_sunalai_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Patara Sunalai cards successfully.');
} else {
    console.log('Patara Sunalai cards already exist.');
}
