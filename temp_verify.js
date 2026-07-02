const fs = require('fs');

// Read index.html and extract all database script src attributes
let html = fs.readFileSync('index.html', 'utf8');
let scriptRegex = /src="(database\/[^"?]+)/g;
let scripts = [];
let m;
while ((m = scriptRegex.exec(html)) !== null) {
    scripts.push(m[1]);
}
console.log('Found', scripts.length, 'database scripts in index.html');

// Load all scripts in order
let allCode = '';
let missing = [];
scripts.forEach(file => {
    try {
        let c = fs.readFileSync(file, 'utf8');
        allCode += c + '\n';
    } catch (e) {
        missing.push(file);
        console.log('MISSING:', file);
    }
});

if (missing.length > 0) {
    console.log('\nMISSING FILES:', missing.length);
}

// Now add cards.js
allCode += fs.readFileSync('cards.js', 'utf8');

// Try to evaluate everything
try {
    eval(allCode);
    console.log('\nSUCCESS!');
    console.log('cardsDB length:', cardsDB.length);
} catch (e) {
    console.log('\nEVAL ERROR:', e.message);
    // Try to find which line
    let lines = allCode.split('\n');
    let lineMatch = e.stack.match(/:(\d+):/);
    if (lineMatch) {
        let lineNum = parseInt(lineMatch[1]);
        console.log('Error near line', lineNum);
        for (let i = Math.max(0, lineNum - 3); i < Math.min(lines.length, lineNum + 3); i++) {
            console.log((i + 1) + ':', lines[i].substring(0, 120));
        }
    }
}
