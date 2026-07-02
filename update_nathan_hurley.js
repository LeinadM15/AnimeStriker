const fs = require('fs');

let content = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Replace Nathan's positions safely (not crossing object boundaries)
content = content.replace(/(name:\s*"NATHAN[^"]*"[^}]*?)position:\s*"LB"/g, '$1position: "RB"');
content = content.replace(/(name:\s*"NATHAN[^"]*"[^}]*?)secondaryPositions:\s*\["RB"\]/g, '$1secondaryPositions: ["LB"]');

// Replace Nathan Tswane just in case (name: "NATHAN TSWANE")
// Actually, the above matches any NATHAN[^"]* which includes NATHAN SWIFT, NATHAN, NATHAN TSWANE.

let inazumaContent = fs.readFileSync('database/inazuma_cards.js', 'utf8');
inazumaContent = inazumaContent.replace(/(name:\s*"NATHAN[^"]*"[^}]*?)position:\s*"LB"/g, '$1position: "RB"');
inazumaContent = inazumaContent.replace(/(name:\s*"NATHAN[^"]*"[^}]*?)secondaryPositions:\s*\["RB"\]/g, '$1secondaryPositions: ["LB"]');
fs.writeFileSync('database/inazuma_cards.js', inazumaContent);

const hurleyCards = `
    },
    {
        id: "hurley_oro",
        name: "HURLEY",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "LB",
        secondaryPositions: [],
        league: "Academia Alius",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/MaryTimes.png",
        image: "assets/characters/Hurley/HurleyOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "hurley_if",
        name: "HURLEY",
        version: "If",
        rarity: "Especial",
        rating: 87,
        position: "LB",
        secondaryPositions: [],
        league: "Academia Alius",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/MaryTimes.png",
        image: "assets/characters/Hurley/Hurley.png",
        background: "assets/Cartas/If.png"
    },
    {
        id: "hurley_sam",
        name: "HURLEY",
        version: "Samurai",
        rarity: "Especial",
        rating: 89,
        position: "LB",
        secondaryPositions: [],
        league: "Academia Alius",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/MaryTimes.png",
        image: "assets/characters/Hurley/HurleySam.png",
        background: "assets/Cartas/Azul.png"
    },
    {
        id: "hurley_tots",
        name: "HURLEY",
        version: "Tots",
        rarity: "Especial",
        rating: 91,
        position: "LB",
        secondaryPositions: [],
        league: "Academia Alius",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/MaryTimes.png",
        image: "assets/characters/Hurley/HurleyJP.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "hurley_leg_oro",
        name: "HURLEY",
        version: "Leyenda Oro",
        rarity: "Oro",
        rating: 89,
        position: "LB",
        secondaryPositions: [],
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Hurley/HurleyLegOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "hurley_leg",
        name: "HURLEY",
        version: "Icono",
        rarity: "Icono",
        rating: 93,
        position: "LB",
        secondaryPositions: [],
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Hurley/HurleyLeg.png",
        background: "assets/Cartas/Icono.png"
    }
];
`;

content = content.replace(/\s*\}\s*\];\s*$/, hurleyCards);
fs.writeFileSync('database/tsubasa_cards.js', content);

console.log('Done!');
