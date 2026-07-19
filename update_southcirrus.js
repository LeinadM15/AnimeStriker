const fs = require('fs');

function updateFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    
    // Replace league
    content = content.replace(/league:\s*"[^"]+",/g, 'league: "J-League",');
    
    // Replace teamIcon
    content = content.replace(/teamIcon:\s*"[^"]+",/g, 'teamIcon: "teams/SouthCirrus.png",');
    
    fs.writeFileSync(filename, content);
}

updateFile('database/southcirrus_cards.js');
updateFile('database/briar_cards.js');
console.log('Updated');
