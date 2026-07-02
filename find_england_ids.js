const fs = require('fs');
const file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
const names = ['CHRIS PRINCE', 'M. MOON', 'ADAM BLAKE', 'EDGAR', 'TEDDY'];
names.forEach(name => {
    const regex = new RegExp('id:.*name:\\s*["\']' + name + '["\']', 'g');
    const matches = file.match(regex) || [];
    console.log(name, matches);
});
