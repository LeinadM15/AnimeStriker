const fs = require('fs');

// 1. Update tsubasa_cards.js
let db = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// We need to find all cards with name: "HUNTER" and replace position and secondaryPositions
// Let's parse and replace using a regex that targets the properties within the HUNTER blocks.
// A simpler way is to parse the DB or just regex replace specific blocks.
let lines = db.split('\n');
let insideHunter = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('name: "HUNTER"')) {
        insideHunter = true;
    }
    if (insideHunter) {
        if (lines[i].includes('position:')) {
            lines[i] = lines[i].replace(/position: ".*"/, 'position: "CM"');
        }
        if (lines[i].includes('secondaryPositions:')) {
            lines[i] = lines[i].replace(/secondaryPositions: \[.*\]/, 'secondaryPositions: ["CB"]');
            insideHunter = false; // secondaryPositions usually comes after position, but let's just wait for the end of object
        }
        if (lines[i].includes('}')) {
            insideHunter = false;
        }
    }
}
fs.writeFileSync('database/tsubasa_cards.js', lines.join('\n'));

// 2. Update squad.js
let squad = fs.readFileSync('squad.js', 'utf8');
squad = squad.replace(/"HUNTER":\s*\["ST", "CF", "LW", "RW"\]/, '"HUNTER":      ["CB"]');
fs.writeFileSync('squad.js', squad);

// 3. Update cards.js DB_VERSION
let cards = fs.readFileSync('cards.js', 'utf8');
cards = cards.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + Date.now() + "';");
fs.writeFileSync('cards.js', cards);

console.log('Hunter positions updated.');
