const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Update 92 to 93
let lines = file.split('\n');
let insideShapesifter = false;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('id: "hector_helio_shapesifters"')) {
        insideShapesifter = true;
    }
    
    if (insideShapesifter && lines[i].includes('rating: 92')) {
        lines[i] = lines[i].replace('rating: 92', 'rating: 93');
        insideShapesifter = false; // Done
    }
}

file = lines.join('\n');

const newCard = `
    {
        id: "hector_helio_trophy",
        name: "HECTOR HELIO",
        version: "Trophy",
        rarity: "Especial",
        rating: 92,
        position: "GK",
        secondaryPositions: ["ST"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Costademarfil/HectorMano.png",
        background: "assets/Cartas/Trophy.png"
    },`;

if (!file.includes('id: "hector_helio_trophy"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCard);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added HectorMano and updated Shapesifters rating.');
} else {
    console.log('HectorMano already exists.');
}
