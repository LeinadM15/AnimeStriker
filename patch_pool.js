const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

const regex = /let pool = \[\.\.\.p2StratumPlayers\]\.sort\(\(\) => Math\.random\(\) - 0\.5\);/;
const replacement = `let pool = [...p2StratumPlayers].sort(() => Math.random() - 0.5);
        if (window.gamePhase === 1 || window.gamePhase === 1.5) {
            let validTeams = [window.currentColegioTeamName || "Furano", (window.currentColegioTeamName || "Furano") + " Suplentes", "Alpino", "Alpino Suplentes"];
            pool = pool.filter(p => validTeams.includes(p.team));
        }`;

content = content.replace(regex, replacement);
fs.writeFileSync('story.js', content, 'utf8');
console.log('patched pool filter');