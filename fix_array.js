const fs = require('fs');
let matchRivals = fs.readFileSync('matchRivals.js', 'utf8');
matchRivals = matchRivals.replace(
    /flagCode: 'jp' \}\r?\n\];/,
    "flagCode: 'jp' },\n    { name: 'COREA', badge: 'teams/Corea.png', flag: 'https://flagcdn.com/w40/kr.png', flagCode: 'kr' }\n];"
);
fs.writeFileSync('matchRivals.js', matchRivals);
console.log('Replaced');
