const fs = require('fs');
const s = fs.readFileSync('squad.js', 'utf8');
const matches = s.match(/"[0-9][^"]+": \{/g);
if(matches) console.log(matches.join('\n'));
