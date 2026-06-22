const fs = require('fs');
let s = fs.readFileSync('squad.js', 'utf8');
s = s.replace("line.setAttribute('stroke-width', '0.6');", "line.setAttribute('stroke-width', '0.25');");
fs.writeFileSync('squad.js', s);
console.log("Made lines thinner.");
