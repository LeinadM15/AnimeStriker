const fs = require('fs');

let content = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const chrisCards = `
    },
    {
        id: "chris_prince_oro",
        name: "CHRIS PRINCE",
        version: "Oro",
        rarity: "Oro",
        rating: 89,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Manshine.png",
        image: "assets/characters/ChrisPrince/ChrisPrinceOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "chris_prince_chut",
        name: "CHRIS PRINCE",
        version: "Manshine",
        rarity: "Especial",
        rating: 91,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Manshine.png",
        image: "assets/characters/ChrisPrince/ChrisPrinceChut.png",
        background: "assets/Cartas/Manshine.png"
    },
    {
        id: "chris_prince_con",
        name: "CHRIS PRINCE",
        version: "FutBirthday",
        rarity: "Especial",
        rating: 93,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Manshine.png",
        image: "assets/characters/ChrisPrince/ChrisPrinceCon.png",
        background: "assets/Cartas/FutBirthday.png"
    },
    {
        id: "chris_prince_epic",
        name: "CHRIS PRINCE",
        version: "Tots",
        rarity: "Especial",
        rating: 95,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Manshine.png",
        image: "assets/characters/ChrisPrince/ChrisPrinceEpic.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "chris_prince_prime",
        name: "CHRIS PRINCE",
        version: "Centurion",
        rarity: "Especial",
        rating: 96,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Manshine.png",
        image: "assets/characters/ChrisPrince/ChrisPrincePrime.png",
        background: "assets/Cartas/Centurion.png"
    }
];
`;

content = content.replace(/\s*\}\s*\];\s*$/, chrisCards);
fs.writeFileSync('database/bluelock_cards.js', content);

console.log('Added Chris Prince');
