const fs = require('fs');
let c = fs.readFileSync('cards.js', 'utf8');
const version = Date.now();
c = c.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + version + "';");
fs.writeFileSync('cards.js', c);

let files = fs.readdirSync('.');
files.forEach(f => {
    if (f.endsWith('.html')) {
        let h = fs.readFileSync(f, 'utf8');
        h = h.replace(/\?v=\d+/g, '?v=' + version);
        fs.writeFileSync(f, h);
    }
});
console.log('Cache busted with version:', version);
