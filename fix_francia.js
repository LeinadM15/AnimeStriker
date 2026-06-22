const fs = require('fs');

// 1. Process tsubasa_cards.js
let tsubasaCode = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Replace Makelolo
const makeloloReplacement = `const makeloloCards = [
    {
        id: "makelolo_oro",
        name: "MAKELOLO",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CDM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/Francia/MakeloloOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;
tsubasaCode = tsubasaCode.replace(/const makeloloCards = \[[\s\S]*?\];/, makeloloReplacement);

// Replace Pierre
const pierreReplacement = `const pierreCards = [
    {
        id: "pierre_basico",
        name: "PIERRE",
        version: "Especial",
        rarity: "Especial",
        rating: 93,
        position: "CAM",
        league: "Ligue 1", nationFlag: "https://flagcdn.com/w40/fr.png", teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/Pierre.png",
        background: "assets/backgrounds/Fondo_Pierre.png"
    },
    {
        id: "pierre_pxg",
        name: "PIERRE",
        version: "PXG",
        rarity: "Especial",
        rating: 91,
        position: "CAM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/PierrePXG.png",
        background: "assets/Cartas/PXG.png"
    },
    {
        id: "pierre_oro",
        name: "PIERRE",
        version: "Oro",
        rarity: "Oro",
        rating: 88,
        position: "CAM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/PierreOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;
tsubasaCode = tsubasaCode.replace(/const pierreCards = \[[\s\S]*?\];/, pierreReplacement);

// Replace Napoleon
const napoleonReplacement = `const napoleonCards = [
    {
        id: "napoleon_basico",
        name: "NAPOLEON",
        version: "Especial",
        rarity: "Especial",
        rating: 91,
        position: "ST",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Francia/Napoleon.png",
        background: "assets/backgrounds/Fondo_Napoleon.png"
    },
    {
        id: "napoleon_fran",
        name: "NAPOLEON",
        version: "Francia",
        rarity: "Especial",
        rating: 88,
        position: "ST",
        league: "Ligue 1", nationFlag: "https://flagcdn.com/w40/fr.png", teamIcon: "teams/Francia.png",
        image: "assets/characters/Francia/NapoleonFran.png",
        background: "assets/backgrounds/Fondo_Napoleon.png"
    },
    {
        id: "napoleon_oro",
        name: "NAPOLEON",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "ST",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Francia/NapoleonOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;
tsubasaCode = tsubasaCode.replace(/const napoleonCards = \[[\s\S]*?\];/, napoleonReplacement);

// Append Amoros and Jean to tsubasa_cards.js
const newTsubasaCards = `

// ==========================================
// AMOROS
// ==========================================
const amorosCards = [
    {
        id: "amoros_oro",
        name: "AMOROS",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "CB",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Francia/AmorosOro.png",
        background: "assets/Cartas/Oro.png"
    }
];

// ==========================================
// JEAN
// ==========================================
const jeanCards = [
    {
        id: "jean_oro",
        name: "JEAN",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Francia/JeanOro.png",
        background: "assets/Cartas/Oro.png"
    }
];
`;
tsubasaCode += newTsubasaCards;
fs.writeFileSync('database/tsubasa_cards.js', tsubasaCode);


// 2. Process bluelock_cards.js
let bluelockCode = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// Zedane
const zedaneReplacement = `const zedaneCards = [
    {
        id: "zedane_real",
        name: "ZEDANE",
        version: "Real Madrid",
        rarity: "Especial",
        rating: 90,
        position: "CAM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/Francia/Zedane.png"
    },
    {
        id: "zedane_oro",
        name: "ZEDANE",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "CAM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Francia/ZedaneOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;
bluelockCode = bluelockCode.replace(/const zedaneCards = \[[\s\S]*?\];/, zedaneReplacement);

// Loki
const lokiReplacement = `const lokiCards = [
    {
        id: "loki_oro",
        name: "LOKI",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "LW",
        secondaryPositions: ["ST", "RW"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Loki/LokiOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "loki_nagi",
        name: "LOKI",
        version: "PXG",
        rarity: "Especial",
        rating: 90,
        position: "LW",
        secondaryPositions: ["ST", "RW"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Loki/LokiNagi.png",
        background: "assets/Cartas/PXG.png"
    },
    {
        id: "loki_corre",
        name: "LOKI",
        version: "Speedster",
        rarity: "Especial",
        rating: 92,
        position: "LW",
        secondaryPositions: ["ST", "RW"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Loki/LokiCorre.png",
        background: "assets/Cartas/Naranja.png"
    },
    {
        id: "loki_pxg",
        name: "LOKI",
        version: "TOTS",
        rarity: "Especial",
        rating: 94,
        position: "LW",
        secondaryPositions: ["ST", "RW"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Loki/LokiPXG.png",
        background: "assets/Cartas/Tots.png"
    }
];`;
bluelockCode = bluelockCode.replace(/const lokiCards = \[[\s\S]*?\];/, lokiReplacement);

// Append Tresaga, Baptiste, Hidalgo
const newBluelockCards = `

// ==========================================
// TRESAGA
// ==========================================
const tresagaCards = [
    {
        id: "tresaga_oro",
        name: "TRESAGA",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Francia/TresagaOro.png",
        background: "assets/Cartas/Oro.png"
    }
];

// ==========================================
// BAPTISTE
// ==========================================
const baptisteCards = [
    {
        id: "baptiste_pxg",
        name: "BAPTISTE",
        version: "PXG",
        rarity: "Especial",
        rating: 88,
        position: "GK",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/Baptiste.png",
        background: "assets/Cartas/PXG.png"
    },
    {
        id: "baptiste_oro",
        name: "BAPTISTE",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "GK",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/BaptisteOro.png",
        background: "assets/Cartas/Oro.png"
    }
];

// ==========================================
// HIDALGO
// ==========================================
const hidalgoCards = [
    {
        id: "hidalgo_pxg",
        name: "HIDALGO",
        version: "PXG",
        rarity: "Especial",
        rating: 88,
        position: "CAM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/Hidalgo.png",
        background: "assets/Cartas/PXG.png"
    },
    {
        id: "hidalgo_oro",
        name: "HIDALGO",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "CAM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/HidalgoOro.png",
        background: "assets/Cartas/Oro.png"
    }
];
`;
bluelockCode += newBluelockCards;
fs.writeFileSync('database/bluelock_cards.js', bluelockCode);


// 3. Process cards.js (export arrays)
let cardsJs = fs.readFileSync('cards.js', 'utf8');

cardsJs = cardsJs.replace(/\.\.\.napoleonCards,/, "...napoleonCards,\n    ...amorosCards,\n    ...jeanCards,");
cardsJs = cardsJs.replace(/\.\.\.lokiCards,/, "...lokiCards,\n    ...tresagaCards,\n    ...baptisteCards,\n    ...hidalgoCards,");

fs.writeFileSync('cards.js', cardsJs);

// 4. Update cache
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=63');
    fs.writeFileSync(file, content);
});
