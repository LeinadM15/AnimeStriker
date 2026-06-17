const fs = require('fs');
let js = fs.readFileSync('squad.js', 'utf8');
js = js.replace(/\{ role: "GK",  x: (\d+), y: (\d+) \}/g, '{ role: "GK",  x: $1, y: 95 }');
fs.writeFileSync('squad.js', js);
