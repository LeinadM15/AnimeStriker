const fs = require('fs');
let code = fs.readFileSync('matchRivals.js', 'utf8');

// Mock function so it can run
code += `
function shuffleTourneyArray(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}
let t = createMundialBracket({ badge: 'test' });
let r = t.rounds[0];
let unplayed = r.matches.filter(m => !m.played);
console.log('Total matches:', r.matches.length);
console.log('Unplayed matches:', unplayed.length);
if (unplayed.length > 0) {
    console.log('First unplayed match home:', unplayed[0].home ? unplayed[0].home.name : 'null');
    console.log('First unplayed match away:', unplayed[0].away ? unplayed[0].away.name : 'null');
}
simulateAIMatches(t);
console.log('After simulateAIMatches, unplayed:', r.matches.filter(m => !m.played).length);
let advanced = false;
try {
    // advanceBracket is in the file, let's test it
    advanced = advanceBracket(t);
} catch(e) { console.error('Advance error:', e); }
console.log('Did it advance?', advanced);
`;

fs.writeFileSync('test_mundial_run.js', code);
