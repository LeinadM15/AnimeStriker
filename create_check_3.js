const fs = require('fs');

let c = fs.readFileSync('temp_verify_3.js', 'utf8');
c = c.replace('eval(allCode);', `
eval(allCode);
let missingLeague = cardsDB.filter(c => typeof c.league === 'undefined' || c.league === null);
if (missingLeague.length) {
    console.log('Cards with missing league:', missingLeague.map(c => c.id || 'NO_ID'));
} else {
    console.log('All cards have league defined');
}
`);
fs.writeFileSync('temp_verify_6.js', c);
