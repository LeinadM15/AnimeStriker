const fs = require('fs');

const story = fs.readFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', 'utf8');

const start = story.indexOf('    window.startGKMinigame = function');
let trueEnd = story.indexOf('    window.openMyStatsViewer = function', start);
const commentStart = story.lastIndexOf('    // ==========================================', trueEnd);
if (commentStart !== -1 && commentStart > start) {
    trueEnd = commentStart;
}

if (start === -1 || trueEnd === -1) {
    console.error('Could not find bounds! start:', start, 'end:', trueEnd);
    process.exit(1);
}

const beforeText = story.substring(0, start);
const afterText = story.substring(trueEnd);

const perfectCode = `    window.startGKMinigame = function(ourStrength, enemyStrength, winProbability) {
        p2RoomBody.innerHTML = '';
        
        // Remove Detroit UI if somehow still there
        const detroitUI = document.getElementById('tactics-detroit-overlay');
        if (detroitUI) detroitUI.remove();
        
        const engine = document.createElement('div');
        engine.id = 'gk-match-engine';
        // Placeholder background si EstadioPortero.jpeg no existe, cae al color de fondo
        engine.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background-color:#2a5a2a; background-image:url("assets/Match/EstadioPortero.jpeg"); background-size:cover; background-position:center; z-index:100; font-family:"Nunito",sans-serif; overflow:hidden; user-select:none; cursor:crosshair;';
        
        const hud = document.createElement('div');
        hud.style.cssText = 'position:absolute; top:20px; left:10%; right:10%; display:flex; justify-content:space-between; color:#fff; text-shadow:0 0 5px #000; font-size:1.5rem; font-weight:bold; background:rgba(0,0,0,0.6); padding:10px 20px; border-radius:10px; border:2px solid #00e5ff; z-index:110;';
        
        const shotDisplay = document.createElement('div');
        shotDisplay.innerText = "Tiro 1 / 5";
        
        const scoreDisplay = document.createElement('div');
        scoreDisplay.innerText = "Marcador: Nosotros 0 - 0 Rival";
        
        hud.appendChild(shotDisplay);
        hud.appendChild(scoreDisplay);
        engine.appendChild(hud);
        
        // Instrucciones
        const helpOverlay = document.createElement('div');
        helpOverlay.style.cssText = 'position:absolute; bottom:10px; left:50%; transform:translateX(-50%); color:#fff; background:rgba(0,0,0,0.7); padding:10px 20px; border-radius:10px; text-align:center; pointer-events:none; z-index:10010; text-shadow:0 0 5px #000; border:1px solid #00e5ff; font-size: 1.1rem;';
        helpOverlay.innerHTML = '<b>MOVER</b>: Mover el Ratón<br><b>NADA (Blanco)</b>: Agarre | <b>CLIC DER (Rojo)</b>: Puños | <b>CLIC IZQ (Morado/Amarillo)</b>: Estirada';
        engine.appendChild(helpOverlay);
        
        // --- MANOS DEL PORTERO ---
        let currentPose = 'AGARRE';
        let mouseX = 50, mouseY = 50;
        
        const leftGlove = document.createElement('img');
        leftGlove.src = 'assets/Match/PosicionAgarre.png';
        leftGlove.onerror = () => { leftGlove.style.display="none"; };
        leftGlove.style.cssText = 'position:absolute; top:50%; left:45%; transform:translate(-50%, -50%) scaleX(-1); width:180px; height:180px; object-fit:contain; z-index:10005; filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5)); pointer-events:none; transition: width 0.1s, height 0.1s;';
        engine.appendChild(leftGlove);
        
        const rightGlove = document.createElement('img');
        rightGlove.src = 'assets/Match/PosicionAgarre.png';
        rightGlove.onerror = () => { rightGlove.style.display="none"; };
        rightGlove.style.cssText = 'position:absolute; top:50%; left:55%; transform:translate(-50%, -50%); width:180px; height:180px; object-fit:contain; z-index:10005; filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5)); pointer-events:none; transition: width 0.1s, height 0.1s;';
        engine.appendChild(rightGlove);
        
        document.getElementById('phase2-lobby').appendChild(engine);
        
        // --- CONTROLES ---
        function setPose(pose) {
            currentPose = pose;
            let src = 'assets/Match/PosicionAgarre.png';
            let size = '180px';
            if (pose === 'PUNO') { src = 'assets/Match/PosicionPuño.png'; size = '140px'; }
            if (pose === 'ESTIRADA') { src = 'assets/Match/PosicionEstirada.png'; size = '280px'; }
            
            leftGlove.src = src; leftGlove.style.width = size; leftGlove.style.height = size;
            rightGlove.src = src; rightGlove.style.width = size; rightGlove.style.height = size;
            
            updateGlovePositions();
        }
        
        function updateGlovePositions() {
            let offsetX = (currentPose === 'PUNO') ? 3 : (currentPose === 'ESTIRADA' ? 10 : 5);
            leftGlove.style.left = \`calc(\${mouseX}% - \${offsetX}%)\`;
            leftGlove.style.top = \`\${mouseY}%\`;
            rightGlove.style.left = \`calc(\${mouseX}% + \${offsetX}%)\`;
            rightGlove.style.top = \`\${mouseY}%\`;
        }
        
        engine.addEventListener('mousemove', (e) => {
            const rect = engine.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 100;
            mouseY = ((e.clientY - rect.top) / rect.height) * 100;
            updateGlovePositions();
        });
        
        engine.addEventListener('mousedown', (e) => {
            if (e.button === 0) setPose('ESTIRADA'); // Izquierdo
            else if (e.button === 2) setPose('PUNO'); // Derecho
        });
        
        engine.addEventListener('mouseup', () => setPose('AGARRE'));
        engine.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // --- MOTOR DE TIROS ---
        let totalShots = Math.floor(Math.random() * 5) + 8; // 8 a 12 tiros
        let currentShot = 0;
        let saves = 0;
        let goalsConceded = 0;
        
        let finalTeamGoals = Math.floor(Math.random() * 4); // 0 to 3 goals from teammates
        let currentTeamGoals = 0;
        
        function updateHUD() {
            shotDisplay.innerText = \`Ocasión \${Math.min(currentShot + 1, totalShots)} / \${totalShots}\`;
            scoreDisplay.innerText = \`Marcador: Nosotros \${currentTeamGoals} - \${goalsConceded} Rival\`;
        }
        
        function endMatch() {
            engine.remove();
            let win = false; let draw = false;
            if (currentTeamGoals > goalsConceded) win = true;
            else if (currentTeamGoals === goalsConceded) {
                if (saves >= Math.floor(totalShots/2)) win = true;
                else draw = true;
            }
            window.processMatchday(currentTeamGoals, goalsConceded);
            const matchXp = 250 + (win ? 200 : (draw ? 100 : 50)) + (saves * 75);
            const resultTxt = win ? '¡VICTORIA!' : (draw ? 'EMPATE' : 'DERROTA...');
            showNotification(\`\${resultTxt} Resultado: \${currentTeamGoals}-\${goalsConceded}\`, win ? 'success' : (draw ? 'warning' : 'error'), 6000);
            
            setTimeout(() => {
                openMatchXpDistributor(matchXp, \`\${resultTxt} El equipo metió \${currentTeamGoals} goles y encajaste \${goalsConceded}. Paraste \${saves} tiros de \${totalShots}. XP Total: \${matchXp}\`);
            }, 1000);
            document.getElementById('p2-room-content').style.display = 'block';
        }
        
        function getCardImage(npc) {
            let img = 'assets/Isagi.png'; // Fallback
            if (npc) {
                const globalCards = (typeof cardsDB !== 'undefined') ? cardsDB : (window.allCards || []);
                const npcCards = globalCards.filter(c => c.name.toLowerCase().includes(npc.name.toLowerCase()));
                if (npcCards.length > 0) {
                    const randomCard = npcCards[Math.floor(Math.random() * npcCards.length)];
                    img = randomCard.image || npc.image || 'assets/Isagi.png';
                } else {
                    img = npc.image || 'assets/Isagi.png';
                }
            }
            return img;
        }

        function nextShot() {
            if (currentShot >= totalShots) {
                setTimeout(endMatch, 1000);
                return;
            }
            
            if (currentTeamGoals < finalTeamGoals && Math.random() > 0.5) {
                currentTeamGoals++;
                const allies = window.p2StratumPlayers ? window.p2StratumPlayers.slice(0, 10) : [];
                const scorer = allies.length > 0 ? allies[Math.floor(Math.random() * allies.length)] : null;
                const scorerImg = getCardImage(scorer);
                
                showNotification(\`¡GOL DE \${scorer ? scorer.name.toUpperCase() : 'TUS COMPAÑEROS'}! <img src='\${scorerImg}' style='height:30px; vertical-align:middle; margin-left:10px; border-radius:50%;'>\`, "success", 3000);
            }
            
            currentShot++;
            updateHUD();
            
            setTimeout(playScenario, 1000);
        }
        
        function playScenario() {
            const rivals = window.p2StratumPlayers ? window.p2StratumPlayers.slice(10, 21) : [];
            const npc1 = rivals.length > 0 ? rivals[Math.floor(Math.random() * rivals.length)] : null;
            let npc2 = rivals.length > 0 ? rivals[Math.floor(Math.random() * rivals.length)] : null;
            if (npc1 === npc2 && rivals.length > 1) {
                npc2 = rivals.find(r => r !== npc1);
            }
            
            const img1 = getCardImage(npc1);
            const img2 = getCardImage(npc2);
            
            let x1 = 20 + Math.random() * 60; 
            let y1 = 45 + Math.random() * 5;
            
            let x2 = x1 + (Math.random() > 0.5 ? 20 : -20);
            if (x2 < 10) x2 = 10;
            if (x2 > 90) x2 = 90;
            let y2 = 55 + Math.random() * 10; // npc2 está más cerca
            
            const node1 = document.createElement('img');
            node1.src = img1;
            node1.onerror = () => { node1.style.display="none"; };
            node1.style.cssText = \`position:absolute; top:\${y1 - 15}%; left:\${x1 - 5}%; width:10%; object-fit:contain; z-index:10001; pointer-events:none; filter:drop-shadow(0px 5px 10px rgba(0,0,0,0.8)); opacity:0; transform:translateY(20px); transition:all 0.5s;\`;
            
            const node2 = document.createElement('img');
            node2.src = img2;
            node2.onerror = () => { node2.style.display="none"; };
            node2.style.cssText = \`position:absolute; top:\${y2 - 20}%; left:\${x2 - 8}%; width:16%; object-fit:contain; z-index:10003; pointer-events:none; filter:drop-shadow(0px 8px 15px rgba(0,0,0,0.9)); opacity:0; transform:translateY(20px); transition:all 0.5s;\`;
            
            engine.appendChild(node1);
            engine.appendChild(node2);
            
            setTimeout(() => {
                node1.style.opacity = '1'; node1.style.transform = 'translateY(0)';
                node2.style.opacity = '1'; node2.style.transform = 'translateY(0)';
            }, 100);
            
            const ball = document.createElement('img');
            ball.src = 'assets/Match/Balon.png';
            ball.onerror = () => { ball.style.display="none"; };
            ball.style.cssText = \`position:absolute; top:\${y1}%; left:\${x1}%; width:20px; height:20px; z-index:10002; transform:translate(-50%,-50%); pointer-events:none; border-radius:50%;\`;
            
            const isPass = Math.random() < 0.45; // 45% chance of pass
            
            setTimeout(() => {
                engine.appendChild(ball);
                
                if (isPass) {
                    ball.style.transition = \`all 400ms linear\`;
                    ball.style.top = \`\${y2}%\`;
                    ball.style.left = \`\${x2}%\`;
                    ball.style.width = '30px'; ball.style.height = '30px';
                    
                    // Flash pass indicator
                    const passIndicator = document.createElement('div');
                    passIndicator.style.cssText = \`position:absolute; top:\${y2}%; left:\${x2}%; width:50px; height:50px; border-radius:50%; background:rgba(0,255,255,0.5); transform:translate(-50%,-50%); animation: pulse 0.4s;\`;
                    engine.appendChild(passIndicator);
                    setTimeout(() => passIndicator.remove(), 400);
                    
                    setTimeout(() => {
                        executeShot(x2, y2, npc2, node1, node2, ball, true);
                    }, 450);
                } else {
                    executeShot(x1, y1, npc1, node1, node2, ball, false);
                }
                
            }, 600);
        }
        
        function executeShot(startX, startY, shooterObj, node1, node2, ball, wasPass) {
            let type = Math.floor(Math.random() * 4); 
            let targetX = 10 + Math.random() * 80;
            let targetY = 10 + Math.random() * 80;
            
            let flightTime = wasPass ? 700 : 1100; // Es más rápido si viene de pase
            let requiredPose = 'AGARRE';
            
            if (type === 0) {
                ball.style.boxShadow = '0 0 20px 8px rgba(255,255,255,0.8)';
                requiredPose = 'AGARRE';
            } else if (type === 1) {
                ball.style.boxShadow = '0 0 25px 12px rgba(255,0,0,0.9)';
                requiredPose = 'PUNO';
                flightTime = wasPass ? 400 : 550; // Aún más rápido
            } else if (type === 2) {
                ball.style.boxShadow = '0 0 25px 12px rgba(180,0,255,0.9)';
                requiredPose = 'ESTIRADA';
                flightTime = wasPass ? 800 : 1300;
                targetX = Math.random() > 0.5 ? 10 + Math.random()*15 : 75 + Math.random()*15;
            } else if (type === 3) {
                ball.style.boxShadow = '0 0 25px 12px rgba(255,255,0,0.9)';
                requiredPose = 'ESTIRADA';
                flightTime = wasPass ? 800 : 1300;
            }
            
            setTimeout(() => {
                if (type === 2) { 
                    const midX = (targetX > 50) ? 10 : 90;
                    ball.style.transition = \`all \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1)\`;
                    ball.style.top = '10%';
                    ball.style.left = \`\${midX}%\`;
                    ball.style.width = '70px'; ball.style.height = '70px';
                    
                    setTimeout(() => {
                        ball.style.transition = \`all \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2)\`;
                        ball.style.top = \`\${targetY}%\`;
                        ball.style.left = \`\${targetX}%\`;
                        ball.style.width = '160px'; ball.style.height = '160px';
                    }, flightTime*0.5);
                } else if (type === 3) { 
                    const fakeX = (targetX > 50) ? 20 : 80;
                    const fakeY = (targetY > 50) ? 20 : 80;
                    ball.style.transition = \`all \${flightTime*0.4}ms linear\`;
                    ball.style.top = \`\${fakeY}%\`;
                    ball.style.left = \`\${fakeX}%\`;
                    ball.style.width = '80px'; ball.style.height = '80px';
                    
                    setTimeout(() => {
                        ball.style.transition = \`all \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1)\`;
                        ball.style.top = \`\${targetY}%\`;
                        ball.style.left = \`\${targetX}%\`;
                        ball.style.width = '160px'; ball.style.height = '160px';
                    }, flightTime*0.4);
                } else { 
                    ball.style.transition = \`all \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)\`;
                    ball.style.top = \`\${targetY}%\`;
                    ball.style.left = \`\${targetX}%\`;
                    ball.style.width = '160px'; ball.style.height = '160px';
                }
            }, 50);
            
            // Resolución
            setTimeout(() => {
                const dist = Math.sqrt(Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - targetY, 2));
                
                let tolerance = 16; 
                if (currentPose === 'ESTIRADA') tolerance = 28;
                if (currentPose === 'PUNO') tolerance = 14;
                
                if (dist <= tolerance && currentPose === requiredPose) {
                    saves++;
                    ball.style.transition = 'all 0.2s';
                    ball.style.top = '-20%'; 
                    showNotification('¡PARADÓN!', 'success', 1000);
                } else {
                    goalsConceded++;
                    ball.style.transition = 'all 0.2s';
                    ball.style.width = '300px'; ball.style.height = '300px';
                    
                    const scorerName = shooterObj ? shooterObj.name.toUpperCase() : 'RIVAL';
                    const scorerImg = node1.src; // En este punto ambos nodes ya tienen el src correcto, mejor obtenlo de nuevo si queremos precisión
                    const finalScorerImg = getCardImage(shooterObj);
                    
                    showNotification(\`¡GOL DE \${scorerName}! <img src='\${finalScorerImg}' style='height:30px; vertical-align:middle; margin-left:10px; border-radius:50%;'>\`, 'error', 3000);
                    
                    let shakeOffset = 0;
                    const shaker = setInterval(() => {
                        shakeOffset = shakeOffset === 0 ? 5 : (shakeOffset === 5 ? -5 : 0);
                        engine.style.transform = \`translate(\${shakeOffset}px, \${shakeOffset}px)\`;
                    }, 50);
                    setTimeout(() => { clearInterval(shaker); engine.style.transform = 'none'; }, 300);
                }
                
                updateHUD();
                
                setTimeout(() => {
                    ball.style.opacity = '0';
                    node1.style.opacity = '0';
                    node2.style.opacity = '0';
                    setTimeout(() => { ball.remove(); node1.remove(); node2.remove(); }, 500);
                }, 800);

                setTimeout(nextShot, 2000);
            }, flightTime + 50);
        }
        
        setTimeout(nextShot, 1000);
    };
`;

const newStory = beforeText + perfectCode + '\\n' + afterText;

fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story_v5.js', newStory);
console.log('Fixed successfully with V5 logic! start:', start, 'end:', trueEnd);
