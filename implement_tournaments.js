const fs = require('fs');

// 1. DRAFT.HTML changes
let draftHtml = fs.readFileSync('draft.html', 'utf8');
draftHtml = draftHtml.replace(
    /<div class="difficulty-card" onclick="startTournament\('liga'\)">[\s\S]*?<\/div>\s*<div class="difficulty-card champions"/,
    '<div class="difficulty-card champions"'
);
if(!draftHtml.includes('abuelo')) {
    draftHtml = draftHtml.replace(
        /(<div class="difficulty-card mundial" onclick="startTournament\('mundial'\)">[\s\S]*?<\/div>)/,
        `$1\n                <div class="difficulty-card abuelo" onclick="startTournament('abuelo')">\n                    <div class="diff-trophy">🔥</div>\n                    <div class="diff-title">CADENA DEL ABUELO</div>\n                    <div class="diff-subtitle">Infernal</div>\n                    <div class="diff-desc">Equipos Infernales<br>Las pruebas definitivas</div>\n                </div>`
    );
}
fs.writeFileSync('draft.html', draftHtml);
console.log('draft.html updated.');

// 2. DRAFT.CSS changes
let draftCss = fs.readFileSync('draft.css', 'utf8');
if (!draftCss.includes('.difficulty-card.abuelo')) {
    const abueloCss = `
/* Abuelo card */
.difficulty-card.abuelo {
    border-color: rgba(255, 0, 0, 0.2);
}
.difficulty-card.abuelo::before {
    background: linear-gradient(135deg, #d50000, #ff1744);
}
.difficulty-card.abuelo:hover {
    border-color: rgba(255, 0, 0, 0.5);
    box-shadow: 0 12px 40px rgba(255, 0, 0, 0.2);
}
.difficulty-card.abuelo .diff-subtitle {
    background: rgba(255, 0, 0, 0.2);
    color: #ff5252;
}
`;
    draftCss += abueloCss;
    fs.writeFileSync('draft.css', draftCss);
    console.log('draft.css updated.');
}

// 3. MATCHRIVALS.JS changes
let matchRivals = fs.readFileSync('matchRivals.js', 'utf8');
if (!matchRivals.includes('ABUELO_TEAMS')) {
    const abueloDB = `
// ==========================================
// ABUELO TEAMS (for Infernal mode)
// ==========================================

const ABUELO_TEAMS = [
    // To be populated later
    { name: 'EQUIPO INFERNAL 1', badge: 'teams/Raimon.png', league: 'Desconocido', teamIcon: 'teams/Raimon.png' }
];
`;
    matchRivals = matchRivals.replace('// LIGA TEAMS', abueloDB + '\n// LIGA TEAMS');
    fs.writeFileSync('matchRivals.js', matchRivals);
    console.log('matchRivals.js added ABUELO_TEAMS.');
}

if (!matchRivals.includes('createAbueloBracket')) {
    const abueloBracketFunc = `
function createAbueloBracket(playerDraftSquad) {
    let allTeams = [...ABUELO_TEAMS];
    // Fill until 32 teams using duplicates if necessary for now
    while(allTeams.length < 32) {
        allTeams.push(allTeams[allTeams.length % ABUELO_TEAMS.length]);
    }
    // Shuffle
    for (let i = allTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allTeams[i], allTeams[j]] = [allTeams[j], allTeams[i]];
    }
    
    // Pick 31 opponents
    allTeams = allTeams.slice(0, 31);
    
    // The player's team is "Mi Equipo"
    const myTeam = { name: 'MI EQUIPO', badge: 'assets/Cartas/Oro.png', isPlayer: true };
    allTeams.push(myTeam);
    
    // Shuffle again so player is in random position
    for (let i = allTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allTeams[i], allTeams[j]] = [allTeams[j], allTeams[i]];
    }
    
    return _createBracket(allTeams, 'abuelo');
}
`;
    matchRivals += abueloBracketFunc;
    fs.writeFileSync('matchRivals.js', matchRivals);
    console.log('matchRivals.js added createAbueloBracket.');
}

// 4. DRAFT.JS changes
let draftJs = fs.readFileSync('draft.js', 'utf8');
if (!draftJs.includes('abuelo')) {
    draftJs = draftJs.replace(
        /else if \(type === 'mundial'\) tourney = createMundialBracket\(playerDraftSquad\);/,
        `else if (type === 'mundial') tourney = createMundialBracket(playerDraftSquad);\n    else if (type === 'abuelo') tourney = createAbueloBracket(playerDraftSquad);`
    );
    fs.writeFileSync('draft.js', draftJs);
    console.log('draft.js updated.');
}

console.log('Done.');
