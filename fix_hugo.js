const fs = require('fs');

let bluelockJs = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const newHugoCards = `const hugoCards = [
    {
        id: "hugo_oro",
        name: "HUGO",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "CM",
        secondaryPositions: ["CDM", "CAM"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Hugo/HugoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "hugo_base",
        name: "HUGO",
        version: "Base",
        rarity: "Especial",
        rating: 89,
        position: "CM",
        secondaryPositions: ["CDM", "CAM"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Hugo/Hugo.png",
        background: "assets/Cartas/Rosa.png"
    },
    {
        id: "hugo_maquina",
        name: "HUGO",
        version: "Maquina",
        rarity: "Especial",
        rating: 90,
        position: "CM",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Hugo/HugoMaquina.png",
        background: "assets/Cartas/Arsenal.png"
    },
    {
        id: "hugo_rosa",
        name: "HUGO",
        version: "Trailblazer",
        rarity: "Especial",
        rating: 92,
        position: "CM",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Hugo/HugoRosa.png",
        background: "assets/Cartas/Trailblaze.png"
    }
];`;

bluelockJs = bluelockJs.replace(/const hugoCards = \[[\s\S]*?\];/, newHugoCards);
fs.writeFileSync('database/bluelock_cards.js', bluelockJs);

// Cache Buster v67
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=67');
    fs.writeFileSync(file, content);
});
