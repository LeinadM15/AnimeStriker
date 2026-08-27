const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');
let idx = content.indexOf('window.initPhase2 = function');
console.log(content.substring(idx - 10, idx + 150));