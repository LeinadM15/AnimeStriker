const fs = require('fs');

// Simulate browser loading: load all database scripts then cards.js
let html = fs.readFileSync('index.html', 'utf8');
let scriptRegex = /src="(database\/[^"?]+)/g;
let scripts = [];
let m;
while ((m = scriptRegex.exec(html)) !== null) {
    scripts.push(m[1]);
}

console.log('Loading', scripts.length, 'database scripts...');

let allCode = '';
scripts.forEach(s => {
    try {
        let code = fs.readFileSync(s, 'utf8');
        allCode += code + '\n';
    } catch(e) {
        console.log('MISSING FILE:', s);
    }
});

// Load cards.js
allCode += fs.readFileSync('cards.js', 'utf8');

// Replace const with var for eval
allCode = allCode.replace(/\bconst\b/g, 'var');

try {
    eval(allCode);
    console.log('\nSUCCESS! cardsDB length:', cardsDB.length);
    
    // Check for duplicate IDs
    let ids = cardsDB.map(c => c.id);
    let dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length) {
        console.log('DUPLICATE IDs found:', dupes.length);
        console.log(dupes);
    } else {
        console.log('No duplicate IDs found!');
    }
    
    // Count by team
    let raimon = cardsDB.filter(c => c.teamIcon && c.teamIcon.includes('Raimon'));
    let occult = cardsDB.filter(c => c.teamIcon && c.teamIcon.includes('Occult'));
    let wild = cardsDB.filter(c => c.teamIcon && c.teamIcon.includes('Wild'));
    console.log('\nRaimon cards:', raimon.length);
    console.log('Occult cards:', occult.length);
    console.log('Wild cards:', wild.length);
    
} catch(e) {
    console.log('ERROR:', e.message);
}
