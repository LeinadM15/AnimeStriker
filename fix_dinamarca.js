const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const payload = `// ==========================================
// KRAUS (TEIGERBRAN)
// ==========================================
const krausCards = [
    {
        id: "kraus_dortmund",
        name: "KRAUS",
        version: "Dortmund",
        rarity: "Especial",
        rating: 90,
        position: "CAM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/dk.png",
        teamIcon: "teams/Dortmund.png",
        image: "assets/characters/Dinamarca/Kraus.png",
        background: "assets/Cartas/Dormund.png"
    },
    {
        id: "kraus_oro",
        name: "KRAUS",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "CAM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/dk.png",
        teamIcon: "teams/Dortmund.png",
        image: "assets/characters/Dinamarca/KrausOro.png",
        background: "assets/Cartas/Oro.png"
    }
];

// ==========================================
// DINAMARCA (HAAS Y CHRISTIANSEN)
// ==========================================
const dinamarcaCards = [
    {
        id: "haas_arsenal",
        name: "HAAS",
        version: "Arsenal",
        rarity: "Especial",
        rating: 89,
        position: "ST",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/dk.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Dinamarca/Haas.png",
        background: "assets/Cartas/Arsenal.png"
    },
    {
        id: "haas_oro",
        name: "HAAS",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "ST",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/dk.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Dinamarca/HaasOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "christiansen_arsenal",
        name: "CHRISTIANSEN",
        version: "Arsenal",
        rarity: "Especial",
        rating: 89,
        position: "ST",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/dk.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Dinamarca/Christiansen.png",
        background: "assets/Cartas/Arsenal.png"
    },
    {
        id: "christiansen_oro",
        name: "CHRISTIANSEN",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "ST",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/dk.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Dinamarca/ChristiansenOro.png",
        background: "assets/Cartas/Oro.png"
    }
];

`;

// 1. Fix the double bracket syntax error
code = code.replace(/    \}\r?\n    \}\r?\n\];/, '    }\n];');

// 2. Insert the missing dinamarca block before PIERRE
code = code.replace(/\/\/\s*==========================================\r?\n\/\/\s*PIERRE \(ELLE SID\)/, payload + '// ==========================================\n// PIERRE (ELLE SID)');

fs.writeFileSync('database/tsubasa_cards.js', code);

// Update cards.js to ensure krausCards and dinamarcaCards are included if they were removed (they shouldn't be but good to check).

// Cache Buster v56
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=56');
    fs.writeFileSync(file, content);
});
