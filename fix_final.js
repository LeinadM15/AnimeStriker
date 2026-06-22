const fs = require('fs');
let lines = fs.readFileSync('database/tsubasa_cards.js', 'utf8').split('\n');
lines.splice(330, 732 - 330);
fs.writeFileSync('database/tsubasa_cards.js', lines.join('\n'));
console.log('Fixed duplications successfully!');
