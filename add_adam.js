const fs = require('fs');

let content = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const adamCards = `
    },
    {
        id: "adam_blake_oro",
        name: "ADAM BLAKE",
        version: "Oro",
        rarity: "Oro",
        rating: 89,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Tottenham.png",
        image: "assets/characters/Inglaterra/AdamBlakeOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "adam_blake_centurion",
        name: "ADAM BLAKE",
        version: "Centurion",
        rarity: "Especial",
        rating: 92,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Tottenham.png",
        image: "assets/characters/Inglaterra/AdamBlake.png",
        background: "assets/Cartas/Centurion.png"
    },
    {
        id: "adam_blake_prime",
        name: "ADAM BLAKE",
        version: "Trophy",
        rarity: "Especial",
        rating: 94,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Tottenham.png",
        image: "assets/characters/Inglaterra/AdamBlakePrime.png",
        background: "assets/Cartas/Trophy.png"
    }
];
`;

content = content.replace(/\s*\}\s*\];\s*$/, adamCards);
fs.writeFileSync('database/tsubasa_cards.js', content);

console.log('Added Adam Blake cards');
