const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newEspanaCards = `const espanaCards = [
    {
        id: "michael_numancia_1",
        name: "MICHAEL",
        version: "Numancia",
        rarity: "Especial",
        rating: 91,
        position: "CDM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Numancia.png",
        image: "assets/characters/España/Michael.png",
        background: "assets/Cartas/Espana.png"
    },
    {
        id: "michael_numancia_2",
        name: "MICHAEL",
        version: "Especial",
        rarity: "Especial",
        rating: 93,
        position: "CAM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Numancia.png",
        image: "assets/characters/España/Michael2.png",
        background: "assets/Cartas/Espana.png"
    },
    {
        id: "raphael_numancia_1",
        name: "RAPHAEL",
        version: "Numancia",
        rarity: "Especial",
        rating: 88,
        position: "CAM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Numancia.png",
        image: "assets/characters/España/Raphael.png",
        background: "assets/Cartas/Espana.png"
    },
    {
        id: "raphael_numancia_2",
        name: "RAPHAEL",
        version: "Especial",
        rarity: "Especial",
        rating: 90,
        position: "CAM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Numancia.png",
        image: "assets/characters/España/Raphael2.png",
        background: "assets/Cartas/Espana.png"
    },
    {
        id: "callusias_real",
        name: "CALLUSIAS",
        version: "Real Madrid",
        rarity: "Especial",
        rating: 91,
        position: "GK",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/España/Callusias.png"
    },
    {
        id: "blueno_oro",
        name: "BLUENO",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/España/BluenoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "callusias_oro",
        name: "CALLUSIAS",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "GK",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/España/CallusiasOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "marientes_oro",
        name: "MARIENTES",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/España/MarientesOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "michael_oro",
        name: "MICHAEL",
        version: "Oro",
        rarity: "Oro",
        rating: 90,
        position: "CDM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Numancia.png",
        image: "assets/characters/España/MichaelOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "olgado_oro",
        name: "OLGADO",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "CB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Real.png",
        image: "assets/characters/España/OlgadoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "payol_oro",
        name: "PAYOL",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/España/PayolOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "raphael_oro",
        name: "RAPHAEL",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "CAM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Numancia.png",
        image: "assets/characters/España/RaphaelOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "gonzalez_oro",
        name: "GONZALEZ",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/España/GonzalesOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "grandios_oro",
        name: "GRANDIOS",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CDM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/España/GrandiosOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "xavii_oro",
        name: "XAVII",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CDM",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/es.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/España/XaviiOro.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

let startIndex = code.indexOf('const espanaCards = [');
let endIndex = code.indexOf('];', startIndex) + 2;

code = code.substring(0, startIndex) + newEspanaCards + code.substring(endIndex);

fs.writeFileSync('database/tsubasa_cards.js', code);

// Cache Buster v59
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=59');
    fs.writeFileSync(file, content);
});
