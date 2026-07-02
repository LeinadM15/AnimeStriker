const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Replace all Inazuma League with J-League
file = file.replace(/league:\s*['"]Inazuma League['"]/g, 'league: "J-League"');

const newCards = `
    {
        id: "duske_oro",
        name: "DUSKE GRAYLING",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "GK",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Plenilunio.png",
        image: "assets/characters/Duske/DuskeOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "duske_naranja",
        name: "DUSKE GRAYLING",
        version: "Naranja",
        rarity: "Especial",
        rating: 87,
        position: "GK",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Plenilunio.png",
        image: "assets/characters/Duske/DuskeBrazo.png",
        background: "assets/Cartas/Naranja.png"
    },
    {
        id: "duske_morado",
        name: "DUSKE GRAYLING",
        version: "Morado",
        rarity: "Especial",
        rating: 89,
        position: "GK",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Athletic.png",
        image: "assets/characters/Duske/DuskeEscudos.png",
        background: "assets/Cartas/Morado.png"
    },
    {
        id: "duske_centurion",
        name: "DUSKE GRAYLING",
        version: "Centurion",
        rarity: "Especial",
        rating: 91,
        position: "GK",
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Plenilunio.png",
        image: "assets/characters/Duske/DuskePrime.png",
        background: "assets/Cartas/Centurion.png"
    },
    {
        id: "duske_tots",
        name: "DUSKE GRAYLING",
        version: "TOTS",
        rarity: "Especial",
        rating: 92,
        position: "GK",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Athletic.png",
        image: "assets/characters/Duske/DuskePrime2.png",
        background: "assets/Cartas/Tots.png"
    },`;

// Add it to the top
if (!file.includes('id: "duske_oro"')) {
    file = file.replace('const tsubasaCards = [', 'const tsubasaCards = [\n' + newCards);
}

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log('Fixed leagues and added Duske Grayling.');
