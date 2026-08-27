const fs = require('fs');
let content = fs.readFileSync('locations/hokkaido.js', 'utf8');

const regex = /image: "assets\/Historia\/MysteryPlayer\.png"/g;
const replacement = 'image: "assets/characters/Alpino/" + name + ".png"';
content = content.replace(regex, replacement);

fs.writeFileSync('locations/hokkaido.js', content, 'utf8');
console.log('patched hokkaido image fallback');