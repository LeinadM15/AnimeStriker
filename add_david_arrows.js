const fs = require('fs');

let coaches = fs.readFileSync('database/coaches.js', 'utf8');

const newCoach = `
    {
        id: "coach_david_arrows",
        name: "DAVID ARROWS",
        version: "Entrenador",
        rarity: "Coach",
        rating: 87,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/ci.png",
        teamIcon: "teams/CostaDeMarfil.png",
        image: "assets/characters/Costademarfil/DavidArrows.png",
        background: "assets/Cartas/Oro.png"
    },`;

if (!coaches.includes('id: "coach_david_arrows"')) {
    coaches = coaches.replace('const coachesDB = [', 'const coachesDB = [\n' + newCoach);
    fs.writeFileSync('database/coaches.js', coaches);
    console.log('Coach David Arrows added to coaches.js');
}

let squad = fs.readFileSync('squad.js', 'utf8');

const newBoost = `    } else if (coach.id === 'coach_david_arrows') {
        if (card.nationFlag && card.nationFlag.includes('ci.png')) {
            boost.chem += 2;
            boost.rating += 2;
        }
    }`;

if (!squad.includes("coach.id === 'coach_david_arrows'")) {
    squad = squad.replace("    } else if (coach.id === 'coach_aaron_adams') {", newBoost + "\n    } else if (coach.id === 'coach_aaron_adams') {");
    fs.writeFileSync('squad.js', squad);
    console.log('Boost logic added to squad.js');
}
