const fs = require('fs');

// 1. Update squad.js
let squadFile = fs.readFileSync('squad.js', 'utf8');

const newCoachLogic = `    } else if (coach.id === 'coach_aaron_adams') {
        if (card.nationFlag && card.nationFlag.includes('gb-eng.png')) {
            boost.chem += 1;
            boost.rating += 1;
        }
    }`;

// Carefully insert before "return boost;\n}" in getCoachBoosts
// Find where it currently says:
//         }
//     }
//     
//     return boost;
// }
squadFile = squadFile.replace(
    /        }\n    }\n    \n    return boost;\n}/g, 
    '        }\n' + newCoachLogic + '\n    }\n    \n    return boost;\n}'
);

fs.writeFileSync('squad.js', squadFile);

// 2. Update coaches.js
let coachesFile = fs.readFileSync('database/coaches.js', 'utf8');

const aaronAdamsCoach = `
    {
        id: "coach_aaron_adams",
        name: "AARON ADAMS",
        version: "Entrenador",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/gb-eng.png",
        teamIcon: "teams/Inglaterra.png",
        image: "assets/entrenadores/Inglaterra/AaronAdams.png",
        background: "assets/Cartas/Oro.png"
    },`;

if (!coachesFile.includes('id: "coach_aaron_adams"')) {
    coachesFile = coachesFile.replace('const coachesDB = [', 'const coachesDB = [' + aaronAdamsCoach);
    fs.writeFileSync('database/coaches.js', coachesFile);
}

console.log('Added Aaron Adams to coaches.js and squad.js');
