const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `,
    {
        id: "alvez_shapesifters",
        name: "ALVEZ",
        version: "Shapesifter",
        rarity: "Especial",
        rating: 84,
        position: "CM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/mx.png",
        teamIcon: "teams/Dortmund.png",
        image: "assets/characters/Mexico/Alvez.png",
        background: "assets/Cartas/Shapesifters.png"
    },
    {
        id: "garcia_shapesifters",
        name: "GARCIA",
        version: "Shapesifter",
        rarity: "Especial",
        rating: 85,
        position: "CM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/mx.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/Mexico/Garcia.png",
        background: "assets/Cartas/Shapesifters.png"
    }
];`;

s = s.replace(/background: "assets\/backgrounds\/Fondo_Espadas\.png"\n    }\n\];/, 'background: "assets/backgrounds/Fondo_Espadas.png"\n    }' + newCards);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Shapesifters added successfully!');
