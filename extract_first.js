const fs = require('fs');
const txt = fs.readFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b1df9a3e-4fb7-46eb-8b23-4bc0b28ad570\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = txt.split('\n');
for(let l of lines) {
    if(l.includes('function renderFilledSlot')) {
        let idx = l.indexOf('function renderFilledSlot');
        let clean = l.substring(idx, idx + 1000).replace(/\\\\n/g, '\n').replace(/\\\\"/g, '"');
        console.log(clean);
        break;
    }
}
