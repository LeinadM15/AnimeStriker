const fs = require('fs');

let content = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const shawnCards = `
    },
    {
        id: "shawn_def_oro",
        name: "SHAWN",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "CB",
        secondaryPositions: ["ST"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Shawn/ShawndefOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "shawn_ai_oro",
        name: "SHAWN",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "ST",
        secondaryPositions: ["CB"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Shawn/ShawnAioro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "shawn_oro",
        name: "SHAWN",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "ST",
        secondaryPositions: ["CB"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Raimon.png",
        image: "assets/characters/Shawn/ShawnOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "shawn_ares_oro",
        name: "SHAWN",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CB",
        secondaryPositions: ["ST"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Shawn/ShawnAresoro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "shawn_basic",
        name: "SHAWN",
        version: "Hielo",
        rarity: "Especial",
        rating: 86,
        position: "CB",
        secondaryPositions: ["ST"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Shawn/Shawnbasic.png",
        background: "assets/Cartas/Hielo.png"
    },
    {
        id: "shawn_ares",
        name: "SHAWN",
        version: "If",
        rarity: "Especial",
        rating: 88,
        position: "CB",
        secondaryPositions: ["ST"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Shawn/ShawnAres.png",
        background: "assets/Cartas/If.png"
    },
    {
        id: "shawn_ori",
        name: "SHAWN",
        version: "Cabras",
        rarity: "Especial",
        rating: 89,
        position: "CB",
        secondaryPositions: ["ST"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Alpino.png",
        image: "assets/characters/Shawn/ShawnOri.png",
        background: "assets/Cartas/Cabras.png"
    },
    {
        id: "shawn_aiden_prime",
        name: "SHAWN",
        version: "Trueno",
        rarity: "Especial",
        rating: 89,
        position: "ST",
        secondaryPositions: ["CB"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Raimon.png",
        image: "assets/characters/Shawn/ShawnAidenPrime.png",
        background: "assets/Cartas/Trueno.png"
    },
    {
        id: "shawn_aiden",
        name: "SHAWN",
        version: "Mordiscos",
        rarity: "Especial",
        rating: 91,
        position: "ST",
        secondaryPositions: ["CB"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Raimon.png",
        image: "assets/characters/Shawn/ShawnAiden.png",
        background: "assets/Cartas/Mordiscos.png"
    },
    {
        id: "shawn_hiel",
        name: "SHAWN",
        version: "Tots",
        rarity: "Especial",
        rating: 93,
        position: "ST",
        secondaryPositions: ["CB"],
        league: "J-League",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Raimon.png",
        image: "assets/characters/Shawn/ShawnHiel.png",
        background: "assets/Cartas/Tots.png"
    },
    {
        id: "shawn_toty",
        name: "SHAWN",
        version: "Toty",
        rarity: "Especial",
        rating: 95,
        position: "ST",
        secondaryPositions: ["CB"],
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/Shawn/ShawnToty.png",
        background: "assets/Cartas/Toty.png"
    },
    {
        id: "shawn_legen_oro",
        name: "SHAWN",
        version: "Oro",
        rarity: "Oro",
        rating: 90,
        position: "ST",
        secondaryPositions: ["CB"],
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/Shawn/ShawnLegenOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "shawn_legen",
        name: "SHAWN",
        version: "Icono",
        rarity: "Icono",
        rating: 96,
        position: "ST",
        secondaryPositions: ["CB"],
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/jp.png",
        teamIcon: "teams/Inter.png",
        image: "assets/characters/Shawn/ShawnLegen.png",
        background: "assets/Cartas/Icono.png"
    }
];
`;

content = content.replace(/\s*\}\s*\];\s*$/, shawnCards);
fs.writeFileSync('database/tsubasa_cards.js', content);

console.log('Done!');
