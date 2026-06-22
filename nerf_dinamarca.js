const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

const targetIds = [
    'kraus_dortmund',
    'kraus_oro',
    'haas_arsenal',
    'haas_oro',
    'christiansen_arsenal',
    'christiansen_oro'
];

targetIds.forEach(id => {
    let regex = new RegExp('(\\{\\s*id:\\s*"' + id + '"[\\s\\S]*?rating:\\s*)(\\d+)', 'g');
    code = code.replace(regex, (match, prefix, rating) => {
        let newRating = parseInt(rating) - 1;
        return prefix + newRating;
    });
});

fs.writeFileSync('database/tsubasa_cards.js', code);

// Cache Buster v57
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=57');
    fs.writeFileSync(file, content);
});
