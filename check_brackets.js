const fs = require('fs');
const content = fs.readFileSync('story.js', 'utf8');

let depth = 0;
let lastLines = [];
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Ignore comments
    line = line.replace(/\/\/.*/, '');
    line = line.replace(/\/\*[\s\S]*?\*\//g, '');
    
    for (let char of line) {
        if (char === '{') {
            depth++;
        } else if (char === '}') {
            depth--;
        }
    }
    
    if (depth < 0) {
        console.log(`Unbalanced bracket (too many }) at line ${i+1}: ${lines[i]}`);
        process.exit(1);
    }
}

console.log(`Final depth: ${depth}`);
if (depth > 0) {
    console.log(`Missing ${depth} closing brackets '}'.`);
}