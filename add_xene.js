const fs = require('fs');

let xeneHunterCards = `    {
        id: "ina_xene_oro",
        name: "XENE",
        version: "Génesis",
        rarity: "Normal",
        rating: 87,
        position: "ST",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Genesis.png",
        image: "assets/characters/Xavier/XeneOro.png",
        background: "assets/backgrounds/Fondo_Inazuma.jpeg"
    },
    {
        id: "ina_xene_roja",
        name: "XENE",
        version: "Génesis",
        rarity: "Especial",
        rating: 89,
        position: "ST",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Genesis.png",
        image: "assets/characters/Xavier/Xene.png",
        background: "assets/backgrounds/Fondo_Inazuma.jpeg"
    },
    {
        id: "ina_hunter_oro",
        name: "HUNTER",
        version: "Academia Alia",
        rarity: "Normal",
        rating: 85,
        position: "ST",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/AcademiaAlia.png",
        image: "assets/characters/Xavier/HunterOro.png",
        background: "assets/backgrounds/Fondo_Inazuma.jpeg"
    },
    {
        id: "ina_hunter_if",
        name: "HUNTER",
        version: "Academia Alia",
        rarity: "Especial",
        rating: 87,
        position: "ST",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/AcademiaAlia.png",
        image: "assets/characters/Xavier/Hunter.png",
        background: "assets/backgrounds/Fondo_Inazuma.jpeg"
    }`;

let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
code = code.replace('const xavierCards = [\n', 'const xavierCards = [\n' + xeneHunterCards + ',\n');
fs.writeFileSync('database/tsubasa_cards.js', code);
