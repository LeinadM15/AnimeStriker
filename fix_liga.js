const fs = require('fs');
let content = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
content = content.replace(/league: "Liga Portugal",/g, 'league: "Primeira League",');
fs.writeFileSync('database/tsubasa_cards.js', content);
console.log('Fixed Liga Portugal');
