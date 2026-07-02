const fs = require('fs');
const db = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
const counts = {};
const regex = /position:\s*["']([^"']+)["'],[\s\S]*?rarity:\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(db)) !== null) {
    const pos = match[1];
    const rar = match[2].includes('Especial') ? 'Special' : 'Oro';
    if (!counts[pos]) counts[pos] = { Special: 0, Oro: 0 };
    counts[pos][rar]++;
}
console.log(counts);
