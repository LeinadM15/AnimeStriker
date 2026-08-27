const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regex = /background:url\("assets\/Historia\/Habitaciones\/Minijuegochut\.jpeg"\) center\/cover;/g;
const replacement = 'background:url("assets/Historia/Habitaciones/" + (window.gamePhase === 1 ? "Porteria.jpeg" : "Minijuegochut.jpeg")) center/cover;';
content = content.replace(regex, replacement);

fs.writeFileSync('story.js', content, 'utf8');
console.log('patched chut minigame bg');