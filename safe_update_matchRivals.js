const fs = require('fs');

let content = fs.readFileSync('matchRivals.js', 'utf8');

// Update Chicorid league
content = content.replace(
    /\{\s*name:\s*'CHICORID',\s*badge:\s*'teams\/Chicorid\.png',\s*league:\s*'J-League',\s*teamIcon:\s*'teams\/Chicorid\.png'\s*\}/g,
    "{ name: 'CHICORID', badge: 'teams/Chicorid.png', league: 'La Liga', teamIcon: 'teams/Chicorid.png' }"
);
// Some cases might have different spacing:
content = content.replace(
    /\{\s*name:\s*'CHICORID',\s*badge:\s*'teams\/Chicorid\.png',\s*league:\s*'J-League',\s*teamIcon:\s*'teams\/Chicorid\.png'\s*\}/g,
    "{ name: 'CHICORID', badge: 'teams/Chicorid.png', league: 'La Liga', teamIcon: 'teams/Chicorid.png' }"
);

// Add Hamburgo after Leverkusen
if (!content.includes("'HAMBURGO'")) {
    content = content.replace(
        /\{\s*name:\s*'LEVERKUSEN',\s*badge:\s*'teams\/Leverkusen\.png',\s*league:\s*'Bundesliga',\s*teamIcon:\s*'teams\/Leverkusen\.png'\s*\},\s*/g,
        "{ name: 'LEVERKUSEN', badge: 'teams/Leverkusen.png', league: 'Bundesliga', teamIcon: 'teams/Leverkusen.png' },\n    { name: 'HAMBURGO', badge: 'teams/Hamburgo.png', league: 'Bundesliga', teamIcon: 'teams/Hamburgo.png' },\n    "
    );
}

fs.writeFileSync('matchRivals.js', content);
