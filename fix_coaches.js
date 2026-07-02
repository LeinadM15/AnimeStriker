const fs = require('fs');

// Fix coaches.js
let c = fs.readFileSync('database/coaches.js', 'utf8');

// Replace version: "Entrenador" with version: "Entrenador (Oro)"
c = c.replace(/version: "Entrenador",/g, 'version: "Entrenador (Oro)",');

// Replace position: "Entrenador" with position: "COACH"
c = c.replace(/position: "Entrenador",/g, 'position: "COACH",');

fs.writeFileSync('database/coaches.js', c);
console.log('Fixed coaches.js');

// Cache bust
let v = Date.now();
let cards = fs.readFileSync('cards.js', 'utf8');
cards = cards.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + v + "';");
fs.writeFileSync('cards.js', cards);

['index.html','myclub.html','draft.html','draft_vs.html','match.html','match_vs.html'].forEach(f => {
    if (!fs.existsSync(f)) return;
    let h = fs.readFileSync(f, 'utf8');
    h = h.replace(/\?v=\d+/g, '?v=' + v);
    fs.writeFileSync(f, h);
});
console.log('Cache busted');
