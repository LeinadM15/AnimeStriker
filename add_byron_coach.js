const fs = require('fs');

// 1. Update squad.js
let squadFile = fs.readFileSync('squad.js', 'utf8');

const newCoachLogic = `    } else if (coach.id === 'coach_byron_love') {
        if ((card.teamIcon && card.teamIcon.includes('Kirkwood')) || (card.nationFlag && card.nationFlag.includes('kr.png'))) {
            boost.chem += 1;
            boost.rating += 1;
        }
    }`;

// Replace return boost;
if (!squadFile.includes('coach_byron_love')) {
    squadFile = squadFile.replace(
        /    return boost;\n}/g, 
        newCoachLogic + '\n    return boost;\n}'
    );
    fs.writeFileSync('squad.js', squadFile);
    console.log('Updated squad.js');
}

// 2. Update coaches.js
let coachesFile = fs.readFileSync('database/coaches.js', 'utf8');

const byronCoach = `
    {
        id: "coach_byron_love",
        name: "BYRON LOVE",
        version: "Entrenador (Oro)",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/kr.png",
        teamIcon: "teams/Zeus.png",
        image: "assets/characters/Zeus/ByronLoveEnt.png",
        background: "assets/Cartas/Oro.png",
        boost: { type: "boost", condition: "A todos los jugadores de Corea y Kirkwood" }
    },`;

if (!coachesFile.includes('coach_byron_love')) {
    coachesFile = coachesFile.replace(
        /const coachesDB = \[/,
        'const coachesDB = [' + byronCoach
    );
    fs.writeFileSync('database/coaches.js', coachesFile);
    console.log('Updated coaches.js');
}

// 3. Cache Bust
let cardsJs = fs.readFileSync('cards.js', 'utf8');
const version = Date.now();
cardsJs = cardsJs.replace(/const DB_VERSION = '.*?';/, "const DB_VERSION = '" + version + "';");
fs.writeFileSync('cards.js', cardsJs);

const filesToInject = ['index.html', 'myclub.html', 'draft.html', 'draft_vs.html', 'match_vs.html', 'match.html'];
filesToInject.forEach(file => {
    if(!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/\?v=\d+/g, '?v=' + version);
    fs.writeFileSync(file, html);
});
console.log('Cache busted.');
