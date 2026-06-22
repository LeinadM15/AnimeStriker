const fs = require('fs');
let content = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const newNoaCards = `const noaCards = [
    {
        id: "noa_oro",
        name: "NOA",
        version: "Oro",
        rarity: "Oro",
        rating: 90,
        position: "ST",
        secondaryPositions: ["CF", "RW"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Noa/NoaOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "noa_bastard",
        name: "NOA",
        version: "Bastard Munchen",
        rarity: "Especial",
        rating: 93,
        position: "ST",
        secondaryPositions: ["CF", "RW"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Noa/Noa.png",
        background: "assets/Cartas/Bastard.png"
    },
    {
        id: "noa_balon",
        name: "NOA",
        version: "Balón de Oro",
        rarity: "Especial",
        rating: 95,
        position: "ST",
        secondaryPositions: ["CF", "RW"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Noa/NoaPrime.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "noa_rulebreaker",
        name: "NOA",
        version: "Rulebreaker",
        rarity: "Especial",
        rating: 97,
        position: "ST",
        secondaryPositions: ["CF", "RW"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Noa/NoaChute.png",
        background: "assets/Cartas/Rulebreakers.png"
    }
];`;

content = content.replace(/const noaCards = \[[\s\S]*?\];/, newNoaCards);
fs.writeFileSync('database/bluelock_cards.js', content);

// Bump cache to v=70
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let htmlContent = fs.readFileSync(file, 'utf8');
    htmlContent = htmlContent.replace(/\?v=\d+/g, '?v=70');
    fs.writeFileSync(file, htmlContent);
});
