const fs = require('fs');
let content = fs.readFileSync('story.js', 'utf8');

// I will write a regex to replace the entire generateDailyNPCs body up to the end of the pool distribution.
// Actually, it's safer to just replace `generateDailyNPCs` completely.
const targetRegex = /function generateDailyNPCs\(\) \{[\s\S]*?p2DailyNPCs\['Meditaci[^']*n'\] = pool\.slice\(25, 30\);\s*\}/;

const newGenDaily = `function generateDailyNPCs() {
        p2DailyNPCs = {};
        p2Rooms.forEach(r => p2DailyNPCs[r] = []);
        
        if (!p2StratumPlayers || p2StratumPlayers.length === 0) return;

        let pool = [...p2StratumPlayers].sort(() => Math.random() - 0.5);
        let miEquipo = (window.gamePhase === 1) ? (window.currentColegioTeamName || "Furano") : "Tu Equipo (Z)";
        let myTeamPool = pool.filter(p => p.team === miEquipo);
        
        let tacticasRoom = p2Rooms.find(r => r.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").includes("tacticas"));
        if (tacticasRoom) {
            let numTacticas = Math.floor(Math.random() * 3) + 2; 
            if (p2Stats && p2Stats.day && p2Stats.day % 3 === 0) {
                numTacticas = 4;
            }
            for(let i=0; i<numTacticas; i++) {
                if (myTeamPool.length > 0) {
                    let npc = myTeamPool.pop();
                    p2DailyNPCs[tacticasRoom].push(npc);
                    pool = pool.filter(p => p.id !== npc.id);
                }
            }
        }
        
        // Distribute remaining npcs evenly among all rooms
        let currentRoomIdx = 0;
        pool.forEach(npc => {
            let r = p2Rooms[currentRoomIdx];
            if (!p2DailyNPCs[r]) p2DailyNPCs[r] = [];
            p2DailyNPCs[r].push(npc);
            currentRoomIdx = (currentRoomIdx + 1) % p2Rooms.length;
        });
    }`;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, newGenDaily);
    fs.writeFileSync('story.js', content, 'utf8');
    console.log('generateDailyNPCs successfully patched!');
} else {
    console.log('generateDailyNPCs regex did NOT match!');
}