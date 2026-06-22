const fs = require('fs');

let s = fs.readFileSync('database/bluelock_cards.js', 'utf8');

// Yukimiya Oro
s = s.replace(
    /id: "yukimiya_oro",[\s\S]*?league: "Bundesliga",[\s\S]*?teamIcon: "teams\/Dortmund\.png",/,
    match => match.replace('league: "Bundesliga",', 'league: "Eredivisie",').replace('teamIcon: "teams/Dortmund.png",', 'teamIcon: "teams/Ajax.png",')
);

// Neru Dortmund (convert to Valencia)
s = s.replace(
    /id: "neru_dortmund",[\s\S]*?version: "Borussia Dortmund",[\s\S]*?league: "Bundesliga",[\s\S]*?teamIcon: "teams\/Dortmund\.png",/,
    match => match
        .replace('version: "Borussia Dortmund",', 'version: "Valencia",')
        .replace('league: "Bundesliga",', 'league: "La Liga",')
        .replace('teamIcon: "teams/Dortmund.png",', 'teamIcon: "teams/Valencia.png",')
);

// Neru Oro
s = s.replace(
    /id: "neru_oro",[\s\S]*?league: "Bundesliga",[\s\S]*?teamIcon: "teams\/Dortmund\.png",/,
    match => match.replace('league: "Bundesliga",', 'league: "La Liga",').replace('teamIcon: "teams/Dortmund.png",', 'teamIcon: "teams/Valencia.png",')
);

fs.writeFileSync('database/bluelock_cards.js', s);
console.log('Update complete!');
