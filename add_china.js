const fs = require('fs');

// 1. Append chinaCards to database/tsubasa_cards.js
let tsubasa_cards = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const chinaCardsStr = `

// ==========================================
// CHINA
// ==========================================
const chinaCards = [
    {
        id: "fei_xiang_oro",
        name: "FEI XIANG",
        version: "Oro",
        rarity: "Oro",
        rating: 81,
        position: "ST",
        league: "Primeira Liga",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/Porto.png",
        image: "assets/characters/China/FeiXiangOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "zhongming_oro",
        name: "ZHONGMING",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "LW",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/Chicorid.png",
        image: "assets/characters/China/ZhongmingOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "wujunren_oro",
        name: "WU JUNREN",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CB",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/Parma.png",
        image: "assets/characters/China/WuJunrenOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "qinghai_oro",
        name: "QINGHAI",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/China/QinghaiOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "qinghai_milan",
        name: "QINGHAI",
        version: "Milan",
        rarity: "Especial",
        rating: 86,
        position: "GK",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/Milan.png",
        image: "assets/characters/China/Qinghai.png",
        background: "assets/Cartas/Milan.png"
    },
    {
        id: "xiao_oro",
        name: "XIAO",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "CDM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/Bayern.png",
        image: "assets/characters/China/XiaoOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "xiao_bastard",
        name: "XIAO",
        version: "Bastard",
        rarity: "Especial",
        rating: 88,
        position: "CDM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/China/XiaoBastard.png",
        background: "assets/Cartas/Bastard.png"
    },
    {
        id: "xiao_prime",
        name: "XIAO",
        version: "Trailblaze",
        rarity: "Especial",
        rating: 90,
        position: "CDM",
        league: "Bundesliga",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/Bastard.png",
        image: "assets/characters/China/XiaoPrime.png",
        background: "assets/Cartas/Trailblaze.png"
    }
];
`;

if (!tsubasa_cards.includes('const chinaCards')) {
    fs.appendFileSync('database/tsubasa_cards.js', chinaCardsStr);
    console.log('Added chinaCards to database/tsubasa_cards.js');
}

// 2. Add to cards.js
let cards_js = fs.readFileSync('cards.js', 'utf8');
if (!cards_js.includes('...chinaCards')) {
    // Insert after ...uruguayCards
    cards_js = cards_js.replace('...uruguayCards,', '...uruguayCards,\n    ...chinaCards,');
    fs.writeFileSync('cards.js', cards_js);
    console.log('Added chinaCards to cards.js');
}
