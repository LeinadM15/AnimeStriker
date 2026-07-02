const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "bello_oro",
        name: "BELLO",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "RM",
        secondaryPositions: ["RW"],
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Benfica.png",
        image: "assets/characters/Nigeria/BelloOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "bello_brasil",
        name: "BELLO",
        version: "Brasil",
        rarity: "Especial",
        rating: 87,
        position: "RM",
        secondaryPositions: ["RW"],
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Benfica.png",
        image: "assets/characters/Nigeria/Bello.png",
        background: "assets/Cartas/Brasil.png"
    },
    {
        id: "kuso_oro",
        name: "KUSO",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "CAM",
        secondaryPositions: ["CM"],
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Nigeria/KusoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "kuso_ubers",
        name: "KUSO",
        version: "Ubers",
        rarity: "Especial",
        rating: 87,
        position: "CAM",
        secondaryPositions: ["CM"],
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Nigeria/Kuso.png",
        background: "assets/Cartas/Ubers.png"
    },
    {
        id: "kuso_prime",
        name: "KUSO",
        version: "Brasil",
        rarity: "Especial",
        rating: 89,
        position: "CAM",
        secondaryPositions: ["CM"],
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Nigeria/KusoPrime.png",
        background: "assets/Cartas/Brasil.png"
    },
    {
        id: "onazi_oro",
        name: "ONAZI",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "ST",
        secondaryPositions: ["LW", "LM"],
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Nigeria/OnaziOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "onazi_base",
        name: "ONAZI",
        version: "Rulebraker",
        rarity: "Especial",
        rating: 88,
        position: "ST",
        secondaryPositions: ["LW", "LM"],
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Nigeria/OnaziBase.png",
        background: "assets/Cartas/Rulebraker.png"
    },
    {
        id: "onazi_shapesifter",
        name: "ONAZI",
        version: "Shapesifters",
        rarity: "Especial",
        rating: 90,
        position: "RB",
        secondaryPositions: ["RM", "LM", "LB"],
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Nigeria/Onazi.png",
        background: "assets/Cartas/Shapesifters.png"
    },
    {
        id: "onazi_prime",
        name: "ONAZI",
        version: "Joker",
        rarity: "Especial",
        rating: 91,
        position: "ST",
        secondaryPositions: ["LW", "LM"],
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Nigeria/OnaziPrime.png",
        background: "assets/Cartas/Joker.png"
    },
    {
        id: "obabona_oro",
        name: "OBABONA",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CB",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Chelsea.png",
        image: "assets/characters/Nigeria/ObabonaOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "obabona_brasil",
        name: "OBABONA",
        version: "Brasil",
        rarity: "Especial",
        rating: 87,
        position: "CB",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ng.png",
        teamIcon: "teams/Chelsea.png",
        image: "assets/characters/Nigeria/Obabona.png",
        background: "assets/Cartas/Brasil.png"
    },`;

if (!file.includes('id: "bello_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Nigerian part 2 players successfully.');
} else {
    console.log('Nigerian part 2 players already exist.');
}
