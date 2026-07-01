const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const heathIds = ["heath_oro", "heath_if", "heath_rosa", "heath_flash", "heath_future", "heath_prime", "heath_tots", "heath_toty"];
const aidenIds = ["aiden_oro", "aiden_if", "aiden_rosa", "aiden_roja", "aiden_hielo", "aiden_tots", "aiden_prime"];
const allIds = heathIds.concat(aidenIds);

for (const id of allIds) {
    const regex = new RegExp(`(id:\\s*[\"']${id}[\"'][\\s\\S]*?league:\\s*[\"'])Desconocida([\"'],)`, 'g');
    file = file.replace(regex, '$1La Liga$2');
}

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log('Updated league to La Liga for HEATH MOORE and AIDEN');
