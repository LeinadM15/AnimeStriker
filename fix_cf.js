const fs = require('fs');

function processFile(filename) {
    let file = fs.readFileSync(filename, 'utf8');
    
    // Fix Prestov
    file = file.replace(/id:\s*"martemeli_prestov"[\s\S]*?teamIcon:\s*"teams\/Feyenoord\.png"/, match => match.replace('teams/Feyenoord.png', 'teams/Ajax.png'));
    
    // Specific players to CF
    const idsToChange = [
        'messi_oro', 'messi_esp', 
        'snuffy_oro', 'snuffy_ubers', 'snuffy_fenix', 
        'paolo_bianchi_oro', 'paolo_bianchi_cabras', 
        'cabassos_oro', 'cabassos_futbirthday', 'cabassos_prime', 
        'jade_bear_oro', 'jade_bear'
    ];
    
    idsToChange.forEach(id => {
        let regex = new RegExp('(id:\\s*"' + id + '"[\\s\\S]*?position:\\s*)"[A-Z]+"', 'g');
        file = file.replace(regex, '$1"CF"');
    });

    // 10 random Oro cards to CF
    let oroCount = 0;
    // We only match Oro versions where position is something like ST, RM, LM, etc. (to not ruin GKs or CBs if possible, or just any)
    file = file.replace(/(version:\s*"Oro"[\s\S]*?position:\s*)"(?:ST|RM|LM|CAM|CM|RW|LW)"/g, (match, p1) => {
        if (oroCount < 10) {
            oroCount++;
            return p1 + '"CF"';
        }
        return match;
    });

    fs.writeFileSync(filename, file);
    console.log(`Processed ${filename}, changed ${oroCount} Oro cards to CF.`);
}

processFile('database/tsubasa_cards.js');
processFile('database/bluelock_cards.js');
