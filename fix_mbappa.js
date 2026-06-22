const fs = require('fs');

let content = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const newMbappaCards = `const mbappaCards = [
    {
        id: "mbappa_oro",
        name: "MBAPPA",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "LW",
        secondaryPositions: ["RW", "ST"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/MbappaOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "mbappa_pxg",
        name: "MBAPPA",
        version: "PXG",
        rarity: "Especial",
        rating: 89,
        position: "LW",
        secondaryPositions: ["RW", "ST"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/Mbappa.png"
    }
];`;

content = content.replace(/const mbappaCards = \[[\s\S]*?\];/, newMbappaCards);
fs.writeFileSync('database/bluelock_cards.js', content);

// Bump cache to v=75
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let htmlContent = fs.readFileSync(file, 'utf8');
    htmlContent = htmlContent.replace(/\?v=\d+/g, '?v=75');
    fs.writeFileSync(file, htmlContent);
});
