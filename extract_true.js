const fs = require('fs');
const txt = fs.readFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b1df9a3e-4fb7-46eb-8b23-4bc0b28ad570\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = txt.split('\n');
for(let l of lines) {
    if(l.includes('renderFilledSlot') && l.includes('slot-rating') && l.includes('slot-image')) {
        let clean = l.replace(/\\\\n/g, '\n').replace(/\\\\"/g, '"');
        let idx = clean.indexOf('function renderFilledSlot');
        if(idx !== -1) {
            console.log(clean.substring(idx, idx + 2000));
            break;
        }
    }
}
