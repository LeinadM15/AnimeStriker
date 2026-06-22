const fs = require('fs');

let content = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newGinoCards = `const ginoCards = [
    {
        id: "gino_custom",
        name: "GINO",
        version: "Especial",
        rarity: "Especial",
        rating: 91,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/Gino/Gino.png",
        background: "assets/backgrounds/Fondo_Gino.png"
    },
    {
        id: "gino_inter",
        name: "GINO",
        version: "Inter",
        rarity: "Especial",
        rating: 90,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/Gino/GinoInter.png",
        background: "assets/Cartas/Inter.png"
    },
    {
        id: "gino_wy",
        name: "GINO",
        version: "World Youth",
        rarity: "Especial",
        rating: 89,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/Gino/GinoWY.png",
        background: "assets/Cartas/Azul.png"
    },
    {
        id: "gino_oro",
        name: "GINO",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/Gino/GinoOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

content = content.replace(/const ginoCards = \[[\s\S]*?\];/, newGinoCards);
fs.writeFileSync('database/tsubasa_cards.js', content);

// Bump cache to v=80
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let htmlContent = fs.readFileSync(file, 'utf8');
    htmlContent = htmlContent.replace(/\?v=\d+/g, '?v=80');
    fs.writeFileSync(file, htmlContent);
});
