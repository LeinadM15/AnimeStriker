const fs = require('fs');
const txt = fs.readFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\b1df9a3e-4fb7-46eb-8b23-4bc0b28ad570\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const m = txt.match(/.{0,200}filtered\.sort.{0,500}/g);
if(m) console.log(m[0].replace(/\\\\n/g, '\n').replace(/\\\\"/g, '"'));
