const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// We can just use string replacements since we know the exact strings if they are unique
// Or just parse and modify

let lines = file.split('\n');
let currentId = null;

for (let i = 0; i < lines.length; i++) {
    let idMatch = lines[i].match(/id:\s*"([^"]+)"/);
    if (idMatch) {
        currentId = idMatch[1];
    }
    
    if (lines[i].includes('image: ')) {
        if (currentId === 'agbim') {
            lines[i] = lines[i].replace('Agbim.png', 'AgbimOro.png');
        } else if (currentId === 'agbim_brasil') {
            lines[i] = lines[i].replace('AgbimOro.png', 'Agbim.png');
        } else if (currentId === 'sadiq') {
            lines[i] = lines[i].replace('Sadiq.png', 'SadiqOro.png');
        } else if (currentId === 'sadiq_brasil') {
            lines[i] = lines[i].replace('SadiqOro.png', 'Sadiq.png');
        }
    }
}

fs.writeFileSync('database/tsubasa_cards.js', lines.join('\n'));
console.log('Images swapped successfully.');
