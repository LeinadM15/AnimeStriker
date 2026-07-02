const fs = require('fs');

// 1. Update squad.js
let squadFile = fs.readFileSync('squad.js', 'utf8');

const newCoachLogic = `    } else if (coach.id === 'coach_mister_yi') {
        if (card.nationFlag && (card.nationFlag.includes('jp.png') || card.nationFlag.includes('cn.png'))) {
            boost.chem += 1;
            boost.rating += 1;
        }
    }`;

squadFile = squadFile.replace(
    /return boost;\n}/g, 
    newCoachLogic + '\n    \n    return boost;\n}'
);

fs.writeFileSync('squad.js', squadFile);

// 2. Update coaches.js
let coachesFile = fs.readFileSync('database/coaches.js', 'utf8');

const misterYiCoach = `
    {
        id: "coach_mister_yi",
        name: "MISTER YI",
        version: "Entrenador",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/cn.png",
        teamIcon: "teams/InazumaJaponOrion.png",
        image: "assets/entrenadores/MisterYi/MisterYi.png",
        background: "assets/Cartas/Oro.png"
    },`;

if (!coachesFile.includes('id: "coach_mister_yi"')) {
    coachesFile = coachesFile.replace('const coachesDB = [', 'const coachesDB = [' + misterYiCoach);
    fs.writeFileSync('database/coaches.js', coachesFile);
}

console.log('Added Mister Yi to coaches.js and squad.js');
