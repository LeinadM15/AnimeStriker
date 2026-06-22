const fs = require('fs');
let code = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const payload = `    {
        id: "kiyora_oro",
        name: "KIYORA",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "LB",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Kiyora/KiyoraOro.png",
        background: "assets/Cartas/Oro.png"
    }
];

// ==========================================
// HIIRAGI
// ==========================================
const hiiragiCards = [
    {
        id: "hiiragi_valencia",
        name: "HIIRAGI",
        version: "Valencia",
        rarity: "Especial",
        rating: 85,
        position: "CM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Hiiragi/Hiiragi.png",
        background: "assets/Cartas/Gris.png"
    },
    {
        id: "hiiragi_bluelock",
        name: "HIIRAGI",
        version: "Blue Lock",
        rarity: "Especial",
        rating: 83,
        position: "CM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/BluLock.png",
        image: "assets/characters/Hiiragi/HiiragiBlue.png",
        background: "assets/Cartas/Gris.png"
    },
    {
        id: "hiiragi_oro",
        name: "HIIRAGI",
        version: "Oro",
        rarity: "Oro",
        rating: 80,
        position: "CM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Hiiragi/HiiragiOro.png",
        background: "assets/Cartas/Oro.png"
    }
];

// ==========================================
// HIMIZU
// ==========================================`;

// Use regex to match from `id: "kiyora_oro"` to the start of `HIMIZU`.
code = code.replace(/\{\s*id:\s*"kiyora_oro"[\s\S]*?\/\/\s*HIMIZU\s*\n\/\/\s*==========================================/g, payload);

fs.writeFileSync('database/bluelock_cards.js', code);

// Cache Buster v62
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=62');
    fs.writeFileSync(file, content);
});
