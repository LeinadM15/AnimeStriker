const fs = require('fs');

const filesToInject = ['index.html', 'myclub.html', 'draft_vs.html', 'match_vs.html', 'match.html'];

filesToInject.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('brain_cards.js')) {
        // Find the wildcard_cards.js line (which might have ?v=xxx)
        html = html.replace(/(<script src="database\/wild_cards\.js[^>]*><\/script>)/g, '$1\n    <script src="database/brain_cards.js?v=335"></script>');
        fs.writeFileSync(file, html);
        console.log('Injected brain_cards.js into', file);
    } else {
        console.log('Already exists in', file);
    }
});
