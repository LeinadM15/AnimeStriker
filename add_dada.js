const fs = require('fs');

let content = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const dadaCards = `
    },
    {
        id: "dada_oro",
        name: "DADA SILVA",
        version: "Oro",
        rarity: "Oro",
        rating: 88,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/br.png",
        teamIcon: "teams/Chelsea.png",
        image: "assets/characters/Brasil/DadaOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "dada_2",
        name: "DADA SILVA",
        version: "Brasil",
        rarity: "Especial",
        rating: 91,
        position: "ST",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/br.png",
        teamIcon: "teams/Chelsea.png",
        image: "assets/characters/Brasil/Dada2.png",
        background: "assets/Cartas/Brasil.png"
    },
    {
        id: "dada_shape",
        name: "DADA SILVA",
        version: "Shapesifters",
        rarity: "Especial",
        rating: 93,
        position: "CB",
        secondaryPositions: [],
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/br.png",
        teamIcon: "teams/Chelsea.png",
        image: "assets/characters/Brasil/DadaShape.png",
        background: "assets/Cartas/Shapesifters.png"
    }
];
`;

content = content.replace(/\s*\}\s*\];\s*$/, dadaCards);
fs.writeFileSync('database/tsubasa_cards.js', content);

console.log('Added Dada Silva');
