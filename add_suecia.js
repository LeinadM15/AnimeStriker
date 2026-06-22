const fs = require('fs');

let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const newSuecia = `
// ==========================================
// SUECIA
// ==========================================
const sueciaCards = [
    {
        id: "zlatamovic_oro",
        name: "ZLATAMOVIC",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/Suecia/Zlatamovic.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "hansen_player_oro",
        name: "HANSEN",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "CB",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Suecia/HansenOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "brolin_oro",
        name: "BROLIN",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CB",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/ManchesterUnited.png",
        image: "assets/characters/Suecia/BrolinOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "brolin_suecia",
        name: "BROLIN",
        version: "Suecia",
        rarity: "Especial",
        rating: 86,
        position: "CB",
        league: "Premier League",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/ManchesterUnited.png",
        image: "assets/characters/Suecia/Brolin.png",
        background: "assets/Cartas/Suecia.png"
    },
    {
        id: "frederiks_oro",
        name: "FREDERIKS",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CM",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Suecia/FrederiksOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "frederiks_suecia",
        name: "FREDERIKS",
        version: "Suecia",
        rarity: "Especial",
        rating: 85,
        position: "CM",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/Suecia/Frederiiks.png",
        background: "assets/Cartas/Suecia.png"
    },
    {
        id: "larson_oro",
        name: "LARSON",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CAM",
        league: "LaLiga",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Suecia/LarsonOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "larson_suecia",
        name: "LARSON",
        version: "Suecia",
        rarity: "Especial",
        rating: 85,
        position: "CAM",
        league: "LaLiga",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/Valencia.png",
        image: "assets/characters/Suecia/Larson.webp",
        background: "assets/Cartas/Suecia.png"
    }
];
`;

if (!code.includes('sueciaCards = [')) {
    code += '\n' + newSuecia;
}

const levinOro = `    ,
    {
        id: "levin_oro",
        name: "LEVIN",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CAM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/se.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/Suecia/LevinOro.png",
        background: "assets/Cartas/Oro.png"
    }`;

if (!code.includes('levin_oro')) {
    code = code.replace(/id: "levin_suecia"[\s\S]*?background: "assets\/Cartas\/Suecia.png"\n    \}/, match => match + levinOro);
}

fs.writeFileSync('database/tsubasa_cards.js', code);

// Now update cards.js to include ...sueciaCards in the tsubasaAll array.
let cards = fs.readFileSync('cards.js', 'utf8');
if (!cards.includes('...sueciaCards')) {
    cards = cards.replace('...zedaneCards', '...zedaneCards,\n    ...sueciaCards');
    fs.writeFileSync('cards.js', cards);
}
