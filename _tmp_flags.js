const fs = require('fs');
const t = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
const b = fs.readFileSync('database/bluelock_cards.js', 'utf8');
const all = t + b;
const flags = new Set();
const re = /nationFlag:\s*["']([^"']+)["']/g;
let m;
while ((m = re.exec(all)) !== null) flags.add(m[1]);
flags.forEach(f => console.log(f));
