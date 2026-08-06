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

const code = `    window.startGKMinigame = function(ourStrength, enemyStrength, winProbability) {
        p2RoomBody.innerHTML = '';
        const detroitUI = document.getElementById('tactics-detroit-overlay');
        if (detroitUI) detroitUI.remove();
        
        const engine = document.createElement('div');
        engine.id = 'gk-match-engine';
        engine.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background-color:#2a5a2a; background-image:url("assets/Match/EstadioPortero.jpeg"); background-size:cover; background-position:center; z-index:100; font-family:"Nunito",sans-serif; overflow:hidden; user-select:none; cursor:crosshair;';
        
        const hud = document.createElement('div');
        hud.style.cssText = 'position:absolute; top:20px; left:10%; right:10%; display:flex; justify-content:space-between; color:#fff; text-shadow:0 0 5px #000; font-size:1.5rem; font-weight:bold; background:rgba(0,0,0,0.6); padding:10px 20px; border-radius:10px; border:2px solid #00e5ff; z-index:110;';
        
        const scoreDisplay = document.createElement('div');
        scoreDisplay.innerText = "Marcador: Nosotros 0 - 0 Rival";
        hud.appendChild(scoreDisplay);
        engine.appendChild(hud);
        
        // TUTORIAL DEL PORTERO
        const helpOverlay = document.createElement('div');
        helpOverlay.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; z-index:10010; font-family:"Nunito",sans-serif; text-shadow:0 0 5px #000; text-align:center; padding:20px;';
        helpOverlay.innerHTML = "<h1 style='color:#00e5ff; font-family:\\"Bangers\\"; font-size:4rem; margin-bottom:10px; letter-spacing:2px; text-shadow:0 0 20px #00e5ff;'>TUTORIAL DEL PORTERO</h1>" +
            "<div style='font-size:1.4rem; max-width:800px; line-height:1.6; margin-bottom:40px; background:rgba(0,0,0,0.5); border:2px solid #00e5ff; padding:20px; border-radius:15px; text-align:left;'>" +
                "<p><b>MOVER EL RATÓN</b>: Coloca los guantes encima del balón para intentar pararlo.</p>" +
                "<div style='display:flex; align-items:center; margin-bottom:10px;'><div style='width:20px;height:20px;background:#fff;border-radius:50%;margin-right:15px;box-shadow:0 0 10px #fff;'></div><b>BALÓN BLANCO:</b> Agarre. ¡No pulses nada!</div>" +
                "<div style='display:flex; align-items:center; margin-bottom:10px;'><div style='width:20px;height:20px;background:#ff0000;border-radius:50%;margin-right:15px;box-shadow:0 0 10px #ff0000;'></div><b>BALÓN ROJO/VERDE:</b> Puños. Mantén pulsado <b>CLICK DERECHO</b>.</div>" +
                "<div style='display:flex; align-items:center; margin-bottom:10px;'><div style='width:20px;height:20px;background:#b400ff;border-radius:50%;margin-right:15px;box-shadow:0 0 10px #b400ff;'></div><b>BALÓN MORADO/AMARILLO:</b> Estirada. Mantén pulsado <b>CLICK IZQUIERDO</b>.</div>" +
                "<hr style='border-color:#555; margin:15px 0;'>" +
                "<p style='color:#ffaa00; text-align:center;'><b>SUPER TIROS</b><br>Si conoces el super tiro del rival (Scouting), atento a sus mecánicas ocultas.</p>" +
            "</div>" +
            "<button id='btn-start-gk' style='padding:15px 40px; font-size:2rem; font-family:\\"Bangers\\"; background:linear-gradient(45deg, #00e5ff, #0077ff); color:#fff; border:none; border-radius:10px; cursor:pointer; box-shadow:0 0 20px rgba(0,229,255,0.6); transition:transform 0.2s;'>EMPEZAR PARTIDO</button>";
        engine.appendChild(helpOverlay);
        
        // --- CALCULO STATS Y OCASIONES ---
        let currentPose = 'AGARRE';
        let currentSuperShotClicks = 0;
        let requiredSuperShotClicks = 0;
        let isSuperShotActive = false;
        
        let mouseX = 50, mouseY = 50;
        let lowestMouseYDuringPuno = 0;
        
        let reflexes = p2Stats.reflexes || 60;
        let diving = p2Stats.diving || 60;
        
        let baseShots = Math.floor(Math.random() * 3) + 6; 
        let diff = Math.round((enemyStrength / 11) - (ourStrength / 11));
        if (diff > 0) baseShots += diff * 2;
        if (baseShots > 10) baseShots = 10; 
        let totalShots = Math.floor(baseShots);
        
        let currentShot = 0; 
        let saves = 0;
        let goalsConceded = 0;
        
        let baseAllyShots = Math.floor(Math.random() * 3) + 6; 
        if (diff < 0) baseAllyShots += Math.abs(diff) * 2; 
        if (baseAllyShots > 10) baseAllyShots = 10;
        let totalAllyShots = Math.floor(baseAllyShots);
        
        let currentAllyShots = 0;
        let currentTeamGoals = 0;
        
        let baseSize = 180 + (diving - 60) * 1.5;
        
        const leftGlove = document.createElement('img');
        leftGlove.src = 'assets/Match/PosicionAgarre.png';
        leftGlove.onerror = () => { leftGlove.style.display="none"; };
        leftGlove.style.cssText = \`position:absolute; top:50%; left:45%; transform:translate(-50%, -50%) scaleX(-1); width:\${baseSize}px; height:\${baseSize}px; object-fit:contain; z-index:10005; filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5)); pointer-events:none; transition: width 0.1s, height 0.1s;\`;
        engine.appendChild(leftGlove);
        
        const rightGlove = document.createElement('img');
        rightGlove.src = 'assets/Match/PosicionAgarre.png';
        rightGlove.onerror = () => { rightGlove.style.display="none"; };
        rightGlove.style.cssText = \`position:absolute; top:50%; left:55%; transform:translate(-50%, -50%); width:\${baseSize}px; height:\${baseSize}px; object-fit:contain; z-index:10005; filter:drop-shadow(0 10px 10px rgba(0,0,0,0.5)); pointer-events:none; transition: width 0.1s, height 0.1s;\`;
        engine.appendChild(rightGlove);
        
        document.getElementById('phase2-lobby').appendChild(engine);
        
        function setPose(pose) {
            currentPose = pose;
            let src = 'assets/Match/PosicionAgarre.png';
            let size = baseSize + 'px';
            if (pose === 'PUNO') { src = 'assets/Match/PosicionPuño.png'; size = (baseSize - 40) + 'px'; }
            if (pose === 'ESTIRADA') { src = 'assets/Match/PosicionEstirada.png'; size = (baseSize + 100) + 'px'; }
            
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
            if (currentPose === 'PUNO' && mouseY > lowestMouseYDuringPuno) {
                lowestMouseYDuringPuno = mouseY;
            }
            updateGlovePositions();
        });
        
        engine.addEventListener('mousedown', (e) => {
            if (e.button === 0) setPose('ESTIRADA');
            else if (e.button === 2) {
                setPose('PUNO');
                lowestMouseYDuringPuno = mouseY;
                if (isSuperShotActive) currentSuperShotClicks++;
            }
        });
        engine.addEventListener('mouseup', () => setPose('AGARRE'));
        engine.addEventListener('contextmenu', (e) => e.preventDefault());
        
        function updateHUD() {
            let totalEvents = totalShots + totalAllyShots;
            let currentEvents = currentShot + currentAllyShots;
            let currentMinute = Math.floor((currentEvents / totalEvents) * 90);
            if (currentMinute > 90) currentMinute = 90;
            if (currentMinute === 0 && currentEvents > 0) currentMinute = 1;
            scoreDisplay.innerText = \`Min \${currentMinute}' | Nosotros \${currentTeamGoals} - \${goalsConceded} Rival\`;
        }
        
        function endMatch() {
            engine.remove();
            let win = false; let draw = false;
            if (currentTeamGoals > goalsConceded) win = true;
            else if (currentTeamGoals === goalsConceded) {
                if (saves >= Math.floor(totalShots/2)) win = true;
                else draw = true;
            }
            window.processMatchday(currentTeamGoals, goalsConceded, true);
            const matchXp = 250 + (win ? 200 : (draw ? 100 : 50)) + (saves * 75);
            const resultTxt = win ? '¡VICTORIA!' : (draw ? 'EMPATE' : 'DERROTA...');
            showNotification(\`\${resultTxt} Resultado: \${currentTeamGoals}-\${goalsConceded}\`, win ? 'success' : (draw ? 'warning' : 'error'), 6000);
            setTimeout(() => { openMatchXpDistributor(matchXp, \`\${resultTxt} El equipo metió \${currentTeamGoals} goles y encajaste \${goalsConceded}. Paraste \${saves} tiros de \${totalShots}. XP Total: \${matchXp}\`); }, 1000);
            document.getElementById('p2-room-content').style.display = 'block';
        }
        
        function getCardImageAndOvr(npc) {
            let img = 'assets/Isagi.png';
            let ovr = 60;
            if (npc) {
                const globalCards = (typeof cardsDB !== 'undefined') ? cardsDB : (window.allCards || []);
                const npcCards = globalCards.filter(c => c.name.toLowerCase().includes(npc.name.toLowerCase()));
                if (npcCards.length > 0) {
                    const specialCards = npcCards.filter(c => c.rarity !== 'Básico' && c.rarity !== 'Plata' && c.rarity !== 'Oro');
                    const oroCard = npcCards.find(c => c.rarity === 'Oro');
                    ovr = oroCard ? oroCard.rating : (npcCards[0].rating || 60);
                    
                    if (specialCards.length > 0) {
                        const randomSpecial = specialCards[Math.floor(Math.random() * specialCards.length)];
                        img = randomSpecial.image || npc.image || 'assets/Isagi.png';
                    } else if (oroCard) {
                        img = oroCard.image || npc.image || 'assets/Isagi.png';
                    } else {
                        img = npcCards[0].image || npc.image || 'assets/Isagi.png';
                    }
                } else {
                    img = npc.image || 'assets/Isagi.png';
                }
            }
            return { img, ovr, npc };
        }
        
        let topForwards = [];
        const rivals = (typeof p2StratumPlayers !== 'undefined') ? p2StratumPlayers.slice(10, 21) : [];
        if (rivals.length > 0) {
            const allRivs = rivals.map(r => {
                const globalCards = (typeof cardsDB !== 'undefined') ? cardsDB : (window.allCards || []);
                const cards = globalCards.filter(c => c.name.toLowerCase().includes(r.name.toLowerCase()));
                const oro = cards.find(c => c.rarity === 'Oro');
                const ovr = oro ? oro.rating : (cards[0] ? cards[0].rating : 60);
                return { npc: r, ovr: ovr };
            });
            allRivs.sort((a,b) => b.ovr - a.ovr);
            topForwards = allRivs.slice(0, 3).map(r => r.npc);
        }

        function nextShot() {
            if (currentShot >= totalShots && currentAllyShots >= totalAllyShots) {
                setTimeout(endMatch, 1000);
                return;
            }
            
            let remainingEnemy = totalShots - currentShot;
            let remainingAlly = totalAllyShots - currentAllyShots;
            
            let chanceForAlly = remainingAlly / (remainingAlly + remainingEnemy);
            
            if (Math.random() < chanceForAlly && remainingAlly > 0) {
                currentAllyShots++;
                updateHUD();
                
                const allies = (typeof p2StratumPlayers !== 'undefined') ? p2StratumPlayers.slice(0, 10) : [];
                const scorer = allies.length > 0 ? allies[Math.floor(Math.random() * allies.length)] : null;
                const scorerInfo = getCardImageAndOvr(scorer);
                
                if (Math.random() < winProbability) {
                    currentTeamGoals++;
                    if (scorer) scorer.goals = (scorer.goals || 0) + 1;
                    showNotification(\`¡GOL DE \${scorer ? scorer.name.toUpperCase() : 'TUS COMPAÑEROS'}! <img src='\${scorerInfo.img}' style='height:30px; vertical-align:middle; margin-left:10px; border-radius:50%;'>\`, "success", 3000);
                } else {
                    const failMsgs = ["ha fallado un tiro claro", "se topó con el portero", "mandó el balón al palo", "la tiró a las nubes"];
                    const msg = failMsgs[Math.floor(Math.random() * failMsgs.length)];
                    showNotification(\`¡\${scorer ? scorer.name.toUpperCase() : 'Tu equipo'} \${msg}! <img src='\${scorerInfo.img}' style='height:30px; vertical-align:middle; margin-left:10px; border-radius:50%; filter:grayscale(100%);'>\`, "warning", 3000);
                }
                
                setTimeout(nextShot, 3500);
                return;
            }
            
            currentShot++;
            updateHUD();
            
            const aviso = document.createElement('div');
            aviso.innerText = '¡OCASIÓN DE ATAQUE RIVAL!';
            aviso.style.cssText = 'position:absolute; top:35%; left:50%; transform:translate(-50%,-50%); color:#ff4444; font-size:3rem; font-weight:900; text-shadow:3px 3px 0 #000, -2px -2px 0 #000, 0 0 20px #ff0000; z-index:10050; animation: pulse 0.5s infinite alternate; pointer-events:none;';
            engine.appendChild(aviso);
            
            setTimeout(() => {
                aviso.remove();
                playScenario();
            }, 1800);
        }
        
        function playScenario() {
            const npc1 = topForwards.length > 0 ? topForwards[Math.floor(Math.random() * topForwards.length)] : null;
            let npc2 = rivals.length > 0 ? rivals[Math.floor(Math.random() * rivals.length)] : null;
            if (npc1 === npc2 && rivals.length > 1) npc2 = rivals.find(r => r !== npc1);
            
            const info1 = getCardImageAndOvr(npc1);
            const info2 = getCardImageAndOvr(npc2);
            
            const isGreenPlay = Math.random() < 0.3;
            
            let depth1 = 0.2 + Math.random() * 0.4;
            let depth2 = depth1 + 0.2 + Math.random() * 0.2;
            
            let x1, x2;
            if (Math.random() > 0.5) {
                x1 = 15 + Math.random() * 25;
                x2 = 60 + Math.random() * 25;
            } else {
                x1 = 60 + Math.random() * 25;
                x2 = 15 + Math.random() * 25;
            }
            
            let width1 = 12 + (depth1 * 18);
            let bottom1 = 45 - (depth1 * 35);
            
            let width2 = 12 + (depth2 * 18);
            let bottom2 = 45 - (depth2 * 35);
            
            const node1 = document.createElement('img');
            node1.src = info1.img;
            node1.onerror = () => { node1.style.display="none"; };
            node1.style.cssText = \`position:absolute; bottom:\${bottom1}%; left:\${x1}%; width:\${width1}%; object-fit:contain; z-index:10001; pointer-events:none; filter:drop-shadow(0px 5px 10px rgba(0,0,0,0.8)); opacity:0; transform:translate(-50%, 20px); transition:all 0.5s;\`;
            
            let node2 = null;
            if (isGreenPlay) {
                node2 = document.createElement('img');
                node2.src = info2.img;
                node2.onerror = () => { node2.style.display="none"; };
                node2.style.cssText = \`position:absolute; bottom:\${bottom2}%; left:\${x2}%; width:\${width2}%; object-fit:contain; z-index:10003; pointer-events:none; filter:drop-shadow(0px 8px 15px rgba(0,0,0,0.9)); opacity:0; transform:translate(-50%, 20px); transition:all 0.5s;\`;
                engine.appendChild(node2);
            }
            engine.appendChild(node1);
            
            setTimeout(() => {
                node1.style.opacity = '1'; node1.style.transform = 'translate(-50%, 0)';
                if(node2) { node2.style.opacity = '1'; node2.style.transform = 'translate(-50%, 0)'; }
            }, 100);
            
            const ballContainer = document.createElement('div');
            ballContainer.style.cssText = \`position:absolute; bottom:\${bottom1}%; left:\${x1}%; width:20px; height:20px; z-index:10002; transform:translate(-50%,50%); pointer-events:none;\`;
            
            const ball = document.createElement('img');
            ball.src = 'assets/Match/Balon.png';
            ball.onerror = () => { ball.style.display="none"; };
            ball.style.cssText = \`position:absolute; top:0; left:0; width:100%; height:100%; border-radius:50%; transition:box-shadow 0.2s;\`;
            
            // FX Container
            const fxImage = document.createElement('img');
            fxImage.style.cssText = \`position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:250%; height:250%; object-fit:contain; opacity:0; z-index:-1;\`;
            
            ballContainer.appendChild(fxImage);
            ballContainer.appendChild(ball);
            
            let willPass = false;
            if (isGreenPlay) {
                ball.style.boxShadow = '0 0 25px 12px rgba(0,255,0,0.9)';
                willPass = Math.random() < 0.5;
            }
            
            setTimeout(() => {
                engine.appendChild(ballContainer);
                
                if (isGreenPlay) {
                    setTimeout(() => {
                        const targetBallTop2 = 100 - bottom2;
                        const targetBallTop1 = 100 - bottom1;
                        const distToPass = Math.sqrt(Math.pow(mouseX - x2, 2) + Math.pow(mouseY - targetBallTop2, 2));
                        const isAnticipatingPass = distToPass < 30 && currentPose === 'PUNO';
                        
                        if (willPass) {
                            ballContainer.style.transition = \`bottom 250ms linear, left 250ms linear, width 250ms linear, height 250ms linear\`;
                            ballContainer.style.bottom = \`\${bottom2}%\`;
                            ballContainer.style.left = \`\${x2}%\`;
                            ballContainer.style.width = '55px'; ballContainer.style.height = '55px';
                            
                            setTimeout(() => {
                                if (isAnticipatingPass) {
                                    saves++;
                                    ballContainer.style.transition = 'all 0.2s';
                                    ballContainer.style.top = '-20%'; 
                                    showNotification('¡CORTASTE EL PASE!', 'success', 1500);
                                    updateHUD();
                                    cleanup();
                                } else {
                                    executeShot(x2, 100-bottom2, info2, node1, node2, ballContainer, ball, fxImage, true, 300);
                                }
                            }, 300);
                        } else {
                            if (isAnticipatingPass) {
                                executeShot(x1, 100-bottom1, info1, node1, node2, ballContainer, ball, fxImage, false, 400);
                            } else {
                                executeShot(x1, 100-bottom1, info1, node1, node2, ballContainer, ball, fxImage, false, 800);
                            }
                        }
                    }, 600);
                } else {
                    executeShot(x1, 100-bottom1, info1, node1, node2, ballContainer, ball, fxImage, false, null);
                }
            }, 600);
            
            function cleanup() {
                setTimeout(() => {
                    ballContainer.style.opacity = '0';
                    node1.style.opacity = '0';
                    if(node2) node2.style.opacity = '0';
                    setTimeout(() => { ballContainer.remove(); node1.remove(); if(node2) node2.remove(); }, 500);
                }, 800);
                setTimeout(nextShot, 2000);
            }
            
            function executeShot(startX, startY, shooterInfo, node1, node2, ballContainer, ball, fxImage, isFastPassShot, forceFlightTime) {
                isSuperShotActive = false;
                currentSuperShotClicks = 0;
                requiredSuperShotClicks = 0;
                let isSuperShotResolvedEarly = false;
                
                let superShot = null;
                if (shooterInfo && shooterInfo.npc && window.superShotsDB && window.superShotsDB[shooterInfo.npc.name]) {
                    const shots = window.superShotsDB[shooterInfo.npc.name];
                    if (Math.random() < 0.4) {
                        superShot = shots[Math.floor(Math.random() * shots.length)];
                    }
                }
                
                let type = Math.floor(Math.random() * 4);
                let requiredPose = 'AGARRE';
                if (isGreenPlay) type = 1;
                
                let targetX = 20 + Math.random() * 60;
                let targetY = 20 + Math.random() * 45;
                
                const reflexDiff = reflexes - shooterInfo.ovr;
                let baseFlight = 1000;
                
                if (superShot) {
                    isSuperShotActive = true;
                    requiredSuperShotClicks = superShot.clicksReq || 0;
                    fxImage.src = superShot.asset;
                    fxImage.style.opacity = '1';
                    ball.style.boxShadow = 'none'; // El asset hace de efecto
                    
                    if (requiredSuperShotClicks > 0) {
                        requiredPose = 'PUNO';
                        type = -1;
                        baseFlight = 800;
                    } else if (superShot.id === 'raiju_shoot' || superShot.id === 'arrow_skywing_shoot') {
                        requiredPose = 'ESTIRADA';
                        type = -2;
                        baseFlight = 1100;
                        if (superShot.id === 'arrow_skywing_shoot') {
                            fxImage.style.opacity = '0';
                            ball.src = superShot.asset;
                            ball.style.boxShadow = 'none';
                        }
                    } else if (superShot.id === 'tiger_shoot') {
                        requiredPose = 'AGARRE'; // El usuario pidió agarre
                        type = -3;
                        baseFlight = 450; // Muy potente y rápido
                    } else if (superShot.id === 'rizo_dragon') {
                        requiredPose = 'ESTIRADA'; // Pidió estirada
                        type = -4;
                        baseFlight = 1200; // Un poco más lento para dar tiempo a ver el círculo
                    } else if (superShot.id === 'tornado_shoot' || superShot.id === 'levin_shoot') {
                        requiredPose = 'PUNO';
                        type = -5;
                        baseFlight = 800;
                        if (superShot.id === 'levin_shoot' || superShot.id === 'tornado_shoot') {
                            fxImage.style.opacity = '0';
                            ball.src = superShot.asset;
                            ball.style.boxShadow = 'none';
                        }
                    } else if (superShot.id === 'drive_shoot' || superShot.id === 'golden_hawk_shoot') {
                        requiredPose = 'AGARRE';
                        type = -6;
                        baseFlight = 1500; // Lento porque sube y baja
                        if (superShot.id === 'golden_hawk_shoot') {
                            fxImage.style.opacity = '0';
                            ball.src = superShot.asset;
                            ball.style.boxShadow = 'none';
                        }
                    } else if (superShot.id === 'splendid_overhead_kick' || superShot.id === 'miracle_overhead_kick') {
                        requiredPose = 'PUNO';
                        type = -12;
                        baseFlight = 1000; 
                        fxImage.style.opacity = '0';
                        ball.src = superShot.asset;
                        ball.style.boxShadow = 'none';
                    } else if (superShot.id === 'pink_shoot') {
                        requiredPose = 'ESTIRADA';
                        type = -13;
                        baseFlight = 450;
                        fxImage.src = superShot.asset;
                        fxImage.style.opacity = '0.9';
                    } else if (superShot.id === 'hayabusa_shoot') {
                        requiredPose = 'ESTIRADA';
                        type = -7;
                        baseFlight = 450; // Super rápido
                    } else if (superShot.id === 'navaja_shoot' || superShot.id === 'boomerang_shot') {
                        requiredPose = 'ESTIRADA';
                        type = -8;
                        baseFlight = 600; // Curva extrema y rápida
                    } else if (superShot.id === 'eagle_shoot') {
                        requiredPose = 'PUNO';
                        type = -9;
                        baseFlight = 450;
                        fxImage.style.opacity = '0';
                        ball.src = superShot.asset;
                        ball.style.boxShadow = 'none';
                    } else if (superShot.id === 'eiffel_shoot') {
                        requiredPose = 'ESTIRADA';
                        type = -10;
                        baseFlight = 300;
                        fxImage.style.opacity = '0';
                        ball.src = superShot.asset;
                        ball.style.boxShadow = 'none';
                    } else if (superShot.id === 'cannon_shoot') {
                        requiredPose = 'PUNO';
                        type = -11;
                        baseFlight = 450;
                        fxImage.style.opacity = '0';
                        // Efecto estático en el origen
                        const cannonFx = document.createElement('img');
                        cannonFx.src = superShot.asset;
                        cannonFx.style.cssText = \`position:absolute; bottom:\${100 - startY}%; left:\${startX}%; width:200px; height:200px; z-index:9000; transform:translate(-50%,20%); opacity:1; transition:opacity 0.3s; pointer-events:none;\`;
                        engine.appendChild(cannonFx);
                        setTimeout(() => cannonFx.style.opacity = '0', 300);
                        setTimeout(() => cannonFx.remove(), 700);
                    }
                    
                    showNotification(\`¡\${shooterInfo.npc.name.toUpperCase()} PREPARA EL \${superShot.name.toUpperCase()}!\`, "warning", 2000);
                }
                
                if (type === 0) {
                    if(!isGreenPlay && !superShot) ball.style.boxShadow = '0 0 20px 8px rgba(255,255,255,0.8)';
                    requiredPose = 'AGARRE';
                    baseFlight = 1000;
                } else if (type === 1) {
                    if(!isGreenPlay && !superShot) ball.style.boxShadow = '0 0 25px 12px rgba(255,0,0,0.9)';
                    requiredPose = 'PUNO';
                    baseFlight = 750;
                } else if (type === 2) {
                    if(!isGreenPlay && !superShot) ball.style.boxShadow = '0 0 25px 12px rgba(180,0,255,0.9)';
                    requiredPose = 'ESTIRADA';
                    baseFlight = 1100;
                    targetX = Math.random() > 0.5 ? 10 + Math.random()*15 : 75 + Math.random()*15;
                } else if (type === 3) {
                    if(!isGreenPlay && !superShot) ball.style.boxShadow = '0 0 25px 12px rgba(255,255,0,0.9)';
                    requiredPose = 'ESTIRADA';
                    baseFlight = 850;
                }
                
                if (isGreenPlay && !superShot) requiredPose = 'PUNO';
                
                let flightTime = forceFlightTime ? forceFlightTime : (baseFlight + (reflexDiff * 8));
                if (flightTime < 450) flightTime = 450;
                
                ballContainer.style.bottom = '';
                ballContainer.style.transform = 'translate(-50%, -50%)';
                
                setTimeout(() => {
                    if (type === 2 && !isGreenPlay && !forceFlightTime) { 
                        const midX = (targetX > 50) ? 10 : 90;
                        ballContainer.style.transition = \`top \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1), bottom \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1), left \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1), width \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1), height \${flightTime*0.5}ms cubic-bezier(0.1, 0.7, 0.4, 1)\`;
                        ballContainer.style.top = '10%'; ballContainer.style.left = \`\${midX}%\`;
                        ballContainer.style.width = '70px'; ballContainer.style.height = '70px';
                        setTimeout(() => {
                            ballContainer.style.transition = \`top \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2), bottom \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2), left \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2), width \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2), height \${flightTime*0.5}ms cubic-bezier(0.5, 0, 0.9, 0.2)\`;
                            ballContainer.style.top = \`\${targetY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                            ballContainer.style.width = '160px'; ballContainer.style.height = '160px';
                        }, flightTime*0.5);
                    } else if (type === 3 && !isGreenPlay && !forceFlightTime) { 
                        const fakeX = (targetX > 50) ? 20 : 80;
                        const fakeY = (targetY > 50) ? 20 : 80;
                        ballContainer.style.transition = \`top \${flightTime*0.4}ms linear, bottom \${flightTime*0.4}ms linear, left \${flightTime*0.4}ms linear, width \${flightTime*0.4}ms linear, height \${flightTime*0.4}ms linear\`;
                        ballContainer.style.top = \`\${fakeY}%\`; ballContainer.style.left = \`\${fakeX}%\`;
                        ballContainer.style.width = '80px'; ballContainer.style.height = '80px';
                        setTimeout(() => {
                            ballContainer.style.transition = \`top \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1), bottom \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1), left \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1), width \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1), height \${flightTime*0.6}ms cubic-bezier(0, 0, 0.2, 1)\`;
                            ballContainer.style.top = \`\${targetY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                            ballContainer.style.width = '160px'; ballContainer.style.height = '160px';
                        }, flightTime*0.4);
                    } else if (type === -2 && !isGreenPlay && !forceFlightTime) { 
                        const fakeY = 85; 
                        ballContainer.style.transition = \`top \${flightTime*0.75}ms linear, bottom \${flightTime*0.75}ms linear, left \${flightTime*0.75}ms linear, width \${flightTime*0.75}ms linear, height \${flightTime*0.75}ms linear\`;
                        ballContainer.style.top = \`\${fakeY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                        ballContainer.style.width = '120px'; ballContainer.style.height = '120px';
                        setTimeout(() => {
                            ballContainer.style.transition = \`top \${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1), bottom \${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1), left \${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1), width \${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1), height \${flightTime*0.25}ms cubic-bezier(0, 0, 0.2, 1)\`;
                            ballContainer.style.top = \`\${targetY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                            ballContainer.style.width = '180px'; ballContainer.style.height = '180px';
                        }, flightTime*0.75);
                    } else if (type === -3 && !isGreenPlay && !forceFlightTime) {
                        // Tiger Shoot: Muy rápido a ras de suelo (targetY cerca de 90)
                        const rasY = 85 + Math.random() * 5; // A ras de suelo
                        ballContainer.style.transition = \`top \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1), bottom \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1), left \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1), width \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1), height \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1)\`;
                        ballContainer.style.top = \`\${rasY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                        ballContainer.style.width = '180px'; ballContainer.style.height = '180px';
                        
                        // Modificamos targetY real para la evaluación de colisión
                        targetY = rasY;
                    } else if (type === -4 && !isGreenPlay && !forceFlightTime) {
                        // Rizo Dragon: Hace un circulo enorme y acaba aleatorio en el borde del circulo
                        const circleCenterX = 50;
                        const circleCenterY = 40;
                        const radius = 30; // Radio del circulo en %
                        const randomAngle = Math.random() * Math.PI * 2; // Donde termina exactamente
                        const endX = circleCenterX + Math.cos(randomAngle) * radius;
                        const endY = circleCenterY + Math.sin(randomAngle) * radius;
                        
                        ballContainer.style.transition = \`top \${flightTime*0.6}ms cubic-bezier(0.5, -0.5, 0.5, 1.5), left \${flightTime*0.6}ms cubic-bezier(0.5, -0.5, 0.5, 1.5), width \${flightTime*0.6}ms linear, height \${flightTime*0.6}ms linear\`;
                        ballContainer.style.top = \`\${circleCenterY}%\`; ballContainer.style.left = \`\${circleCenterX}%\`;
                        ballContainer.style.width = '100px'; ballContainer.style.height = '100px';
                        
                        setTimeout(() => {
                            ballContainer.style.transition = \`top \${flightTime*0.4}ms cubic-bezier(0.2, 0.8, 0.2, 1), left \${flightTime*0.4}ms cubic-bezier(0.2, 0.8, 0.2, 1), width \${flightTime*0.4}ms linear, height \${flightTime*0.4}ms linear\`;
                            ballContainer.style.top = \`\${endY}%\`; ballContainer.style.left = \`\${endX}%\`;
                            ballContainer.style.width = '180px'; ballContainer.style.height = '180px';
                        }, flightTime*0.6);
                        
                        targetX = endX;
                        targetY = endY;
                    } else if (type === -5 && !isGreenPlay && !forceFlightTime) {
                        // Tornado Shoot / Levin Shoot: Directo al centro, requiere uppercut (PUNO desde abajo)
                        targetX = 50;
                        targetY = 50;
                        ballContainer.style.transition = \`top \${flightTime}ms cubic-bezier(0.4, 0, 1, 1), bottom \${flightTime}ms cubic-bezier(0.4, 0, 1, 1), left \${flightTime}ms cubic-bezier(0.4, 0, 1, 1), width \${flightTime}ms cubic-bezier(0.4, 0, 1, 1), height \${flightTime}ms cubic-bezier(0.4, 0, 1, 1)\`;
                        ballContainer.style.top = \`\${targetY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                        ballContainer.style.width = '180px'; ballContainer.style.height = '180px';
                    } else if (type === -6 && !isGreenPlay && !forceFlightTime) {
                        const peakY = 5;
                        const dropY = 85;
                        targetY = dropY; // Evaluamos abajo si no lo para arriba
                        
                        ballContainer.style.transition = \`top \${flightTime*0.4}ms cubic-bezier(0.2, 0.5, 0.5, 1), left \${flightTime*0.4}ms cubic-bezier(0.2, 0.5, 0.5, 1), width \${flightTime*0.4}ms linear, height \${flightTime*0.4}ms linear\`;
                        ballContainer.style.top = \`\${peakY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                        ballContainer.style.width = '100px'; ballContainer.style.height = '100px';
                        
                        setTimeout(() => {
                            const distPeak = Math.sqrt(Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - peakY, 2));
                            let tolerancePeak = (baseSize / 180) * 18;
                            if (distPeak <= tolerancePeak && currentPose === 'AGARRE') {
                                isSuperShotResolvedEarly = true;
                                saves++;
                                ballContainer.style.transition = 'all 0.2s';
                                ballContainer.style.top = '-20%'; 
                                showNotification("¡PARADÓN EN LA CIMA!", "success");
                                updateHUD();
                                cleanup();
                            } else {
                                // Cae en picado
                                ballContainer.style.transition = \`top \${flightTime*0.6}ms cubic-bezier(0.5, 0, 0.8, 0.2), left \${flightTime*0.6}ms cubic-bezier(0.5, 0, 0.8, 0.2), width \${flightTime*0.6}ms linear, height \${flightTime*0.6}ms linear\`;
                                ballContainer.style.top = \`\${dropY}%\`;
                                ballContainer.style.width = '180px'; ballContainer.style.height = '180px';
                            }
                        }, flightTime*0.4);
                        
                    } else if ((type === -7 || type === -10 || type === -11) && !isGreenPlay && !forceFlightTime) {
                        ballContainer.style.transition = \`top \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), bottom \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), left \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), width \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), height \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)\`;
                        ballContainer.style.top = \`\${targetY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                        ballContainer.style.width = '160px'; ballContainer.style.height = '160px';
                    } else if (type === -8 && !isGreenPlay && !forceFlightTime) {
                        if (superShot.id === 'boomerang_shot') {
                            targetX = targetX > 50 ? (92 + Math.random()*5) : (3 + Math.random()*5);
                        }
                        const fakeX = targetX > 50 ? -15 : 115; 
                        const fakeY = 20; 
                        
                        ballContainer.style.transition = \`top \${flightTime*0.4}ms cubic-bezier(0.1, 0.8, 0.2, 1), left \${flightTime*0.4}ms cubic-bezier(0.1, 0.8, 0.2, 1), width \${flightTime*0.4}ms linear, height \${flightTime*0.4}ms linear\`;
                        ballContainer.style.top = \`\${fakeY}%\`; ballContainer.style.left = \`\${fakeX}%\`;
                        ballContainer.style.width = '100px'; ballContainer.style.height = '100px';
                        
                        setTimeout(() => {
                            ballContainer.style.transition = \`top \${flightTime*0.6}ms cubic-bezier(0.8, 0.1, 0.9, 0.2), left \${flightTime*0.6}ms cubic-bezier(0.8, 0.1, 0.9, 0.2), width \${flightTime*0.6}ms linear, height \${flightTime*0.6}ms linear\`;
                            ballContainer.style.top = \`\${targetY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                            ballContainer.style.width = '180px'; ballContainer.style.height = '180px';
                        }, flightTime*0.4);
                    } else if (type === -9 && !isGreenPlay && !forceFlightTime) {
                        const rasY = 85 + Math.random() * 5; 
                        ballContainer.style.transition = \`top \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1), bottom \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1), left \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1), width \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1), height \${flightTime}ms cubic-bezier(0.2, 0.8, 0.2, 1)\`;
                        ballContainer.style.top = \`\${rasY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                        ballContainer.style.width = '180px'; ballContainer.style.height = '180px';
                        targetY = rasY;
                    } else if (type === -12 && !isGreenPlay && !forceFlightTime) {
                        const fakeY = 10;
                        ballContainer.style.transition = \`top \${flightTime*0.4}ms cubic-bezier(0.1, 0.8, 0.2, 1), left \${flightTime*0.4}ms linear, width \${flightTime*0.4}ms linear, height \${flightTime*0.4}ms linear\`;
                        ballContainer.style.top = \`\${fakeY}%\`;
                        
                        setTimeout(() => {
                            ballContainer.style.transition = \`top \${flightTime*0.6}ms cubic-bezier(0.8, 0.1, 0.9, 0.2), left \${flightTime*0.6}ms linear, width \${flightTime*0.6}ms linear, height \${flightTime*0.6}ms linear\`;
                            ballContainer.style.top = \`\${targetY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                            ballContainer.style.width = '180px'; ballContainer.style.height = '180px';
                        }, flightTime*0.4);
                    } else if (type === -13 && !isGreenPlay && !forceFlightTime) {
                        targetX = 5 + Math.random() * 5;
                        targetY = 5 + Math.random() * 5;
                        ballContainer.style.transition = \`top \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), bottom \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), left \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), width \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), height \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)\`;
                        ballContainer.style.top = \`\${targetY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                        ballContainer.style.width = '160px'; ballContainer.style.height = '160px';
                    } else { 
                        ballContainer.style.transition = \`top \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), bottom \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), left \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), width \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1), height \${flightTime}ms cubic-bezier(0.3, 0, 0.8, 1)\`;
                        ballContainer.style.top = \`\${targetY}%\`; ballContainer.style.left = \`\${targetX}%\`;
                        if (type === -1) { ballContainer.style.width = '200px'; ballContainer.style.height = '200px'; } 
                        else { ballContainer.style.width = '160px'; ballContainer.style.height = '160px'; }
                    }
                }, 50);
                
                setTimeout(() => {
                    if (isSuperShotResolvedEarly) return;
                    
                    const dist = Math.sqrt(Math.pow(mouseX - targetX, 2) + Math.pow(mouseY - targetY, 2));
                    let tolerance = (baseSize / 180) * 18; 
                    if (currentPose === 'ESTIRADA') tolerance = (baseSize / 180) * 32; 
                    if (currentPose === 'PUNO') tolerance = (baseSize / 180) * 16; 
                    
                    let saveSuccess = false;
                    if (dist <= tolerance && currentPose === requiredPose) {
                        if (isSuperShotActive && requiredSuperShotClicks > 0) {
                            if (currentSuperShotClicks >= requiredSuperShotClicks) saveSuccess = true;
                        } else if (isSuperShotActive && (superShot.id === 'tornado_shoot' || superShot.id === 'levin_shoot')) {
                            // Require that the mouse was significantly below the ball when PUNO was held down
                            if (lowestMouseYDuringPuno >= 65) saveSuccess = true;
                        } else {
                            saveSuccess = true;
                        }
                    }
                    
                    if (saveSuccess) {
                        saves++;
                        ballContainer.style.transition = 'all 0.2s';
                        ballContainer.style.top = '120%';
                        ballContainer.style.width = '20px'; ballContainer.style.height = '20px';
                        showNotification("¡PARADÓN!", "success");
                    } else {
                        goalsConceded++;
                        if (shooterInfo && shooterInfo.npc) shooterInfo.npc.goals = (shooterInfo.npc.goals || 0) + 1; 
                        ballContainer.style.transition = 'all 0.2s';
                        ballContainer.style.width = '300px'; ballContainer.style.height = '300px';
                        showNotification(\`¡GOL DE \${shooterInfo.npc ? shooterInfo.npc.name.toUpperCase() : 'RIVAL'}! <img src='\${shooterInfo.img}' style='height:30px; vertical-align:middle; margin-left:10px; border-radius:50%;'>\`, 'error', 3000);
                        
                        let shakeOffset = 0;
                        const shaker = setInterval(() => {
                            shakeOffset = shakeOffset === 0 ? 5 : (shakeOffset === 5 ? -5 : 0);
                            engine.style.transform = \`translate(\${shakeOffset}px, \${shakeOffset}px)\`;
                        }, 50);
                        setTimeout(() => { clearInterval(shaker); engine.style.transform = 'none'; }, 300);
                    }
                    updateHUD();
                    cleanup();
                }, flightTime + 50);
            }
        }
        
        // Empezar TRAS CLICK
        document.getElementById('btn-start-gk').onclick = () => {
            helpOverlay.remove();
            
            const miniHelp = document.createElement('div');
            miniHelp.style.cssText = 'position:absolute; bottom:10px; left:50%; transform:translateX(-50%); color:#fff; background:rgba(0,0,0,0.7); padding:10px 20px; border-radius:10px; text-align:center; pointer-events:none; z-index:10010; text-shadow:0 0 5px #000; border:1px solid #00e5ff; font-size: 1.1rem;';
            miniHelp.innerHTML = '<b>BLANCO</b>: Nada | <b>ROJO/VERDE</b>: Clic Der | <b>MORADO/AMARILLO</b>: Clic Izq';
            engine.appendChild(miniHelp);
            
            setTimeout(nextShot, 1000);
        };
    };
`;

const newStory = beforeText + code + '\n' + afterText;
fs.writeFileSync('c:/Users/Admin/Desktop/WebFutbol/story.js', newStory);
console.log('Fixed successfully with V9 (Super Shots + Tutorial) logic! start:', start, 'end:', trueEnd);
