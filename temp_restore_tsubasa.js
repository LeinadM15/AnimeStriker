const fs = require('fs');
let content = fs.readFileSync('temp_git_tsubasa_cards.js', 'utf8');

// The file might be UTF-16, let's fix it if so. 
// Wait, we used git show, it might be fine, but Node's readFileSync might need to check for BOM.
if (content.charCodeAt(0) === 0xFEFF || content.charCodeAt(0) === 0xFFFE) {
    content = fs.readFileSync('temp_git_tsubasa_cards.js', 'utf16le');
}

let start = content.indexOf('const tsubasaCards = [');
let end = content.indexOf('];', start) + 2;

let arrayContent = content.substring(start, end);
fs.writeFileSync('database/tsubasa_cards.js', '// database/tsubasa_cards.js\n' + arrayContent + '\n');
console.log('Restored tsubasa_cards.js');
