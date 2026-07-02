const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// Replace all occurrences of altPositions with secondaryPositions
file = file.replace(/altPositions:/g, 'secondaryPositions:');

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log('Changed altPositions to secondaryPositions in tsubasa_cards.js');
