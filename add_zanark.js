const fs = require('fs');

const files = fs.readdirSync('.');
const htmlFiles = files.filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('zanark_cards.js')) {
        content = content.replace(/(<script src="database\/[^"]+"><\/script>\s*)(<script src="cards\.js)/, '$1<script src="database/zanark_cards.js?v=1783154600000"></script>\n    $2');
        fs.writeFileSync(file, content);
        console.log('Added to ' + file);
    }
});
