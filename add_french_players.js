const fs = require('fs');

let bluelockJs = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const newCards = `const franciaBLCards = [
    {
        id: "ludovic_oro",
        name: "LUDOVIC",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CM",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/PXG.png",
        image: "assets/characters/Francia/LudovicOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "rechard_oro",
        name: "RECHARD",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Francia/RechardOro.png",
        background: "assets/Cartas/Oro.png"
    },`;

bluelockJs = bluelockJs.replace('const franciaBLCards = [', newCards);
fs.writeFileSync('database/bluelock_cards.js', bluelockJs);

// Bump cache to v=77
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let htmlContent = fs.readFileSync(file, 'utf8');
    htmlContent = htmlContent.replace(/\?v=\d+/g, '?v=77');
    fs.writeFileSync(file, htmlContent);
});
