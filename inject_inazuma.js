const fs = require('fs');
const files = ['index.html', 'squad.html', 'match.html', 'myclub.html', 'packs.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes('inazuma_cards.js')) {
            content = content.replace(
                '<script src="database/tsubasa_cards.js',
                '<script src="database/inazuma_cards.js?v=289"></script>\n    <script src="database/tsubasa_cards.js'
            );
            fs.writeFileSync(file, content);
            console.log('Added to ' + file);
        }
    }
});
