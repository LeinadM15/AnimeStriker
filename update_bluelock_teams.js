const fs = require('fs');

const mappings = {
    'YUKIMIYA': { team: 'teams/Bastard.png', league: 'Bundesliga' },
    'NAGI': { team: 'teams/Brighton.png', league: 'Premier League' },
    'KIYORA': { team: 'teams/Bastard.png', league: 'Bundesliga' },
    'HIIRAGI': { team: 'teams/Valencia.png', league: 'La Liga' },
    'HIORI': { team: 'teams/Bastard.png', league: 'Bundesliga' },
    'TOKIMITSU': { team: 'teams/Monaco.png', league: 'Superliga Europea' },
    'REO MIKAGE': { team: 'teams/Arsenal.png', league: 'Premier League' },
    'RAICHI': { team: 'teams/Bastard.png', league: 'Bundesliga' }
};

['bluelock_cards.js', 'reo_cards.js', 'raichi_cards.js'].forEach(file => {
    let filePath = 'database/' + file;
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Use a regex to match each card object
    let newContent = content.replace(/\{([^{}]*)\}/g, (match, body) => {
        if (body.includes('teams/BluLock.png')) {
            let nameMatch = body.match(/name:\s*"([^"]+)"/);
            if (nameMatch) {
                let name = nameMatch[1];
                let mapping = mappings[name];
                if (mapping) {
                    body = body.replace(/league:\s*"[^"]+"/, `league: "${mapping.league}"`);
                    body = body.replace(/teamIcon:\s*"teams\/BluLock\.png"/, `teamIcon: "${mapping.team}"`);
                    modified = true;
                    return '{' + body + '}';
                }
            }
        }
        return match;
    });

    if (modified) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${file}`);
    }
});
