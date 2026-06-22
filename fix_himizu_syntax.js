const fs = require('fs');

let content = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// I need to find the start of the HIMIZU block and the end of it
const startString = `// ==========================================
// HIMIZU
        name: "HIMIZU",
        version: "Blue Lock",
        rarity: "Especial",`;

const fullHimizuBlock = `// ==========================================
// HIMIZU
// ==========================================
const himizuCards = [
    {
        id: "himizu_omiya",
        name: "HIMIZU",
        version: "Milan",
        rarity: "Especial",
        rating: 84,
        position: "CM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Himizu/HimizuOmiya.png",
        background: "assets/Cartas/Gris.png"
    },
    {
        id: "himizu_bluelock",
        name: "HIMIZU",
        version: "Blue Lock",
        rarity: "Especial",
        rating: 82,
        position: "CM",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/BluLock.png",
        image: "assets/characters/Himizu/HimizuBlue.png",
        background: "assets/Cartas/Gris.png"
    },
    {
        id: "himizu_oro",
        name: "HIMIZU",
        version: "Oro",
        rarity: "Oro",
        rating: 79,
        position: "CM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/Himizu/HimizuOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

// Let's use a regex to replace everything from `// HIMIZU` down to the end of the `himizuCards` array
// To do this safely, I will match `// ==========================================\n// HIMIZU[\s\S]*?\];` 
// Wait, the end is not `];` because it's broken. The end of the broken part is `background: "assets/Cartas/Oro.png"\n    }\n  ];` ? No, wait. 
// Look at the view_file output:
/*
402: // ==========================================
403: // HIMIZU
404:         name: "HIMIZU",
405:         version: "Blue Lock",
...
413:         background: "assets/Cartas/Gris.png"
414:     }
415: ,
416:     {
417:         id: "himizu_oro",
...
428:         background: "assets/Cartas/Oro.png"
429:     }
430:   ];
*/

// Let's just use regex to grab lines 402 to 430
const regex = /\/\/ ==========================================\r?\n\/\/ HIMIZU[\s\S]*?HimizuOro\.png",\r?\n\s*background: "assets\/Cartas\/Oro\.png"\r?\n\s*}\r?\n\s*\];/;
content = content.replace(regex, fullHimizuBlock);

fs.writeFileSync('database/bluelock_cards.js', content);
