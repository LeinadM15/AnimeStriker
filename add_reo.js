const fs = require('fs');

// 1. Create zeus_cards.js  (actually reo_cards.js)
const reoCards = `// database/reo_cards.js
const reoCards = [
    { id: "reo_oro", name: "REO MIKAGE", version: "Oro", rarity: "Oro", rating: 86, position: "CM", league: "Premier League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Arsenal.png", image: "assets/characters/Reo/ReoOro.png", background: "assets/Cartas/Oro.png" },
    { id: "reo_nagi", name: "REO MIKAGE", version: "Morado", rarity: "Especial", rating: 88, position: "CM", league: "BluLock", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/BluLock.png", image: "assets/characters/Reo/ReoNagi.png", background: "assets/Cartas/Morado.png" },
    { id: "reo_cham", name: "REO MIKAGE", version: "FutureStar", rarity: "Especial", rating: 91, position: "CB", league: "BluLock", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/BluLock.png", image: "assets/characters/Reo/ReoCham.png", background: "assets/Cartas/FutureStar.png" },
    { id: "reo_dragon", name: "REO MIKAGE", version: "Flashback", rarity: "Especial", rating: 90, position: "CM", league: "Premier League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Arsenal.png", image: "assets/characters/Reo/ReoDragon.png", background: "assets/Cartas/Flashback.png" },
    { id: "reo_manshine", name: "REO MIKAGE", version: "Manshine", rarity: "Especial", rating: 90, position: "CM", league: "Premier League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Manshine.png", image: "assets/characters/Reo/ReoManshine.png", background: "assets/Cartas/Manshine.png" },
    { id: "reo_copia", name: "REO MIKAGE", version: "SBC", rarity: "Especial", rating: 92, position: "CM", league: "Premier League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Manshine.png", image: "assets/characters/Reo/ReoCopia.png", background: "assets/Cartas/SBC.png" },
    { id: "reo_prime", name: "REO MIKAGE", version: "Joker", rarity: "Especial", rating: 92, position: "CM", league: "Premier League", nationFlag: "https://flagcdn.com/w40/jp.png", teamIcon: "teams/Arsenal.png", image: "assets/characters/Reo/ReoPrime.png", background: "assets/Cartas/Joker.png" }
];
`;
fs.writeFileSync('database/reo_cards.js', reoCards);
console.log('Created database/reo_cards.js');

// 2. Update cards.js
let cardsJs = fs.readFileSync('cards.js', 'utf8');
if (!cardsJs.includes('...reoCards')) {
    // Add reoCards to the spread
    cardsJs = cardsJs.replace('...zeusCards', '...zeusCards,\n    ...reoCards');
    console.log('Added reoCards to cards.js spread');
}

// Add PLAYER_ALT_OVERRIDES entry for REO MIKAGE in squad.js
let squadJs = fs.readFileSync('squad.js', 'utf8');
if (!squadJs.includes('"REO MIKAGE"')) {
    squadJs = squadJs.replace(
        '"LUIKAL":      ["CF", "ST", "CAM", "LW", "RW"]\r\n};',
        '"LUIKAL":      ["CF", "ST", "CAM", "LW", "RW"],\r\n    "REO MIKAGE":  ["ST", "CAM", "LW", "RW", "LM", "RM", "CDM", "CB", "LB", "RB", "LWB", "RWB"]\r\n};'
    );
    fs.writeFileSync('squad.js', squadJs);
    console.log('Updated squad.js PLAYER_ALT_OVERRIDES for REO MIKAGE');
} else {
    console.log('REO MIKAGE already in squad.js');
}

// 3. Cache Bust
const version = Date.now();
cardsJs = cardsJs.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + version + "';");
fs.writeFileSync('cards.js', cardsJs);

// Inject script tag in HTML files
const filesToInject = ['index.html', 'myclub.html', 'draft.html', 'draft_vs.html', 'match_vs.html', 'match.html'];
filesToInject.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('reo_cards.js')) {
        html = html.replace(
            /(<script src="database\/zeus_cards\.js[^>]*><\/script>)/g,
            '$1\n    <script src="database/reo_cards.js?v=' + version + '"></script>'
        );
    }
    html = html.replace(/\?v=\d+/g, '?v=' + version);
    fs.writeFileSync(file, html);
});

console.log('Cache busted. Version:', version);
