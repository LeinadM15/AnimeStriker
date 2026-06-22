const fs = require('fs');

let s = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// Neru Especial
s = s.replace(
    /id: "neru_dortmund",[\s\S]*?version: "Valencia",[\s\S]*?teamIcon: "teams\/Valencia\.png",/,
    match => match
        .replace('version: "Valencia",', 'version: "Chicorid",')
        .replace('teamIcon: "teams/Valencia.png",', 'teamIcon: "teams/Chicorid.png",')
);

// Neru Oro
s = s.replace(
    /id: "neru_oro",[\s\S]*?teamIcon: "teams\/Valencia\.png",/,
    match => match.replace('teamIcon: "teams/Valencia.png",', 'teamIcon: "teams/Chicorid.png",')
);

fs.writeFileSync('database/bluelock_cards.js', s);
console.log('Update complete!');
