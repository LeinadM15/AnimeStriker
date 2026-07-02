const fs = require('fs');

let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const idsToRemove = ['ekpo_brasil', 'kaita_brasil', 'ezekiel_brasil'];
let lines = file.split('\n');
let newLines = [];
let skipMode = false;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    let isStartOfId = false;
    for (let id of idsToRemove) {
        if (line.includes('id: "' + id + '"')) {
            isStartOfId = true;
            break;
        }
    }

    if (isStartOfId) {
        while (newLines.length > 0 && !newLines[newLines.length - 1].includes('{')) {
            newLines.pop();
        }
        if (newLines.length > 0 && newLines[newLines.length - 1].includes('{')) {
            newLines.pop();
        }
        skipMode = true;
        continue;
    }

    if (skipMode) {
        if (line.includes('},')) {
            skipMode = false;
        } else if (line.includes('}')) {
            skipMode = false;
        }
        continue;
    }

    newLines.push(line);
}

fs.writeFileSync('database/tsubasa_cards.js', newLines.join('\n'));
console.log('Removed Ezekiel, Kaita, and Ekpo special versions.');
