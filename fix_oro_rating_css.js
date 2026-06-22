const fs = require('fs');

// 1. Update ratings and add camus_oro in bluelock_cards.js
let blue = fs.readFileSync('database/bluelock_cards.js', 'utf8');

blue = blue.replace('id: "bats_oro",\n        name: "BATS",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 81,', 'id: "bats_oro",\n        name: "BATS",\n        version: "Oro",\n        rarity: "Oro",\n        rating: 78,');

const camusOroStr = `    {
        id: "camus_oro",
        name: "CAMUS",
        version: "Oro",
        rarity: "Oro",
        rating: 79,
        position: "RW",
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/fr.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Francia/CamusOro.png",
        background: "assets/Cartas/Oro.png"
    },\n`;

if (!blue.includes('camus_oro')) {
    blue = blue.replace('    {\n        id: "bats_dortmund",', camusOroStr + '    {\n        id: "bats_dortmund",');
}
fs.writeFileSync('database/bluelock_cards.js', blue);


// 2. Update CSS in styles.css
let styles = fs.readFileSync('styles.css', 'utf8');
let oroIndexStyles = styles.indexOf('/* ======== ORO CARD STYLING ======== */');
if (oroIndexStyles !== -1) {
    styles = styles.substring(0, oroIndexStyles);
}

const oroStyles = `/* ======== ORO CARD STYLING ======== */
.oro-card .fc-char {
    left: auto !important;
    right: 5% !important;
    transform: none !important;
    height: 50% !important;
    top: auto !important;
    bottom: 28% !important;
    object-position: right bottom !important;
}
`;

fs.writeFileSync('styles.css', styles + oroStyles);
