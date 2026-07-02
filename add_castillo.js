const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newCards = `
    {
        id: "nicolas_castillo_oro",
        name: "NICOLAS CASTILLO",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CAM",
        secondaryPositions: ["CM"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/uy.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Uruguay/NicolasCastilloOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "nicolas_castillo_azul",
        name: "NICOLAS CASTILLO",
        version: "Especial",
        rarity: "Especial",
        rating: 87,
        position: "CAM",
        secondaryPositions: ["CM"],
        league: "Ligue 1",
        nationFlag: "https://flagcdn.com/w40/uy.png",
        teamIcon: "teams/Marsella.png",
        image: "assets/characters/Uruguay/NicolasCastillo.png",
        background: "assets/Cartas/Azul.png"
    },`;

if (!file.includes('id: "nicolas_castillo_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
    fs.writeFileSync('database/tsubasa_cards.js', file);
    console.log('Added Nicolas Castillo cards successfully.');
} else {
    console.log('Nicolas Castillo cards already exist.');
}
