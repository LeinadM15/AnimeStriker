const fs = require('fs');
let content = fs.readFileSync('squad.js', 'utf8');

content = content.replace(/\\`/g, '`');
content = content.replace(/\\\$/g, '$');

fs.writeFileSync('squad.js', content);
console.log('Syntax errors fixed!');
