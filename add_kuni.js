const fs = require('fs');

// 1. Update bluelock_cards.js
let db = fs.readFileSync('database/bluelock_cards.js', 'utf8');

let startIndex = db.indexOf('const hioriCards = [');
if (startIndex !== -1) {
    let endIndex = db.indexOf('const sub20Cards = [', startIndex);
    if (endIndex === -1) endIndex = db.length;
    
    let hioriBlock = db.substring(startIndex, endIndex);
    
    hioriBlock = hioriBlock.replace(/position:\s*"LB",\s*league:/g, 'position: "CM",\n        secondaryPositions: ["LB", "RB"],\n        league:');
    
    db = db.substring(0, startIndex) + hioriBlock + db.substring(endIndex);
}

if (!db.includes('const kunigamiCards')) {
    const kunigamiStr = '\n// ==========================================\n' +
    '// KUNIGAMI\n' +
    '// ==========================================\n' +
    'const kunigamiCards = [\n' +
    '    {\n' +
    '        id: "kunigami_bastard_84",\n' +
    '        name: "KUNIGAMI",\n' +
    '        version: "Bastard Munchen",\n' +
    '        rarity: "Especial",\n' +
    '        rating: 84,\n' +
    '        position: "CDM",\n' +
    '        secondaryPositions: ["ST"],\n' +
    '        league: "Bundesliga",\n' +
    '        nationFlag: "https://flagcdn.com/w40/jp.png",\n' +
    '        teamIcon: "teams/Bastard.png",\n' +
    '        image: "assets/characters/Kunigami/KunigamiCartas.png",\n' +
    '        background: "assets/Cartas/Bastard.png"\n' +
    '    },\n' +
    '    {\n' +
    '        id: "kunigami_bastard_86",\n' +
    '        name: "KUNIGAMI",\n' +
    '        version: "Bastard Munchen",\n' +
    '        rarity: "Especial",\n' +
    '        rating: 86,\n' +
    '        position: "CDM",\n' +
    '        secondaryPositions: ["ST"],\n' +
    '        league: "Bundesliga",\n' +
    '        nationFlag: "https://flagcdn.com/w40/jp.png",\n' +
    '        teamIcon: "teams/Bastard.png",\n' +
    '        image: "assets/characters/Kunigami/KunigamiEntrada.png",\n' +
    '        background: "assets/Cartas/Bastard.png"\n' +
    '    },\n' +
    '    {\n' +
    '        id: "kunigami_dortmund_87",\n' +
    '        name: "KUNIGAMI",\n' +
    '        version: "Borussia Dortmund",\n' +
    '        rarity: "Especial",\n' +
    '        rating: 87,\n' +
    '        position: "CDM",\n' +
    '        secondaryPositions: ["ST"],\n' +
    '        league: "Bundesliga",\n' +
    '        nationFlag: "https://flagcdn.com/w40/jp.png",\n' +
    '        teamIcon: "teams/Dortmund.png",\n' +
    '        image: "assets/characters/Kunigami/KunigamiControl.png",\n' +
    '        background: "assets/Cartas/Naranja.png"\n' +
    '    },\n' +
    '    {\n' +
    '        id: "kunigami_dortmund_88",\n' +
    '        name: "KUNIGAMI",\n' +
    '        version: "Borussia Dortmund",\n' +
    '        rarity: "Especial",\n' +
    '        rating: 88,\n' +
    '        position: "CDM",\n' +
    '        secondaryPositions: ["ST"],\n' +
    '        league: "Bundesliga",\n' +
    '        nationFlag: "https://flagcdn.com/w40/jp.png",\n' +
    '        teamIcon: "teams/Dortmund.png",\n' +
    '        image: "assets/characters/Kunigami/KunigamiChute.png",\n' +
    '        background: "assets/Cartas/Naranja.png"\n' +
    '    }\n' +
    '];\n\n';
    
    db += kunigamiStr;
}
fs.writeFileSync('database/bluelock_cards.js', db);

let cards = fs.readFileSync('cards.js', 'utf8');
if (!cards.includes('...kunigamiCards')) {
    cards = cards.replace('...franciaHieloCards\n  ];', '...franciaHieloCards,\n    ...kunigamiCards\n  ];');
    cards = cards.replace('...franciaHieloCards\r\n  ];', '...franciaHieloCards,\r\n    ...kunigamiCards\r\n  ];');
    cards = cards.replace('...franciaHieloCards\n];', '...franciaHieloCards,\n    ...kunigamiCards\n];');
    cards = cards.replace('...franciaHieloCards\r\n];', '...franciaHieloCards,\r\n    ...kunigamiCards\r\n];');
    fs.writeFileSync('cards.js', cards);
}
