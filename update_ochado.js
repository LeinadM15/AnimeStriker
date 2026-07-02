const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

let lines = file.split('\n');
let insideOchado = false;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('name: "OCHADO"')) {
        insideOchado = true;
    }
    
    if (insideOchado && lines[i].includes('rating: ')) {
        let match = lines[i].match(/rating:\s*(\d+)/);
        if (match) {
            let currentRating = parseInt(match[1], 10);
            let newRating = currentRating + 2;
            lines[i] = lines[i].replace("rating: " + currentRating, "rating: " + newRating);
        }
    }

    if (insideOchado && lines[i].includes('}')) {
        insideOchado = false;
    }
}

fs.writeFileSync('database/tsubasa_cards.js', lines.join('\n'));
console.log('Ochado ratings updated successfully.');
