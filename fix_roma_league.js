const fs = require('fs');
let file = fs.readFileSync('database/tsubasa_cards.js', 'utf8');

file = file.replace(/\{[^{}]*name:\s*"(MICHAEL|MICAEL|RAPHAEL|RAFAEL)"[^{}]*teamIcon:\s*"teams\/Roma\.png"[^{}]*\}/g, match => {
    return match.replace(/league:\s*"La Liga"/g, 'league: "Serie A"');
});

// Since the order of name and teamIcon could be anything, I'll do a more robust regex just to be sure:
// We can just iterate over all Roma players and if their league is La Liga, we change it to Serie A
file = file.replace(/\{[^{}]*teamIcon:\s*"teams\/Roma\.png"[^{}]*\}/g, match => {
    return match.replace(/league:\s*"La Liga"/g, 'league: "Serie A"');
});

fs.writeFileSync('database/tsubasa_cards.js', file);
console.log("Fixed leagues for Roma players.");
