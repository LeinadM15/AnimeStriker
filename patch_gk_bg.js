const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regex = /background-image:url\("assets\/Match\/EstadioPortero\.jpeg"\);/;
const replacement = 'background-image:url("assets/Match/" + ((window.gamePhase === 1 || window.gamePhase === 1.5) ? "AlpinoPortero.jpeg" : "EstadioPortero.jpeg"));';

content = content.replace(regex, replacement);

fs.writeFileSync('story.js', content, 'utf8');
console.log('patched gk bg');