const fs = require('fs');
const txt = fs.readFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b1df9a3e-4fb7-46eb-8b23-4bc0b28ad570\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const idx = txt.indexOf('function renderFilledSlot(card, requiredRole');
if(idx === -1) { console.log('not found'); process.exit(0); }
const sub = txt.substring(idx, idx + 2000);
let clean = sub.replace(/\\\\n/g, '\n').replace(/\\\\"/g, '"');
console.log(clean);
