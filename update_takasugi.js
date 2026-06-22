const fs = require('fs');

let s = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. Delete 80 card (taka_nankatsu)
s = s.replace(/\{\s*id: "taka_nankatsu"[\s\S]*?\},/g, '');

// 2. Delete 83 card (taka_especial)
s = s.replace(/\{\s*id: "taka_especial"[\s\S]*?\}/g, '');

// 3. Update 82 card (taka_hiroshima) -> Oro, Numancia
s = s.replace(/id: "taka_hiroshima"[\s\S]*?background: "assets\/FondoTsubasa\.jpeg"/, match => {
    return match
        .replace('version: "Hiroshima"', 'version: "Oro"')
        .replace('rarity: "Normal"', 'rarity: "Oro"')
        .replace('league: "J-League"', 'league: "La Liga"')
        .replace('teamIcon: "teams/Hiroshima.png"', 'teamIcon: "teams/Numancia.png"')
        .replace('background: "assets/FondoTsubasa.jpeg"', 'background: "assets/Cartas/Oro.png"');
});

// Clean up any weird JSON formatting like trailing commas if needed, but it should be fine.
// Wait, taka_hiroshima was the middle element. Deleting the first one leaves `[\n    {\n        id: "taka_hiroshima"`
// Let's just fix it if needed:
s = s.replace(/const takasugiCards = \[\s*\{\s*id: "taka_hiroshima"/, 'const takasugiCards = [\n    {\n        id: "taka_hiroshima"');

fs.writeFileSync('database/tsubasa_cards.js', s);
console.log('Takasugi updated successfully');
