const fs = require('fs');
const html = fs.readFileSync('myclub.html', 'utf8');
const scripts = [];
const re = /<script src="([^"?]+)/g;
let m;
while (m = re.exec(html)) {
    scripts.push(m[1]);
}

let code = '';
for (const s of scripts) {
    try {
        code += fs.readFileSync(s, 'utf8') + '\n';
    } catch (e) {
        console.error('FAIL LOAD: ' + s);
    }
}
code += fs.readFileSync('cards.js', 'utf8');

try {
    new Function(code);
    console.log('ALL OK - no syntax errors');
} catch (e) {
    console.error('JS ERROR at: ' + e.message);
}
console.log(scripts);
