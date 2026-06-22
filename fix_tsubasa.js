const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const replacement = `    {
        id: "tsu_rising_new",
        name: "TSUBASA",
        version: "Rising",
        rarity: "Especial",
        rating: 91,
        position: "CAM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Tsubasa/TsubasaRising.png",
        background: "assets/Cartas/FutBirthday.png"
    },
    {
        id: "tsu_wy",
        name: "TSUBASA",
        version: "World Youth",
        rarity: "Especial",
        rating: 90,
        position: "CAM",
        league: "Brasileirão",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SaoPaulo.png",
        image: "assets/characters/Tsubasa/TsubasaWY.png",
        background: "assets/Cartas/Azul.png"
    },
    {
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

let startIndex = code.indexOf('    {\n        id: "tsu_rising_new",');
let endIndex = code.indexOf('    {\n        id: "tsu_mundial26",');

if (startIndex !== -1 && endIndex !== -1) {
    code = code.substring(0, startIndex) + replacement + '\n' + code.substring(endIndex);
    fs.writeFileSync('database/tsubasa_cards.js', code);
} else {
    console.log("Could not find boundaries for replacement.");
}

const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=49');
    fs.writeFileSync(file, content);
});
