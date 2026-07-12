const fs = require('fs');
let c = fs.readFileSync('cards.js', 'utf8');
c = c.replace(/const DB_VERSION = '[^']+';/, "const DB_VERSION = '" + Date.now() + "';");
fs.writeFileSync('cards.js', c);
