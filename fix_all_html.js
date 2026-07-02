const fs = require('fs');

// All HTML files that need database scripts
const htmlFiles = ['index.html', 'myclub.html', 'draft.html', 'draft_vs.html', 'match.html', 'match_vs.html'];

// All database scripts that should be loaded (in order) - get from the most complete file
const requiredScripts = [
    'brain_cards.js',
    'otaku_cards.js', 
    'shuriken_cards.js'
];

const version = Date.now(); // Use timestamp for cache busting

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log('SKIP (not found):', file);
        return;
    }
    
    let html = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    requiredScripts.forEach(script => {
        if (!html.includes(script)) {
            // Find wild_cards.js line and inject after it
            const wildPattern = /(<script src="database\/wild_cards\.js[^>]*><\/script>)/;
            if (wildPattern.test(html)) {
                html = html.replace(wildPattern, '$1\n    <script src="database/' + script + '?v=' + version + '"></script>');
                console.log('Injected', script, 'into', file);
                changed = true;
            } else {
                console.log('WARNING: Could not find insertion point in', file, 'for', script);
            }
        }
    });
    
    if (changed) {
        fs.writeFileSync(file, html);
    }
});

// Update DB_VERSION in cards.js
let cards = fs.readFileSync('cards.js', 'utf8');
cards = cards.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + version + "';");
fs.writeFileSync('cards.js', cards);

// Also update ?v= query strings in all HTML files to bust cache
htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/\?v=\d+/g, '?v=' + version);
    fs.writeFileSync(file, html);
    console.log('Updated cache version in', file);
});

console.log('\nDone! DB_VERSION updated to:', version);
