const fs = require('fs');
let content = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// Fix Rulebreaker background
content = content.replace(/background: "assets\/Cartas\/Rulebreakers\.png"/g, 'background: "assets/Cartas/Rulebraker.png"');

// Fix Balon de Oro background
// The Noa Balon de Oro card currently has `Tots.png` background.
// Let's replace it exactly for the 95 rated card
content = content.replace(
    /rating: 95,\n        position: "ST",\n        secondaryPositions: \["CF", "RW"\],\n        league: "Bundesliga",\n        nationFlag: "https:\/\/flagcdn\.com\/w40\/fr\.png",\n        teamIcon: "teams\/Bastard\.png",\n        image: "assets\/characters\/Noa\/NoaChute\.png",\n        background: "assets\/Cartas\/Tots\.png"/,
    `rating: 95,
        position: "ST",
        secondaryPositions: ["CF", "RW"],
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Noa/NoaChute.png",
        background: "assets/Cartas/BalonOro.png"`
);

fs.writeFileSync('database/bluelock_cards.js', content);

// Bump cache to v=72
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let htmlContent = fs.readFileSync(file, 'utf8');
    htmlContent = htmlContent.replace(/\?v=\d+/g, '?v=72');
    fs.writeFileSync(file, htmlContent);
});
