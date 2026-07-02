const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const ids = ["duske_oro", "duske_naranja", "duske_morado", "duske_centurion", "duske_tots"];
for (const id of ids) {
    const regex = new RegExp(`(id:\\s*[\"']${id}[\"'][\\s\\S]*?position:\\s*[\"']GK[\"'],)`, 'g');
    file = file.replace(regex, '$1\n        altPositions: ["CB"],');
}

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log('Added CB as alt position to DUSKE GRAYLING');
