const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

// Fix 1: Change Tacticas background back to normal
const tacRegex = /else if \(rn === 'tacticas'\) src = 'assets\/Historia\/Hokkaido\/BoardPers\.png';/g;
content = content.replace(tacRegex, "else if (rn === 'tacticas') src = 'assets/Historia/Habitaciones/Tacticas4.jpeg';");

// Fix 2: Filter out MysteryPlayer from pool in generateDailyNPCs
const poolRegex = /pool = pool\.filter\(p => validTeams\.includes\(p\.team\)\);/g;
content = content.replace(poolRegex, "pool = pool.filter(p => validTeams.includes(p.team) && !p.image.includes('MysteryPlayer'));");

// Fix 3: Filter out MysteryPlayer in startBolasMinigame
const bolasRegex = /let availableNPCs = p2StratumPlayers\.filter\(p => validTeams\.includes\(p\.team\)\);/g;
content = content.replace(bolasRegex, "let availableNPCs = p2StratumPlayers.filter(p => validTeams.includes(p.team) && !p.image.includes('MysteryPlayer'));");

fs.writeFileSync('story.js', content, 'utf8');
console.log('Fixed background and filtered out mystery players');