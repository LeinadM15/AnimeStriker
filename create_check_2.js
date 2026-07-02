const fs = require('fs');

let c = fs.readFileSync('temp_verify_3.js', 'utf8');
c = c.replace('eval(allCode);', `
eval(allCode);
let missingName = cardsDB.filter(c => typeof c.name === 'undefined' || c.name === null);
if (missingName.length) {
    console.log('Cards with missing name:', missingName.map(c => c.id || 'NO_ID'));
} else {
    console.log('All cards have name defined');
}

let missingTeamIcon = cardsDB.filter(c => typeof c.teamIcon === 'undefined' || c.teamIcon === null);
if (missingTeamIcon.length) {
    console.log('Cards with missing teamIcon:', missingTeamIcon.map(c => c.id || 'NO_ID'));
} else {
    console.log('All cards have teamIcon defined');
}
`);
fs.writeFileSync('temp_verify_5.js', c);
