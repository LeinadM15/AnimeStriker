const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newKojiroOro = `,
    {
        id: "koj_oro",
        name: "HYUGA",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Ubers.png", 
        image: "assets/characters/Kojiro/KojiroOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

s = s.replace(/assets\/backgrounds\/Fondo_KojiroMundial\.jpg"[\r\n\s]+\}\r?\n\];/, 'assets/backgrounds/Fondo_KojiroMundial.jpg"\n    }' + newKojiroOro);

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Added Kojiro Oro successfully');
