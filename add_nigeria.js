const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "ochado_oro",
        name: "OCHADO",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "CAM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Nigeria/OchadoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "ochado_pxg",
        name: "OCHADO",
        version: "PXG",
        rarity: "Especial",
        rating: 89,
        position: "CAM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Nigeria/OchadoPXG.png",
        background: "assets/Cartas/PXG.png"
    },
    {
        id: "ochado_brasil",
        name: "OCHADO",
        version: "Brasil",
        rarity: "Especial",
        rating: 91,
        position: "CAM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Nigeria/OchadoNig.png",
        background: "assets/Cartas/Brasil.png"
    },
    {
        id: "boban_oro",
        name: "BOBAN",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "CB",
        secondaryPositions: ["CM"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/characters/Nigeria/BobanOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "boban_brasil",
        name: "BOBAN",
        version: "Brasil",
        rarity: "Especial",
        rating: 88,
        position: "CB",
        secondaryPositions: ["CM"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/characters/Nigeria/Boban.png",
        background: "assets/Cartas/Brasil.png"
    },`;

if (!file.includes('id: "ochado_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Nigeria cards successfully.');
} else {
    console.log('Nigeria cards already exist.');
}
