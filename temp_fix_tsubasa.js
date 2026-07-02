const { execSync } = require('child_process');
const fs = require('fs');

// Get the content using git directly to avoid PowerShell piping encoding issues
let content = execSync('git show HEAD:database/tsubasa_cards.js', { encoding: 'utf8' });

let start = content.indexOf('const tsubasaCards = [');
let end = content.indexOf('];', start) + 2;

let arrayContent = content.substring(start, end);
fs.writeFileSync('database/tsubasa_cards.js', '// database/tsubasa_cards.js\n' + arrayContent + '\n', 'utf8');
console.log('Restored tsubasa_cards.js cleanly');
