const fs = require('fs');
const cp = require('child_process');
function checkDir(dir) {
    const files = fs.readdirSync(dir);
    for (let f of files) {
        const p = dir + '/' + f;
        if (p.includes('node_modules') || p.includes('.git')) continue;
        const stat = fs.statSync(p);
        if (stat.isDirectory()) checkDir(p);
        else if (p.endsWith('.js')) {
            try {
                cp.execSync('node -c "' + p + '"', {stdio:'ignore'});
            } catch(e) {
                console.log('Syntax error in:', p);
            }
        }
    }
}
checkDir('c:/Users/Admin/Desktop/WebFutbol');
