const fs = require('fs');

function patchStoryHabitacion(filePath) {
    let lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("p2LobbyScreen.appendChild(btnAmistades);")) {
            // Check if we are inside if (roomName === 'Habitacion')
            // Let's insert the companion code here
            let insertCode = `
            if (window.gamePhase === 1 || window.gamePhase === 1.5) { // Hokkaido
                let companionName = 'Matsuyama';
                if (window.myPlayer && window.myPlayer.name === 'Matsuyama') {
                    companionName = 'Kurona Ranze';
                }
                let companionNPC = p2StratumPlayers.find(p => p.name.includes(companionName) || (p.name === 'Kurona Ranze' && companionName === 'Kurona Ranze'));
                if (!companionNPC && p2StratumPlayers.length > 0) {
                    companionNPC = p2StratumPlayers.find(p => p.name === 'Kurona Ranze' || p.name === 'Matsuyama');
                }
                if (companionNPC) {
                    const npcDiv = document.createElement('div');
                    npcDiv.className = 'p2-scene-overlay';
                    npcDiv.style.cssText = 'bottom:15%; right:15%; width:280px; height:280px; z-index:15; cursor:pointer;';
                    npcDiv.innerHTML = \`<img src="\${companionNPC.image}" style="width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 0 5px #00e5ff);">\`;
                    npcDiv.onclick = () => { openDialogue(companionNPC); };
                    p2NpcContainer.appendChild(npcDiv);
                }
            }`;
            lines.splice(i + 1, 0, insertCode);
            break;
        }
    }
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

patchStoryHabitacion('c:/Users/Admin/Desktop/WebFutbol/story.js');
