const fs = require('fs');
const path = require('path');

const tsubasaPath = path.join(__dirname, 'database/tsubasa_cards.js');
let tsubasaContent = fs.readFileSync(tsubasaPath, 'utf8');

// Parse Sao Paulo current rating to do math correctly
let spMatch = tsubasaContent.match(/id:\s*"tsu_saopaulo"[\s\S]*?rating:\s*(\d+)/);
let currentSP = parseInt(spMatch[1]);
// We subtracted 2 earlier, wait, this script will be run again. Let's assume we do the -2 logic then calculate WY.
// Actually, it's easier to just do it in one go.

const newCards = `
    {
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
        background: "assets/backgrounds/Fondo_Especial.png"
    },
    {
        id: "tsu_wy",
        name: "TSUBASA",
        version: "World Youth",
        rarity: "Normal",
        rating: 88,
        position: "CAM",
        league: "Brasileirão",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/SaoPaulo.png",
        image: "assets/characters/Tsubasa/TsubasaWY.png",
        background: "assets/FondoTsubasa.jpeg"
    }
`;

// Insert newCards into tsubasaCards array.
tsubasaContent = tsubasaContent.replace(/(const\s+tsubasaCards\s*=\s*\[)/, '$1' + newCards + ',');

fs.writeFileSync(tsubasaPath, tsubasaContent);
console.log('Appended new Tsubasa cards.');
