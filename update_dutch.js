const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Modificaciones
s = s.replace(
    /id:\s*"brian_united",[\s\S]*?rating:\s*89,/,
    match => match.replace(/rating:\s*89,/, 'rating: 92,')
);

s = s.replace(
    /id:\s*"hol_brian_ajax",[\s\S]*?rating:\s*88,/,
    match => match.replace(/rating:\s*88,/, 'rating: 90,')
);

s = s.replace(
    /id:\s*"stijn_ajax_nuevo",[\s\S]*?rating:\s*87,/,
    match => match.replace(/rating:\s*87,/, 'rating: 89,')
);

// Nuevos Oro a crear
const nuevosOro = `
    ,{
        id: "hol_brian_oro",
        name: "B. KLUIVOORT",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "CAM",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Holanda/BrianKluivoortOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "stijn_oro",
        name: "S. KLUIVOORT",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "CDM",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Holanda/StijnKluivoortOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "overus_oro",
        name: "OVERUS",
        version: "Oro",
        rarity: "Oro",
        rating: 82,
        position: "CB",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Holanda/OverusOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "lensenblink_oro",
        name: "LENSENBLINK",
        version: "Oro",
        rarity: "Oro",
        rating: 83,
        position: "CM",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Holanda/LensenblinkOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "doleman_oro",
        name: "DOLEMAN",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "GK",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Holanda/DolemanOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "kaiser_oro_tsubasa",
        name: "KAISER",
        version: "Oro",
        rarity: "Oro",
        rating: 86,
        position: "ST",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Holanda/KaiserOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "davi_oro",
        name: "DAVI",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CDM",
        league: "Serie A",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Ubers.png",
        image: "assets/characters/Holanda/DaviOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "luikal_oro",
        name: "LUIKAL",
        version: "Oro",
        rarity: "Oro",
        rating: 87,
        position: "ST",
        league: "La Liga",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Barcha.png",
        image: "assets/characters/Holanda/LuikalOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "dick_oro",
        name: "DICK",
        version: "Oro",
        rarity: "Oro",
        rating: 84,
        position: "CB",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Holanda/DickOro.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "klismann_oro",
        name: "KLISMANN",
        version: "Oro",
        rarity: "Oro",
        rating: 85,
        position: "ST",
        league: "Eredivisie",
        nationFlag: "https://flagcdn.com/w40/nl.png",
        teamIcon: "teams/Ajax.png",
        image: "assets/characters/Holanda/KlismannOro.png",
        background: "assets/Cartas/Oro.png"
    }
`;

// Insert the new objects inside the holandaCardsNuevos array
// The array ends around line 1526 with "    }\n];\n"
if (!s.includes('id: "overus_oro"')) {
    s = s.replace(
        /id:\s*"luikal_barcha",[\s\S]*?\}\n\];/g,
        match => match.replace(/\}\n\];/, '}' + nuevosOro + '\n];')
    );
}

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Update complete!');
