const fs = require('fs');
let lines = fs.readFileSync('squad.js', 'utf8').split('\n');
lines.forEach(l => {
    if(l.includes('": {') && l.trim().startsWith('"')) {
        console.log(l.trim());
    }
});
