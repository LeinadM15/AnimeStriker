const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. Remove the incorrectly added edgar blocks at the top
const regexTop = /const tsubasaCards = \[\s*\{\s*id:\s*"edgar_partinus_oro"[\s\S]*?\},\s*\{\s*id:\s*"teddy_oro"/;
if (file.match(regexTop)) {
    file = file.replace(/\{\s*id:\s*"edgar_partinus_oro"[\s\S]*?\},\s*/, '');
}

// Ensure the other duplicate isn't there too (if it was added)
const regexTop2 = /const tsubasaCards = \[\s*\{\s*id:\s*"edgar_partinus_tots"[\s\S]*?\},\s*/;
if (file.match(regexTop2)) {
    file = file.replace(/\{\s*id:\s*"edgar_partinus_tots"[\s\S]*?\},\s*/, '');
}

// 2. Add secondaryPositions: ["RM"] to ALL Edgar cards where position is ST
// Since I might have messed up lines earlier, I'll just replace 'position: "ST",' with 'position: "ST",\n        secondaryPositions: ["RM"],' ONLY FOR EDGAR
// There are only two cards right now: edgar_partinus_oro and edgar_partinus_tots

file = file.replace(/(id:\s*["']edgar_partinus_oro["'][\s\S]*?position:\s*["']ST["'],)/, '$1\n        secondaryPositions: ["RM"],');
file = file.replace(/(id:\s*["']edgar_partinus_tots["'][\s\S]*?position:\s*["']ST["'],)/, '$1\n        secondaryPositions: ["RM"],');

// If we accidentally added it twice, let's clean it up
file = file.replace(/secondaryPositions:\s*\["RM"\],\s*secondaryPositions:\s*\["RM"\],/g, 'secondaryPositions: ["RM"],');

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log('Fixed Edgar duplicates and added RM position correctly');
