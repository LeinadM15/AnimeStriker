const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. Delete 81 card (kishida_otomo)
s = s.replace(/\{\s*id: "kishida_otomo"[\s\S]*?\},/g, '');

// 2. Delete 84 card (kishida_especial)
s = s.replace(/\{\s*id: "kishida_especial"[\s\S]*?\}/g, '');

// 3. Update 82 card (kishida_shimizu) -> Oro, Arsenal
s = s.replace(/id: "kishida_shimizu"[\s\S]*?background: "assets\/FondoTsubasa\.jpeg"/, match => {
    return match
        .replace('version: "Shimizu"', 'version: "Oro"')
        .replace('rarity: "Normal"', 'rarity: "Oro"')
        .replace('league: "J-League"', 'league: "Premier League"')
        .replace('teamIcon: "teams/Shimizu.png"', 'teamIcon: "teams/Arsenal.png"')
        .replace('background: "assets/FondoTsubasa.jpeg"', 'background: "assets/Cartas/Oro.png"');
});

// Also there might be a dangling comma or weird JSON if I delete the first element but the second doesn't start properly. Let's fix that.
s = s.replace(/const kishidaCards = \[\s*\{\s*id: "kishida_shimizu"/, 'const kishidaCards = [\n    {\n        id: "kishida_shimizu"');

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Kishida updated successfully');
