const fs = require('fs');
let s = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');

const start = s.indexOf('    window.openFriendshipViewer = function() {');
const end = s.indexOf('    window.openMyStatsViewer = function() {');

if (start !== -1 && end !== -1) {
    const beforeText = s.substring(0, start);
    const afterText = s.substring(end);
    
    // We keep the original friendship logic inside a helper function, and add the new rivals logic in another helper.
    const newViewerLogic = `    window.openFriendshipViewer = function(activeTab = 'amistades') {
        const modal = document.getElementById('p2-skill-modal');
        const title = document.getElementById('skill-modal-title');
        const body = document.getElementById('skill-modal-body');
        
        modal.classList.remove('hidden');
        title.innerHTML = \`<div style="display:flex; justify-content:center; gap:20px;">
            <div id="tab-amistades" style="cursor:pointer; color:\${activeTab === 'amistades' ? '#ff007f' : '#555'}; text-shadow:\${activeTab === 'amistades' ? '0 0 10px #ff007f' : 'none'};">AMISTADES</div>
            <div style="color:#fff;">|</div>
            <div id="tab-rivales" style="cursor:pointer; color:\${activeTab === 'rivales' ? '#00e5ff' : '#555'}; text-shadow:\${activeTab === 'rivales' ? '0 0 10px #00e5ff' : 'none'};">RIVALES (SCOUTING)</div>
        </div>\`;
        
        document.getElementById('tab-amistades').onclick = () => window.openFriendshipViewer('amistades');
        document.getElementById('tab-rivales').onclick = () => window.openFriendshipViewer('rivales');
        
        body.innerHTML = '';
        body.style.maxHeight = '600px';
        body.style.overflow = 'hidden'; 
        
        if (activeTab === 'amistades') {
            const knownNPCs = Object.keys(p2Relationships);
            
            if (knownNPCs.length === 0) {
                body.innerHTML = '<div style="text-align:center; color:#aaa; padding:30px;">Aún no has conocido a nadie.<br>¡Visita las otras salas y habla con los jugadores!</div>';
                return;
            }
            
            const graphContainer = document.createElement('div');
            graphContainer.style.cssText = 'position:relative; width:100%; height:500px; background:radial-gradient(circle, #051020 0%, #000 80%); border:2px solid #00e5ff; border-radius:10px; overflow:hidden;';
            
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;';
            graphContainer.appendChild(svg);
            
            const infoPanel = document.createElement('div');
            infoPanel.style.cssText = 'position:absolute; bottom:15px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.85); border:1px solid #00e5ff; padding:10px 20px; border-radius:8px; color:#fff; font-family:"Nunito",sans-serif; text-align:center; opacity:0; transition:opacity 0.3s; z-index:10; pointer-events:none; width:85%;';
            graphContainer.appendChild(infoPanel);
            
            const friends = knownNPCs.map(id => {
                return {
                    id: id,
                    npc: p2StratumPlayers.find(p => p.id === id),
                    data: p2Relationships[id]
                };
            }).filter(f => f.npc);
            
            if (friends.length === 0) {
                body.innerHTML = '<div style="text-align:center; color:#aaa; padding:30px;">Tus conocidos ya no están en esta fase.</div>';
                return;
            }
            
            const myNode = document.createElement('div');
            myNode.style.cssText = \`position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:90px; height:90px; border-radius:50%; border:4px solid #00ffcc; box-shadow:0 0 20px rgba(0,255,204,0.6); z-index:5; background:url('\${myPlayer.image}') center/contain no-repeat #111;\`;
            graphContainer.appendChild(myNode);
            
            const radiusX = 200;
            const radiusY = 150;
            const centerX = 250; 
            const centerY = 250;
            
            friends.forEach((f, idx) => {
                const angle = (idx / friends.length) * 2 * Math.PI - (Math.PI / 2);
                const nx = centerX + radiusX * Math.cos(angle);
                const ny = centerY + radiusY * Math.sin(angle);
                
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', '50%');
                line.setAttribute('y1', '50%');
                line.setAttribute('x2', \`\${(nx / 500) * 100}%\`);
                line.setAttribute('y2', \`\${(ny / 500) * 100}%\`);
                
                const friendVal = f.data.points;
                let lineColor = '#555';
                let strokeW = 1;
                if (friendVal > 25) { lineColor = '#ffaa00'; strokeW = 2; }
                if (friendVal > 60) { lineColor = '#ff007f'; strokeW = 3; }
                if (friendVal >= 100) { lineColor = '#00ffcc'; strokeW = 5; }
                
                line.setAttribute('stroke', lineColor);
                line.setAttribute('stroke-width', strokeW);
                if (friendVal < 25) line.setAttribute('stroke-dasharray', '5,5');
                svg.appendChild(line);
                
                const fNode = document.createElement('div');
                let imgScale = 1;
                if(f.npc.image === 'assets/Isagi.png' && f.npc.name === 'Gin Gagamaru') imgScale = 1.3;
                if(f.npc.image === 'assets/Isagi.png' && f.npc.name === 'Oliver Aiku') imgScale = 1.3;
                
                fNode.style.cssText = \`position:absolute; top:\${(ny/500)*100}%; left:\${(nx/500)*100}%; transform:translate(-50%,-50%); width:60px; height:60px; border-radius:50%; border:2px solid \${lineColor}; box-shadow:0 0 10px \${lineColor}; z-index:5; background:url('\${f.npc.image}') center/cover no-repeat #111; cursor:pointer; transition:transform 0.2s;\`;
                
                fNode.onmouseenter = () => {
                    fNode.style.transform = 'translate(-50%,-50%) scale(1.2)';
                    infoPanel.style.opacity = '1';
                    infoPanel.innerHTML = \`<div style="font-weight:900; font-size:1.5rem;">\${f.npc.name}</div>
                        <div style="color:#aaa; font-size:0.9rem;">\${f.data.levelDesc}</div>
                        <div style="font-weight:bold; color:\${lineColor}; margin-top:5px; font-size:1.2rem;">Amistad: \${friendVal}%</div>\`;
                };
                fNode.onmouseleave = () => {
                    fNode.style.transform = 'translate(-50%,-50%) scale(1)';
                    infoPanel.style.opacity = '0';
                };
                
                graphContainer.appendChild(fNode);
            });
            body.appendChild(graphContainer);
        } else {
            // RIVALES / SCOUTING TAB
            body.style.overflowY = 'auto'; // allow scrolling
            const scouted = p2Stats.scoutedRivals || {};
            const keys = Object.keys(scouted);
            
            if (keys.length === 0) {
                body.innerHTML = '<div style="text-align:center; color:#aaa; padding:30px;">Aún no has investigado a ningún rival.<br>¡Juega al minijuego de Tele-Minigame (Matemáticas) para estudiar a tus oponentes!</div>';
                return;
            }
            
            const db = window.superShotsDB || {};
            let html = '<div style="display:flex; flex-direction:column; gap:15px; padding:10px;">';
            
            Object.keys(db).forEach(pName => {
                let hasAny = false;
                let pHTML = \`<div style="background:rgba(0,0,0,0.6); border:1px solid #00e5ff; border-radius:10px; padding:15px;">
                    <h3 style="color:#00e5ff; font-family:'Bangers'; font-size:1.5rem; margin-top:0; margin-bottom:10px; border-bottom:1px solid #00e5ff; padding-bottom:5px;">\${pName}</h3>
                    <div style="display:flex; flex-direction:column; gap:10px;">\`;
                
                db[pName].forEach(shot => {
                    if (scouted[shot.id]) {
                        hasAny = true;
                        pHTML += \`
                            <div style="display:flex; gap:15px; align-items:center; background:rgba(0,229,255,0.1); padding:10px; border-radius:8px;">
                                <img src="\${shot.asset}" style="width:60px; height:60px; object-fit:contain; border-radius:8px; background:#111;" onerror="this.src='assets/Match/Balon.png'">
                                <div>
                                    <div style="font-weight:bold; color:#fff; font-size:1.2rem;">\${shot.name.toUpperCase()}</div>
                                    <div style="color:#ccc; font-size:0.9rem; margin-top:3px; font-family:'Nunito',sans-serif;">\${shot.desc}</div>
                                </div>
                            </div>
                        \`;
                    }
                });
                pHTML += \`</div></div>\`;
                if (hasAny) html += pHTML;
            });
            
            html += '</div>';
            body.innerHTML = html;
        }
    };
`;

    s = beforeText + newViewerLogic + afterText;
    fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', s);
    console.log("Patched openFriendshipViewer");
} else {
    console.log("Could not find openFriendshipViewer bounds");
}
