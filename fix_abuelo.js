const fs = require('fs');
let c = fs.readFileSync('matchRivals.js', 'utf8');

// 1. Add PREDEFINED_ABUELO_SQUADS
const abueloSquadsStr = `
const PREDEFINED_ABUELO_SQUADS = {
    'REYES_DEL_TABLERO': {
        formation: '3-4-2-1',
        coach: null,
        pitch: [
            'gino_custom', 'owairan_shapesifter', 'niko_prime', 'misugi_custom1',
            'hugo_rosa', 'riccardo_prime', 'karasu_pxg_87', 'sae_futurestar',
            'jude_legen', 'heath_toty', 'snuffy_fenix'
        ],
        bench: []
    }
};

function buildExactAbueloSquad(exactId) {
    if (typeof cardsDB === 'undefined') return null;
    if (PREDEFINED_ABUELO_SQUADS[exactId]) {
        const def = PREDEFINED_ABUELO_SQUADS[exactId];
        let squad = new Array(11).fill(null);
        let bench = [];
        
        def.pitch.forEach((id, idx) => {
            let c = cardsDB.find(x => x.id === id);
            if (!c) {
                let matching = cardsDB.filter(x => x.name.toUpperCase() === id.toUpperCase());
                if (matching.length > 0) c = matching.reduce((a,b) => a.rating > b.rating ? a : b);
            }
            if (c) squad[idx] = c;
            else console.error('Missing card for predefined abuelo squad: ' + id);
        });
        
        let coach = null;
        if (def.coach && typeof coachesDB !== 'undefined') {
            coach = coachesDB.find(x => x.id === def.coach);
        }
        
        return { formation: def.formation, pitch: squad, bench: bench, coach: coach };
    }
    return null;
}
`;

if(!c.includes('PREDEFINED_ABUELO_SQUADS')) {
    c = c.replace('const PREDEFINED_NATIONAL_SQUADS = {', abueloSquadsStr + '\nconst PREDEFINED_NATIONAL_SQUADS = {');
}

// 2. Update ABUELO_TEAMS
const abueloTeamsReplacement = `const ABUELO_TEAMS = [
    { name: 'REYES DEL TABLERO', badge: 'teams/ReyesdelTablero.png', league: 'Infernal', teamIcon: 'teams/ReyesdelTablero.png', exactSquad: 'REYES_DEL_TABLERO' }
];`;
c = c.replace(/const ABUELO_TEAMS = \[\s*\/\/ To be populated later\s*\{ name: 'EQUIPO INFERNAL 1', badge: 'teams\/Raimon\.png', league: 'Desconocido', teamIcon: 'teams\/Raimon\.png' \}\s*\];/, abueloTeamsReplacement);

// 3. Update buildOpponentSquad
const exactSquadLogic = `
    if (tournamentType === 'abuelo' && opponentTeam.exactSquad) {
        return buildExactAbueloSquad(opponentTeam.exactSquad);
    }

    if (tournamentType === 'mundial' && opponentTeam.nationInfo) {`;
c = c.replace("    if (tournamentType === 'mundial' && opponentTeam.nationInfo) {", exactSquadLogic);

fs.writeFileSync('matchRivals.js', c);
console.log('matchRivals.js updated');
