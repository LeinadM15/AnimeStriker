const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "agbim",
        name: "AGBIM",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Nigeria/Agbim.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "ekpo",
        name: "EKPO",
        version: "Oro",
        rarity: "Oro",
        rating: 75,
        position: "CB",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Nigeria/Ekpo.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "sadiq",
        name: "SADIQ",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "CDM",
        secondaryPositions: ["CM"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/characters/Nigeria/Sadiq.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "kaita",
        name: "KAITA",
        version: "Oro",
        rarity: "Oro",
        rating: 76,
        position: "LB",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Monaco.png",
        image: "assets/characters/Nigeria/Kaita.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "ezekiel",
        name: "EZEKIEL",
        version: "Oro",
        rarity: "Oro",
        rating: 77,
        position: "CM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Nigeria/Ezekiel.png",
        background: "assets/Cartas/Oro.png"
    },`;

if (!file.includes('id: "agbim"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Nigerian players successfully.');
} else {
    console.log('Nigerian players already exist.');
}
