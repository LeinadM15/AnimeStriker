const fs = require('fs');

const hugoOro = `    {
        id: "hugo_oro",
        name: "HUGO",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CM",
        secondaryPositions: ["CDM", "CAM"],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Hugo/HugoOro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

const lokiOro = `    {
        id: "loki_oro",
        name: "LOKI",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "LW",
        secondaryPositions: ["ST", "RW"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Loki/LokiOro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

const chevalierOro = `    {
        id: "chevalier_oro",
        name: "CHEVALIER",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CAM",
        secondaryPositions: ["CM", "CF"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Chevalier/ChevalierOro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

let blue = fs.readFileSync('database/bluelock_cards.js', 'utf8');

if (!blue.includes('hugo_oro')) {
    blue = blue.replace('    {\n        id: "hugo_maquina",', hugoOro + '    {\n        id: "hugo_maquina",');
}
if (!blue.includes('loki_oro')) {
    blue = blue.replace('    {\n        id: "loki_nagi",', lokiOro + '    {\n        id: "loki_nagi",');
}
if (!blue.includes('chevalier_oro')) {
    blue = blue.replace('    {\n        id: "chevalier_pxg",', chevalierOro + '    {\n        id: "chevalier_pxg",');
}

fs.writeFileSync('database/bluelock_cards.js', blue);

const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=37');
    fs.writeFileSync(file, content);
});
