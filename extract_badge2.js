const fs = require('fs');
const txt = fs.readFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b1df9a3e-4fb7-46eb-8b23-4bc0b28ad570\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const m = txt.match(/.{0,100}slot-chem-badge.{0,200}/g);
if(m) {
    m.forEach(match => console.log(match.replace(/\\\\n/g, '\n').replace(/\\\\"/g, '"')));
}
