const fs = require('fs');
let ts = Date.now();

// Bump DB_VERSION in cards.js
let c = fs.readFileSync('cards.js', 'utf8');
c = c.replace(/const DB_VERSION = '[^']+';/, "const DB_VERSION = '" + ts + "';");
fs.writeFileSync('cards.js', c);

// Bump ?v= in all HTML files
fs.readdirSync('.').filter(f => f.endsWith('.html')).forEach(f => {
    let h = fs.readFileSync(f, 'utf8');
    h = h.replace(/\?v=\d+/g, '?v=' + ts);
    fs.writeFileSync(f, h);
});

console.log('Bumped DB_VERSION and HTML cache to ' + ts);
