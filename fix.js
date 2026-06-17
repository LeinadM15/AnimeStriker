const fs = require('fs');
let c = fs.readFileSync('database/bluelock_cards.js', 'utf8');
// remove all secondaryPositions: ["LB", "RW", "RB"],
c = c.replace(/\s+secondaryPositions: \["LB", "RW", "RB"\],/g, '');
fs.writeFileSync('database/bluelock_cards.js', c);
