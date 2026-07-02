const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "agbim_brasil",
        name: "AGBIM",
        version: "Brasil",
        rarity: "Especial",
        rating: 81,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Nigeria/AgbimOro.png",
        background: "assets/Cartas/Brasil.png"
    },
    {
        id: "ekpo_brasil",
        name: "EKPO",
        version: "Brasil",
        rarity: "Especial",
        rating: 78,
        position: "CB",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Nigeria/Ekpo.png",
        background: "assets/Cartas/Brasil.png"
    },
    {
        id: "sadiq_brasil",
        name: "SADIQ",
        version: "Brasil",
        rarity: "Especial",
        rating: 81,
        position: "CDM",
        secondaryPositions: ["CM"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Liverpool.png",
        image: "assets/characters/Nigeria/SadiqOro.png",
        background: "assets/Cartas/Brasil.png"
    },
    {
        id: "kaita_brasil",
        name: "KAITA",
        version: "Brasil",
        rarity: "Especial",
        rating: 79,
        position: "LB",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Monaco.png",
        image: "assets/characters/Nigeria/Kaita.png",
        background: "assets/Cartas/Brasil.png"
    },
    {
        id: "ezekiel_brasil",
        name: "EZEKIEL",
        version: "Brasil",
        rarity: "Especial",
        rating: 80,
        position: "CM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Nigeria/Ezekiel.png",
        background: "assets/Cartas/Brasil.png"
    },`;

if (!file.includes('id: "agbim_brasil"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Nigerian Brasil cards successfully.');
} else {
    console.log('Nigerian Brasil cards already exist.');
}
