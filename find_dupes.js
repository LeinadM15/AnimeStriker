const fs = require('fs');

// Check tecmo_cards.js for Raimon/Occult/Wild cards that need removal
let tecmo = fs.readFileSync('database/tecmo_cards.js', 'utf8');

// Find all IDs in raimon_cards.js, occult_cards.js, wild_cards.js
let raimon = fs.readFileSync('database/raimon_cards.js', 'utf8');
let occult = fs.readFileSync('database/occult_cards.js', 'utf8');
let wild = fs.readFileSync('database/wild_cards.js', 'utf8');

// Extract IDs from each
function extractIds(content) {
    let ids = [];
    let m;
    let re = /id:\s*["']([^"']+)["']/g;
    while ((m = re.exec(content)) !== null) {
        ids.push(m[1]);
    }
    return ids;
}

let raimonIds = extractIds(raimon);
let occultIds = extractIds(occult);
let wildIds = extractIds(wild);

console.log('Raimon IDs:', raimonIds.length, raimonIds);
console.log('Occult IDs:', occultIds.length, occultIds);
console.log('Wild IDs:', wildIds.length, wildIds);

// Check which of these exist in tecmo_cards.js
let tecmoIds = extractIds(tecmo);
let dupesInTecmo = tecmoIds.filter(id => 
    raimonIds.includes(id) || occultIds.includes(id) || wildIds.includes(id)
);
console.log('\nDuplicates in tecmo_cards.js:', dupesInTecmo.length, dupesInTecmo);

// Check coaches.js for duplicate coaches
let coaches = fs.readFileSync('database/coaches.js', 'utf8');
let coachIds = extractIds(coaches);
let coachDupes = coachIds.filter((id, i) => coachIds.indexOf(id) !== i);
console.log('\nDuplicate coach IDs:', coachDupes);

// Also check if tecmoCards is spread in cards.js
let cardsJs = fs.readFileSync('cards.js', 'utf8');
console.log('\ntecmoCards in cards.js:', cardsJs.includes('tecmoCards'));
console.log('raimonCards in cards.js:', cardsJs.includes('raimonCards'));
console.log('occultCards in cards.js:', cardsJs.includes('occultCards'));
console.log('wildCards in cards.js:', cardsJs.includes('wildCards'));
