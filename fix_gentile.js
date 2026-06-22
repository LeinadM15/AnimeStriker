const fs = require('fs');

let content = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newGentileCards = `const gentileCards = [
    {
        id: "gen_normal",
        name: "GENTILE",
        version: "Especial",
        rarity: "Especial",
        rating: 91,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Gentile/Gentile.png",
        background: "assets/backgrounds/Fondo_Gentile.png"
    },
    {
        id: "gen_ubers",
        name: "GENTILE",
        version: "Ubers",
        rarity: "Especial",
        rating: 90,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Gentile/GentileUbers.png",
        background: "assets/Cartas/Ubers.png"
    },
    {
        id: "gen_wy",
        name: "GENTILE",
        version: "World Youth",
        rarity: "Especial",
        rating: 89,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Gentile/GentileWY.png",
        background: "assets/Cartas/Azul.png"
    },
    {
        id: "gen_oro",
        name: "GENTILE",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Gentile/GentileOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

content = content.replace(/const gentileCards = \[[\s\S]*?\];/, newGentileCards);
fs.writeFileSync('database/tsubasa_cards.js', content);

// Bump cache to v=79
const htmlFiles = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
htmlFiles.forEach(file => {
    let htmlContent = fs.readFileSync(file, 'utf8');
    htmlContent = htmlContent.replace(/\?v=\d+/g, '?v=79');
    fs.writeFileSync(file, htmlContent);
});
