const fs = require('fs');
let s = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');

// Fix GK Minigame background
s = s.replace('background:url("assets/Match/EstadioPortero.jpeg") center/cover, #2a5a2a;', 'background-color:#2a5a2a; background-image:url("assets/Match/EstadioPortero.jpeg"); background-size:cover; background-position:center;');

// Fix known remaining FFFD replacements
s = s.replace(/\ufffdGOL DEL RIVAL!/g, '¡GOL DEL RIVAL!');
s = s.replace(/\ufffdPARAD\ufffdN/g, '¡PARADÓN');
s = s.replace(/\ufffdPELIGRO! \ufffdEL RIVAL ATACA!/g, '¡PELIGRO! ¡EL RIVAL ATACA!');

fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', s);

let html = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.html', 'utf8');
html = html.replace(/D\ufffdA:/g, 'DÍA:');
fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.html', html);

console.log('Fixed background and texts in story.js and story.html');
