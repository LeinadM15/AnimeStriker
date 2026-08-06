const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<script src="database\/zanark_domain_cards\.js"><\/script>\r?\n?/g, '');
    fs.writeFileSync(file, content);
}

if (fs.existsSync('database/zanark_domain_cards.js')) {
    fs.unlinkSync('database/zanark_domain_cards.js');
}

let cardsJs = fs.readFileSync('cards.js', 'utf8');
cardsJs = cardsJs.replace(/const DB_VERSION = \d+;/, 'const DB_VERSION = ' + Date.now() + ';');
fs.writeFileSync('cards.js', cardsJs);
console.log('Cleanup complete!');
