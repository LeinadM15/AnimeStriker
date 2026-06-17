const fs = require('fs');
const txt = fs.readFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b1df9a3e-4fb7-46eb-8b23-4bc0b28ad570\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = txt.split('\n');
let matches = [];
for(let l of lines) {
    if(l.includes('formation-modal')) {
        matches.push(l.substring(0, 500));
    }
}
console.log(matches.slice(-5).join('\n'));
