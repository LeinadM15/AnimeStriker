const fs = require('fs');
let s = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');
const map = {
    'Ò¡': 'á',
    'Ò©': 'é',
    'Ò­': 'í',
    'Ò³': 'ó',
    'Òº': 'ú',
    'Ò±': 'ñ',
    'Ò¿': '¿',
    'Ò¢â¬ â¬"': '->',
    'Ò¢â¬  ¸': '->',
    'Ò¢& â¬S': '✓',
    'Ò¢& â¬¢': '🧹',
    'Ò  ·': '·'
};
for (const [k, v] of Object.entries(map)) {
    s = s.split(k).join(v);
}
// Also fix any isolated Ò left behind as ¡
s = s.replace(/Ò/g, '¡');
s = s.replace(/ ¡/g, '¡').replace(/ ¿/g, '¿');
fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', s, 'utf8');
console.log('Fixed Spanish chars');
