const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "hector_helio_oro",
        name: "HECTOR HELIO",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "GK",
        secondaryPositions: ["ST"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Costademarfil/HectorHelioOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "hector_helio_arsenal",
        name: "HECTOR HELIO",
        version: "Arsenal",
        rarity: "Especial",
        rating: 89,
        position: "GK",
        secondaryPositions: ["ST"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Costademarfil/HectorHelio.png",
        background: "assets/Cartas/Arsenal.png"
    },
    {
        id: "hector_helio_roja",
        name: "HECTOR HELIO",
        version: "Roja",
        rarity: "Especial",
        rating: 91,
        position: "GK",
        secondaryPositions: ["ST"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Costademarfil/HectorHelio2.png",
        background: "assets/Cartas/Roja.png"
    },
    {
        id: "hector_helio_shapesifters",
        name: "HECTOR HELIO",
        version: "Shapesifters",
        rarity: "Especial",
        rating: 92,
        position: "ST",
        secondaryPositions: ["GK"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Costademarfil/HectorHelioDel.png",
        background: "assets/Cartas/Shapesifters.png"
    },
    {
        id: "hector_helio_trailblaze",
        name: "HECTOR HELIO",
        version: "Trailblaze",
        rarity: "Especial",
        rating: 94,
        position: "GK",
        secondaryPositions: ["ST"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Costademarfil/HectorHelioPrime.png",
        background: "assets/Cartas/Trailblaze.png"
    },`;

if (!file.includes('id: "hector_helio_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Hector Helio cards successfully.');
} else {
    console.log('Hector Helio cards already exist.');
}
