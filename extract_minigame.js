const fs = require('fs');
const lines = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/all_writes.json', 'utf8').split('\n');
const line = lines[1237].trim();
// The line should be a JSON key-value pair like: "ReplacementContent": "..."
// Let's just wrap it in {} and parse it
const obj = JSON.parse(`{${line.endsWith(',') ? line.slice(0, -1) : line}}`);
fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/advanced_minigame_raw.js', obj.ReplacementContent || obj.CodeContent || obj.TargetContent || "NOT FOUND");
console.log('Saved to advanced_minigame_raw.js');
