const fs = require('fs');

let tsubasa_cards = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const eeuuCardsStr = `

// ==========================================
// EEUU
// ==========================================
const eeuuCards = [
    {
        id: "bacchus_oro",
        name: "BACCHUS",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/us.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/USA/BacchusOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "bacchus_custom",
        name: "BACCHUS",
        version: "Ubers",
        rarity: "Especial",
        rating: 88,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/us.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/USA/Bacchus.png",
        background: "assets/backgrounds/Fondo_Bacchus.png"
    },
    {
        id: "azwan_oro",
        name: "AZWAN",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/us.png",
        teamIcon: "teams/Dortmund.png",
        image: "assets/characters/USA/AzwanOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "azwan_eeuu",
        name: "AZWAN",
        version: "EEUU",
        rarity: "Especial",
        rating: 87,
        position: "CM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/us.png",
        teamIcon: "teams/Dortmund.png",
        image: "assets/characters/USA/Azwan.png",
        background: "assets/Cartas/EEUU.png"
    },
    {
        id: "blake_oro",
        name: "BLAKE",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/us.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/USA/BlakeOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "blake_eeuu",
        name: "BLAKE",
        version: "EEUU",
        rarity: "Especial",
        rating: 88,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/us.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/USA/Blake.png",
        background: "assets/Cartas/EEUU.png"
    },
    {
        id: "ortiz_oro",
        name: "ORTIZ",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "CM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/us.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/USA/OrtizOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "ortiz_eeuu",
        name: "ORTIZ",
        version: "EEUU",
        rarity: "Especial",
        rating: 89,
        position: "CM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/us.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/USA/Ortiz.png",
        background: "assets/Cartas/EEUU.png"
    }
];
`;

if (!tsubasa_cards.includes('const eeuuCards')) {
    fs.appendFileSync('database/tsubasa_cards.js', eeuuCardsStr);
    console.log('Added eeuuCards to database/tsubasa_cards.js');
}

let cards_js = fs.readFileSync('cards.js', 'utf8');
if (!cards_js.includes('...eeuuCards')) {
    cards_js = cards_js.replace('...croaciaCards,', '...croaciaCards,\n    ...eeuuCards,');
    fs.writeFileSync('cards.js', cards_js);
    console.log('Added eeuuCards to cards.js');
}
