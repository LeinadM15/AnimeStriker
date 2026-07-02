const fs = require('fs');

const files = ['database/inazuma_cards.js', 'database/tsubasa_cards.js'];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/league: "Academia Alius",/g, 'league: "J-League",');
        fs.writeFileSync(file, content);
    }
}

console.log('Moved Academia Alius to J-League');
