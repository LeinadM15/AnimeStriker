const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Update gen_normal
code = code.replace(
    /\{\s*id:\s*"gen_normal"[\s\S]*?rating:\s*\d+([\s\S]*?)background:\s*"[^"]*"[\s\S]*?\}/,
    (match, middle) => {
        return `    {
        id: "gen_normal",
        name: "GENZO",
        version: "Especial",
        rarity: "Especial",
        rating: 92,${middle}background: "assets/Cartas/Radioactiva.png"
    }`;
    }
);

// Update gen_bastard
code = code.replace(
    /\{\s*id:\s*"gen_bastard"[\s\S]*?rating:\s*\d+([\s\S]*?\})/,
    (match, rest) => {
        return `    {
        id: "gen_bastard",
        name: "GENZO",
        version: "Bastard Munchen",
        rarity: "Especial",
        rating: 90${rest}`;
    }
);

// Update gen_hamburgo
code = code.replace(
    /\{\s*id:\s*"gen_hamburgo"[\s\S]*?rating:\s*\d+([\s\S]*?)background:\s*"[^"]*"[\s\S]*?\}/,
    (match, middle) => {
        return `    {
        id: "gen_hamburgo",
        name: "GENZO",
        version: "Hamburgo",
        rarity: "Normal",
        rating: 89,${middle}background: "assets/Cartas/Flashback.png"
    }`;
    }
);

// Insert genzo_oro at the end of genzoCards before the closing bracket `];`
// We'll just look for `id: "gen_ubers"[\s\S]*?\n    \}\n\];`
const newOro = `    },
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
];`;

if (!code.includes('id: "genzo_oro"')) {
    code = code.replace(/\n    \}\n\];(?=\s*\n\s*\/\/\s*==========================================\s*\n\s*\/\/\s*MISUGI)/, newOro);
}

fs.writeFileSync('database/tsubasa_cards.js', code);

// Cache Buster v52
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=52');
    fs.writeFileSync(file, content);
});
