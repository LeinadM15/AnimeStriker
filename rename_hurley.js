const fs = require('fs');

let inazuma = fs.readFileSync('database/inazuma_cards.js', 'utf8');
inazuma = inazuma.replace(/id: "mt_hurley",\s*name: "HURLEY",/g, 'id: "mt_hurley",\n        name: "HURLEY KANE",');
fs.writeFileSync('database/inazuma_cards.js', inazuma);

let tsubasa = fs.readFileSync('database/tsubasa_cards.js', 'utf8');
tsubasa = tsubasa.replace(/name: "HURLEY",/g, 'name: "HURLEY KANE",');
fs.writeFileSync('database/tsubasa_cards.js', tsubasa);

console.log('Renamed Hurley to Hurley Kane');
