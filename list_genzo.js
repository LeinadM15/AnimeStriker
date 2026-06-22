const fs = require('fs');
let code = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

let match;
let regex = /id: "(gen_[^"]+)"[\s\S]*?version: "([^"]+)"[\s\S]*?rating: (\d+)/g;
while ((match = regex.exec(code)) !== null) {
    console.log(match[1], '|', match[2], '|', match[3]);
}
