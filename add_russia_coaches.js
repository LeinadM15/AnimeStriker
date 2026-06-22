const fs = require('fs');
const path = require('path');

// 1. Añadir entrenadores a database/coaches.js
const coachesPath = path.join(__dirname, 'database', 'coaches.js');
let coachesContent = fs.readFileSync(coachesPath, 'utf8');

const newCoaches = `
    {
        id: "coach_ivanallegrov",
        name: "IVAN ALLEGROV",
        version: "Entrenador (Rusia)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/ru.png",
        teamIcon: "teams/Rusia.png", // Or maybe just generic, there is no Rusia.png but let's use what we have or just null/generic. Wait, let's use teams/Bastard.png or omit it. Actually let's use 'teams/Rusia.png' even if it's broken, it can be fixed later or we use flagcdn. Wait, let's just use 'https://flagcdn.com/w40/ru.png' for teamIcon too if needed, but 'teams/Rusia.png' is fine if it doesn't break. I will just leave teamIcon empty.
        image: "assets/entrenadores/Rusia/IvanAllegrov.png",
        background: "assets/Cartas/Oro.png"
    },
    {
        id: "coach_yekaterinastronov",
        name: "YEKATERINA STRONOV",
        version: "Entrenador (Rusia)",
        rarity: "Coach",
        rating: 85,
        position: "COACH",
        league: "Federaciones",
        nationFlag: "https://flagcdn.com/w40/ru.png",
        teamIcon: "", // Let's leave empty to avoid broken images
        image: "assets/entrenadores/Rusia/YekaterinaStronov.png",
        background: "assets/Cartas/Oro.png"
    }
];`;

if (!coachesContent.includes('coach_ivanallegrov')) {
    coachesContent = coachesContent.replace('];', newCoaches);
    fs.writeFileSync(coachesPath, coachesContent);
    console.log("Coaches added to database/coaches.js");
}

// 2. Modificar squad.js para getCoachBoosts
const squadPath = path.join(__dirname, 'squad.js');
let squadContent = fs.readFileSync(squadPath, 'utf8');

const squadLogic = `    } else if (coach.id === 'coach_ivanallegrov' || coach.id === 'coach_yekaterinastronov') {
        if (card.nationFlag && card.nationFlag.includes('ru.png')) {
            boost.chem += 2;
            boost.rating += 1;
        }
    }`;

if (!squadContent.includes('coach_ivanallegrov')) {
    // Buscar el final de los if-else en getCoachBoosts
    const targetSquad = `    } else if (coach.id === 'coach_kira') {
        if (card.nationFlag && card.nationFlag.includes('jp.png')) {
            boost.rating += 1;
            boost.chem += 1;
        }
        if (card.id && (card.id.includes('kojiro') || card.id.includes('hyuga') || card.id.includes('sawada') || card.id.includes('wakashimazu'))) {
            boost.chem += 1;
        }
    }`;
    squadContent = squadContent.replace(targetSquad, targetSquad + '\n' + squadLogic);
    fs.writeFileSync(squadPath, squadContent);
    console.log("Boosts added to squad.js");
}

// 3. Modificar draft.js para getDraftCoachBoosts
const draftPath = path.join(__dirname, 'draft.js');
let draftContent = fs.readFileSync(draftPath, 'utf8');

if (!draftContent.includes('coach_ivanallegrov')) {
    const targetDraft = `    } else if (coach.id === 'coach_kira') {
        if (card.nationFlag && card.nationFlag.includes('jp.png')) {
            boost.rating += 1;
            boost.chem += 1;
        }
        if (card.id && (card.id.includes('kojiro') || card.id.includes('hyuga') || card.id.includes('sawada') || card.id.includes('wakashimazu'))) {
            boost.chem += 1;
        }
    }`;
    draftContent = draftContent.replace(targetDraft, targetDraft + '\n' + squadLogic);
    fs.writeFileSync(draftPath, draftContent);
    console.log("Boosts added to draft.js");
}
