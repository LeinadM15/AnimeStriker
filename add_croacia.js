const fs = require('fs');

let tsubasa_cards = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const croaciaCardsStr = `

// ==========================================
// CROACIA
// ==========================================
const croaciaCards = [
    {
        id: "madric_oro",
        name: "MADRIC",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/hr.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/Croacia/Madric.png",
        background: "assets/Cartas/Oro.png"
    }
];
`;

if (!tsubasa_cards.includes('const croaciaCards')) {
    fs.appendFileSync('database/tsubasa_cards.js', croaciaCardsStr);
    console.log('Added croaciaCards to database/tsubasa_cards.js');
}

let cards_js = fs.readFileSync('cards.js', 'utf8');
if (!cards_js.includes('...croaciaCards')) {
    cards_js = cards_js.replace('...chinaCards,', '...chinaCards,\n    ...croaciaCards,');
    fs.writeFileSync('cards.js', cards_js);
    console.log('Added croaciaCards to cards.js');
}
