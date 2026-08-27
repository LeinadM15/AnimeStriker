const fs = require('fs');
const html = fs.readFileSync('myclub.html', 'utf8');
const re = /<script src="([^"?]+)/g;
let m;
const scripts = [];
while (m = re.exec(html)) {
    scripts.push(m[1]);
}

console.log('Total scripts: ' + scripts.length);

// Load scripts one by one and check for errors
let code = '';
for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    try {
        const content = fs.readFileSync(s, 'utf8');
        code += content + '\n';
        try {
            new Function(code);
        } catch (e) {
            console.error('ERROR after loading script #' + (i+1) + ': ' + s);
            console.error('  -> ' + e.message);
            process.exit(1);
        }
    } catch (e) {
        console.error('CANNOT READ: ' + s + ' -> ' + e.message);
        process.exit(1);
    }
}
console.log('ALL OK - all ' + scripts.length + ' scripts loaded without errors');
