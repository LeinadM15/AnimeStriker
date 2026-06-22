const fs = require('fs');

let content = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const newChevalierCards = `const chevalierCards = [
    {
        id: "chevalier_oro",
        name: "CHEVALIER",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CAM",
        secondaryPositions: ["CM", "CF"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Chevalier/ChevalierOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "chevalier_pxg",
        name: "CHEVALIER",
        version: "PXG",
        rarity: "Especial",
        rating: 87,
        position: "CAM",
        secondaryPositions: ["CM", "CF"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Chevalier/ChevalierPXG.png",
        background: "assets/Cartas/PXG.png"
    },
    {
        id: "chevalier_boss",
        name: "CHEVALIER",
        version: "Boss",
        rarity: "Especial",
        rating: 88,
        position: "CAM",
        secondaryPositions: ["CM", "CF"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Chevalier/ChevalierBoss.png",
        background: "assets/backgrounds/Fondo_Chevalier.jpeg"
    },
    {
        id: "chevalier_grem",
        name: "CHEVALIER",
        version: "Shapeshifters",
        rarity: "Especial",
        rating: 89,
        position: "CAM",
        secondaryPositions: ["CM", "CF"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Chevalier/ChevalierGrem.png",
        background: "assets/Cartas/Shapesifters.png"
    }
];`;

content = content.replace(/const chevalierCards = \[[\s\S]*?\];/, newChevalierCards);

fs.writeFileSync('database/bluelock_cards.js', content);

// Cache Buster v64
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let htmlContent = fs.readFileSync(file, 'utf8');
    htmlContent = htmlContent.replace(/\?v=\d+/g, '?v=64');
    fs.writeFileSync(file, htmlContent);
});
