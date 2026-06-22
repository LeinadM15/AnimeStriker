const fs = require('fs');
const files = ['index.html', 'myclub.html', 'packs.html', 'squad.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace existing ?v=XXX with ?v=40
    content = content.replace(/\?v=\d+/g, '?v=40');
    
    // Add ?v=40 to local scripts that don't have it (exclude http ones)
    content = content.replace(/(\.js)(")/g, (match, p1, p2) => {
        return '.js?v=40"';
    });
    content = content.replace(/(\.css)(")/g, (match, p1, p2) => {
        return '.css?v=40"';
    });
    
    // Fix double ?v=40?v=40 if they were double appended
    content = content.replace(/\?v=40\?v=40/g, '?v=40');
    
    // Do not append to http scripts (like firebase), so if there's https://..., we just strip ?v=40 if we added it
    content = content.replace(/(https?:\/\/[^\"]+\.js)\?v=40/g, '$1');
    
    fs.writeFileSync(file, content);
});
