const fs = require('fs');

// 1. Update tsubasa_cards.js
let tsubasa = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

tsubasa = tsubasa.replace(
    /id:\s*"rossi_chicorid",[\s\S]*?league:\s*"Serie A",/,
    match => match.replace('league: "Serie A",', 'league: "La Liga",')
);

tsubasa = tsubasa.replace(
    /id:\s*"rossi_oro",[\s\S]*?league:\s*"Serie A",/,
    match => match.replace('league: "Serie A",', 'league: "La Liga",')
);

tsubasa = tsubasa.replace(
    /id:\s*"gozza_oro",[\s\S]*?teamIcon:\s*"teams\/Reggiana.png",/,
    match => match.replace('teamIcon: "teams/Reggiana.png",', 'teamIcon: "teams/Napoli.png",')
);

const ruscianoCards = `
    {
        id: "rusciano_rulebraker",
        name: "RUSCIANO",
        version: "Napoli",
        rarity: "Especial",
        rating: 89,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Napoli.png",
        image: "assets/characters/Italia/Rusciano.png",
        background: "assets/Cartas/Rulebraker.png"
    },
    {
        id: "rusciano_oro",
        name: "RUSCIANO",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "ST",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/it.png",
        teamIcon: "teams/Napoli.png",
        image: "assets/characters/Italia/RuscianoOro.png",
        background: "assets/Cartas/Oro.png"
    },`;

if (!tsubasa.includes('id: "rusciano_rulebraker"')) {
    tsubasa = tsubasa.replace('const italiaCards = [', 'const italiaCards = [' + ruscianoCards);
}

fs.writeFileSync('database/tsubasa_cards.js', tsubasa);

// 2. Update bluelock_cards.js
let bluelock = fs.readFileSync('database/bluelock_cards.js', 'utf8');

bluelock = bluelock.replace(
    /id:\s*"himizu_omiya",[\s\S]*?teamIcon:\s*"teams\/Milan.png",/,
    match => match.replace('teamIcon: "teams/Milan.png",', 'teamIcon: "teams/Napoli.png",')
);

bluelock = bluelock.replace(
    /id:\s*"himizu_bluelock",[\s\S]*?league:\s*"J-League",\s*nationFlag:\s*"https:\/\/flagcdn.com\/w40\/jp.png",\s*teamIcon:\s*"teams\/BluLock.png",/,
    match => match.replace('league: "J-League",', 'league: "Serie A",').replace('teamIcon: "teams/BluLock.png",', 'teamIcon: "teams/Napoli.png",')
);

bluelock = bluelock.replace(
    /id:\s*"himizu_oro",[\s\S]*?teamIcon:\s*"teams\/Milan.png",/,
    match => match.replace('teamIcon: "teams/Milan.png",', 'teamIcon: "teams/Napoli.png",')
);

bluelock = bluelock.replace(
    /id:\s*"delon_oro",[\s\S]*?teamIcon:\s*"teams\/Milan.png",/,
    match => match.replace('teamIcon: "teams/Milan.png",', 'teamIcon: "teams/Inter.png",')
);

bluelock = bluelock.replace(
    /id:\s*"delon_milan",[\s\S]*?version:\s*"AC Milan",[\s\S]*?teamIcon:\s*"teams\/Milan.png",/,
    match => match.replace('version: "AC Milan",', 'version: "Inter",').replace('teamIcon: "teams/Milan.png",', 'teamIcon: "teams/Inter.png",')
);

fs.writeFileSync('database/bluelock_cards.js', bluelock);

console.log('Update complete!');
