const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

// 1. Zlatamovic -1
code = code.replace(/name: "ZLATAMOVIC"([\s\S]*?rating: )(\d+)/, (match, p1, p2) => {
    return 'name: "ZLATAMOVIC"' + p1 + (parseInt(p2) - 1);
});

// 2. Levin +1 (all occurrences in levinCards)
let startIdx = code.indexOf('const levinCards = [');
let endIdx = code.indexOf('];', startIdx);
if (startIdx !== -1 && endIdx !== -1) {
    let levinBlock = code.substring(startIdx, endIdx);
    levinBlock = levinBlock.replace(/rating: (\d+)/g, (match, p1) => {
        return 'rating: ' + (parseInt(p1) + 1);
    });
    code = code.substring(0, startIdx) + levinBlock + code.substring(endIdx);
}

fs.writeFileSync('database/tsubasa_cards.js', code);

// Update cache buster
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\?v=\d+/g, '?v=47');
    fs.writeFileSync(file, content);
});
