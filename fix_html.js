const fs = require('fs');
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('database/coaches.js')) {
        content = content.replace('<script src="database/bluelock_cards.js"></script>', '<script src="database/bluelock_cards.js"></script>\n    <script src="database/coaches.js"></script>');
    }
    content = content.replace(/\?v=\d+/g, '?v=26');
    fs.writeFileSync(file, content);
});
