const fs = require('fs');

let blue = fs.readFileSync('database/bluelock_cards.js', 'utf8');

const yukimiyaReplacement = `const yukimiyaCards = [
    {
        id: "yukimiya_ajax",
        name: "YUKIMIYA",
        version: "Ajax",
        rarity: "Especial",
        rating: 86,
        position: "LW",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Yukimiya/Yukimiya.png",
        background: "assets/backgrounds/Fondo_Yukimiya.jpeg"
    },
    {
        id: "yukimiya_bastard",
        name: "YUKIMIYA",
        version: "Bastard Munchen",
        rarity: "Especial Naranja",
        rating: 87,
        position: "LW",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Yukimiya/YukimiyaBastard.png",
        background: "assets/Cartas/Naranja.png"
    },
    {
        id: "yukimiya_oro",
        name: "YUKIMIYA",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "LW",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Tokyo.png",
        image: "assets/characters/Yukimiya/YukimiyaOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

let startIdx = blue.indexOf('const yukimiyaCards = [');
let endIdx = blue.indexOf('];', startIdx) + 2;

if (startIdx !== -1 && endIdx > startIdx) {
    blue = blue.substring(0, startIdx) + yukimiyaReplacement + blue.substring(endIdx);
    fs.writeFileSync('database/bluelock_cards.js', blue);
}
