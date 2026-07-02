const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
let scriptRegex = /src="(database\/[^"?]+)/g;
let scripts = [];
let m;
while ((m = scriptRegex.exec(html)) !== null) {
    scripts.push(m[1]);
}

let allCode = '';
let missing = [];
scripts.forEach(file => {
    try {
        let c = fs.readFileSync(file, 'utf8');
        // Convert const to var for global visibility in eval
        c = c.replace(/const\s+(\w+Cards)\s*=/g, 'var $1 =');
        c = c.replace(/const\s+(\w+All)\s*=/g, 'var $1 =');
        c = c.replace(/const\s+coachesDB\s*=/g, 'var coachesDB =');
        allCode += c + '\n';
    } catch (e) {
        missing.push(file);
    }
});

let cardsJs = fs.readFileSync('cards.js', 'utf8');
cardsJs = cardsJs.replace(/const\s+cardsDB/g, 'var cardsDB');
cardsJs = cardsJs.replace(/const\s+(\w+All)\s*=/g, 'var $1 =');
allCode += cardsJs;

try {
    
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

    console.log('\nSUCCESS!');
    console.log('cardsDB length:', cardsDB.length);
} catch (e) {
    console.log('\nEVAL ERROR:', e.message);
}
