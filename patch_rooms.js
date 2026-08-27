const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regexHab = /if \(roomName === 'Habitaci\xf3n'\) \{/g;
if (regexHab.test(content)) {
    content = content.replace(regexHab, "if (roomName === 'Habitaci\\xf3n' || roomName === 'Habitacion') {");
}

const regexTac = /else if \(roomName === 'T\xe1cticas'\) \{/g;
if (regexTac.test(content)) {
    content = content.replace(regexTac, "else if (roomName === 'T\\xe1cticas' || roomName === 'Tacticas') {");
}

const regexMed = /else if \(roomName === 'Meditaci\xf3n'\) \{/g;
if (regexMed.test(content)) {
    content = content.replace(regexMed, "else if (roomName === 'Meditaci\\xf3n' || roomName === 'Meditacion') {");
}

fs.writeFileSync('story.js', content, 'utf8');
console.log('Patched room conditionals');