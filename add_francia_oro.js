const fs = require('fs');

const chapaOro = `    {
        id: "chapa_oro",
        name: "CHAPA",
        version: "Oro",
        rarity: "Oro",
        rating: 79,
        position: "LB",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/ChapaOro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

const leydenOro = `    {
        id: "leyden_oro",
        name: "LEYDEN",
        version: "Oro",
        rarity: "Oro",
        rating: 79,
        position: "LW",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Francia/LeydenOro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

const renoirOro = `    {
        id: "renoir_oro",
        name: "RENOIR",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "GK",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/RenoirOro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

const hermesOro = `    {
        id: "hermes_oro",
        name: "HERMÈS",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "CB",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Arsenal.png",
        image: "assets/characters/Francia/Hermesoro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

const delonOro = `    {
        id: "delon_oro",
        name: "DELON",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "RB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Francia/Delonoro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

const gabonOro = `    {
        id: "gabon_oro",
        name: "GABON",
        version: "Oro",
        rarity: "Oro",
        rating: 78,
        position: "CB",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/GabonOro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

let blue = fs.readFileSync('database/bluelock_cards.js', 'utf8');

if (!blue.includes('chapa_oro')) {
    blue = blue.replace('    {\n        id: "chapa_pxg",', chapaOro + '    {\n        id: "chapa_pxg",');
}
if (!blue.includes('leyden_oro')) {
    blue = blue.replace('    {\n        id: "leyden_marsella",', leydenOro + '    {\n        id: "leyden_marsella",');
}
if (!blue.includes('renoir_oro')) {
    blue = blue.replace('    {\n        id: "renoir_pxg",', renoirOro + '    {\n        id: "renoir_pxg",');
}

if (!blue.includes('hermes_oro')) {
    blue = blue.replace('    {\n        id: "hermes_arsenal",', hermesOro + '    {\n        id: "hermes_arsenal",');
}
if (!blue.includes('delon_oro')) {
    blue = blue.replace('    {\n        id: "delon_milan",', delonOro + '    {\n        id: "delon_milan",');
}
if (!blue.includes('gabon_oro')) {
    blue = blue.replace('    {\n        id: "gabon_pxg",', gabonOro + '    {\n        id: "gabon_pxg",');
}

// Ensure the accented Hermès character name matches exactly what is in the file if needed.
// Hermes original has "HERM%S". Let's replace the original name safely if needed, or leave it.

fs.writeFileSync('database/bluelock_cards.js', blue);

const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=36');
    fs.writeFileSync(file, content);
});
