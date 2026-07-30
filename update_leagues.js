const fs = require('fs');
const path = require('path');

// 1. Update matchRivals.js
let matchRivalsPath = path.join(__dirname, 'matchRivals.js');
let matchRivals = fs.readFileSync(matchRivalsPath, 'utf8');

// Add Hamburgo to LIGA_TEAMS if not exists
if (!matchRivals.includes("'HAMBURGO'")) {
    matchRivals = matchRivals.replace(
        /league:\s*'Bundesliga',\s*teamIcon:\s*'teams\/WerderBremen\.png'\s*\},/g,
        "league: 'Bundesliga', teamIcon: 'teams/WerderBremen.png' },\n    { name: 'HAMBURGO', badge: 'teams/Hamburgo.png', league: 'Bundesliga', teamIcon: 'teams/Hamburgo.png' },"
    );
}
// Add Hamburgo to CLUB_TEAMS if not exists
if (!matchRivals.includes("'HAMBURGO'")) {
    matchRivals = matchRivals.replace(
        /\{ name:\s*'WERDER BREMEN',[^}]+teams\/WerderBremen\.png' \},/g,
        "{ name: 'WERDER BREMEN', badge: 'teams/WerderBremen.png', league: 'Bundesliga', teamIcon: 'teams/WerderBremen.png' },\n    { name: 'HAMBURGO', badge: 'teams/Hamburgo.png', league: 'Bundesliga', teamIcon: 'teams/Hamburgo.png' },"
    );
}

// Update Chicorid league to La Liga in matchRivals
matchRivals = matchRivals.replace(/league:\s*'J-League',\s*teamIcon:\s*'teams\/Chicorid\.png'/g, "league: 'La Liga', teamIcon: 'teams/Chicorid.png'");

fs.writeFileSync(matchRivalsPath, matchRivals);

// 2. Update database files
const dbDir = path.join(__dirname, 'database');
const files = fs.readdirSync(dbDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
    let filePath = path.join(dbDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // A) If file contains teamIcon: "teams/Chicorid.png", update its league to La Liga
    // We will do this by parsing line by line, if a block has teamIcon: "teams/Chicorid.png", we change league to "La Liga"
    // Easier with a regex replacement that targets the league field near the teamIcon field or just replacing league inside objects that have that icon.
    // Given the simple structure, let's just use string replacement on the objects:
    const cards = content.split('},');
    const updatedCards = cards.map(card => {
        if (card.includes('"teams/Chicorid.png"')) {
            return card.replace(/league:\s*"[^"]+"/, 'league: "La Liga"');
        }
        
        // B) Update Izawa, Kisugi, Takasugi to Hamburgo and Bundesliga
        if (file === 'izawa_cards.js' || file === 'kisugi_cards.js' || file === 'takasugi_cards.js') {
            let newCard = card.replace(/league:\s*"[^"]+"/, 'league: "Bundesliga"');
            newCard = newCard.replace(/teamIcon:\s*"[^"]+"/, 'teamIcon: "teams/Hamburgo.png"');
            return newCard;
        }

        return card;
    });

    let updatedContent = updatedCards.join('},');
    if (original !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        console.log(`Updated ${file}`);
    }
});

// Bump DB_VERSION
let cardsJs = fs.readFileSync('cards.js', 'utf8');
cardsJs = cardsJs.replace(/const DB_VERSION = '[^']+';/, `const DB_VERSION = '${Date.now()}';`);
fs.writeFileSync('cards.js', cardsJs);
console.log('Bumped DB_VERSION in cards.js');
