const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// The replacement payload
const payload = `    {
        id: "tsu_nankatsu",
        name: "TSUBASA",
        version: "Nankatsu",
        rarity: "Especial",
        rating: 89,
        position: "CAM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Nankatsu.png",
        image: "assets/characters/Tsubasa/TsubasaNankatsu.png",
        background: "assets/Cartas/Flashback.png"
    },
    {
        id: "tsubasa_oro",
        name: "TSUBASA",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "CAM",
        league: "Brasileirão",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SaoPaulo.png",
        image: "assets/characters/Tsubasa/TsubasaOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "tsu_risingsun",
        name: "TSUBASA",
        version: "Rising Sun",
        rarity: "Especial",
        rating: 92,
        position: "CAM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Tsubasa/TsubasaRisingSun.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "tsu_barcha",
        name: "TSUBASA",
        version: "Barcha",
        rarity: "Especial",
        rating: 93,
        position: "CAM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Barcha.png", 
        image: "assets/characters/Tsubasa/TsubasaBarcha.png",
        background: "assets/Cartas/Barcha.png"
    },`;

// 1. We know the first card in tsubasaCards is `tsu_rising_new`.
// We will wipe everything from `tsu_nankatsu` (the old one) down to `tsu_mundial26`.
// First find the index of `id: "tsu_nankatsu",` at the TOP of the file (after `tsu_wy`).
let startIndex = code.indexOf('    {\n        id: "tsu_nankatsu",');
let endIndex = code.indexOf('    {\n        id: "tsu_mundial26",');

if (startIndex !== -1 && endIndex !== -1 && startIndex < 1000) {
    code = code.substring(0, startIndex) + payload + '\n' + code.substring(endIndex);
}

// 2. Now we must DELETE the duplicate block that was injected at the bottom of the file around line 1400.
// Let's find the second occurrence of `id: "tsu_nankatsu",` which shouldn't exist anymore anyway, but we just injected the payload above, so we'll look for `image: "assets/characters/Suecia/Brolin.png",\n        background: "assets/Cartas/Suecia.png"\n    },`
// and then the rogue block, and then `levin_oro`.

let brolinEnd = code.indexOf('assets/characters/Suecia/Brolin.png');
if (brolinEnd !== -1) {
    let badStart = code.indexOf('    {\n        id: "tsu_nankatsu",', brolinEnd);
    let badEnd = code.indexOf('    {\n        id: "levin_oro",', brolinEnd);
    
    if (badStart !== -1 && badEnd !== -1) {
        code = code.substring(0, badStart) + code.substring(badEnd);
    }
}

fs.writeFileSync('database/tsubasa_cards.js', code);

// Cache Buster v50
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=50');
    fs.writeFileSync(file, content);
});
