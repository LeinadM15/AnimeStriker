const fs = require('fs');
const txt = fs.readFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b1df9a3e-4fb7-46eb-8b23-4bc0b28ad570\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = txt.split('\n');
for(let l of lines) {
    if(l.includes('slot-chem-badge') && l.includes('function renderFilledSlot')) {
        let idx = l.indexOf('function renderFilledSlot');
        if(idx !== -1) {
            console.log(l.substring(idx, idx + 2000).replace(/\\\\n/g, '\n').replace(/\\\\"/g, '"'));
            break;
        }
    }
}
