const fs = require('fs');
const t = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
const b = fs.readFileSync('database/bluelock_cards.js', 'utf8');
const all = t + b;
const counts = {};
const re = /nationFlag:\s*["']([^"']+)["']/g;
let m;
while ((m = re.exec(all)) !== null) {
    const f = m[1];
    counts[f] = (counts[f] || 0) + 1;
}
console.log(Object.entries(counts).filter(e => e[1] >= 5).map(e => e[0]));
