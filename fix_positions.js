const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const ids = ["heath_oro", "heath_if", "heath_rosa", "heath_flash", "heath_future", "heath_prime", "heath_tots", "heath_toty"];
for (const id of ids) {
    // Find the block for the card
    const regex = new RegExp(`(id:\\s*[\"']${id}[\"'][\\s\\S]*?position:\\s*[\"'])CM([\"'],)`, 'g');
    file = file.replace(regex, '$1CAM$2\n        altPositions: ["CM", "ST"],');
}

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log('Updated positions for HEATH MOORE');
