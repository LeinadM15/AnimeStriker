const fs = require('fs');

// Fix coaches
let coachesCode = fs.readFileSync('database/coaches.js', 'utf8');
coachesCode = coachesCode.replace(/league:\s*"",/g, 'league: "Federaciones",');
fs.writeFileSync('database/coaches.js', coachesCode);

// Fix LaLiga
const filesToFix = [
    'database/tsubasa_cards.js',
    'database/bluelock_cards.js',
    'database/inazuma_cards.js'
];

filesToFix.forEach(file => {
    try {
        let code = fs.readFileSync(file, 'utf8');
        code = code.replace(/league:\s*"LaLiga"/g, 'league: "La Liga"');
        fs.writeFileSync(file, code);
    } catch(e) {}
});

// Cache Buster v61
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=61');
    fs.writeFileSync(file, content);
});
