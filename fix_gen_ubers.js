const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const replacement = `        rating: 89,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Gentile/GentileUbers.png"
    },
    {
        id: "genzo_oro",
        name: "GENZO",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "GK",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Genzo/GenzoOro.png",
        background: "assets/Cartas/Oro.png"
    }
];

// ==========================================
// GINO (HERNANDEZ)
// ==========================================`;

// It deleted from `rating: 89,` down to `const ginoCards = [`
// The surrounding text right now is:
//         version: "Ubers",
//         rarity: "Especial",
// const ginoCards = [

code = code.replace(
    /version: "Ubers",\s*rarity: "Especial",\s*const ginoCards = \[/,
    `version: "Ubers",
        rarity: "Especial",
${replacement}
const ginoCards = [`
);

fs.writeFileSync('database/tsubasa_cards.js', code);

// Cache Buster v53
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=53');
    fs.writeFileSync(file, content);
});
