const fs = require('fs');
const files = fs.readdirSync('c:/Users/Admin/Desktop/WebFutbol').filter(f => f.startsWith('view_') && f.endsWith('.txt'));
const lineMap = {};

files.forEach(f => {
    const content = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/' + f, 'utf8');
    const lines = content.split('\n');
    lines.forEach(l => {
        l = l.replace(/\r$/, '');
        const match = l.match(/^(\d+):\s?(.*)$/);
        if (match) {
            lineMap[parseInt(match[1])] = match[2];
        }
    });
});

let result = '';
for (let i = 3441; i <= 3720; i++) {
    if (lineMap[i] !== undefined) {
        result += lineMap[i] + '\n';
    }
}
fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/reconstructed_minigame.js', result);
console.log('Reconstructed size:', result.length);
