const fs = require('fs');
let code = fs.readFileSync('matchRivals.js', 'utf8');

code += `
function shuffleTourneyArray(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
let t = createMundialBracket({ badge: 'test' });

for (let rIdx = 0; rIdx < 4; rIdx++) {
    console.log('--- ROUND ' + rIdx + ' ---');
    let r = t.rounds[t.currentRound];
    let pMatch = r.matches.find(m => (m.home && m.home.isPlayer) || (m.away && m.away.isPlayer));
    if (!pMatch) {
        console.log('PLAYER NOT FOUND IN ROUND', rIdx);
        break;
    }
    pMatch.played = true;
    let playerIsHome = pMatch.home && pMatch.home.isPlayer;
    pMatch.result = { home: playerIsHome ? 1 : 0, away: playerIsHome ? 0 : 1 };
    pMatch.winner = playerIsHome ? pMatch.home : pMatch.away;

    simulateAIMatches(t);
    let advanced = advanceBracket(t);
    console.log('Advanced?', advanced);
    console.log('Next round:', t.currentRound);
    let next = getPlayerNextMatch(t);
    console.log('getPlayerNextMatch:', next ? 'FOUND (' + (next.match.home ? next.match.home.name : 'null') + ' vs ' + (next.match.away ? next.match.away.name : 'null') + ')' : 'NULL');
}
`;
fs.writeFileSync('scratch_simulate_run.js', code);
