const fs = require('fs');

let c = fs.readFileSync('temp_verify_3.js', 'utf8');
c = c.replace('eval(allCode);', `
eval(allCode);
let missing = cardsDB.filter(c => !c.name || !c.league || !c.teamIcon);
if (missing.length) {
    console.log('Cards with missing critical fields:', missing.map(c => c.id || 'NO_ID'));
} else {
    console.log('All cards have name, league, and teamIcon');
}
`);
fs.writeFileSync('temp_verify_4.js', c);
