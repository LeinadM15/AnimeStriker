const fs = require('fs');
const s = fs.readFileSync('squad.js', 'utf8');
const lines = s.split('\n');
let start = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('\"3-3-4\": {')) {
        start = i;
        break;
    }
}
if (start !== -1) {
    console.log(lines.slice(start, start + 25).join('\n'));
}
