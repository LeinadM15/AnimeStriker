const fs = require('fs');

// 1. Update Thoram in tsubasa_cards.js
let tsubasaJs = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newThoramCards = `const thoramCards = [
    {
        id: "thoram_parma",
        name: "THORAM",
        version: "Parma",
        rarity: "Especial",
        rating: 86,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Parma.png",
        image: "assets/characters/Francia/Thoram.png",
        background: "assets/Cartas/Hielo.png"
    },
    {
        id: "thoram_oro",
        name: "THORAM",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Parma.png",
        image: "assets/characters/Francia/ThoramOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

tsubasaJs = tsubasaJs.replace(/const thoramCards = \[[\s\S]*?\];/, newThoramCards);
fs.writeFileSync('database/tsubasa_cards.js', tsubasaJs);


// 2. Update Noel Noa images in bluelock_cards.js
let bluelockJs = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// The Balon de Oro (currently NoaPrime.png) should be NoaChute.png
// The Rulebreaker (currently NoaChute.png) should be NoaPrime.png
// To avoid accidental double-swap, I'll temporarily name them SWAP1 and SWAP2
bluelockJs = bluelockJs.replace('image: "assets/characters/Noa/NoaPrime.png",\n        background: "assets/Cartas/Tots.png"', 'image: "assets/characters/Noa/SWAP1.png",\n        background: "assets/Cartas/Tots.png"');
bluelockJs = bluelockJs.replace('image: "assets/characters/Noa/NoaChute.png",\n        background: "assets/Cartas/Rulebreakers.png"', 'image: "assets/characters/Noa/SWAP2.png",\n        background: "assets/Cartas/Rulebreakers.png"');

bluelockJs = bluelockJs.replace('SWAP1.png', 'NoaChute.png');
bluelockJs = bluelockJs.replace('SWAP2.png', 'NoaPrime.png');

fs.writeFileSync('database/bluelock_cards.js', bluelockJs);

// Bump cache to v=71
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=71');
    fs.writeFileSync(file, content);
});
